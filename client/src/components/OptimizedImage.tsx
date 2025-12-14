/**
 * OptimizedImage - Component for optimized image loading
 * 
 * Features:
 * - WebP format with PNG/JPG fallback
 * - Lazy loading by default (can be disabled for LCP images)
 * - Responsive srcset for different screen sizes
 * - Proper aspect ratio to prevent CLS
 * - Decoding async for better performance
 * - fetchpriority support for critical images
 */

import { useState, useMemo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  srcset?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  // For WebP with fallback
  webpSrc?: string;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
  srcset,
  onLoad,
  onError,
  style,
  webpSrc,
  fallbackSrc,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate WebP and fallback sources if not provided
  const sources = useMemo(() => {
    // If webpSrc is provided, use it; otherwise try to generate from src
    const webp = webpSrc || (src.endsWith('.webp') ? src : src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    const fallback = fallbackSrc || src;
    
    return { webp, fallback };
  }, [src, webpSrc, fallbackSrc]);

  // Generate responsive srcset if not provided
  // Note: For proper srcset, you'd need an image CDN or multiple image files
  // For now, we'll use the same image with density descriptors for retina displays
  const responsiveSrcset = useMemo(() => {
    if (srcset) return srcset;
    
    // Only generate srcset if we have width and it's not an SVG
    // For now, we'll use density descriptors (1x, 2x) which work with the same image
    // In production, you'd want actual different-sized images or an image CDN
    if (width && !src.includes('.svg')) {
      // Simple density-based srcset (works with same image, browser picks based on DPR)
      const webpSrcset = `${sources.webp} 1x, ${sources.webp} 2x`;
      const fallbackSrcset = `${sources.fallback} 1x, ${sources.fallback} 2x`;
      
      return { webpSrcset, fallbackSrcset };
    }
    
    return null;
  }, [srcset, width, sources, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Default sizes if not provided
  const defaultSizes = sizes || (width ? `(max-width: 768px) 100vw, ${width}px` : '100vw');

  // If error loading WebP, fall back to original
  const currentSrc = imageError ? sources.fallback : (webpSrc || src);

  // For SVG files, use simple img tag (no WebP conversion needed)
  if (src.endsWith('.svg')) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={style}
        aria-label={alt}
      />
    );
  }

  // For images with WebP support
  if (webpSrc || (!src.endsWith('.webp') && sources.webp !== src)) {
    return (
      <picture>
        {/* WebP source */}
        <source
          srcSet={responsiveSrcset?.webpSrcset || sources.webp}
          type="image/webp"
          sizes={defaultSizes}
        />
        {/* Fallback source */}
        <source
          srcSet={responsiveSrcset?.fallbackSrcset || sources.fallback}
          type={sources.fallback.endsWith('.png') ? 'image/png' : 'image/jpeg'}
          sizes={defaultSizes}
        />
        {/* Fallback img tag */}
        <img
          src={sources.fallback}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...style,
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
          aria-label={alt}
        />
      </picture>
    );
  }

  // Standard image without WebP conversion
  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      srcSet={responsiveSrcset?.fallbackSrcset || srcset}
      sizes={defaultSizes}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        ...style,
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
      aria-label={alt}
    />
  );
}
