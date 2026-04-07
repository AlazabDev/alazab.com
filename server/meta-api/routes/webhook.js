const express = require('express');
const crypto = require('crypto');
const { pool } = require('../db');
const router = express.Router();

// In-memory dedup + rate limit
const processedIds = new Map();
const rateLimiter = new Map();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60000;
const DEDUP_TTL = 300000;

function isDuplicate(id) {
  const now = Date.now();
  if (processedIds.size > 5000) {
    for (const [k, v] of processedIds) { if (now - v > DEDUP_TTL) processedIds.delete(k); }
  }
  if (processedIds.has(id)) return true;
  processedIds.set(id, now);
  return false;
}

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

function verifySignature(rawBody, signature, secret) {
  if (!secret || !signature) return !secret;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return signature.replace('sha256=', '') === expected;
}

function extractContent(message) {
  let content = '', mediaUrl = null, mediaMime = null;
  switch (message.type) {
    case 'text': content = message.text?.body || ''; break;
    case 'image': content = message.image?.caption || '[صورة]'; mediaUrl = message.image?.id; mediaMime = message.image?.mime_type || 'image/jpeg'; break;
    case 'document': content = message.document?.caption || `[مستند: ${message.document?.filename || ''}]`; mediaUrl = message.document?.id; mediaMime = message.document?.mime_type; break;
    case 'audio': content = '[رسالة صوتية]'; mediaUrl = message.audio?.id; mediaMime = message.audio?.mime_type || 'audio/ogg'; break;
    case 'video': content = message.video?.caption || '[فيديو]'; mediaUrl = message.video?.id; mediaMime = message.video?.mime_type || 'video/mp4'; break;
    case 'location': content = `[موقع: ${message.location?.latitude}, ${message.location?.longitude}]`; break;
    case 'contacts': content = `[جهة اتصال: ${message.contacts?.[0]?.name?.formatted_name || ''}]`; break;
    case 'reaction': content = `[تفاعل: ${message.reaction?.emoji || ''}]`; break;
    default: content = `[${message.type || 'غير معروف'}]`;
  }
  return { content, mediaUrl, mediaMime };
}

// GET: Webhook verification
router.get('/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  try {
    const { rows } = await pool.query('SELECT verify_token FROM meta_accounts WHERE id = $1', [accountId]);
    if (!rows.length) return res.status(404).send('Account not found');

    if (mode === 'subscribe' && token === rows[0].verify_token) {
      console.log(`✅ Webhook verified for account ${accountId}`);
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  } catch (err) {
    console.error('Verification error:', err.message);
    return res.status(500).send('Error');
  }
});

// POST: Incoming events
router.post('/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const rawBody = req.rawBody;

  try {
    // Get account config
    const { rows: accounts } = await pool.query('SELECT * FROM meta_accounts WHERE id = $1', [accountId]);
    if (!accounts.length) {
      console.warn(`Account ${accountId} not found`);
      return res.status(200).json({ success: false, error: 'Account not found' });
    }
    const account = accounts[0];

    // Verify signature
    if (account.app_secret) {
      const sig = req.headers['x-hub-signature-256'];
      if (!verifySignature(rawBody, sig, account.app_secret)) {
        console.error(`❌ Invalid signature for account ${accountId}`);
        return res.status(200).json({ success: false, error: 'Invalid signature' });
      }
    }

    const body = req.body;
    if (body.object !== 'whatsapp_business_account') {
      return res.status(200).json({ success: true, skipped: true });
    }

    // Store raw event
    const eventHash = crypto.createHash('sha256').update(rawBody).digest('hex').slice(0, 64);
    await pool.query(
      'INSERT INTO meta_webhook_events (account_id, source, event_type, payload, event_hash) VALUES ($1, $2, $3, $4, $5)',
      [accountId, 'whatsapp', body.object, JSON.stringify(body), eventHash]
    );

    let messagesProcessed = 0, statusesProcessed = 0;

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== 'messages') continue;
        const value = change.value;
        const contacts = value.contacts || [];

        // Messages
        for (const message of value.messages || []) {
          if (isDuplicate(message.id)) continue;
          if (isRateLimited(message.from)) continue;

          const contactName = contacts.find(c => c.wa_id === message.from)?.profile?.name || null;
          const { content, mediaUrl, mediaMime } = extractContent(message);

          try {
            await pool.query(
              `INSERT INTO meta_messages (account_id, wa_message_id, phone_number, customer_name, direction, message_type, content, media_url, media_mime_type, status)
               VALUES ($1, $2, $3, $4, 'inbound', $5, $6, $7, $8, 'received')
               ON CONFLICT (wa_message_id) DO NOTHING`,
              [accountId, message.id, message.from, contactName, message.type, content, mediaUrl, mediaMime]
            );
            messagesProcessed++;
          } catch (err) {
            console.error('Insert error:', err.message);
          }
        }

        // Status updates
        for (const status of value.statuses || []) {
          if (!status.id) continue;
          try {
            await pool.query('UPDATE meta_messages SET status = $1 WHERE wa_message_id = $2', [status.status, status.id]);
            statusesProcessed++;
          } catch (err) {
            console.error('Status update error:', err.message);
          }
        }
      }
    }

    console.log(`✅ Account ${accountId}: ${messagesProcessed} msgs, ${statusesProcessed} statuses`);
    res.status(200).json({ success: true, messages: messagesProcessed, statuses: statusesProcessed });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(200).json({ success: false, error: err.message });
  }
});

module.exports = router;
