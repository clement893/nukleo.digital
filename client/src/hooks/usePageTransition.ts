import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to trigger page animations on route change
 * Adds a class to body to restart CSS animations
 * Ensures body stays visible during transitions to prevent flash
 */
export function usePageTransition() {
  const [location] = useLocation();

  useEffect(() => {
    // Ensure body is visible during transition
    if (!document.body.classList.contains('loaded')) {
      document.body.classList.add('loaded');
    }
    
    // Add animation trigger class
    document.body.classList.add('page-transitioning');
    
    // Force reflow to restart animations
    void document.body.offsetHeight;
    
    // Remove class after a short delay
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transitioning');
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);
}
