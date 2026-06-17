/**
 * Image URLs Migration Guide
 * Step-by-step guide to migrate existing pages to use the new image system
 */

// ========================================
// BEFORE: Old Way (Local imports)
// ========================================

// src/data/projectsData.ts (OLD)
/*
import gallery1 from '@/assets/projects/gallery-1.jpg';
import gallery2 from '@/assets/projects/gallery-2.jpg';

export const projectsData: ProjectMetadata[] = [
  {
    id: 1,
    image: gallery1,
    // ...
  },
  {
    id: 2,
    image: gallery2,
    // ...
  },
];
*/

// ========================================
// AFTER: New Way (CDN URLs)
// ========================================

// src/data/projectsData.ts (NEW)
/*
import { getCloudinaryImageUrl } from '@/data/imageUrls';

// استخدام الروابط من Cloudinary مباشرة
const cloudinaryImages = {
  showcase1: getCloudinaryImageUrl('v1774610956/azws-231_tbseh8.jpg'),
  showcase2: getCloudinaryImageUrl('v1774610905/azws-230_vnstgj.jpg'),
  showcase3: getCloudinaryImageUrl('v1774610858/azws-232_baxwar.jpg'),
  // ...
};

export const projectsData: ProjectMetadata[] = [
  {
    id: 1,
    image: cloudinaryImages.showcase1,
    // ...
  },
  {
    id: 2,
    image: cloudinaryImages.showcase2,
    // ...
  },
];
*/

// ========================================
// Migration Checklist
// ========================================

export const migrationChecklist = {
  1: "✅ تحديث src/data/projectsData.ts - استبدال صور المشاريع بروابط Cloudinary",
  2: "✅ تحديث صفحات معرض الأعمال - استخدام مكون Gallery الجديد",
  3: "✅ تحديث صفحات الخدمات - استخدام OptimizedImage بدلاً من img الأساسي",
  4: "✅ تحديث صفحة الرئيسية - استخدام الصور المحسّنة في الـ Hero",
  5: "✅ اختبار جميع الصور على الأجهزة المختلفة",
  6: "✅ اختبار الأداء والتحميل الكسول",
  7: "✅ التحقق من معدلات الخطأ والتقارير",
  8: "✅ حذف الصور المحلية بعد التحديث الكامل",
};

// ========================================
// Example: Updated Gallery Page
// ========================================

export const exampleGalleryPageCode = `
import React from 'react';
import { Gallery } from '@/components/Gallery';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">معرض أعمالنا</h1>
      
      {/* معرض المشاريع الرئيسية */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">المشاريع المميزة</h2>
        <Gallery 
          category="showcase" 
          columns={3} 
          limit={12}
          showModal={true}
        />
      </section>

      {/* معرض المشاريع المعمارية */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">التصاميم المعمارية</h2>
        <Gallery 
          category="architectural" 
          columns={4} 
          limit={8}
          showModal={true}
        />
      </section>

      {/* معرض التصميم الداخلي */}
      <section>
        <h2 className="text-2xl font-bold mb-6">التصميم الداخلي</h2>
        <Gallery 
          category="interior_design" 
          columns={3} 
          limit={12}
          showModal={true}
        />
      </section>
    </div>
  );
}
`;

// ========================================
// Example: Using OptimizedImage Component
// ========================================

export const exampleOptimizedImageCode = `
import { OptimizedImage } from '@/components/OptimizedImage';
import { getCloudinaryImageUrl } from '@/data/imageUrls';

export function ProjectCard({ projectName }: { projectName: string }) {
  const imagePath = 'v1774610956/azws-231_tbseh8.jpg';
  const imageUrl = getCloudinaryImageUrl(imagePath);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-64">
        <OptimizedImage
          src={imageUrl}
          alt={projectName}
          preset="card"
          lazyLoad
          showLoader
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{projectName}</h3>
      </div>
    </div>
  );
}
`;

// ========================================
// Example: Hero Section with Slider
// ========================================

export const exampleHeroSliderCode = `
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { OptimizedImage } from '@/components/OptimizedImage';
import { useState, useEffect } from 'react';

export function HeroSlider() {
  const { images } = useGalleryImages({
    category: 'showcase',
    limit: 5,
    shuffle: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div className="w-full h-96 bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <OptimizedImage
        src={images[currentIndex]}
        alt="Hero banner"
        preset="hero"
        className="w-full h-full"
      />
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all \${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
`;

// ========================================
// Performance Tips
// ========================================

export const performanceTips = {
  1: "استخدم تحميل الصور الكسول (lazy loading) للصور خارج المنطقة المرئية",
  2: "استخدم المعالجات المناسبة (preset) لكل حالة استخدام",
  3: "تجنب تحميل جميع الصور دفعة واحدة - استخدم pagination أو virtualization",
  4: "استخدم quality: 'auto' للسماح بـ Cloudinary بتحسين الجودة تلقائياً",
  5: "اختبر الصور على اتصالات الإنترنت البطيئة",
  6: "استخدم CDN بدلاً من الخادم الرئيسي للصور",
  7: "اضبط معدلات الضغط والجودة حسب الجهاز",
};

// ========================================
// Troubleshooting
// ========================================

export const troubleshooting = {
  problem1: {
    issue: "الصور لا تظهر",
    solutions: [
      "تحقق من أن رابط URL صحيح في imageUrls.ts",
      "تأكد من أن Cloudinary account نشط ولديه إمكانية الوصول",
      "تحقق من وحدة التحكم (Console) من أخطاء الشبكة",
      "استخدم browser DevTools لفحص الطلب والاستجابة",
    ],
  },
  problem2: {
    issue: "الصور تحمل ببطء",
    solutions: [
      "استخدم معالج أصغر (مثل card بدلاً من hero)",
      "تأكد من تفعيل Lazy Loading",
      "تحقق من سرعة الإنترنت في اختبار الأداء",
      "استخدم quality: 'auto' للسماح بـ Cloudinary بتحسين الأداء",
    ],
  },
  problem3: {
    issue: "الصور تظهر بنسبة خاطئة",
    solutions: [
      "استخدم aspect-ratio المناسب في CSS",
      "جرب زيادة قيمة width و height في المعالج",
      "استخدم object-cover أو object-contain حسب الحاجة",
      "تأكد من أن حجم الصورة الأصلي مناسب",
    ],
  },
};

// ========================================
// Next Steps
// ========================================

export const nextSteps = [
  "✅ مراجعة توثيق المكونات الجديدة",
  "✅ اختبار المكونات في بيئة التطوير",
  "✅ تحديث صفحات المعرض والمشاريع",
  "✅ إضافة المزيد من الصور والفئات",
  "✅ اختبار الأداء والتحميل",
  "✅ نشر التحديثات في الإنتاج",
  "✅ مراقبة الأداء والمشاكل",
  "✅ جمع تعليقات المستخدمين",
];
