import React, { ImgHTMLAttributes, useState } from 'react';
import { useOptimizedImage } from '@/hooks/useGalleryImages';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  preset?: 'thumbnail' | 'card' | 'hero' | 'gallery' | 'full';
  lazyLoad?: boolean;
  showLoader?: boolean;
}

/**
 * Optimized Image Component
 * Handles image loading, error states, and lazy loading
 */
export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      preset = 'gallery',
      lazyLoad = true,
      showLoader = false,
      className = '',
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const optimizedSrc = useOptimizedImage(src, preset);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(true);
      onError?.(e);
    };

    return (
      <div className="relative w-full h-full overflow-hidden bg-gray-100">
        {showLoader && isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse" />
        )}
        <img
          ref={ref}
          src={optimizedSrc}
          alt={alt}
          loading={lazyLoad ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${hasError ? 'hidden' : ''} ${className}`}
          {...props}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-600 text-sm">
            Image Failed to Load
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';
