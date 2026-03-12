// ... الكود السابق ...

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
