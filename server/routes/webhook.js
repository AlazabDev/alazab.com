const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../db');

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '';
const APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';

// In-memory stores
const rateLimiter = new Map();
const processedIds = new Map();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60000;
const DEDUP_TTL = 300000;

// ──── Webhook event store (in-memory for frontend monitoring) ────
const webhookEvents = [];
const MAX_EVENTS = 500;

function storeEvent(event) {
  webhookEvents.unshift(event);
  if (webhookEvents.length > MAX_EVENTS) webhookEvents.pop();
}

// ──── Helpers ────
function isRateLimited(phone) {
  const now = Date.now();
  const entry = rateLimiter.get(phone);
  if (!entry || now > entry.resetAt) {
    rateLimiter.set(phone, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function isDuplicate(messageId) {
  const now = Date.now();
  if (processedIds.size > 5000) {
    for (const [id, ts] of processedIds) {
      if (now - ts > DEDUP_TTL) processedIds.delete(id);
    }
  }
  if (processedIds.has(messageId)) return true;
  processedIds.set(messageId, now);
  return false;
}

function verifySignature(rawBody, signature) {
  if (!APP_SECRET || !signature) return !APP_SECRET;
  const expected = signature.replace('sha256=', '');
  const hash = crypto.createHmac('sha256', APP_SECRET).update(rawBody).digest('hex');
  return hash === expected;
}

function extractContent(message) {
  let content = '', mediaUrl = null, mediaMime = null;
  switch (message.type) {
    case 'text': content = message.text?.body || ''; break;
    case 'image': content = message.image?.caption || '[صورة]'; mediaUrl = message.image?.id; mediaMime = message.image?.mime_type; break;
    case 'document': content = message.document?.caption || `[مستند: ${message.document?.filename || ''}]`; mediaUrl = message.document?.id; mediaMime = message.document?.mime_type; break;
    case 'audio': content = '[رسالة صوتية]'; mediaUrl = message.audio?.id; mediaMime = message.audio?.mime_type; break;
    case 'video': content = message.video?.caption || '[فيديو]'; mediaUrl = message.video?.id; mediaMime = message.video?.mime_type; break;
    case 'sticker': content = '[ملصق]'; mediaUrl = message.sticker?.id; mediaMime = message.sticker?.mime_type; break;
    case 'location': content = `[موقع: ${message.location?.latitude}, ${message.location?.longitude}]`; break;
    case 'contacts': content = `[جهة اتصال: ${message.contacts?.[0]?.name?.formatted_name || ''}]`; break;
    case 'interactive': content = message.interactive?.button_reply?.title || message.interactive?.list_reply?.title || '[رد تفاعلي]'; break;
    case 'reaction': content = `[تفاعل: ${message.reaction?.emoji || ''}]`; break;
    default: content = `[${message.type || 'غير معروف'}]`;
  }
  return { content, mediaUrl, mediaMime };
}

// ──── Raw body parser for webhook routes ────
router.use(express.raw({ type: 'application/json', limit: '5mb' }));

// ──── GET /api/webhook/whatsapp — Verification ────
router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ WhatsApp webhook verified');
    return res.status(200).send(challenge);
  }

  console.warn('❌ Webhook verification failed');
  res.sendStatus(403);
});

