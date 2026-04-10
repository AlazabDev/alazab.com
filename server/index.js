const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const webhookRoutes = require('./routes/webhook');
const metaRoutes = require('./routes/meta');

const app = express();
const PORT = process.env.PORT || 3004;

// Security
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'https://alazab.com',
    'https://www.alazab.com',
    'https://azab.services',
    'http://localhost:8080',
    /\.lovable\.app$/,
  ],
  credentials: true,
}));

// Webhook routes need raw body — mount BEFORE json parser
app.use('/api/webhook', webhookRoutes);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests' },
});
app.use('/api/v1/', limiter);

// Routes
app.use('/auth/v1', authRoutes);
app.use('/api/v1', apiRoutes);
app.use('/api/meta', metaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Alazab API Server running on port ${PORT}`);
  console.log(`   Auth:    /auth/v1/callback`);
  console.log(`   API:     /api/v1/`);
  console.log(`   Webhook: /api/webhook/whatsapp`);
  console.log(`   Meta:    /api/meta/`);
});

module.exports = app;
