import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Loader } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useGallery } from '@/hooks/useGalleryAPI';

interface GalleryProps {
  category?: string;
  columns?: number;
  limit?: number;
  showModal?: boolean;
}

const RealGallery: React.FC<GalleryProps> = ({
  category,
  columns = 3,
  limit,
  showModal = true
}) => {
  const { images, loading, error } = useGallery(category);
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImages = limit ? images.slice(0, limit) : images;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">خطأ في تحميل المعرض: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (displayImages.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        لا توجد صور في هذه الفئة
      </div>
    );
  }

  return (
    <>
      <motion.div
        className={`grid gap-4 ${
          columns === 2 ? 'grid-cols-2' :
          columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          columns === 4 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
          'grid-cols-1'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="group relative overflow-hidden rounded-lg bg-muted cursor-pointer"
            onClick={() => {
              if (showModal) {
                setSelectedImage(image);
                setCurrentIndex(index);
              }
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.url}
                alt={image.alt_text || image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <h3 className="text-white font-semibold text-sm">{image.title}</h3>
              {image.description && (
                <p className="text-white/70 text-xs line-clamp-2">{image.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {showModal && selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt_text || selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />

              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                    <p className="font-semibold">{selectedImage.title}</p>
                    <p className="text-sm text-white/60">
                      {currentIndex + 1} / {displayImages.length}
                    </p>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RealGallery;
