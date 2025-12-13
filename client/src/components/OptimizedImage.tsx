import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'width' | 'height'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  className?: string;
}

/**
 * OptimizedImage component for SEO and performance
 * - Automatically generates WebP srcset if available
 * - Adds proper width/height to prevent CLS
 * - Handles lazy loading appropriately
 * - Sets fetchpriority for LCP images
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  priority = false,
  className,
  ...props
}: OptimizedImageProps) {
  // Generate WebP version if source is JPG/PNG
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebp = webpSrc !== src;
  
  // Determine loading strategy
  const loadingAttr = priority ? 'eager' : loading;
  const fetchPriority = priority ? 'high' : 'auto';
  
  return (
    <picture>
      {hasWebp && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingAttr}
        fetchPriority={fetchPriority}
        className={className}
        style={{ aspectRatio: `${width}/${height}`, ...props.style }}
        {...props}
      />
    </picture>
  );
}
