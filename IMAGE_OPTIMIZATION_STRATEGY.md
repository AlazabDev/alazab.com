# استراتيجية تحسين وتوزيع الصور

## 1. قائمة الصور المتاحة (231+ صورة)

### صور المعرض (70+ صورة)
- صور الأثاث والديكور (JPEG/PNG بجودة عالية)
- صور التصاميم الداخلية
- صور الحمامات والمطابخ الحديثة

### صور المشاريع (100+ صورة)
- تصاميم الغرف الفردية
- مشاريع المطابخ المتكاملة
- أنظمة غرف النوم الفاخرة
- حلول التخزين الذكية

### صور التصاميم (design-mode)
- service-1.png - خدمة البناء
- service-2.png - خدمة التشطيب
- service-5/6/7.png - خدمات إضافية

## 2. استراتيجية التوزيع

### الصفحة الرئيسية:
```
Hero Section: /modern-construction-site.png
About Section: /images/about-team.png + /images/about-story.png
Services Cards: /images/design-mode/service-*.png
Featured Projects: top 4 من /projects/*.webp
Stats Section: icons + counters
Contact Bar: أيقونات فقط
CTA Section: /images/hero-*.png
```

### صفحة المعرض:
```
Grid View: جميع صور /gallery/*.jpeg
Categories: تصفية حسب النوع
Lightbox: معاينة كاملة الحجم
Responsive: 
  - Mobile: 1 عمود
  - Tablet: 2 أعمدة
  - Desktop: 3-4 أعمدة
```

### صفحة المشاريع:
```
Featured Cards: 6 مشاريع رئيسية
Project Images: /projects/*.webp
Category Filter: luxury, brand, commercial, residential
Details Page: معرض كامل للمشروع
```

## 3. معايير التحسين

### حجم الصور:
- Hero images: max 2MB (compressed)
- Card images: 500-800KB (optimized)
- Thumbnail images: 150-300KB
- Gallery images: 300-600KB

### صيغ الملفات:
- WebP: للصور الحديثة (أداء أفضل)
- JPEG: للصور عالية الجودة
- PNG: للصور مع شفافية
- GIF: للصور المتحركة

### الأبعاد:
```
Hero Images: 1920x1080 / 1280x720
Card Images: 600x400 / 800x533
Thumbnails: 300x200 / 400x267
Gallery: 1200x800 / 1920x1280
```

## 4. تحسينات Next.js Image

```typescript
<Image
  src={imagePath || "/placeholder.svg"}
  alt="وصف صورة احترافي"
  width={800}
  height={600}
  quality={85-90}
  priority={isAboveFold}
  sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
  placeholder="blur"
  blurDataURL={...}
/>
```

## 5. استراتيجية الـ Lazy Loading

- صور Hero و Featured: priority=true
- صور الـ Cards: lazy loading عادي
- صور المعرض: progressive loading
- صور تحت الطي: deferred loading

## 6. الأداء والـ SEO

- Alt text وصفي بالعربية والإنجليزية
- Image sitemap (اختياري)
- Structured data للصور
- Open Graph images للمشاركة الاجتماعية
