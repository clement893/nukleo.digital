import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-PMCLW23ZCS';

export default function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // gtag is already loaded in index.html, just ensure it's available
    if (typeof window === 'undefined') return;
    
    // Ensure gtag function exists (it should be loaded from index.html)
    if (!(window as any).gtag) {
      window.dataLayer = window.dataLayer || [];
      (window as any).gtag = function(...args: any[]) {
        window.dataLayer.push(args);
      };
    }

    // Only initialize in production
    if (import.meta.env.DEV) {
      console.log('[GA4] Development mode - tracking disabled');
      return;
    }

    if (import.meta.env.DEV) {
      console.log('[GA4] Ready (loaded from index.html)');
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
        console.log('[GA4] Page view:', location);
      }
    }
  }, [location]);

  return null;
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (import.meta.env.DEV) {
    console.log('[GA4] Event (dev):', eventName, eventParams);
    return;
  }

  const gtag = (window as any).gtag;
  if (gtag) {
    gtag('event', eventName, eventParams);
    if (import.meta.env.DEV) {
      console.log('[GA4] Event:', eventName, eventParams);
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
