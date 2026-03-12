import express from 'express';
import crypto from 'crypto';
import { createLogger } from '../utils/logger.js';
import User from '../models/User.model.js';
import { redisClient } from '../config/redis.js';

const router = express.Router();
const logger = createLogger('TwilioWebhook');

// التحقق من صحة الطلب من Twilio
const validateTwilioRequest = (req, res, next) => {
  try {
    // تخطي التحقق في بيئة التطوير
    if (process.env.NODE_ENV === 'development') {
      return next();
    }

    const twilioSignature = req.headers['x-twilio-signature'];
    const url = `${process.env.API_URL}${req.originalUrl}`;
    const params = req.body;
    
    // إنشاء التوقيع المتوقع
    const expectedSignature = crypto
      .createHmac('sha1', process.env.TWILIO_AUTH_TOKEN)
      .update(Buffer.from(url + Object.keys(params).sort().map(key => params[key]).join(''), 'utf8'))
      .digest('base64');

    if (twilioSignature !== expectedSignature) {
      logger.warn('Invalid Twilio signature', {
        ip: req.ip,
        url: url
      });
      return res.status(403).json({ error: 'Invalid signature' });
    }

    next();
  } catch (error) {
    logger.error('Error validating Twilio request:', error);
    res.status(500).json({ error: 'Validation error' });
  }
};

// تطبيق middleware التحقق على جميع مسارات الويب هوك
router.use(validateTwilioRequest);

/**
 * webhook لاستقبال تحديثات حالة الرسائل SMS
 * المسار: POST /webhooks/twilio/sms-status
 */
router.post('/sms-status', async (req, res) => {
  try {
    const {
      MessageSid,
      MessageStatus,
      To,
      From,
      Body,
      ErrorCode,
      ErrorMessage,
      NumSegments,
      Price,
      PriceUnit,
      StatusCallback,
      AccountSid
    } = req.body;

    // تسجيل المعلومات الأساسية
    logger.info('SMS Status Update Received:', {
      messageSid: MessageSid,
      status: MessageStatus,
      to: To,
      from: From,
      errorCode: ErrorCode,
      price: Price ? `${Price} ${PriceUnit}` : null
    });

    // تخزين الحالة في Redis للتتبع السريع
    const messageKey = `sms:${MessageSid}`;
    await redisClient.hset(messageKey, {
      status: MessageStatus,
      to: To,
      timestamp: new Date().toISOString(),
      errorCode: ErrorCode || '',
      errorMessage: ErrorMessage || '',
      price: Price || '0',
      priceUnit: PriceUnit || 'USD'
    });
    await redisClient.expire(messageKey, 60 * 60 * 24 * 7); // 7 أيام

    // إذا كان هناك خطأ، سجله بشكل منفصل
    if (ErrorCode) {
      logger.error('SMS Delivery Error:', {
        messageSid: MessageSid,
        errorCode: ErrorCode,
        errorMessage: ErrorMessage,
        to: To
      });

      // تخزين الخطأ في Redis للمراقبة
      const errorKey = `sms_errors:${Date.now()}`;
      await redisClient.hset(errorKey, {
        messageSid: MessageSid,
        errorCode: ErrorCode,
        errorMessage: ErrorMessage,
        to: To,
        timestamp: new Date().toISOString()
      });
      await redisClient.expire(errorKey, 60 * 60 * 24 * 30); // 30 يوم
    }

    // تحديث حالة الرسالة في قاعدة البيانات إذا كنا نخزنها
    // await SMSLog.findOneAndUpdate(
    //   { sid: MessageSid },
    //   { 
    //     status: MessageStatus,
    //     errorCode: ErrorCode,
    //     errorMessage: ErrorMessage,
    //     price: Price,
    //     updatedAt: new Date()
    //   }
    // );

    // إرسال إشعار إذا كانت الرسالة مهمة (مثل رموز التحقق)
    if (MessageStatus === 'delivered' || MessageStatus === 'sent') {
      // يمكن إرسال إشعار للمستخدم أن الرسالة وصلت
      logger.info(`Message ${MessageSid} delivered successfully to ${To}`);
    }

    // Twilio يتوقع رد 200 خلال 15 ثانية
    res.status(200).send(`
      <Response>
        <Message>Status received</Message>
      </Response>
    `);

  } catch (error) {
    logger.error('Error processing SMS status webhook:', error);
    res.status(500).send(`
      <Response>
        <Message>Error processing status</Message>
      </Response>
    `);
  }
});

