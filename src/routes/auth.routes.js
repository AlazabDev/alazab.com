import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import authService from '../services/auth.service.js';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  skipSuccessfulRequests: true,
});

// Google OAuth callback
router.post('/callback/google', async (req, res, next) => {
  try {
    const { code } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.get('User-Agent');

    // Check if IP is blocked
    if (await authService.isIpBlocked(ipAddress)) {
      return res.status(429).json({ 
        message: 'Too many failed attempts. Please try again later.' 
      });
    }

    const user = await authService.handleGoogleAuth(code, ipAddress, userAgent);
    const { accessToken, refreshToken } = authService.generateTokens(
      user, 
      userAgent, 
      ipAddress
    );

    await user.save();

    res.json({
      success: true,
      user,
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Facebook OAuth callback
router.post('/callback/facebook', async (req, res, next) => {
  try {
    const { code } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.get('User-Agent');

    if (await authService.isIpBlocked(ipAddress)) {
      return res.status(429).json({ 
        message: 'Too many failed attempts. Please try again later.' 
      });
    }

    const user = await authService.handleFacebookAuth(code, ipAddress, userAgent);
    const { accessToken, refreshToken } = authService.generateTokens(
      user, 
      userAgent, 
      ipAddress
    );

    await user.save();

    res.json({
      success: true,
      user,
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Local registration
router.post('/register',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    body('name').trim().isLength({ min: 2, max: 50 }),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      const user = await authService.register(req.body, ipAddress, userAgent);
      const { accessToken, refreshToken } = authService.generateTokens(
        user, 
        userAgent, 
        ipAddress
      );

      await user.save();

      res.status(201).json({
        success: true,
        user,
        tokens: {
          access: accessToken,
          refresh: refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
});

// Local login
router.post('/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');

      if (await authService.isIpBlocked(ipAddress)) {
        return res.status(429).json({ 
          message: 'Too many failed attempts. Please try again later.' 
        });
      }

      const user = await authService.login(email, password, ipAddress, userAgent);
      const { accessToken, refreshToken } = authService.generateTokens(
        user, 
        userAgent, 
        ipAddress
      );

      await user.save();

      res.json({
        success: true,
        user,
        tokens: {
          access: accessToken,
          refresh: refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
});

// Refresh token
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const userId = req.userId; // From auth middleware

    const user = await authService.verifyRefreshToken(refreshToken, userId);
    const { accessToken, refreshToken: newRefreshToken } = authService.generateTokens(
      user,
      req.get('User-Agent'),
      req.ip
    );

    // Remove old refresh token
    await authService.removeRefreshToken(userId, refreshToken);
    
    // Add new refresh token
    user.refreshTokens.push({
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      deviceInfo: req.get('User-Agent'),
      ipAddress: req.ip,
    });
    await user.save();

    res.json({
      success: true,
      tokens: {
        access: accessToken,
        refresh: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post('/logout', authenticate, async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.removeRefreshToken(req.user._id, refreshToken);
    
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
});

// Logout from all devices
router.post('/logout-all', authenticate, async (req, res, next) => {
  try {
    req.user.refreshTokens = [];
    await req.user.save();
    
    res.json({ success: true, message: 'Logged out from all devices' });
  } catch (error) {
    next(error);
  }
});

// Request password reset
router.post('/forgot-password',
  authLimiter,
  [body('email').isEmail().normalizeEmail()],
  validateRequest,
  async (req, res, next) => {
    try {
      await authService.initiatePasswordReset(req.body.email);
      res.json({ 
        success: true, 
        message: 'If an account exists with this email, you will receive a password reset link.' 
      });
    } catch (error) {
      next(error);
    }
});

// Reset password
router.post('/reset-password/:token',
  [
    body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      await authService.resetPassword(req.params.token, req.body.password);
      res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
      next(error);
    }
});

// Verify email
router.get('/verify-email/:token', async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
});

// طلب رمز تحقق عبر SMS
router.post('/request-verification',
  authenticate,
  [
    body('phoneNumber').matches(/^\+?[0-9]{10,15}$/).withMessage('رقم هاتف غير صالح')
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { phoneNumber } = req.body;
      
      // التحقق من صحة الرقم
      const validation = await twilioService.validatePhoneNumber(phoneNumber);
      if (!validation.valid) {
        return res.status(400).json({ 
          success: false, 
          message: 'رقم هاتف غير صالح' 
        });
      }

      // إرسال رمز التحقق
      const result = await twilioService.sendVerificationSMS(phoneNumber);
      
      // تحديث المستخدم برقم الهاتف
      req.user.phoneNumber = phoneNumber;
      await req.user.save();

      res.json({
        success: true,
        message: 'تم إرسال رمز التحقق',
        status: result.status
      });
    } catch (error) {
      next(error);
    }
});

// التحقق من الرمز
router.post('/verify-phone',
  authenticate,
  [
    body('code').isLength({ min: 6, max: 6 }).isNumeric()
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { code } = req.body;
      
      if (!req.user.phoneNumber) {
        return res.status(400).json({ 
          success: false, 
          message: 'لم يتم طلب رمز تحقق بعد' 
        });
      }

      const result = await twilioService.verifyCode(
        req.user.phoneNumber, 
        code
      );

      if (result.success) {
        req.user.isPhoneVerified = true;
        await req.user.save();
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
});

// إعداد المصادقة الثنائية
router.post('/2fa/setup',
  authenticate,
  async (req, res, next) => {
    try {
      const result = await twilioService.setupTwoFactor(
        req.user._id,
        req.user.email
      );
      
      res.json(result);
    } catch (error) {
      next(error);
    }
});

// تفعيل المصادقة الثنائية
router.post('/2fa/enable',
  authenticate,
  [
    body('token').isLength({ min: 6, max: 6 }).isNumeric()
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { token } = req.body;
      
      const result = await twilioService.enableTwoFactor(
        req.user._id,
        token
      );
      
      res.json(result);
    } catch (error) {
      next(error);
    }
});

// التحقق من المصادقة الثنائية أثناء تسجيل الدخول
router.post('/2fa/verify',
  [
    body('userId').isMongoId(),
    body('token').isLength({ min: 6, max: 6 }).isNumeric()
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { userId, token } = req.body;
      
      const user = await User.findById(userId).select('+twoFactorSecret');
      if (!user || !user.twoFactorSecret) {
        return res.status(400).json({ 
          success: false, 
          message: 'المصادقة الثنائية غير مفعلة' 
        });
      }

      const result = twilioService.verifyTwoFactorToken(
        user.twoFactorSecret,
        token
      );

      if (result.success) {
        // إنشاء توكن دخول كامل
        const { accessToken, refreshToken } = authService.generateTokens(
          user,
          req.get('User-Agent'),
          req.ip
        );

        user.refreshTokens.push({
          token: refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          deviceInfo: req.get('User-Agent'),
          ipAddress: req.ip,
        });
        await user.save();

        return res.json({
          success: true,
          user: user.toJSON(),
          tokens: { access: accessToken, refresh: refreshToken }
        });
      }

      res.status(401).json(result);
    } catch (error) {
      next(error);
    }
});

// Webhook لاستقبال تحديثات حالة الرسائل من Twilio
router.post('/webhooks/sms-status', (req, res) => {
  const { MessageStatus, MessageSid, To } = req.body;
  
  logger.info('SMS Status Update:', {
    sid: MessageSid,
    to: To,
    status: MessageStatus
  });
  
  // يمكنك تخزين الحالة في قاعدة البيانات
  // await MessageLog.updateOne({ sid: MessageSid }, { status: MessageStatus })
  
  res.sendStatus(200);
});

export default router;