// ──── POST /api/webhook/whatsapp — Incoming events ────
router.post('/whatsapp', async (req, res) => {
  const rawBody = typeof req.body === 'string' ? req.body : req.body.toString('utf8');

  // Verify signature
  if (!verifySignature(rawBody, req.headers['x-hub-signature-256'])) {
    console.error('❌ Invalid webhook signature');
    storeEvent({ type: 'error', error: 'Invalid signature', timestamp: new Date().toISOString() });
    return res.status(401).send('Invalid signature');
  }

  let body;
  try { body = JSON.parse(rawBody); } catch {
    return res.status(400).send('Bad Request');
  }

  // Always 200 to Meta
  res.sendStatus(200);

  // Process async
  try {
    if (body.object !== 'whatsapp_business_account') return;

    const result = { messagesProcessed: 0, statusesProcessed: 0, errors: 0 };
    const entries = body.entry || [];

    for (const entry of entries) {
      for (const change of (entry.changes || [])) {
        if (change.field !== 'messages') continue;

        const value = change.value;
        const metadata = value.metadata || {};
        const messages = value.messages || [];
        const statuses = value.statuses || [];
        const contacts = value.contacts || [];

        // Handle messages
        for (const message of messages) {
          if (isDuplicate(message.id)) continue;
          if (isRateLimited(message.from)) continue;

          const contactName = contacts.find(c => c.wa_id === message.from)?.profile?.name || null;
          const { content, mediaUrl, mediaMime } = extractContent(message);

          const event = {
            type: 'message',
            id: message.id,
            from: message.from,
            customerName: contactName,
            direction: 'inbound',
            messageType: message.type,
            content,
            mediaUrl,
            mediaMime,
            phoneNumberId: metadata.phone_number_id,
            timestamp: new Date().toISOString(),
            status: 'received',
          };

          storeEvent(event);

          // Store in DB
          try {
            await pool.query(
              `INSERT INTO messages (wa_message_id, phone_number, customer_name, direction, message_type, content, media_url, media_mime_type, status, phone_number_id)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (wa_message_id) DO NOTHING`,
              [message.id, message.from, contactName, 'inbound', message.type, content, mediaUrl, mediaMime, 'received', metadata.phone_number_id]
            );
            result.messagesProcessed++;
          } catch (err) {
            console.error('DB insert error:', err.message);
            result.errors++;
          }
        }

        // Handle statuses
        for (const status of statuses) {
          if (!status.id) continue;
          const statusEvent = {
            type: 'status',
            messageId: status.id,
            status: status.status,
            recipientId: status.recipient_id,
            timestamp: new Date().toISOString(),
            errors: status.errors || null,
          };
          storeEvent(statusEvent);

          try {
            await pool.query('UPDATE messages SET status = $1 WHERE wa_message_id = $2', [status.status, status.id]);
            result.statusesProcessed++;
          } catch { result.errors++; }
        }

        // Handle errors from Meta
        for (const err of (value.errors || [])) {
          storeEvent({ type: 'error', error: err, timestamp: new Date().toISOString() });
          result.errors++;
        }
      }
    }

    console.log(`✅ Webhook: ${result.messagesProcessed} msgs, ${result.statusesProcessed} statuses, ${result.errors} errors`);
  } catch (err) {
    console.error('❌ Webhook processing error:', err);
    storeEvent({ type: 'error', error: err.message, timestamp: new Date().toISOString() });
  }
});

// ──── GET /api/webhook/events — Frontend monitoring endpoint ────
router.get('/events', (req, res) => {
  const { type, limit = 100, since } = req.query;
  let events = webhookEvents;

  if (type) events = events.filter(e => e.type === type);
  if (since) events = events.filter(e => new Date(e.timestamp) > new Date(since));

  res.json({
    total: events.length,
    events: events.slice(0, parseInt(limit)),
    stats: {
      total: webhookEvents.length,
      messages: webhookEvents.filter(e => e.type === 'message').length,
      statuses: webhookEvents.filter(e => e.type === 'status').length,
      errors: webhookEvents.filter(e => e.type === 'error').length,
    },
  });
});

// ──── GET /api/webhook/config — Webhook config ────
router.get('/config', (req, res) => {
  res.json({
    whatsapp: {
      verifyToken: VERIFY_TOKEN ? '***configured***' : 'NOT SET',
      appSecret: APP_SECRET ? '***configured***' : 'NOT SET',
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN ? '***configured***' : 'NOT SET',
      webhookUrl: `${process.env.FRONTEND_URL || 'https://alazab.com'}/api/webhook/whatsapp`,
    },
  });
});

// ──── POST /api/webhook/test — Test webhook ────
router.post('/test', express.json(), (req, res) => {
  storeEvent({
    type: 'test',
    payload: req.body,
    timestamp: new Date().toISOString(),
  });
  res.json({ success: true, message: 'Test event stored' });
});

// ──── DELETE /api/webhook/events — Clear events ────
router.delete('/events', (req, res) => {
  webhookEvents.length = 0;
  res.json({ success: true, message: 'Events cleared' });
});

module.exports = router;
