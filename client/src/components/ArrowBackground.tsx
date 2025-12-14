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
 */

interface ArrowBackgroundProps {
  variant?: 'default' | 'alternate';
}

export default function ArrowBackground({ variant = 'default' }: ArrowBackgroundProps) {
  // Two different positioning patterns for variety across pages
  const positions = variant === 'default' 
    ? [
        { top: '15%', left: '5%', size: 250, opacity: 0.025 },
        { bottom: '20%', right: '8%', size: 280, opacity: 0.03 },
        { top: '55%', left: '40%', size: 200, opacity: 0.02 },
      ]
    : [
        { top: '25%', right: '10%', size: 260, opacity: 0.028 },
        { bottom: '15%', left: '6%', size: 240, opacity: 0.022 },
        { top: '60%', right: '35%', size: 220, opacity: 0.025 },
      ];

  // Reduce arrows on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const arrowsToRender = isMobile ? positions.slice(0, 1) : positions;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {arrowsToRender.map((arrow, i) => (
        <img
          key={i}
          src="/nukleo-arrow.svg"
          alt=""
          width={arrow.size}
          height={arrow.size}
          className="absolute"
          loading="lazy"
          fetchPriority={i === 0 ? 'low' : 'auto'}
          fetchPriority={i === 0 ? 'high' : 'low'}
          decoding="async"
          style={{
            ...arrow,
            width: `${arrow.size}px`,
            height: `${arrow.size}px`,
            transform: 'rotate(0deg)',
            filter: 'invert(1)',
            opacity: arrow.opacity,
          }}
        />
      ))}
    </div>
  );
}
