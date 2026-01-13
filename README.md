# مؤسسة العزب - Alazab Construction Company

<div dir="rtl" align="right">

موقع رسمي احترافي لمؤسسة العزب للخدمات الإنشائية والتصميم الداخلي

</div>

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/alazabdevs-projects/v0-construction-service-website)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Responsive Design](https://img.shields.io/badge/Responsive-Mobile--First-brightgreen?style=for-the-badge)](https://docs/RESPONSIVE_DESIGN.md)

## نظرة عامة | Overview

موقع مؤسسة العزب الرسمي يقدم حلولاً احترافية في:
- **البناء الفاخر** - Luxury Construction
- **التصميم الداخلي** - Interior Design
- **إدارة المشاريع** - Project Management
- **خدمات الصيانة** - Maintenance Services

## المواقع | Live Sites

**الإنتاج | Production:**
- [https://alazab-construction.vercel.app](https://alazab-construction.vercel.app)

**التطوير | Development:**
- [v0.app Project](https://v0.app/chat/projects/T6Qh4YqRqrI)

## هيكل المشروع | Project Structure

```
alazab-construction/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # الصفحة الرئيسية | Home
│   ├── about/                   # نبذة عن العزب | About
│   ├── services/                # الخدمات | Services
│   ├── projects/                # المشاريع | Projects
│   ├── gallery/                 # المعرض | Gallery
│   ├── contact/                 # التواصل | Contact
│   ├── admin/                   # لوحة التحكم | Admin
│   ├── auth/                    # المصادقة | Authentication
│   └── layout.tsx               # Layout الرئيسي
├── components/                   # مكونات React
│   ├── navbar.tsx               # شريط التنقل
│   ├── footer.tsx               # التذييل
│   ├── hero-section.tsx         # قسم البطل
│   └── ... (أكثر من 80 مكون)
├── public/                       # الملفات الثابتة
│   ├── images/                  # صور الخدمات والفريق (60+ صورة)
│   ├── gallery/                 # معرض التصاميم (60+ صورة)
│   ├── projects/                # صور المشاريع (80+ صورة)
│   └── ... (200+ صورة إجمالي)
├── contexts/                    # React Contexts
│   ├── language-context.tsx     # نظام اللغات (AR/EN)
│   └── theme-context.tsx        # نظام المواضيع (Light/Dark)
├── lib/                         # Utilities والدوال المساعدة
│   ├── supabase/               # Supabase Integration
│   └── utils.ts                # Utility Functions
├── docs/                        # التوثيق الشامل
│   ├── PROJECT_STRUCTURE.md     # هيكل المشروع
│   ├── DESIGN_SYSTEM.md         # نظام التصميم
│   ├── IMAGE_CATALOG.md         # فهرس الصور
│   ├── RESPONSIVE_DESIGN.md     # دليل التوافقية
│   └── DEVELOPMENT_GUIDE.md     # دليل التطوير
├── styles/                      # ملفات CSS
├── package.json                 # المتطلبات
└── tailwind.config.ts          # تكوين Tailwind
```

## الميزات | Features

✅ **تصميم متجاوب** - Fully Responsive Design
- هواتف ذكية | Mobile (320px+)
- أجهزة لوحية | Tablets (768px+)
- أجهزة كمبيوتر | Desktop (1024px+)

✅ **دعم اللغتين** - Bilingual Support
- العربية | Arabic (RTL)
- الإنجليزية | English (LTR)

✅ **نظام ألوان احترافي** - Professional Color System
- اللون الأساسي | Primary: #111111
- اللون الذهبي | Accent: #ffb900
- خلفيات فاتحة/داكنة | Light/Dark Modes

✅ **أداء عالي** - High Performance
- تحسين الصور | Image Optimization
- تحميل كسول | Lazy Loading
- ضغط الأصول | Asset Compression

✅ **توثيق شامل** - Comprehensive Documentation
- 6 ملفات توثيق متخصصة
- أمثلة وإرشادات عملية
- معايير الترميز والتصميم

## الصور والمحتوى | Images & Content

الموقع يستخدم **200+ صورة احترافية** موزعة على:
- **60+ صورة** في `/public/images/` (الخدمات، الفريق، المعارض)
- **60+ صورة** في `/public/gallery/` (معرض التصاميم والأثاث الفاخر)
- **80+ صورة** في `/public/projects/` (مشاريع التصميم الداخلي)

جميع الصور محسّنة بتنسيق webp و jpg حديث مع دعم كامل للشاشات المختلفة.

## المكونات الأساسية | Core Components

- **Navbar**: شريط التنقل مع مبدل اللغة والمواضيع
- **Hero Section**: قسم الافتتاحية مع صور احترافية
- **Service Cards**: بطاقات الخدمات التفاعلية
- **Project Gallery**: معرض المشاريع مع تصفية متقدمة
- **Contact Form**: نموذج تواصل محسّن
- **Admin Dashboard**: لوحة إدارة كاملة
- **Footer**: تذييل شامل مع معلومات التواصل

## المكتبات والتقنيات | Technologies

```json
{
  "Framework": "Next.js 16 (App Router)",
  "Styling": "Tailwind CSS v4",
  "Animation": "Framer Motion",
  "Database": "Supabase",
  "Icons": "Lucide React",
  "Fonts": "Google Fonts (Cairo, Montserrat, Poppins)",
  "Theme": "next-themes (Light/Dark Mode)",
  "Language": "TypeScript"
}
```

## البدء | Getting Started

### المتطلبات | Prerequisites
```bash
Node.js 18+ 
pnpm أو npm أو yarn
```

### التثبيت | Installation
```bash
# استنساخ المستودع | Clone the repository
git clone https://github.com/alazabdevs/alazab-construction.git

# الدخول إلى المجلد | Navigate to directory
cd alazab-construction

# تثبيت المتطلبات | Install dependencies
pnpm install
# أو
npm install

# تشغيل خادم التطوير | Run development server
pnpm dev
# أو
npm run dev
```

### الوصول إلى الموقع | Access the Site
```
http://localhost:3000
```

## متغيرات البيئة | Environment Variables

أنشئ ملف `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Email Service
NEXT_PUBLIC_CONTACT_EMAIL=contact@alazab.com
```

## النشر | Deployment

### مع Vercel (موصى به)
```bash
# الدفع إلى GitHub
git push origin main

# Vercel ستنشر تلقائياً عند الـ Push
```

### مع Docker
```bash
docker build -t alazab-construction .
docker run -p 3000:3000 alazab-construction
```

## المساهمة | Contributing

نرحب بالمساهمات! يرجى اتباع:

1. إنشاء فرع جديد | Create a branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. الالتزام بالتغييرات | Commit changes
   ```bash
   git commit -m "Add your feature"
   ```

3. دفع الفرع | Push the branch
   ```bash
   git push origin feature/your-feature
   ```

4. فتح Pull Request

## معايير الجودة | Quality Standards

- ✅ TypeScript strict mode
- ✅ ESLint & Prettier
- ✅ Responsive mobile-first design
- ✅ WCAG accessibility standards
- ✅ SEO optimized
- ✅ Performance (Lighthouse 90+)

## التوثيق | Documentation

اطلع على مجلد `/docs/`:

- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - الهيكل الكامل
- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - نظام التصميم
- **[IMAGE_CATALOG.md](docs/IMAGE_CATALOG.md)** - فهرس الصور
- **[RESPONSIVE_DESIGN.md](docs/RESPONSIVE_DESIGN.md)** - دليل التوافقية
- **[DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)** - دليل التطوير

## الترخيص | License

هذا المشروع مرخص تحت MIT License - انظر ملف LICENSE للتفاصيل.

## التواصل | Contact

- **الموقع | Website**: [https://alazab-construction.vercel.app](https://alazab-construction.vercel.app)
- **البريد الإلكتروني | Email**: contact@alazab.com
- **الهاتف | Phone**: +966 (SA)
- **العنوان | Address**: Riyadh, Saudi Arabia

---

<div align="center">

**تم تطويره بـ ❤️ بواسطة فريق العزب**

Developed with ❤️ by Alazab Team

</div>
