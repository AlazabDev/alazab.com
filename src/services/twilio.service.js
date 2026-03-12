import twilio from 'twilio';
import crypto from 'crypto';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { redisClient } from '../config/redis.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger();

class TwilioService {
  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;
    
    this.client = twilio(this.accountSid, this.authToken);
  }

  /**
   * إرسال رمز تحقق عبر SMS (باستخدام Twilio Verify)
   */
  async sendVerificationSMS(phoneNumber, channel = 'sms') {
    try {
      // تنسيق رقم الهاتف (إزالة المسافات وإضافة رمز البلد إذا لزم)
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      
      const verification = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .verifications.create({
          to: formattedNumber,
          channel: channel, // 'sms' أو 'call'
          // رسالة مخصصة
          customMessage: 'رمز التحقق الخاص بك لـ Alazab',
          // تحديد طول الرمز
          codeLength: 6,
        });

      logger.info(`Verification sent to ${formattedNumber}`, {
        status: verification.status,
        sid: verification.sid
      });

      return {
        success: true,
        status: verification.status,
        sid: verification.sid
      };
    } catch (error) {
      logger.error('Twilio verification error:', error);
      throw new Error(`فشل إرسال رمز التحقق: ${error.message}`);
    }
  }

  /**
   * التحقق من الرمز المرسل
   */
  async verifyCode(phoneNumber, code) {
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      
      const verificationCheck = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .verificationChecks.create({
          to: formattedNumber,
          code: code
        });

      logger.info(`Verification check for ${formattedNumber}:`, {
        status: verificationCheck.status,
        valid: verificationCheck.valid
      });

      return {
        success: verificationCheck.valid,
        status: verificationCheck.status,
        message: verificationCheck.valid ? 'تم التحقق بنجاح' : 'رمز غير صحيح'
      };
    } catch (error) {
      logger.error('Twilio verification check error:', error);
      throw new Error(`فشل التحقق من الرمز: ${error.message}`);
    }
  }

  /**
   * إرسال رسالة SMS مباشرة
   */
  async sendSMS(to, body) {
    try {
      const formattedNumber = this.formatPhoneNumber(to);
      
      const message = await this.client.messages.create({
        body: body,
        from: this.phoneNumber,
        to: formattedNumber,
        // تتبع حالة الرسالة
        statusCallback: `${process.env.API_URL}/webhooks/sms-status`
      });

      logger.info(`SMS sent to ${formattedNumber}:`, {
        sid: message.sid,
        status: message.status
      });

      return {
        success: true,
        sid: message.sid,
        status: message.status
      };
    } catch (error) {
      logger.error('Twilio SMS error:', error);
      throw new Error(`فشل إرسال الرسالة: ${error.message}`);
    }
  }

  /**
   * إنشاء وإرسال رمز تحقق مؤقت (OTP) يدوي
   */
  async generateAndSendOTP(phoneNumber) {
    try {
      // إنشاء رمز عشوائي من 6 أرقام
      const otp = crypto.randomInt(100000, 999999).toString();
      const expiryTime = 10 * 60; // 10 دقائق بالثواني
      
      // تخزين الرمز في Redis مع وقت انتهاء
      const key = `otp:${phoneNumber}`;
      await redisClient.setex(key, expiryTime, otp);
      
      // إرسال الرمز عبر SMS
      await this.sendSMS(
        phoneNumber,
        `🔐 رمز التحقق الخاص بك لـ Alazab هو: ${otp}\nهذا الرمز صالح لمدة 10 دقائق.`
      );

      return {
        success: true,
        message: 'تم إرسال رمز التحقق'
      };
    } catch (error) {
      logger.error('OTP generation error:', error);
      throw error;
    }
  }

  /**
   * التحقق من OTP المخزن في Redis
   */
  async verifyOTP(phoneNumber, userOtp) {
    try {
      const key = `otp:${phoneNumber}`;
      const storedOtp = await redisClient.get(key);
      
      if (!storedOtp) {
        return {
          success: false,
          message: 'انتهت صلاحية الرمز أو لم يتم طلبه'
        };
      }

      if (storedOtp !== userOtp) {
        return {
          success: false,
          message: 'رمز غير صحيح'
        };
      }

      // حذف الرمز بعد الاستخدام
      await redisClient.del(key);

      return {
        success: true,
        message: 'تم التحقق بنجاح'
      };
    } catch (error) {
      logger.error('OTP verification error:', error);
      throw error;
    }
  }

  /**
   * إعداد المصادقة الثنائية (2FA) باستخدام Google Authenticator
   */
  async setupTwoFactor(userId, userEmail) {
    try {
      // إنشاء سر جديد للمستخدم
      const secret = speakeasy.generateSecret({
        name: `Alazab:${userEmail}`
      });

      // تخزين السر مؤقتاً حتى التأكيد
      const tempKey = `2fa_temp:${userId}`;
      await redisClient.setex(tempKey, 300, secret.base32); // 5 دقائق

      // إنشاء QR code
      const qrCode = await QRCode.toDataURL(secret.otpauth_url);

      return {
        success: true,
        secret: secret.base32,
        qrCode: qrCode,
        message: 'امسح QR code باستخدام Google Authenticator'
      };
    } catch (error) {
      logger.error('2FA setup error:', error);
      throw error;
    }
  }

  /**
   * تفعيل المصادقة الثنائية بعد التحقق
   */
  async enableTwoFactor(userId, userToken) {
    try {
      const tempKey = `2fa_temp:${userId}`;
      const secret = await redisClient.get(tempKey);

      if (!secret) {
        throw new Error('انتهت صلاحية الطلب، يرجى المحاولة مرة أخرى');
      }

      // التحقق من صحة الرمز
      const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: userToken,
        window: 1 // السماح بفارق رمز واحد (30 ثانية)
      });

      if (!verified) {
        return {
          success: false,
          message: 'رمز غير صحيح'
        };
      }

      // هنا يتم حفظ secret في قاعدة بيانات المستخدم
      // User.findByIdAndUpdate(userId, { twoFactorSecret: secret, isTwoFactorEnabled: true })

      await redisClient.del(tempKey);

      return {
        success: true,
        message: 'تم تفعيل المصادقة الثنائية بنجاح'
      };
    } catch (error) {
      logger.error('2FA enable error:', error);
      throw error;
    }
  }

  /**
   * التحقق من رمز المصادقة الثنائية
   */
  verifyTwoFactorToken(secret, token) {
    try {
      const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1
      });

      return {
        success: verified,
        message: verified ? 'تم التحقق' : 'رمز غير صحيح'
      };
    } catch (error) {
      logger.error('2FA verification error:', error);
      return {
        success: false,
        message: 'خطأ في التحقق'
      };
    }
  }

  /**
   * تنسيق رقم الهاتف (إضافة رمز البلد إذا لزم)
   */
  formatPhoneNumber(phoneNumber) {
    // إزالة جميع المسافات والرموز غير الرقمية
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // إذا كان الرقم يبدأ بـ 0، استبدله برمز البلد (افتراضي: 966 للسعودية)
    if (cleaned.startsWith('0')) {
      cleaned = '966' + cleaned.substring(1);
    }
    
    // إذا كان الرقم بدون رمز بلد، أضف رمز البلد الافتراضي
    if (cleaned.length <= 9) {
      cleaned = '966' + cleaned;
    }
    
    // أضف + في البداية
    return '+' + cleaned;
  }

  /**
   * التحقق من صحة رقم الهاتف
   */
  async validatePhoneNumber(phoneNumber) {
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      
      const lookup = await this.client.lookups.v2
        .phoneNumbers(formattedNumber)
        .fetch({
          fields: 'line_type_intelligence,caller_name'
        });

      return {
        valid: true,
        countryCode: lookup.countryCode,
        nationalFormat: lookup.nationalFormat,
        phoneNumber: lookup.phoneNumber,
        lineType: lookup.lineTypeIntelligence?.type || 'unknown',
        carrier: lookup.lineTypeIntelligence?.carrier_name || 'unknown'
      };
    } catch (error) {
      logger.error('Phone validation error:', error);
      return {
        valid: false,
        message: 'رقم هاتف غير صالح'
      };
    }
  }
}

export default new TwilioService();
