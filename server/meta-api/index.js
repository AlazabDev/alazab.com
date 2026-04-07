const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initDB } = require('./db');

const accountsRouter = require('./routes/accounts');
const webhookRouter = require('./routes/webhook');
const messagesRouter = require('./routes/messages');

const app = express();
const PORT = process.env.META_API_PORT || 3004;

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests' },
});
app.use('/api/', apiLimiter);

// Body parsing with raw body for signature verification
app.use(express.json({
  limit: '5mb',
  verify: (req, _res, buf) => { req.rawBody = buf.toString(); }
}));

// ─── Routes ───
app.use('/api/meta/accounts', accountsRouter);
app.use('/api/meta/webhook', webhookRouter);
app.use('/api/meta/messages', messagesRouter);

// Health check
app.get('/api/meta/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'alazab-meta-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Start
async function start() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Meta API Server running on port ${PORT}`);
      console.log(`   Accounts:  /api/meta/accounts`);
      console.log(`   Webhook:   /api/meta/webhook/:accountId`);
      console.log(`   Messages:  /api/meta/messages/:accountId`);
      console.log(`   Health:    /api/meta/health`);
    });
  } catch (err) {
    console.error('❌ Failed to start:', err.message);
    process.exit(1);
  }
}

start();
