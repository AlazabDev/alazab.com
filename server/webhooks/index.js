const express = require('express');
const crypto = require('crypto');
const app = express();

const PORT = process.env.AZABOT_PORT || 3003;
const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '';
const APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '';

// Raw body for signature verification
app.use(express.json({
  verify: (req, _res, buf) => { req.rawBody = buf.toString(); }
}));

// ─── Signature Verification ───
function verifySignature(rawBody, signature) {
  if (!APP_SECRET || !signature) return !APP_SECRET;
  const expected = crypto.createHmac('sha256', APP_SECRET).update(rawBody).digest('hex');
  return signature.replace('sha256=', '') === expected;
}

// ─── GET: Webhook Verification (shared) ───
function handleVerification(req, res, platform) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log(`✅ [${platform}] Webhook verified`);
    return res.status(200).send(challenge);
  }
  console.warn(`❌ [${platform}] Verification failed`);
  return res.status(403).send('Forbidden');
}

// ─── Facebook Messenger Webhook ───
app.get('/api/webhook/azabot/facebook', (req, res) => handleVerification(req, res, 'facebook'));
app.post('/api/webhook/azabot/facebook', async (req, res) => {
  const sig = req.headers['x-hub-signature-256'];
  if (!verifySignature(req.rawBody, sig)) {
    console.error('❌ [facebook] Invalid signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const body = req.body;
  console.log(`📨 [facebook] Event: ${body.object}`);

  if (body.object === 'page') {
    for (const entry of body.entry || []) {
      for (const event of entry.messaging || []) {
        const senderId = event.sender?.id;
        const message = event.message;

        if (message && senderId) {
          console.log(`📩 [FB] Message from ${senderId}: ${message.text || '[media]'}`);

          // Auto-reply
          if (PAGE_ACCESS_TOKEN && message.text) {
            await sendFacebookReply(senderId, 'شكراً لتواصلك معنا! سنرد عليك قريباً. 🏗️');
          }
        }

        if (event.postback) {
          console.log(`🔘 [FB] Postback: ${event.postback.payload}`);
        }
      }
    }
  }

  res.status(200).json({ success: true, platform: 'facebook' });
});

// ─── Meta / Instagram Webhook ───
app.get('/api/webhook/azabot/meta', (req, res) => handleVerification(req, res, 'meta'));
app.post('/api/webhook/azabot/meta', async (req, res) => {
  const sig = req.headers['x-hub-signature-256'];
  if (!verifySignature(req.rawBody, sig)) {
    console.error('❌ [meta] Invalid signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const body = req.body;
  console.log(`📨 [meta] Event: ${body.object}`);

  if (body.object === 'instagram') {
    for (const entry of body.entry || []) {
      for (const event of entry.messaging || []) {
        const senderId = event.sender?.id;
        const message = event.message;
        if (message && senderId) {
          console.log(`📩 [IG] Message from ${senderId}: ${message.text || '[media]'}`);
        }
      }
    }
  }

  res.status(200).json({ success: true, platform: 'meta' });
});

// ─── Health Check ───
app.get('/api/webhook/azabot/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// ─── Facebook Reply Helper ───
async function sendFacebookReply(recipientId, text) {
  try {
    const resp = await fetch(`https://graph.facebook.com/v25.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
      }),
    });
    if (!resp.ok) console.error('FB send error:', await resp.text());
    else console.log(`✅ [FB] Reply sent to ${recipientId}`);
  } catch (err) {
    console.error('FB send exception:', err.message);
  }
}

app.listen(PORT, () => {
  console.log(`🤖 AzaBot webhook server running on port ${PORT}`);
  console.log(`   Facebook: /api/webhook/azabot/facebook`);
  console.log(`   Meta/IG:  /api/webhook/azabot/meta`);
  console.log(`   Health:   /api/webhook/azabot/health`);
});
