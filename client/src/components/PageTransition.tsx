import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

/**
 * Component to handle smooth page transitions and prevent color flash
 * Uses the same gradient background as the body to ensure seamless transitions
 */
export default function PageTransition() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    // Only show transition if location actually changed
    if (location !== prevLocation) {
      setIsTransitioning(true);
      
      // Hide transition after a short delay to allow page to render
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);

      setPrevLocation(location);

      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);

  // Don't show transition overlay if not transitioning
  if (!isTransitioning) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-none"
      style={{
        background: `linear-gradient(
          135deg,
          #1e3a8a 0%,
          #3730a3 20%,
          #5b21b6 35%,
          #7c3aed 50%,
          #6d28d9 65%,
          #7f1d1d 85%,
          #991b1b 100%
        )`,
        backgroundAttachment: 'fixed',
        opacity: isTransitioning ? 1 : 0,
        transition: 'opacity 0.2s ease-out',
        visibility: isTransitioning ? 'visible' : 'hidden',
      }}
    />
  );
}
