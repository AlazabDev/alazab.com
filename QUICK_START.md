# Quick Start Guide - Alazab Platform

## إعداد سريع للمشروع

### المتطلبات
- Node.js 24+
- PostgreSQL 13+
- pnpm أو npm

### الخطوة 1: إعداد قاعدة البيانات

```bash
# تنزيل وتثبيت PostgreSQL
# https://www.postgresql.org/download/

# إنشاء قاعدة بيانات
createdb alazab

# تنزيل و إعادة ضبط البيانات الأولية (من ملفات الهجرة)
psql -U postgres -d alazab -f server/db/migrations/001_init.sql
```

### الخطوة 2: إعداد متغيرات البيئة

```bash
# خادم الواجهة الخلفية
cd server
cp .env.example .env

# عدل الملف .env:
```

**.env للخادم:**
```
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# Database
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=alazab

# JWT
JWT_SECRET=your-super-secret-key-change-in-production

# WhatsApp (اختياري)
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789
WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=verify_token
WHATSAPP_API_VERSION=v20.0

# Meta (اختياري)
META_API_VERSION=v20.0
META_ACCESS_TOKEN=your_token
META_BUSINESS_ACCOUNT_ID=123456789

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### الخطوة 3: تثبيت المتطلبات

```bash
# من المجلد الرئيسي
pnpm install

# تثبيت مكتبات الخادم
cd server
pnpm install
cd ..

# تثبيت مكتبات الواجهة الأمامية
pnpm install
```

### الخطوة 4: بدء التطبيق

```bash
# في نافذة طرفية جديدة - بدء الخادم
cd server
pnpm dev
# الخادم يعمل على: http://localhost:3000

# في نافذة طرفية أخرى - بدء واجهة المستخدم
cd /vercel/share/v0-project
pnpm dev
# الواجهة الأمامية على: http://localhost:5173

# الواجهة الإدارية على: http://localhost:5173/admin
```

---

## الوصول إلى الواجهات

### الموقع الرئيسي
```
http://localhost:5173
```

### الواجهة الإدارية
```
http://localhost:5173/admin
```

### API الخادم
```
http://localhost:3000/api/v1
```

### صحة النظام (Health Check)
```
http://localhost:3000/health
```

---

## أوامر مهمة

### تطوير

```bash
# بدء خادم التطوير (مع hot reload)
pnpm dev

# بناء المشروع
pnpm build

# تشغيل الإصدار المبني
pnpm start

# التحقق من الأخطاء
pnpm lint

# إصلاح الأخطاء تلقائياً
pnpm lint:fix

# اختبار الأداء
pnpm test
```

### الخادم

```bash
# بدء الخادم فقط
cd server
node index.js

# بدء الخادم مع nodemon (مراقبة التغييرات)
pnpm dev

# عرض السجلات
tail -f logs/info-*.log
tail -f logs/error-*.log
```

---

## الهيكل الأساسي

```
alazab.com/
├── server/                    # الخادم الخلفي
│   ├── constants/
│   ├── middleware/
│   ├── services/
│   ├── db/
│   ├── docs/
│   └── index.js
├── src/                       # الواجهة الأمامية
│   ├── admin/                 # الواجهة الإدارية
│   ├── pages/
│   ├── components/
│   └── App.tsx
├── public/                    # ملفات ثابتة
├── package.json
└── README.md
```

---

## استخدام الواجهة الإدارية

### الدخول إلى لوحة التحكم

1. افتح `http://localhost:5173/admin`
2. استخدم بيانات تسجيل الدخول (يجب إنشاء مستخدم أولاً)
3. يمكنك الآن الوصول إلى جميع الميزات الإدارية

### الميزات المتاحة

- **Dashboard**: عرض الإحصائيات والبيانات الحية
- **WhatsApp Management**: إدارة الحسابات والرسائل
- **Webhook Monitoring**: مراقبة أحداث الـ Webhooks
- **Database Management**: إدارة قاعدة البيانات
- **Audit Logs**: تتبع جميع النشاطات الإدارية

---

## استخدام API

### المصادقة