/**
 * webhook لاستقبال الرسائل الواردة (SMS)
 * المسار: POST /webhooks/twilio/incoming-sms
 */
router.post('/incoming-sms', async (req, res) => {
  try {
    const {
      MessageSid,
      From,
      To,
      Body,
      NumMedia,
      AccountSid,
      SmsStatus,
      SmsSid
    } = req.body;

    logger.info('Incoming SMS Received:', {
      from: From,
      to: To,
      body: Body,
      messageSid: MessageSid,
      numMedia: NumMedia
    });

    // تخزين الرسالة الواردة
    const incomingKey = `incoming:${MessageSid}`;
    await redisClient.hset(incomingKey, {
      from: From,
      to: To,
      body: Body,
      receivedAt: new Date().toISOString(),
      numMedia: NumMedia || '0'
    });

    // التحقق مما إذا كان هذا رد على رسالة تحقق
    const verificationKey = `pending_verification:${From}`;
    const pendingVerification = await redisClient.get(verificationKey);

    if (pendingVerification) {
      // هذا رد على طلب تحقق
      logger.info(`Received verification response from ${From}`);
      
      // معالجة الرد (مثل كلمة STOP)
      if (Body.trim().toUpperCase() === 'STOP') {
        // المستخدم يريد إيقاف الرسائل
        await User.findOneAndUpdate(
          { phoneNumber: From },
          { 
            'settings.notifications': false,
            smsOptOut: true 
          }
        );
        
        logger.info(`User ${From} opted out of SMS`);
      }
    }

    // الرد على الرسالة (اختياري)
    // يمكن إرسال رد تلقائي
    res.status(200).send(`
      <Response>
        <Message>تم استلام رسالتك، شكراً لتواصلك مع Alazab</Message>
      </Response>
    `);

  } catch (error) {
    logger.error('Error processing incoming SMS:', error);
    res.status(500).send(`
      <Response>
        <Message>Error processing message</Message>
      </Response>
    `);
  }
});

/**
 * webhook لاستقبال تحديثات حالة المكالمات
 * المسار: POST /webhooks/twilio/call-status
 */
router.post('/call-status', async (req, res) => {
  try {
    const {
      CallSid,
      CallStatus,
      Called,
      Caller,
      Direction,
      Duration,
      RecordingUrl,
      Timestamp
    } = req.body;

    logger.info('Call Status Update:', {
      callSid: CallSid,
      status: CallStatus,
      from: Caller,
      to: Called,
      direction: Direction,
      duration: Duration
    });

    // تخزين حالة المكالمة
    const callKey = `call:${CallSid}`;
    await redisClient.hset(callKey, {
      status: CallStatus,
      from: Caller,
      to: Called,
      duration: Duration || '0',
      timestamp: new Date().toISOString()
    });

    // معالجة حالات المكالمات المختلفة
    switch (CallStatus) {
      case 'completed':
        logger.info(`Call ${CallSid} completed, duration: ${Duration} seconds`);
        break;
        
      case 'busy':
      case 'failed':
      case 'no-answer':
        logger.warn(`Call ${CallSid} ${CallStatus}`);
        break;
        
      case 'in-progress':
        logger.info(`Call ${CallSid} is in progress`);
        break;
    }

    res.status(200).send(`
      <Response>
        <Say>Status received</Say>
      </Response>
    `);

  } catch (error) {
    logger.error('Error processing call status webhook:', error);
    res.status(500).send(`
      <Response>
        <Say>Error processing status</Say>
      </Response>
    `);
  }
});

/**
 * webhook لاستقبال تحديثات Verify Service
 * المسار: POST /webhooks/twilio/verify-status
 */
