import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to trigger page animations on route change
 * Adds a class to body to restart CSS animations
 */
export function usePageTransition() {
  const [location] = useLocation();

  useEffect(() => {
    // Add animation trigger class
    document.body.classList.add('page-transitioning');
    
    // Force reflow to restart animations
    void document.body.offsetHeight;
    
    // Remove class after a short delay
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transitioning');
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);
}
