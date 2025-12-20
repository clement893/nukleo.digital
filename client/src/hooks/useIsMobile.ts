import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '../lib/constants';

/**
 * Hook to detect if the current device is mobile
 * 
 * @param breakpoint - Breakpoint in pixels (default: MOBILE_BREAKPOINT = 768px)
 * @returns boolean indicating if device is mobile
 * 
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile-specific UI
 * }
 * ```
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