جميع الطلبات تحتاج token في رأس Authorization:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/v1/endpoint
```

### أمثلة على الطلبات

```bash
# تسجيل الدخول
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@alazab.com",
    "password": "password123"
  }'

# جلب حسابات WhatsApp
curl -H "Authorization: Bearer TOKEN" \
     http://localhost:3000/api/v1/whatsapp/accounts

# إرسال رسالة WhatsApp
curl -X POST http://localhost:3000/api/v1/whatsapp/send \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+201001234567",
    "message": "Hello World"
  }'

# جلب إحصائيات WhatsApp
curl -H "Authorization: Bearer TOKEN" \
     http://localhost:3000/api/v1/whatsapp/statistics
```

---

## استكشاف الأخطاء

### الخادم لا يعمل

```bash
# تحقق من المنفذ المستخدم
lsof -i :3000

# تأكد من تثبيت المتطلبات
pnpm install

# تحقق من قاعدة البيانات
psql -U postgres -d alazab -c "SELECT NOW();"

# عرض السجلات
tail -f logs/error-*.log
```

### الواجهة الأمامية لا تتصل بالخادم

```bash
# تحقق من متغيرات CORS
# عدل ALLOWED_ORIGINS في .env

# تحقق من عنوان API
console.log('API URL:', process.env.REACT_APP_API_URL);

# استخدم DevTools لفحص الطلبات
# Network tab -> ابحث عن طلبات API
```

### قاعدة البيانات غير موجودة

```bash
# أعد إنشاء قاعدة البيانات
dropdb alazab
createdb alazab

# أعد تشغيل migrations
psql -U postgres -d alazab -f server/db/migrations/001_init.sql
```

---

## النشر (Deployment)

### نشر على Vercel

```bash
# انسخ ملف إعدادات Vercel
cp vercel.json.example vercel.json

# انسخ متغيرات البيئة
vercel env pull

# انشر
vercel deploy --prod
```

### نشر على خادم خاص

```bash
# قم بـ SSH إلى الخادم
ssh user@server.com

# استنسخ المشروع
git clone https://github.com/AlazabDev/alazab.com.git

# ثبت المتطلبات
pnpm install

# أنشئ ملف .env
nano .env

# بدء التطبيق مع PM2
pm2 start "pnpm dev" --name "alazab"
pm2 save
```

---

## المراقبة والصيانة

### مراقبة الأداء

```bash
# استخدم DataDog أو New Relic
# راقب وقت الاستجابة والأخطاء

# عرض إحصائيات قاعدة البيانات
curl -H "Authorization: Bearer TOKEN" \
     http://localhost:3000/api/v1/admin/database/stats
```

### النسخ الاحتياطية

```bash
# إنشاء نسخة احتياطية يدوية
pg_dump -U postgres alazab > backup.sql

# استرجاع من نسخة احتياطية
psql -U postgres alazab < backup.sql

# جدولة النسخ الاحتياطية التلقائية
# استخدم cron job
0 2 * * * pg_dump -U postgres alazab > /backups/alazab_$(date +%Y%m%d).sql
```

### تنظيف السجلات

```bash
# تنظيف السجلات القديمة (تلقائياً كل ساعة)
# أو يدويا:
node server/scripts/cleanup-logs.js --days=30
```

---

## نصائح مهمة

1. **الأمان**: غيّر `JWT_SECRET` في الإنتاج
2. **قاعدة البيانات**: استخدم أكثر من نسخة احتياطية
3. **السجلات**: راقب ملفات السجلات بانتظام
4. **الأداء**: استخدم Redis للـ caching
5. **CORS**: حدد origins معينة في الإنتاج

---

## الموارد الإضافية

- [API Documentation](./server/docs/API_DOCUMENTATION.md)
- [Architecture Documentation](./server/docs/ARCHITECTURE.md)
- [Admin Dashboard README](./src/admin/README.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

---

## الدعم

للحصول على المساعدة:
- تحقق من التوثيق أعلاه
- افحص السجلات (logs)
- تواصل مع فريق التطوير

---

**آخر تحديث**: 2026-06-17  
**الإصدار**: 2.0.0
