# Al-Azab Meta API Server

سيرفر Node.js/Express للتكامل مع منصة Meta (WhatsApp Business API) مع تخزين PostgreSQL مباشر.

## المتطلبات
- Node.js 18+
- PostgreSQL 15+
- PM2 (لإدارة العمليات)

## التثبيت

```bash
cd server/meta-api
npm install

# إنشاء قاعدة البيانات
sudo -u postgres createdb alazab_meta
```

## التشغيل

```bash
# Development
npm run dev

# Production (PM2)
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## المتغيرات البيئية

| المتغير | الوصف | الافتراضي |
|---------|-------|-----------|
| `META_API_PORT` | منفذ السيرفر | `3004` |
| `PG_HOST` | عنوان PostgreSQL | `localhost` |
| `PG_PORT` | منفذ PostgreSQL | `5432` |
| `PG_DATABASE` | اسم قاعدة البيانات | `alazab_meta` |
| `PG_USER` | مستخدم PostgreSQL | `postgres` |
| `PG_PASSWORD` | كلمة مرور PostgreSQL | `` |
| `CORS_ORIGIN` | النطاقات المسموحة | `*` |

## نقاط النهاية (API Endpoints)

### الحسابات
- `GET    /api/meta/accounts` — قائمة الحسابات
- `GET    /api/meta/accounts/:id` — حساب محدد
- `POST   /api/meta/accounts` — إنشاء حساب
- `PUT    /api/meta/accounts/:id` — تحديث حساب
- `DELETE /api/meta/accounts/:id` — حذف حساب
- `GET    /api/meta/accounts/:id/stats` — إحصائيات الحساب

### Webhook
- `GET  /api/meta/webhook/:accountId` — تحقق Meta Webhook
- `POST /api/meta/webhook/:accountId` — استقبال أحداث

### الرسائل
- `GET  /api/meta/messages/:accountId` — قائمة الرسائل
- `POST /api/meta/messages/:accountId/send` — إرسال رسالة
- `GET  /api/meta/messages/:accountId/conversations` — المحادثات

### عام
- `GET /api/meta/health` — حالة السيرفر

## إعداد Nginx

```nginx
location /api/meta/ {
    proxy_pass http://127.0.0.1:3004;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
}
```
