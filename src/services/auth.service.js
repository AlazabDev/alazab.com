import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import User from '../models/User.model.js';
import { redisClient } from '../config/redis.js';
import { createLogger } from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';
import { sendEmail } from '../utils/email.js';

const logger = createLogger();

class AuthService {
  constructor() {
    this.providers = {
      google: this.handleGoogleAuth.bind(this),
      facebook: this.handleFacebookAuth.bind(this),
    };
  }

  // Generate JWT tokens
  generateTokens(user, deviceInfo, ipAddress) {
    const accessToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const refreshTokenExpires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    );

    // Store refresh token in database
    user.refreshTokens.push({
      token: refreshToken,
      expiresAt: refreshTokenExpires,
      deviceInfo,
      ipAddress,
    });

    // Limit refresh tokens to last 5
    if (user.refreshTokens.length > 5) {
      user.refreshTokens = user.refreshTokens.slice(-5);
    }

    return { accessToken, refreshToken, refreshTokenExpires };
  }

  // Verify refresh token
  async verifyRefreshToken(token, userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 401);
    }

    const refreshToken = user.refreshTokens.find(t => t.token === token);
    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    return user;
  }

  // Remove refresh token (logout)
  async removeRefreshToken(userId, token) {
    await User.updateOne(
      { _id: userId },
      { $pull: { refreshTokens: { token } } }
    );
  }

  // Handle Google OAuth
  async handleGoogleAuth(code, ipAddress, userAgent) {
    try {
      // Exchange code for tokens
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      });

      const { access_token, id_token } = tokenResponse.data;

      // Verify and decode ID token
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      const { sub, email, name, picture } = userInfo.data;

      // Find or create user
      let user = await User.findOne({ 
        $or: [
          { provider: 'google', providerId: sub },
          { email }
        ]
      });

      if (!user) {
        // Create new user
        user = await User.create({
          email,
          name,
          avatar: picture,
          provider: 'google',
          providerId: sub,
          isEmailVerified: true, // Google emails are verified
        });
      } else if (user.provider !== 'google') {
        // Link Google account to existing user
        user.provider = 'google';
        user.providerId = sub;
        user.isEmailVerified = true;
        await user.save();
      }

      // Log login attempt
      await this.logLoginAttempt(user._id, ipAddress, userAgent, 'google', true);

      return user;
    } catch (error) {
      logger.error('Google auth error:', error);
      throw new AppError('Google authentication failed', 401);
    }
  }

  // Handle Facebook OAuth
  async handleFacebookAuth(code, ipAddress, userAgent) {
    try {
      // Exchange code for access token
      const tokenResponse = await axios.get(
        'https://graph.facebook.com/v18.0/oauth/access_token',
        {
          params: {
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_APP_SECRET,
            redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
            code,
          },
        }
      );

      const { access_token } = tokenResponse.data;

      // Get user info
      const userResponse = await axios.get(
        'https://graph.facebook.com/me',
        {
          params: {
            fields: 'id,name,email,picture',
            access_token,
          },
        }
      );

      const { id, name, email, picture } = userResponse.data;

      // Get email if not provided
      let userEmail = email;
      if (!userEmail) {
        const emailResponse = await axios.get(
          'https://graph.facebook.com/me/accounts',
          { params: { access_token } }
        );
        userEmail = emailResponse.data?.data?.[0]?.email;
      }

      if (!userEmail) {
        throw new AppError('Email not provided by Facebook', 400);
      }

      // Find or create user
      let user = await User.findOne({
        $or: [
          { provider: 'facebook', providerId: id },
          { email: userEmail }
        ]
      });

      if (!user) {
        user = await User.create({
          email: userEmail,
          name,
          avatar: picture?.data?.url,
          provider: 'facebook',
          providerId: id,
          isEmailVerified: true,
        });
      } else if (user.provider !== 'facebook') {
        user.provider = 'facebook';
        user.providerId = id;
        user.isEmailVerified = true;
        await user.save();
      }

      // Log login attempt
      await this.logLoginAttempt(user._id, ipAddress, userAgent, 'facebook', true);

      return user;
    } catch (error) {
      logger.error('Facebook auth error:', error);
      throw new AppError('Facebook authentication failed', 401);
    }
  }

  // Local registration
  async register(userData, ipAddress, userAgent) {
    const { email, password, name } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User already exists with this email', 400);
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      provider: 'local',
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    await sendEmail({
      to: email,
      subject: 'Verify your email',
      template: 'email-verification',
      context: {
        name,
        verificationLink: `${process.env.CLIENT_URL}/verify-email/${verificationToken}`,
      },
    });

    // Log registration
    await this.logLoginAttempt(user._id, ipAddress, userAgent, 'local', true);

    return user;
  }

  // Local login
  async login(email, password, ipAddress, userAgent) {
    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      // Log failed attempt
      await this.logLoginAttempt(null, ipAddress, userAgent, 'local', false);
      throw new AppError('Invalid email or password', 401);
    }

    if (user.accountStatus !== 'active') {
      throw new AppError('Account is not active', 403);
    }

    // Log successful login
    await this.logLoginAttempt(user._id, ipAddress, userAgent, 'local', true);

    return user;
  }

  // Log login attempts
  async logLoginAttempt(userId, ipAddress, userAgent, provider, success) {
    const logEntry = {
      timestamp: new Date(),
      ipAddress,
      userAgent,
      provider,
      success,
    };

    if (userId) {
      await User.updateOne(
        { _id: userId },
        { 
          $push: { loginHistory: { $each: [logEntry], $slice: -50 } },
          lastLogin: success ? new Date() : undefined,
        }
      );
    }

    // Store failed attempts in Redis for rate limiting
    if (!success) {
      const key = `failed_logins:${ipAddress}`;
      await redisClient.incr(key);
      await redisClient.expire(key, 3600); // 1 hour
    }
  }

  // Check if IP is blocked due to too many failed attempts
  async isIpBlocked(ipAddress) {
    const failedAttempts = await redisClient.get(`failed_logins:${ipAddress}`);
    return parseInt(failedAttempts) >= 10; // Block after 10 failed attempts
  }

  // Initiate password reset
  async initiatePasswordReset(email) {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    await sendEmail({
      to: email,
      subject: 'Password Reset',
      template: 'password-reset',
      context: {
        name: user.name,
        resetLink: `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      },
    });
  }

  // Reset password
  async resetPassword(token, newPassword) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    // Invalidate all refresh tokens
    user.refreshTokens = [];
    
    await user.save();

    // Notify user about password change
    await sendEmail({
      to: user.email,
      subject: 'Password Changed',
      template: 'password-changed',
      context: { name: user.name },
    });
  }
}

export default new AuthService();