router.post('/verify-status', async (req, res) => {
  try {
    const {
      EventType,
      ServiceSid,
      VerificationSid,
      To,
      Channel,
      Status,
      DateCreated,
      'custom_fields[userId]': userId
    } = req.body;

    logger.info('Verification Status Update:', {
      eventType: EventType,
      verificationSid: VerificationSid,
      to: To,
      channel: Channel,
      status: Status
    });

    // تخزين حالة التحقق
    const verifyKey = `verify:${VerificationSid}`;
    await redisClient.hset(verifyKey, {
      status: Status,
      to: To,
      channel: Channel,
      eventType: EventType,
      timestamp: new Date().toISOString()
    });

    // إذا كان التحقق ناجحاً
    if (Status === 'approved' && userId) {
      await User.findByIdAndUpdate(userId, {
        isPhoneVerified: true,
        phoneNumber: To
      });
      
      logger.info(`Phone number ${To} verified for user ${userId}`);
    }

    // إذا فشل التحقق عدة مرات
    if (Status === 'failed') {
      const failKey = `verify_failures:${To}`;
      const failCount = await redisClient.incr(failKey);
      await redisClient.expire(failKey, 60 * 60); // ساعة واحدة

      if (failCount >= 5) {
        logger.warn(`Too many verification failures for ${To}`);
        // قفل المحاولات لمدة ساعة
        await redisClient.setex(`verify_locked:${To}`, 3600, 'locked');
      }
    }

    res.sendStatus(200);

  } catch (error) {
    logger.error('Error processing verify webhook:', error);
    res.sendStatus(500);
  }
});

/**
 * webhook لاستقبال أخطاء Twilio العامة
 * المسار: POST /webhooks/twilio/error
 */
router.post('/error', async (req, res) => {
  try {
    const errorData = req.body;

    logger.error('Twilio Error Webhook:', {
      errorCode: errorData.ErrorCode,
      errorMessage: errorData.ErrorMessage,
      moreInfo: errorData.MoreInfo,
      timestamp: new Date().toISOString()
    });

    // تخزين الخطأ للمراجعة
    const errorKey = `twilio_errors:${Date.now()}`;
    await redisClient.hset(errorKey, {
      ...errorData,
      receivedAt: new Date().toISOString()
    });
    await redisClient.expire(errorKey, 60 * 60 * 24 * 30); // 30 يوم

    // إرسال تنبيه للأخطاء الحرجة
    if ([30007, 30008, 30009, 30010].includes(parseInt(errorData.ErrorCode))) {
      // أخطاء حرجة تستدعي تنبيهاً فورياً
      logger.error('Critical Twilio Error:', errorData);
      
      // إرسال إشعار للمشرفين
      // await sendAdminAlert('Twilio Critical Error', errorData);
    }

    res.sendStatus(200);

  } catch (error) {
    logger.error('Error processing error webhook:', error);
    res.sendStatus(500);
  }
});

/**
 * Endpoint للتحقق من صحة الـ webhook (لأغراض الاختبار)
 * المسار: GET /webhooks/twilio/test
 */
router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Twilio webhook endpoint is working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

/**
 * Endpoint لعرض إحصائيات الـ webhook
 * المسار: GET /webhooks/twilio/stats
 */
router.get('/stats', async (req, res) => {
  try {
    // الحصول على آخر 10 رسائل SMS
    const smsKeys = await redisClient.keys('sms:*');
    const recentSms = [];
    
    for (const key of smsKeys.slice(-10)) {
      const data = await redisClient.hgetall(key);
      recentSms.push({
        sid: key.replace('sms:', ''),
        ...data
      });
    }

    // الحصول على آخر 10 أخطاء
    const errorKeys = await redisClient.keys('twilio_errors:*');
    const recentErrors = [];
    
    for (const key of errorKeys.slice(-10)) {
      const data = await redisClient.hgetall(key);
      recentErrors.push({
        id: key,
        ...data
      });
    }

    res.json({
      success: true,
      stats: {
        totalSmsTracked: smsKeys.length,
        totalErrorsTracked: errorKeys.length,
        recentSms: recentSms.reverse(),
        recentErrors: recentErrors.reverse()
      }
    });

  } catch (error) {
    logger.error('Error fetching webhook stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
