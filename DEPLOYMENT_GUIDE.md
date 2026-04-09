# 📋 دليل النشر والإعدادات النهائية — alazab.com
# Alazab Production Deployment & External Platform Configuration Guide
#
# 📅 آخر تحديث: 2026-04-09
# 🌐 الدومين: https://alazab.com
# 📁 مسار النشر: /var/www/core/alazab.com

---

## 📑 فهرس المحتويات

1. [متطلبات السيرفر](#1--متطلبات-السيرفر)
2. [خطوات النشر على السيرفر](#2--خطوات-النشر-على-السيرفر)
3. [إعدادات Cloudflare DNS](#3--إعدادات-cloudflare-dns)
4. [إعدادات Nginx](#4--إعدادات-nginx)
5. [إعدادات SSL](#5--إعدادات-ssl)
6. [متغيرات البيئة](#6--متغيرات-البيئة)
7. [إعدادات Supabase](#7--إعدادات-supabase)
8. [إعدادات Facebook / Meta](#8--إعدادات-facebook--meta)
9. [إعدادات WhatsApp Business API](#9--إعدادات-whatsapp-business-api)
10. [إعدادات Google Search Console](#10--إعدادات-google-search-console)
11. [إعدادات PM2 للخدمات الخلفية](#11--إعدادات-pm2-للخدمات-الخلفية)
12. [الروابط النهائية للمشروع](#12--الروابط-النهائية-للمشروع)
13. [قائمة التحقق قبل الإطلاق](#13--قائمة-التحقق-قبل-الإطلاق)

---

## 1. 🖥️ متطلبات السيرفر

| المتطلب | الحد الأدنى |
|---------|------------|
| نظام التشغيل | Ubuntu 22.04+ / Debian 12+ |
| Node.js | v18+ (يُفضل v20 LTS) |
| pnpm | v8+ |
| Nginx | v1.18+ |
| PM2 | آخر إصدار |
| Certbot | لشهادات SSL |
| Git | v2.30+ |

### تثبيت المتطلبات:
```bash
# تثبيت Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# تثبيت pnpm
npm install -g pnpm

# تثبيت PM2
npm install -g pm2

# تثبيت Nginx و Certbot
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

---

## 2. 🚀 خطوات النشر على السيرفر

### 2.1 استنساخ المشروع
```bash
cd /var/www/core/
git clone https://github.com/YOUR_ORG/alazab.com.git
cd alazab.com
```

### 2.2 إعداد متغيرات البيئة
```bash
cp .env.example .env
nano .env
```

محتوى ملف `.env`:
```env
VITE_SUPABASE_URL=https://bxuhcbfdoaflsgbxiqei.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4dWhjYmZkb2FmbHNnYnhpcWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMTU1MDIsImV4cCI6MjA4NDU5MTUwMn0.W60YuL2zn9De95Jwgc7jn4_NLMdOVINHO6NUWY6yRlQ
VITE_SITE_URL=https://alazab.com
VITE_APP_NAME=alazab.com
```

### 2.3 البناء والنشر
```bash
# تثبيت الحزم
pnpm install --frozen-lockfile

# السماح بتشغيل سكربتات البناء (مطلوب كـ root)
# إذا واجهت خطأ EACCES أضف:
# npm config set unsafe-perm true

# بناء الإنتاج
pnpm build

# نسخ ملفات البناء
sudo mkdir -p /var/www/core/alazab.com
sudo rm -rf /var/www/core/alazab.com/dist_old
sudo cp -r dist/* /var/www/core/alazab.com/
sudo chown -R www-data:www-data /var/www/core/alazab.com
sudo chmod -R 755 /var/www/core/alazab.com
```

### 2.4 أو استخدام سكربت النشر التلقائي
```bash
sudo bash deploy.sh
```

### 2.5 التحديث المستقبلي
```bash
cd /var/www/core/alazab.com
git pull origin main
pnpm install --frozen-lockfile
pnpm build
sudo rm -rf /var/www/core/alazab.com/*.js /var/www/core/alazab.com/*.css /var/www/core/alazab.com/*.html /var/www/core/alazab.com/assets
sudo cp -r dist/* /var/www/core/alazab.com/
sudo chown -R www-data:www-data /var/www/core/alazab.com
sudo systemctl reload nginx
```

---

## 3. 🌐 إعدادات Cloudflare DNS

### سجلات DNS المطلوبة:

| النوع | الاسم | القيمة | البروكسي | ملاحظات |
|-------|-------|--------|---------|---------|
| **A** | `@` | `IP_السيرفر` | ✅ Proxied | النطاق الرئيسي |
| **A** | `www` | `IP_السيرفر` | ✅ Proxied | إعادة توجيه www |
| **A** | `app` | `IP_السيرفر` | ✅ Proxied | لوحة التحكم المتقدمة (اختياري) |
| **A** | `api` | `IP_السيرفر` | ✅ Proxied | API الخلفي (اختياري) |
| **CNAME** | `mail` | `mail.provider.com` | ❌ DNS Only | البريد الإلكتروني |
| **MX** | `@` | `mail.provider.com` | — | أولوية 10 |
| **TXT** | `@` | `v=spf1 include:... ~all` | — | SPF للبريد |
| **TXT** | `_dmarc` | `v=DMARC1; p=quarantine;...` | — | DMARC |

### إعدادات SSL في Cloudflare:
- **SSL/TLS Mode**: `Full (Strict)`
- **Always Use HTTPS**: ✅ مُفعّل
- **Minimum TLS Version**: `1.2`
- **Automatic HTTPS Rewrites**: ✅ مُفعّل

### إعدادات الأمان:
- **WAF**: مُفعّل (مستوى Medium)
- **Bot Fight Mode**: ✅ مُفعّل
- **Browser Integrity Check**: ✅ مُفعّل

---

## 4. ⚙️ إعدادات Nginx

### ملف الإعداد: `/etc/nginx/sites-available/alazab.com`

```nginx
# ── HTTP → HTTPS redirect ──
server {
    listen 80;
    listen [::]:80;
    server_name alazab.com www.alazab.com;
    return 301 https://$host$request_uri;
}

# ── Main HTTPS ──
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name alazab.com www.alazab.com;

    root /var/www/core/alazab.com;
    index index.html;

    # SSL
    ssl_certificate     /etc/letsencrypt/live/alazab.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alazab.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://graph.facebook.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://graph.facebook.com https://connect.facebook.net; frame-src https://www.facebook.com https://web.facebook.com;" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml application/wasm;

    # Static assets — immutable cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|webp|avif|wasm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Supabase Edge Functions proxy
    location /functions/v1/ {
        proxy_pass https://bxuhcbfdoaflsgbxiqei.supabase.co/functions/v1/;
        proxy_set_header Host bxuhcbfdoaflsgbxiqei.supabase.co;
        proxy_ssl_server_name on;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }

    # Meta API proxy (اختياري - إذا كان السيرفر الخلفي يعمل)
    location /api/ {
        proxy_pass http://127.0.0.1:3002/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WhatsApp Webhook proxy
    location /webhook/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Block dotfiles
    location ~ /\. { deny all; }

    error_page 404 /index.html;
}
```

### تفعيل الإعداد:
```bash
sudo ln -sf /etc/nginx/sites-available/alazab.com /etc/nginx/sites-enabled/alazab.com
sudo nginx -t
sudo systemctl reload nginx
```

---

## 5. 🔒 إعدادات SSL

### إصدار شهادة Let's Encrypt:
```bash
sudo certbot --nginx -d alazab.com -d www.alazab.com
```

### التجديد التلقائي:
```bash
sudo crontab -e
# أضف هذا السطر:
0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```

> **ملاحظة**: إذا كنت تستخدم Cloudflare Proxy، يمكنك استخدام شهادات Cloudflare Origin بدلاً من Let's Encrypt.

---

## 6. 🔑 متغيرات البيئة

### ملف `.env` (Frontend — Vite):
```env
VITE_SUPABASE_URL=https://bxuhcbfdoaflsgbxiqei.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SITE_URL=https://alazab.com
VITE_APP_NAME=alazab.com
```

### متغيرات خدمات الخلفية (PM2 / systemd):
```env
# API Server (المنفذ 3002)
NODE_ENV=production
API_PORT=3002
SUPABASE_URL=https://bxuhcbfdoaflsgbxiqei.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# AzaBot Webhook (المنفذ 3001)
AZABOT_PORT=3001
WHATSAPP_WEBHOOK_VERIFY_TOKEN=QvacXnwH_5QWUTKsEsxEgtYd8kHpVcf3U

# Meta Business API (المنفذ 3004)
META_API_PORT=3004
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_token
```

---

## 7. 📊 إعدادات Supabase

### الرابط: [لوحة تحكم Supabase](https://supabase.com/dashboard/project/bxuhcbfdoaflsgbxiqei)

### 7.1 Authentication Settings
- **الرابط**: https://supabase.com/dashboard/project/bxuhcbfdoaflsgbxiqei/auth/providers
- **Site URL**: `https://alazab.com`
- **Redirect URLs** (أضف جميع هذه الروابط):
  ```
  https://alazab.com/**
  https://www.alazab.com/**
  https://alazab-site.lovable.app/**
  ```

### 7.2 تفعيل Leaked Password Protection ⚠️
- **الرابط**: https://supabase.com/dashboard/project/bxuhcbfdoaflsgbxiqei/auth/settings
- فعّل خيار **"Leaked Password Protection"**

### 7.3 Edge Functions
- **الرابط**: https://supabase.com/dashboard/project/bxuhcbfdoaflsgbxiqei/functions
- تأكد من نشر جميع الدوال
- **Secrets المطلوبة**: https://supabase.com/dashboard/project/bxuhcbfdoaflsgbxiqei/settings/functions

### 7.4 Storage Buckets
- **الرابط**: https://supabase.com/dashboard/project/bxuhcbfdoaflsgbxiqei/storage/buckets
- `media` — خاص (RLS مفعّل، الوصول للمسؤولين فقط)
- `projects-media` — قراءة عامة، كتابة للمصادقين فقط

---

## 8. 📘 إعدادات Facebook / Meta

### 8.1 Facebook App Settings
- **الرابط**: https://developers.facebook.com/apps/615557577912061/settings/basic/
- **App Domains**: `alazab.com`
- **Site URL**: `https://alazab.com`
- **Privacy Policy URL**: `https://alazab.com/privacy-policy`
- **Terms of Service URL**: `https://alazab.com/terms-of-service`
- **Data Deletion URL**: `https://alazab.com/data-deletion`

### 8.2 Facebook Login Settings
- **Valid OAuth Redirect URIs**:
  ```
  https://alazab.com/auth
  https://alazab.com/auth/callback
  https://bxuhcbfdoaflsgbxiqei.supabase.co/auth/v1/callback
  ```

### 8.3 Facebook SDK (مضمّن في index.html)
```html
<meta property="fb:app_id" content="889346333913449" />
<script async defer crossorigin="anonymous"
  src="https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v25.0&appId=615557577912061">
</script>
```

### 8.4 Open Graph Tags (مضمّنة في index.html)
```html
<meta property="og:title" content="شركة العزب للمقاولات العامة" />
<meta property="og:description" content="شركة رائدة في مجال المقاولات والبناء" />
<meta property="og:image" content="https://alazab.com/alazab-icon.png" />
<meta property="og:url" content="https://alazab.com" />
```

---

## 9. 📱 إعدادات WhatsApp Business API

### 9.1 Webhook Configuration
- **الرابط**: https://developers.facebook.com/apps/615557577912061/whatsapp-business/wa-dev-console/
- **Callback URL**: `https://alazab.com/webhook/whatsapp`
- **Verify Token**: `QvacXnwH_5QWUTKsEsxEgtYd8kHpVcf3U`
- **Subscribed Fields**:
  - `messages`
  - `messaging_postbacks`
  - `message_deliveries`
  - `message_reads`

### 9.2 WhatsApp Business Account
- تأكد من ربط رقم الهاتف التجاري
- تأكد من الحصول على Page Access Token الدائم

---

## 10. 🔍 إعدادات Google Search Console

### 10.1 إضافة الموقع
- **الرابط**: https://search.google.com/search-console
- أضف `https://alazab.com` كـ Property
- التحقق عبر DNS (أضف سجل TXT في Cloudflare)

### 10.2 إرسال خريطة الموقع
- أرسل: `https://alazab.com/sitemap.xml`
- ملف الخريطة يحتوي على **37 رابط** تشمل:
  - الصفحات الرئيسية (الرئيسية، من نحن، اتصل بنا، الرئيس التنفيذي)
  - الخدمات (4 خدمات رئيسية)
  - المشاريع والأعمال (معرض المشاريع، البورتفوليو، معرض الأثاث)
  - خدمات العملاء (طلب صيانة، تتبع الصيانة، الشات بوت)
  - الصفحات القانونية (9 صفحات)

### 10.3 ملف robots.txt
```
User-agent: *
Allow: /
Sitemap: https://alazab.com/sitemap.xml
```

### 10.4 إعدادات Google Analytics (اختياري)
- أنشئ حساب GA4: https://analytics.google.com
- أضف كود التتبع في `index.html` أو كمتغير بيئة `VITE_GA_ID`

---

## 11. 🔧 إعدادات PM2 للخدمات الخلفية

### ملف ecosystem.config.js:
```javascript
module.exports = {
  apps: [
    {
      name: 'alazab-api',
      script: './server/api/index.js',
      cwd: '/var/www/core/alazab.com',
      env: {
        NODE_ENV: 'production',
        API_PORT: 3002,
        SUPABASE_URL: 'https://bxuhcbfdoaflsgbxiqei.supabase.co'
        // SUPABASE_SERVICE_ROLE_KEY: 'your_key'
      }
    },
    {
      name: 'azabot-webhook',
      script: './server/webhooks/index.js',
      cwd: '/var/www/core/alazab.com',
      env: {
        NODE_ENV: 'production',
        AZABOT_PORT: 3001,
        WHATSAPP_WEBHOOK_VERIFY_TOKEN: 'QvacXnwH_5QWUTKsEsxEgtYd8kHpVcf3U'
      }
    },
    {
      name: 'meta-api',
      script: './server/meta/index.js',
      cwd: '/var/www/core/alazab.com',
      env: {
        NODE_ENV: 'production',
        META_API_PORT: 3004
      }
    }
  ]
};
```

### تشغيل الخدمات:
```bash
cd /var/www/core/alazab.com
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### أوامر مفيدة:
```bash
pm2 status           # حالة الخدمات
pm2 logs             # السجلات
pm2 restart all      # إعادة تشغيل الكل
pm2 reload all       # تحميل بدون توقف
pm2 monit            # مراقبة حية
```

---

## 12. 🔗 الروابط النهائية للمشروع

### الصفحات العامة
| الصفحة | الرابط |
|--------|--------|
| الرئيسية | https://alazab.com/ |
| من نحن | https://alazab.com/about |
| الرئيس التنفيذي | https://alazab.com/ceo |
| اتصل بنا | https://alazab.com/contact |
| الخدمات | https://alazab.com/services |
| التشطيبات الفاخرة | https://alazab.com/services/luxury-finishing |
| الصيانة والتجديد | https://alazab.com/services/uberfix |
| الهوية التجارية | https://alazab.com/services/brand-identity |
| لبن العصفور | https://alazab.com/services/laban-alasfour |
| المشاريع | https://alazab.com/projects |
| معرض المشاريع | https://alazab.com/projects-gallery |
| البورتفوليو | https://alazab.com/portfolio |
| معرض الأثاث | https://alazab.com/furniture-gallery |
| فيسبوك | https://alazab.com/facebook |
| خريطة الموقع | https://alazab.com/sitemap |

### خدمات العملاء
| الصفحة | الرابط |
|--------|--------|
| طلب صيانة | https://alazab.com/maintenance-request |
| تتبع الصيانة | https://alazab.com/maintenance-tracking |
| الشات بوت | https://alazab.com/chatbot |

### صفحات المصادقة
| الصفحة | الرابط |
|--------|--------|
| تسجيل الدخول | https://alazab.com/auth |
| استعادة كلمة المرور | https://alazab.com/auth/reset-password |

### لوحات التحكم (تتطلب مصادقة)
| الصفحة | الرابط | الصلاحية |
|--------|--------|----------|
| لوحة المستخدم | https://alazab.com/dashboard | مستخدم مصادق |
| الملف الشخصي | https://alazab.com/profile | مستخدم مصادق |
| الإعدادات | https://alazab.com/settings | مستخدم مصادق |
| قائمة الصيانة | https://alazab.com/maintenance-list | مستخدم مصادق |
| تقارير الصيانة | https://alazab.com/maintenance-reports | مستخدم مصادق |
| إدارة المشاريع | https://alazab.com/project-management | مستخدم مصادق |

### لوحات الإدارة (تتطلب صلاحية Admin)
| الصفحة | الرابط |
|--------|--------|
| لوحة الإدارة | https://alazab.com/admin-dashboard |
| إدارة WhatsApp | https://alazab.com/whatsapp-management |
| إدارة عروض الأسعار | https://alazab.com/quotation-management |
| مراقبة Webhooks | https://alazab.com/webhook-monitor |
| تدريب الشات بوت | https://alazab.com/chatbot-training |
| حسابات Meta | https://alazab.com/meta-accounts |

### الصفحات القانونية
| الصفحة | الرابط |
|--------|--------|
| سياسة الخصوصية | https://alazab.com/privacy-policy |
| شروط الخدمة | https://alazab.com/terms-of-service |
| سياسة الكوكيز | https://alazab.com/cookie-policy |
| حذف البيانات | https://alazab.com/data-deletion |
| التواصل القانوني | https://alazab.com/legal-contact |
| سياسة الاسترداد | https://alazab.com/refund-policy |
| سياسة الاستخدام | https://alazab.com/acceptable-use |
| إخلاء المسؤولية | https://alazab.com/disclaimer |
| الأمان | https://alazab.com/security |

### الملفات الثابتة
| الملف | الرابط |
|-------|--------|
| خريطة الموقع XML | https://alazab.com/sitemap.xml |
| ملف الروبوتات | https://alazab.com/robots.txt |
| أيقونة الموقع | https://alazab.com/favicon.ico |
| أيقونة Apple Touch | https://alazab.com/apple-touch-icon.png |
| أيقونة PNG | https://alazab.com/alazab-icon.png |

### روابط الأنظمة الداخلية (اختياري — عبر Reverse Proxy)
| النظام | الرابط |
|--------|--------|
| نظام ERP | https://alazab.com/erp |
| الأتمتة (n8n) | https://alazab.com/n8n |
| البريد | https://alazab.com/mail |
| إدارة العملاء (CRM) | https://alazab.com/crm |

---

## 13. ✅ قائمة التحقق قبل الإطلاق

### الأمان 🔒
- [ ] تفعيل Leaked Password Protection في Supabase Auth
- [ ] تأكد من أن SUPABASE_SERVICE_ROLE_KEY **ليس** في الكود المصدري
- [ ] تأكد من إعدادات RLS على جميع الجداول
- [ ] فحص CSP headers في Nginx
- [ ] تفعيل HTTPS إجباري

### DNS والشبكة 🌐
- [ ] سجلات A تشير إلى IP السيرفر الصحيح
- [ ] SSL يعمل بشكل صحيح (https://alazab.com)
- [ ] إعادة توجيه www → بدون www (أو العكس)
- [ ] Cloudflare SSL على وضع Full (Strict)

### SEO 🔍
- [ ] sitemap.xml يعمل: https://alazab.com/sitemap.xml
- [ ] robots.txt يعمل: https://alazab.com/robots.txt
- [ ] تم إرسال sitemap لـ Google Search Console
- [ ] Open Graph tags صحيحة (اختبر عبر https://developers.facebook.com/tools/debug/)
- [ ] JSON-LD schema صحيح (اختبر عبر https://validator.schema.org/)

### الأداء ⚡
- [ ] Gzip مفعّل في Nginx
- [ ] Cache headers للأصول الثابتة (1 سنة)
- [ ] صور WebP مستخدمة حيث أمكن
- [ ] Lazy loading للصور

### الوظائف 🛠️
- [ ] الصفحة الرئيسية تعمل
- [ ] تسجيل الدخول / الخروج يعمل
- [ ] تبديل اللغة (عربي / إنجليزي) يعمل
- [ ] طلب الصيانة يعمل
- [ ] الشات بوت يعمل
- [ ] WhatsApp Webhook يستقبل الرسائل
- [ ] لوحة الإدارة تعمل للمسؤولين فقط

### الخدمات الخلفية 🔧
- [ ] PM2 يعمل ويبدأ تلقائياً
- [ ] API Server (3002) يستجيب
- [ ] AzaBot Webhook (3001) يستجيب
- [ ] Meta API (3004) يستجيب

---

## 📞 معلومات الدعم

- **الموقع**: https://alazab.com
- **البريد**: info@al-azab.co
- **هاتف**: +201004006620
- **Supabase Dashboard**: https://supabase.com/dashboard/project/bxuhcbfdoaflsgbxiqei
- **Facebook Developers**: https://developers.facebook.com/apps/615557577912061

---

> 📝 **تم إنشاء هذا الدليل تلقائياً — آخر تحديث: 2026-04-09**
> 
> للتحديث: راجع إعدادات المشروع وعدّل هذا الملف حسب الحاجة.
