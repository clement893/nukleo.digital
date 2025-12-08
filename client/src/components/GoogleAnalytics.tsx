import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Replace with your actual GA4 Measurement ID
// Get it from https://analytics.google.com/
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with real ID

export default function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Only load in production
    if (import.meta.env.DEV || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.log('[GA4] Skipped in development or ID not configured');
      return;
    }

    // Load gtag.js script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We'll send manually on route change
    });

    console.log('[GA4] Initialized');

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src*="googletagmanager"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (import.meta.env.DEV || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

    const gtag = (window as any).gtag;
    if (gtag) {
      gtag('event', 'page_view', {
        page_path: location,
        page_title: document.title,
      });
      console.log('[GA4] Page view:', location);
    }
  }, [location]);

  return null;
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (import.meta.env.DEV || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.log('[GA4] Event (dev):', eventName, eventParams);
    return;
  }

  const gtag = (window as any).gtag;
  if (gtag) {
    gtag('event', eventName, eventParams);
    console.log('[GA4] Event:', eventName, eventParams);
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
