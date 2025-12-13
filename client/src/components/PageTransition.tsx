import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';

/**
 * Component to handle smooth page transitions
 * Prevents the black background from showing between page changes
 */
export default function PageTransition() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const prevLocationRef = useRef(location);

  useEffect(() => {
    // Check if location changed
    if (location !== prevLocationRef.current) {
      setIsTransitioning(true);
      
      // After a brief fade out, update the displayed location
      const fadeOutTimer = setTimeout(() => {
        setDisplayLocation(location);
        prevLocationRef.current = location;
        
        // Fade in the new page
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);

      return () => clearTimeout(fadeOutTimer);
    }
  }, [location]);

  // Don't render anything if not transitioning
  if (!isTransitioning) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-none"
      style={{
        background: '#0a0a0a',
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
        visibility: isTransitioning ? 'visible' : 'hidden',
      }}
    />
  );
}
