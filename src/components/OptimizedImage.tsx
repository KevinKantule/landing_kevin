import React, { ImgHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Optimized Image Component
 * Features:
 * - Lazy loading by default (except priority images)
 * - Responsive sizing with srcset
 * - Async decoding for better performance
 * - Built-in aspect ratio container
 * - Fallback support
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) => {
  // Use picsum.photos or external images as-is
  // In production, you would use a service like Cloudinary or Image CDN
  const isExternalImage = src.startsWith('http');

  // Generate responsive sizes
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';

  // Build srcset for responsive images
  // For external images, use the base URL
  // For local images, you would have multiple versions
  const srcSet = isExternalImage
    ? undefined // External service handles responsive images
    : `${src}?w=640 640w, ${src}?w=1024 1024w, ${src}?w=1200 1200w`;

  return (
    <figure className={cn('relative overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        srcSet={srcSet}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'low'}
        className="w-full h-auto object-cover"
        {...props}
      />
      {/* Fallback image for browsers that don't support the image */}
      <noscript>
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
      </noscript>
    </figure>
  );
};

/**
 * Image with WebP support and fallback
 * In production with a CDN (like Cloudinary):
 * - Automatically serves WebP to supported browsers
 * - Automatically optimizes quality
 * - Automatically caches at edge
 */
export const WebPImage = ({
  src,
  alt,
  ...props
}: OptimizedImageProps) => {
  // For production, use a CDI like Cloudinary that auto-converts to WebP:
  // const cloudinaryUrl = `https://res.cloudinary.com/your-cloud/image/fetch/f_auto,w_auto/${src}`;

  return <OptimizedImage src={src} alt={alt} {...props} />;
};

/**
 * Hero Image with priority loading
 * Used for above-the-fold images
 */
export const HeroImage = (props: OptimizedImageProps) => {
  return <OptimizedImage {...props} priority={true} />;
};

/**
 * Picture element with WebP fallback (for future implementation)
 * Example:
 * <PictureWithWebP
 *   webp="/image.webp"
 *   fallback="/image.jpg"
 *   alt="Description"
 * />
 */
interface PictureProps {
  webp: string;
  fallback: string;
  alt: string;
  className?: string;
}

export const PictureWithWebP = ({ webp, fallback, alt, className }: PictureProps) => {
  return (
    <picture className={className}>
      <source srcSet={webp} type="image/webp" />
      <source srcSet={fallback} type="image/jpeg" />
      <img src={fallback} alt={alt} className="w-full h-auto" loading="lazy" decoding="async" />
    </picture>
  );
};
