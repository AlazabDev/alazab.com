// استخدام معرض الصور في أي صفحة

import RealGallery from '@/components/RealGallery';
import { useGallery } from '@/hooks/useGalleryAPI';

// مثال 1: عرض بسيط جداً
<RealGallery category="showcase" columns={3} />

// مثال 2: عرض مع حد أقصى للصور
<RealGallery category="projects" columns={4} limit={12} />

// مثال 3: استخدام Hook للتحكم الكامل
const { images, loading, error, addImage, updateImage, deleteImage } = useGallery('interior_design');

// مثال 4: إضافة صورة جديدة
const handleAddImage = async () => {
  await addImage({
    title: 'صورة جديدة',
    url: 'https://...',
    category: 'showcase',
    description: 'وصف الصورة',
    alt_text: 'نص بديل'
  });
};

// مثال 5: تحديث صورة موجودة
const handleUpdate = async (imageId: string) => {
  await updateImage(imageId, {
    title: 'عنوان جديد',
    description: 'وصف محدث'
  });
};

// مثال 6: حذف صورة
const handleDelete = async (imageId: string) => {
  await deleteImage(imageId);
};

export { RealGallery, useGallery };
