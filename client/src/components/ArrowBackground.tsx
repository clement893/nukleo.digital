/**
 * ArrowBackground - Watermark style arrows for subtle background texture
 * 
 * Features:
 * - 2-3 large arrows positioned as watermarks
 * - Ultra-low opacity (~1%) for discretion
 * - All arrows point to the right
 * - No animation (static)
 * - Positioned behind all content (z-index: 0)
 * - Optimized for performance: first arrow uses preloaded SVG, others lazy load
 * - Mobile optimized: only 1 arrow on mobile for better performance
 */

import { useMemo, memo } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ArrowBackgroundProps {
  variant?: 'default' | 'alternate';
}

function ArrowBackground({ variant = 'default' }: ArrowBackgroundProps) {
  // Two different positioning patterns for variety across pages - memoized
  const positions = useMemo(() => variant === 'default' 
    ? [
        { top: '15%', left: '5%', size: 250, opacity: 0.025 },
        { bottom: '20%', right: '8%', size: 280, opacity: 0.03 },
        { top: '55%', left: '40%', size: 200, opacity: 0.02 },
      ]
    : [
        { top: '25%', right: '10%', size: 260, opacity: 0.028 },
        { bottom: '15%', left: '6%', size: 240, opacity: 0.022 },
        { top: '60%', right: '35%', size: 220, opacity: 0.025 },
      ], [variant]);

  // Reduce arrows on mobile for better performance - only show first arrow
  const isMobile = useIsMobile(768);
  const arrowsToRender = useMemo(() => 
    isMobile ? positions.slice(0, 1) : positions,
    [isMobile, positions]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {arrowsToRender.map((arrow, i) => {
        // First arrow is LCP element - optimize for immediate rendering
        const isLCP = i === 0;
        return (
          <img
            key={i}
            src="/nukleo-arrow.svg"
            alt="Flèche décorative Nukleo Digital"
            width={arrow.size}
            height={arrow.size}
            className="absolute"
            loading={isLCP ? "eager" : "lazy"}
            fetchPriority={isLCP ? "high" : "low"}
            decoding="async"
            aria-hidden="true"
            style={{
              ...arrow,
              width: `${arrow.size}px`,
              height: `${arrow.size}px`,
              transform: 'rotate(0deg)',
              filter: 'invert(1)',
              opacity: arrow.opacity,
            }}
          />
        );
      })}
    </div>
  );
}

export default memo(ArrowBackground);
