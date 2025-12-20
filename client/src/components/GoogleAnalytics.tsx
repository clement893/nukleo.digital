import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { logger } from '@/lib/logger';

// Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-PMCLW23ZCS';

export default function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // gtag is already loaded in index.html, just ensure it's available
    if (typeof window === 'undefined') return;
    
    // Ensure gtag function exists (it should be loaded from index.html)
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: unknown[]) {
        window.dataLayer.push(args);
      };
    }

    // Only initialize in production
    if (import.meta.env.DEV) {
      console.log('[GA4] Development mode - tracking disabled');
      return;
    }

    if (import.meta.env.DEV) {
      logger.tagged('GA4').log('Ready (loaded from index.html)');
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('event', 'page_view', {
        page_path: location,
        page_title: document.title,
      });
      if (import.meta.env.DEV) {
        logger.tagged('GA4').log('Page view:', location);
      }
    }
  }, [location]);

  return null;
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (import.meta.env.DEV) {
    logger.tagged('GA4').log('Event (dev):', eventName, eventParams);
    return;
  }

  const gtag = (window as any).gtag;
  if (gtag) {
    gtag('event', eventName, eventParams);
    if (import.meta.env.DEV) {
      logger.tagged('GA4').log('Event:', eventName, eventParams);
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
