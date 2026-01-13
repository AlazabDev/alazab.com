# دليل التطوير

## البدء السريع
```bash
npm install
npm run dev
```

## البنية الأساسية

### إضافة صفحة جديدة
1. أنشئ ملف في `/app/page-name/page.tsx`
2. استخدم `useLanguage()` للترجمات
3. أضف صور من `/public`

### إضافة مكون جديد
1. أنشئ ملف في `/components/`
2. استخدم Tailwind للأسلوب
3. ادعم RTL/LTR

### إضافة ترجمات
1. حدّث `/contexts/language-context.tsx`
2. أضف النصوص بالعربية والإنجليزية

## المعايير
- استخدم TypeScript
- اكتب تعليقات واضحة
- اختبر على جميع الأجهزة
- تحقق من Accessibility
