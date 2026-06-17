import React, { useState, useCallback } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { CLOUDINARY_GALLERY } from '@/data/imageUrls';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryProps {
  category?: keyof typeof CLOUDINARY_GALLERY.categories;
  columns?: number;
  limit?: number;
  showModal?: boolean;
  className?: string;
}

/**
 * Gallery Component with Lightbox Support
 */
export const Gallery: React.FC<GalleryProps> = ({
  category = 'showcase',
  columns = 3,
  limit = 12,
  showModal = true,
  className = '',
}) => {
  const { images } = useGalleryImages({ category, limit });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex(prev => (prev === null ? null : prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => (prev === null ? null : prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[Math.min(columns, 4)] || 'grid-cols-3';

  return (
    <>
      <div className={`grid ${gridColsClass} gap-4 ${className}`}>
        {images.map((image, index) => (
          <div
            key={`${category}-${index}`}
            className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => showModal && setSelectedIndex(index)}
          >
            <OptimizedImage
              src={image}
              alt={`Gallery image ${index + 1}`}
              preset="card"
              lazyLoad
              showLoader
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1110 10A10 10 0 0110 0zm3.5 9.5h-2.5v2.5H9.5v-2.5H7V9.5h2.5V7h1.5v2.5h2.5v1z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {showModal && selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-5xl flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
              <OptimizedImage
                src={images[selectedIndex]}
                alt={`Gallery image ${selectedIndex + 1}`}
                preset="full"
                className="max-w-full max-h-full"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
