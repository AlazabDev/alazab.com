import { useMemo } from 'react';
import {
  CLOUDINARY_GALLERY,
  type CloudinaryCategory,
  getCloudinaryImageUrl,
  getCloudinaryImages,
  getRandomCloudinaryImage,
  imagePresets,
  getSafeImageUrl,
} from '@/data/imageUrls';

interface UseGalleryImagesOptions {
  category?: CloudinaryCategory;
  preset?: keyof typeof imagePresets;
  limit?: number;
  shuffle?: boolean;
}

/**
 * Hook for managing gallery images.
 * Keeps the full Cloudinary public path/version instead of stripping it to filename only.
 */
export const useGalleryImages = (options: UseGalleryImagesOptions = {}) => {
  const {
    category = 'showcase',
    preset = 'gallery',
    limit,
    shuffle = false,
  } = options;

  const optimizedImages = useMemo(() => {
    const presetConfig = imagePresets[preset];
    let imgs = getCloudinaryImages(category, presetConfig);

    if (shuffle) {
      imgs = [...imgs].sort(() => Math.random() - 0.5);
    }

    if (limit && imgs.length > limit) {
      imgs = imgs.slice(0, limit);
    }

    return imgs;
  }, [category, limit, preset, shuffle]);

  return {
    images: optimizedImages,
    count: optimizedImages.length,
    random: () => getRandomCloudinaryImage(category),
  };
};

/**
 * Hook for single image optimization.
 * - Cloudinary full URLs are rebuilt with the requested preset.
 * - Non-Cloudinary absolute URLs remain untouched.
 * - Local/static paths are normalized safely.
 */
export const useOptimizedImage = (url: string | undefined, preset: keyof typeof imagePresets = 'gallery') => {
  return useMemo(() => {
    const safeUrl = getSafeImageUrl(url);

    if (!safeUrl || safeUrl.startsWith('data:') || safeUrl.startsWith('blob:')) {
      return safeUrl;
    }

    if (safeUrl.includes('cloudinary.com')) {
      return getCloudinaryImageUrl(safeUrl, imagePresets[preset]);
    }

    return safeUrl;
  }, [url, preset]);
};

/**
 * Hook to get images by multiple categories.
 */
export const useMultiCategoryImages = (categories: CloudinaryCategory[]) => {
  return useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = getCloudinaryImages(cat);
      return acc;
    }, {} as Record<CloudinaryCategory, string[]>);
  }, [categories.join(',')]);
};
