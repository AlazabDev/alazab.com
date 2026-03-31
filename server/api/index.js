/**
 * Al-Azab Multi-Purpose API Server
 * =================================
 * Unified API gateway for all backend services
 * Runs on port 3002 (separate from AzaBot webhook on 3001)
 * 
 * Routes:
 *   /api/v1/health        - Health check
 *   /api/v1/contact       - Contact form submissions
 *   /api/v1/newsletter    - Newsletter subscriptions
 *   /api/v1/quotation     - Quotation requests
 *   /api/v1/maintenance   - Maintenance request intake
 *   /api/v1/callback      - Callback/lead capture
 *   /api/v1/analytics     - Simple event tracking
 */

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.API_PORT || 3002;

// ─── Supabase Client ───
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://bxuhcbfdoaflsgbxiqei.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

// ─── Middleware ───
app.use(cors({
  origin: [
    'https://alazab.com',
    'https://www.alazab.com',
    'https://alazab-site.lovable.app',
    /\.lovable\.app$/,
    'http://localhost:5173',
    'http://localhost:8080',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
}));

app.use(express.json({ limit: '1mb' }));

// ─── Rate Limiting (simple in-memory) ───
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30;

function rateLimit(req, res, next) {
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter(t => t > windowStart);
  requests.push(now);
  rateLimitMap.set(ip, requests);

  if (requests.length > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests', retryAfter: 60 });
  }

  next();
}

app.use(rateLimit);

// Clean up rate limit map every 5 minutes
setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW;
  for (const [ip, times] of rateLimitMap) {
    const filtered = times.filter(t => t > cutoff);
    if (filtered.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, filtered);
  }
}, 5 * 60 * 1000);

// ─── Input Validation Helpers ───
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\+?[\d\s\-()]{8,20}$/.test(phone);
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim().slice(0, 1000);
}

// ─── Health Check ───
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'al-azab-api',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    supabase: !!supabase,
  });
});

// ─── Contact Form ───
app.post('/api/v1/contact', async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'الاسم والرسالة مطلوبان' });
    }
    if (email && !validateEmail(email)) {
      return res.status(400).json({ error: 'البريد الإلكتروني غير صالح' });
    }
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ error: 'رقم الهاتف غير صالح' });
    }

    const data = {
      name: sanitize(name),
      email: email ? sanitize(email) : null,
      phone: phone ? sanitize(phone) : null,
      message: sanitize(message),
      subject: subject ? sanitize(subject) : 'استفسار عام',
      source: 'website',
      created_at: new Date().toISOString(),
    };

    console.log('📩 Contact form:', data.name, data.email);

    // TODO: Save to Supabase or send email notification
    // if (supabase) { await supabase.from('contact_submissions').insert(data); }

    res.json({ success: true, message: 'تم استلام رسالتك بنجاح' });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ error: 'حدث خطأ، حاول مرة أخرى' });
  }
});

// ─── Newsletter Subscription ───
app.post('/api/v1/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ error: 'البريد الإلكتروني مطلوب وصالح' });
    }

    console.log('📧 Newsletter subscription:', email);

    res.json({ success: true, message: 'تم الاشتراك بنجاح' });
  } catch (err) {
    console.error('Newsletter error:', err.message);
    res.status(500).json({ error: 'حدث خطأ' });
  }
});

// ─── Quotation Request ───
app.post('/api/v1/quotation', async (req, res) => {
  try {
    const { name, phone, email, projectType, area, location, details } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'الاسم ورقم الهاتف مطلوبان' });
    }
    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'رقم الهاتف غير صالح' });
    }

    const data = {
      name: sanitize(name),
      phone: sanitize(phone),
      email: email ? sanitize(email) : null,
      project_type: sanitize(projectType || ''),
      area: area ? Number(area) : null,
      location: sanitize(location || ''),
      details: sanitize(details || ''),
      source: 'website-api',
      created_at: new Date().toISOString(),
    };

    console.log('📋 Quotation request:', data.name, data.phone);

    res.json({ success: true, message: 'تم استلام طلب عرض السعر بنجاح' });
  } catch (err) {
    console.error('Quotation error:', err.message);
    res.status(500).json({ error: 'حدث خطأ' });
  }
});

// ─── Maintenance Request (public intake) ───
app.post('/api/v1/maintenance', async (req, res) => {
  try {
    const { name, phone, email, serviceType, description, location, priority } = req.body;

    if (!name || !phone || !description) {
      return res.status(400).json({ error: 'الاسم ورقم الهاتف ووصف المشكلة مطلوبون' });
    }

    const data = {
      client_name: sanitize(name),
      client_phone: sanitize(phone),
      client_email: email ? sanitize(email) : null,
      service_type: sanitize(serviceType || ''),
      description: sanitize(description),
      location: sanitize(location || ''),
      priority: sanitize(priority || 'medium'),
      title: sanitize(description).slice(0, 100),
      status: 'Open',
    };

    // Save to Supabase if available
    if (supabase) {
      const { error } = await supabase.from('maintenance_requests').insert(data);
      if (error) {
        console.error('DB insert error:', error.message);
        return res.status(500).json({ error: 'حدث خطأ في حفظ الطلب' });
      }
    }

    console.log('🔧 Maintenance request:', data.client_name, data.service_type);

    res.json({ success: true, message: 'تم استلام طلب الصيانة بنجاح' });
  } catch (err) {
    console.error('Maintenance error:', err.message);
    res.status(500).json({ error: 'حدث خطأ' });
  }
});

// ─── Callback / Lead Capture ───
app.post('/api/v1/callback', async (req, res) => {
  try {
    const { name, phone, preferredTime, notes } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'الاسم ورقم الهاتف مطلوبان' });
    }
    if (!validatePhone(phone)) {
      return res.status(400).json({ error: 'رقم الهاتف غير صالح' });
    }

    console.log('📞 Callback request:', sanitize(name), sanitize(phone));

    res.json({ success: true, message: 'سنتواصل معك في أقرب وقت' });
  } catch (err) {
    console.error('Callback error:', err.message);
    res.status(500).json({ error: 'حدث خطأ' });
  }
});

// ─── Analytics Event ───
app.post('/api/v1/analytics', async (req, res) => {
  try {
    const { event, page, data } = req.body;
    if (!event) {
      return res.status(400).json({ error: 'Event name required' });
    }

    // Log for now, can be stored in DB later
    console.log(`📊 [analytics] ${sanitize(event)} | ${sanitize(page || '/')}`, data || '');

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
});

// ─── 404 Catch-all ───
app.use('/api/v1/*', (_req, res) => {
  res.status(404).json({ error: 'Endpoint not found', docs: '/api/v1/health' });
});

// ─── Start Server ───
app.listen(PORT, () => {
  console.log(`🚀 Al-Azab API server running on port ${PORT}`);
  console.log(`   Health:      /api/v1/health`);
  console.log(`   Contact:     /api/v1/contact`);
  console.log(`   Newsletter:  /api/v1/newsletter`);
  console.log(`   Quotation:   /api/v1/quotation`);
  console.log(`   Maintenance: /api/v1/maintenance`);
  console.log(`   Callback:    /api/v1/callback`);
  console.log(`   Analytics:   /api/v1/analytics`);
});
