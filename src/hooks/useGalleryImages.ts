import { useMemo } from 'react';
import {
  CLOUDINARY_GALLERY,
  getCloudinaryImageUrl,
  getCloudinaryImages,
  getRandomCloudinaryImage,
  imagePresets,
  getSafeImageUrl,
} from '@/data/imageUrls';

interface UseGalleryImagesOptions {
  category?: keyof typeof CLOUDINARY_GALLERY.categories;
  preset?: keyof typeof imagePresets;
  limit?: number;
  shuffle?: boolean;
}

/**
 * Hook for managing gallery images
 * Provides utility functions to fetch, filter, and optimize images
 */
export const useGalleryImages = (options: UseGalleryImagesOptions = {}) => {
  const {
    category = 'showcase',
    preset = 'gallery',
    limit,
    shuffle = false,
  } = options;

  const images = useMemo(() => {
    let imgs = getCloudinaryImages(category);

    if (shuffle) {
      imgs = [...imgs].sort(() => Math.random() - 0.5);
    }

    if (limit && imgs.length > limit) {
      imgs = imgs.slice(0, limit);
    }

    return imgs;
  }, [category, limit, shuffle]);

  const optimizedImages = useMemo(() => {
    const presetConfig = imagePresets[preset];
    return images.map(url => {
      const pathPart = url.split('/').slice(-1)[0];
      return getCloudinaryImageUrl(pathPart, presetConfig);
    });
  }, [images, preset]);

  return {
    images: optimizedImages,
    count: optimizedImages.length,
    random: () => getRandomCloudinaryImage(category),
  };
};

/**
 * Hook for single image optimization
 */
export const useOptimizedImage = (url: string | undefined, preset: keyof typeof imagePresets = 'gallery') => {
  const safeUrl = getSafeImageUrl(url);

  return useMemo(() => {
    if (!safeUrl || safeUrl.includes('placeholder')) {
      return safeUrl;
    }

    // Extract the path from Cloudinary URL if it's already a full URL
    if (safeUrl.includes('cloudinary.com')) {
      const parts = safeUrl.split('/');
      const filename = parts[parts.length - 1];
      return getCloudinaryImageUrl(filename, imagePresets[preset]);
    }

    return getCloudinaryImageUrl(safeUrl, imagePresets[preset]);
  }, [safeUrl, preset]);
};

/**
 * Hook to get images by multiple categories
 */
export const useMultiCategoryImages = (categories: Array<keyof typeof CLOUDINARY_GALLERY.categories>) => {
  return useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = getCloudinaryImages(cat);
      return acc;
    }, {} as Record<keyof typeof CLOUDINARY_GALLERY.categories, string[]>);
  }, [categories.join(',')]);
};
