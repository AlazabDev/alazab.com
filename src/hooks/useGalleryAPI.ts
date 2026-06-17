import { useState, useEffect, useCallback } from 'react';
import { getStaticGalleryImages } from '@/data/imageUrls';

export interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  alt_text?: string;
  created_at: string;
}

export interface UseGalleryReturn {
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  addImage: (image: Omit<GalleryImage, 'id' | 'created_at'>) => Promise<void>;
  updateImage: (id: string, updates: Partial<GalleryImage>) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const getFallbackImages = (category?: string): GalleryImage[] => {
  return getStaticGalleryImages(category) as GalleryImage[];
};

export const useGallery = (category?: string): UseGalleryReturn => {
  const [images, setImages] = useState<GalleryImage[]>(() => getFallbackImages(category));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = category 
        ? `/api/gallery/images?category=${encodeURIComponent(category)}`
        : '/api/gallery/images';
      
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!response.ok) {
        throw new Error(`Gallery API unavailable: ${response.status}`);
      }
      
      const data = await response.json();
      const apiImages = data?.data?.images;

      if (!Array.isArray(apiImages)) {
        throw new Error('Gallery API returned invalid payload');
      }

      setImages(apiImages.length > 0 ? apiImages : getFallbackImages(category));
    } catch (err) {
      // Static hosting does not provide /api/gallery/images. Keep gallery working from src/data/imageUrls.ts.
      const fallbackImages = getFallbackImages(category);
      setImages(fallbackImages);
      setError(null);
      console.info('Gallery API fallback to static image data:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const addImage = useCallback(async (image: Omit<GalleryImage, 'id' | 'created_at'>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/gallery/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(image),
      });

      if (!response.ok) throw new Error('Failed to add image');
      await fetchImages();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    }
  }, [fetchImages]);

  const updateImage = useCallback(async (id: string, updates: Partial<GalleryImage>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/gallery/images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update image');
      await fetchImages();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    }
  }, [fetchImages]);

  const deleteImage = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/gallery/images/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!response.ok) throw new Error('Failed to delete image');
      await fetchImages();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    }
  }, [fetchImages]);

  return {
    images,
    loading,
    error,
    addImage,
    updateImage,
    deleteImage,
    refetch: fetchImages,
  };
};

export default useGallery;
