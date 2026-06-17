import { useState, useEffect, useCallback } from 'react';

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

export const useGallery = (category?: string): UseGalleryReturn => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = category 
        ? `/api/gallery/images?category=${category}`
        : '/api/gallery/images';
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data = await response.json();
      setImages(data.data.images || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Error fetching gallery images:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const addImage = useCallback(async (image: Omit<GalleryImage, 'id' | 'created_at'>) => {
    try {
      const response = await fetch('/api/gallery/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(image)
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
      const response = await fetch(`/api/gallery/images/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
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
      const response = await fetch(`/api/gallery/images/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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
    refetch: fetchImages
  };
};

export default useGallery;
