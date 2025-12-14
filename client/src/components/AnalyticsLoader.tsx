import { useEffect } from 'react';
import { trpc } from '@/lib/trpc';

/**
 * AnalyticsLoader - Component that dynamically loads analytics scripts
 * based on admin configuration
 */
export default function AnalyticsLoader() {
  const { data: activeAnalytics } = trpc.analytics.getActive.useQuery();

  useEffect(() => {
    if (!activeAnalytics || activeAnalytics.length === 0) {
      return;
    }

    const cleanupFunctions: (() => void)[] = [];

    // Load Google Analytics 4
    const ga4Config = activeAnalytics.find(a => a.provider === 'google-analytics');
    if (ga4Config && ga4Config.trackingId && !(window as any).gtag) {
      // Load gtag.js
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Config.trackingId}`;
      document.head.appendChild(script1);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', ga4Config.trackingId);

      // Track initial page view
      gtag('config', ga4Config.trackingId, {
        page_path: window.location.pathname,
      });

      // Track page views on route changes
      const handleRouteChange = () => {
        if ((window as any).gtag) {
          (window as any).gtag('config', ga4Config.trackingId, {
            page_path: window.location.pathname,
          });
        }
      };
      window.addEventListener('popstate', handleRouteChange);
      cleanupFunctions.push(() => window.removeEventListener('popstate', handleRouteChange));
    }

    // Load Facebook Pixel
    const fbPixelConfig = activeAnalytics.find(a => a.provider === 'facebook-pixel');
    if (fbPixelConfig && fbPixelConfig.trackingId && !(window as any).fbq) {
      !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      (window as any).fbq('init', fbPixelConfig.trackingId);
      (window as any).fbq('track', 'PageView');

      // Track page views on route changes
      const handleRouteChange = () => {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'PageView');
        }
      };
      window.addEventListener('popstate', handleRouteChange);
      cleanupFunctions.push(() => window.removeEventListener('popstate', handleRouteChange));
    }

    // Load LinkedIn Insight Tag
    const linkedInConfig = activeAnalytics.find(a => a.provider === 'linkedin-insight');
    if (linkedInConfig && linkedInConfig.trackingId && !(window as any).lintrk) {
      (window as any)._linkedin_partner_id = linkedInConfig.trackingId;
      (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
      (window as any)._linkedin_data_partner_ids.push(linkedInConfig.trackingId);

      (function (l: any) {
        if (!l) {
          window.lintrk = function (a: any, b: any) {
            window.lintrk.q.push([a, b]);
          };
          window.lintrk.q = [];
        }
        const s = document.getElementsByTagName('script')[0];
        const b = document.createElement('script');
        b.async = true;
        b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        s.parentNode.insertBefore(b, s);
      })((window as any).lintrk);

      // Track page views on route changes
      const handleRouteChange = () => {
        if ((window as any).lintrk) {
          (window as any).lintrk('page');
        }
      };
      window.addEventListener('popstate', handleRouteChange);
      cleanupFunctions.push(() => window.removeEventListener('popstate', handleRouteChange));
    }

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [activeAnalytics]);

  // Track conversions for forms
  useEffect(() => {
    if (!activeAnalytics || activeAnalytics.length === 0) {
      return;
    }

    // Track form submissions
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.tagName === 'FORM') {
        const formId = form.id || form.className || 'unknown_form';
        
        // Google Analytics 4 - Track conversion
        const ga4Config = activeAnalytics.find(a => a.provider === 'google-analytics');
        if (ga4Config && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            form_id: formId,
            form_location: window.location.pathname,
          });
        }

        // Facebook Pixel - Track Lead event
        const fbPixelConfig = activeAnalytics.find(a => a.provider === 'facebook-pixel');
        if (fbPixelConfig && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: formId,
            content_category: 'form_submission',
          });
        }

        // LinkedIn Insight Tag - Track conversion
        const linkedInConfig = activeAnalytics.find(a => a.provider === 'linkedin-insight');
        if (linkedInConfig && (window as any).lintrk) {
          (window as any).lintrk('track', { conversion_id: 'form_submission' });
        }
      }
    };

    // Listen for form submissions
    document.addEventListener('submit', handleFormSubmit, true);

    return () => {
      document.removeEventListener('submit', handleFormSubmit, true);
    };
  }, [activeAnalytics]);

  // Track route changes (for SPA routing with wouter)
  useEffect(() => {
    if (!activeAnalytics || activeAnalytics.length === 0) {
      return;
    }

    // Track initial page view
    const trackPageView = () => {
      const path = window.location.pathname;

      // Google Analytics 4
      const ga4Config = activeAnalytics.find(a => a.provider === 'google-analytics');
      if (ga4Config && (window as any).gtag) {
        (window as any).gtag('config', ga4Config.trackingId, {
          page_path: path,
        });
      }

      // Facebook Pixel
      const fbPixelConfig = activeAnalytics.find(a => a.provider === 'facebook-pixel');
      if (fbPixelConfig && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
      }

      // LinkedIn Insight Tag
      const linkedInConfig = activeAnalytics.find(a => a.provider === 'linkedin-insight');
      if (linkedInConfig && (window as any).lintrk) {
        (window as any).lintrk('page');
      }
    };

    // Track initial page view
    trackPageView();

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', trackPageView);

    // Listen for custom route change events (wouter doesn't emit events, so we use MutationObserver)
    const observer = new MutationObserver(() => {
      // Debounce to avoid too many calls
      setTimeout(trackPageView, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('popstate', trackPageView);
      observer.disconnect();
    };
  }, [activeAnalytics]);

  return null; // This component doesn't render anything
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }

  // Facebook Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', eventName, eventData);
  }

  // LinkedIn Insight Tag
  if ((window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: eventName, ...eventData });
  }
}

// Helper function to track page views
export function trackPageView(path: string) {
  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
    });
  }

  // Facebook Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'PageView');
  }

  // LinkedIn Insight Tag
  if ((window as any).lintrk) {
    (window as any).lintrk('page');
  }
}
