# Image Management System Documentation

## Overview

تم إنشاء نظام شامل وموحد لإدارة روابط الصور في معرض الأعمال. النظام يدعم:

- ✅ إدارة مركزية لروابط الصور من أماكن متعددة (AWS S3، Cloudinary)
- ✅ تحسين الصور تلقائياً مع معالجات مختلفة
- ✅ تحميل كسول وإدارة الأخطاء
- ✅ معاينات سريعة مع lightbox
- ✅ دعم الكميات الضخمة من الصور

---

## البنية المعمارية

### 1. **ملف التكوين الرئيسي** (`src/data/imageUrls.ts`)

يحتوي على:
- قائمة روابط AWS S3
- قائمة روابط Cloudinary مقسمة حسب الفئات
- دوال مساعدة للوصول إلى الصور

```typescript
// مثال الاستخدام
import { getCloudinaryImageUrl, getCloudinaryImages } from '@/data/imageUrls';

// الحصول على صورة محددة
const imageUrl = getCloudinaryImageUrl('v1774610956/azws-231_tbseh8.jpg');

// الحصول على جميع الصور من فئة محددة
const showcaseImages = getCloudinaryImages('showcase');
```

### 2. **Hook للصور** (`src/hooks/useGalleryImages.ts`)

توفر Hooks متخصصة لإدارة الصور:

```typescript
// استخدام Hook الرئيسي
const { images, count, random } = useGalleryImages({
  category: 'showcase',
  preset: 'gallery',
  limit: 12,
  shuffle: false,
});

// استخدام Hook للصورة المفردة
const optimizedUrl = useOptimizedImage(imageUrl, 'card');

// الحصول على صور من فئات متعددة
const images = useMultiCategoryImages(['showcase', 'projects']);
```

### 3. **مكون OptimizedImage** (`src/components/OptimizedImage.tsx`)

مكون محسّن لعرض الصور مع:
- تحميل كسول (Lazy Loading)
- مؤشر تحميل
- معالجة الأخطاء
- انتقالات سلسة

```typescript
<OptimizedImage
  src={imageUrl}
  alt="Project image"
  preset="card"
  lazyLoad
  showLoader
/>
```

### 4. **مكون Gallery** (`src/components/Gallery.tsx`)

عرض الصور بشكل شبكة مع:
- حجم شبكة قابل للتخصيص
- معاينة Lightbox تفاعلية
- ملاحة سهلة بين الصور
- عداد الصور

```typescript
<Gallery
  category="showcase"
  columns={3}
  limit={12}
  showModal={true}
/>
```

---

## معالجات الصور المتاحة

```typescript
const imagePresets = {
  thumbnail: { width: 300, height: 300, quality: 'auto' },
  card: { width: 500, height: 350, quality: 'auto' },
  hero: { width: 1200, height: 600, quality: 'auto' },
  gallery: { width: 800, height: 600, quality: 'auto' },
  full: { width: 1920, height: 1080, quality: 'auto' },
};
```

---

## الفئات المتاحة من الصور

### Cloudinary Categories:
- **showcase**: صور العروض الرئيسية (20 صورة)
- **projects**: صور المشاريع (8 صور)
- **architectural**: صور معمارية (10 صور)
- **interior_design**: صور التصميم الداخلي (8 صور)

### AWS S3 Gallery:
- **coll-hote**: مجموعة صور الفنادق (الفلاير والمدافئ)

---

## أمثلة الاستخدام المتقدمة

### 1. عرض معرض بفئة معينة

```typescript
import { Gallery } from '@/components/Gallery';

export function ProjectsGallery() {
  return (
    <Gallery
      category="projects"
      columns={4}
      limit={20}
      showModal={true}
    />
  );
}
```

### 2. إنشاء سلايدر صور

```typescript
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useState, useEffect } from 'react';

export function ImageSlider() {
  const { images } = useGalleryImages({
    category: 'showcase',
    limit: 5,
    shuffle: true,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <OptimizedImage
        src={images[currentIndex]}
        alt="Slider image"
        preset="hero"
      />
    </div>
  );
}
```

### 3. عرض صور عشوائية

```typescript
import { getRandomCloudinaryImage } from '@/data/imageUrls';
import { OptimizedImage } from '@/components/OptimizedImage';

export function RandomImage() {
  const randomImage = getRandomCloudinaryImage('showcase');

  return (
    <OptimizedImage
      src={randomImage}
      alt="Random showcase image"
      preset="gallery"
    />
  );
}
```

### 4. معالجة الصور بحجم مخصص

```typescript
import { getCloudinaryImageUrl } from '@/data/imageUrls';

export function CustomSizedImage() {
  const url = getCloudinaryImageUrl('v1774610956/azws-231_tbseh8.jpg', {
    width: 600,
    height: 400,
    quality: 'auto',
  });

  return <img src={url} alt="Custom sized" />;
}
```

---

## قائمة الصور المتاحة

### AWS S3 Images (Hotel Collection)
```
coll-hote-001.png to coll-hote-040.jpg
الإجمالي: 40 صورة
```

### Cloudinary Showcase Images
```
21 صورة عالية الجودة
```

### Cloudinary Projects
```
8 صور مشاريع متنوعة
```

### Cloudinary Architectural
```
10 صور معمارية محترفة
```

### Cloudinary Interior Design
```
8 صور تصميم داخلي فاخر
```

---

## الفوائد الرئيسية

1. **إدارة مركزية**: جميع الروابط في ملف واحد
2. **تحسين تلقائي**: الصور تُحسّن تلقائياً حسب الحجم والجودة
3. **أداء عالي**: تحميل كسول وضغط تلقائي
4. **سهولة الاستخدام**: Hooks و Components مباشرة الاستخدام
5. **قابلية التوسع**: سهل إضافة صور جديدة أو فئات
6. **معالجة الأخطاء**: إدارة تلقائية لأخطاء التحميل

---

## الخطوات التالية

1. تحديث صفحات المعرض لاستخدام المكونات الجديدة
2. نقل جميع الصور المحلية إلى CDN
3. إضافة المزيد من الفئات حسب الحاجة
4. تحسين الأداء مع Web Worker إذا لزم الأمر
5. إضافة ميزات متقدمة (تصفية، بحث، تصنيف)

---

## الملفات المنشأة

- ✅ `/src/data/imageUrls.ts` - ملف التكوين الرئيسي
- ✅ `/src/hooks/useGalleryImages.ts` - Hooks الصور
- ✅ `/src/components/OptimizedImage.tsx` - مكون الصورة المحسّن
- ✅ `/src/components/Gallery.tsx` - مكون المعرض الكامل
- ✅ `/src/admin/GALLERY_MANAGEMENT.md` - توثيق إدارة المعرض
