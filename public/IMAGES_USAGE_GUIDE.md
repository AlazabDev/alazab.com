# صور الموقع - دليل الاستخدام والتوثيق
# Website Images - Usage and Documentation Guide

## الملخص العام | General Summary
- **إجمالي الصور: 225+**
- **التنسيقات المدعومة:** WebP, JPEG, PNG, SVG
- **المجلدات الرئيسية:** `/images`, `/projects`, `/gallery`, root folder

---

## 1. صور الـ Hero Sections | Hero Section Images

### الموقع في الكود:
```
/public/images/hero-1.png through hero-4.png
/public/modern-construction-site.png
/public/luxury-hotel-lobby.png
/public/luxury-living-room.png
```

### الاستخدام:
- **Home Page:** `/modern-construction-site.png` (أساسي)
- **Rotating Heroes:** `hero-1.png` إلى `hero-4.png`
- **Interior Sections:** `luxury-living-room.png`, `luxury-hotel-lobby.png`

### التحسينات الموصى بها:
- استخدام Lazy Loading للصور غير المرئية حالياً
- Image optimization مع WebP fallback
- Responsive images مع `srcSet`

---

## 2. صور الخدمات | Service Images

### الموقع في الكود:
```
/public/images/services-hero.png
/public/images/process.png
/public/images/quality.png
```

### الاستخدام:
- Services Page: صور وصفية للخدمات
- Process Flow: صورة العملية الإنتاجية
- Quality Assurance: شهادات الجودة

---

## 3. صور المشاريع | Project Images

### الموقع:
```
/public/projects/ (90+ images)
/public/images/project-1.png through project-6.png
```

### التصنيفات:
1. **Furniture & Interior (50+ صور)**
   - Modern bedroom designs
   - Living room setups
   - Kitchen and dining areas
   - Custom wardrobes

2. **Home Office & Workspace (10+ صور)**
   - Desk setups
   - Shelving solutions
   - Lighting and accessories

3. **Children Rooms (8+ صور)**
   - Bedroom designs
   - Study areas
   - Play spaces

4. **Kitchen & Dining (15+ صور)**
   - Modern kitchens
   - Dining setups
   - Kitchen islands

### الاستخدام الحالي:
- Project listings page
- Project detail pages
- Portfolio gallery sections

---

## 4. صور المعرض | Gallery Images

### الموقع:
```
/public/gallery/ (50+ images)
```

### المحتويات:
- تشكيلات الأثاث من Lago
- منتجات الديكور الفاخرة
- تصاميم العلامات التجارية الشهيرة

### الاستخدام:
- Gallery showcase page
- Product inspiration sections
- Brand partnerships display

---

## 5. صور الفريق والشهادات | Team & Testimonials

### الموقع:
```
/public/images/team-1.png
/public/images/team-2.png
/public/images/team-3.png
/public/images/testimonial-1.png
/public/images/testimonial-2.png
```

### الاستخدام:
- About page team section
- Testimonials section
- Leadership profiles

---

## 6. صور About | About Page Images

### الموقع:
```
/public/images/about-story.png
/public/images/about-team.png
/public/images/contact-hero.png
```

### الاستخدام:
- Company story narrative
- Team introduction
- Contact page hero

---

## 7. صور أخرى | Miscellaneous Images

### الموقع:
```
/public/images/children/          (صور الأطفال)
/public/images/residential-*.png  (صور سكنية)
/public/images/industrial-*.png   (صور صناعية)
/public/images/commercial-*.png   (صور تجارية)
```

### الاستخدام:
- Category-specific showcase
- Portfolio filtering
- Service-specific examples

---

## تحسينات مقترحة | Recommended Optimizations

### 1. Image Optimization
```javascript
// استخدام Next.js Image Component
import Image from 'next/image'

<Image
  src="/path/to/image.png"
  alt="Descriptive alt text"
  width={1200}
  height={600}
  quality={85}
  loading="lazy"
/>
```

### 2. WebP Format
- تحويل PNG/JPEG إلى WebP لتقليل الحجم
- استخدام fallback للمتصفحات الأقدم

### 3. Responsive Images
```markdown
- Hero images: 100vw width, 50vh height (responsive)
- Card images: 400px width (responsive at different breakpoints)
- Gallery images: Grid layout with responsive sizing
```

### 4. Lazy Loading
- صور تحت الـ fold: loading="lazy"
- Placeholder images أثناء التحميل
- Blur placeholder effect

### 5. CDN Integration
- استخدام Vercel Image Optimization
- Supabase Storage للصور الديناميكية
- Cache busting للصور المحدثة

---

## معايير الجودة | Quality Standards

### صور Hero:
- الأبعاد الموصى بها: 1920×1080 px أو أعلى
- الحجم: < 500 KB (مع التحسين)
- التنسيق: WebP مع PNG fallback

### صور المنتجات:
- الأبعاد: 800×800 px
- الحجم: < 200 KB
- خلفية نظيفة وموحدة

### صور المعرض:
- الأبعاد: 600×400 px
- الحجم: < 150 KB
- نسبة عرض إلى ارتفاع: 3:2

---

## قائمة المهام المعلقة | TODO

- [ ] تحويل جميع الصور إلى WebP
- [ ] إضافة blur placeholders
- [ ] تحسين أسماء الملفات (SEO)
- [ ] إضافة metadata للصور
- [ ] تفعيل lazy loading على كل الصور
- [ ] إنشاء صور responsive variants
- [ ] اختبار الأداء مع Lighthouse

---

## الملف الأول للتحديثات | Version History

**v1.0.0** - 2024-01-10
- توثيق أول للصور
- تنظيم شامل للأصول
- إرشادات الاستخدام
