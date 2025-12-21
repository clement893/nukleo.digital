/**
 * App Component avec Web Vitals
 * Monitoring des Core Web Vitals
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { reportWebVitals } from '@/lib/performance';
import { logger } from '@/lib/logger';
import { trackWebVital } from '@/lib/monitoring/metrics';
import { alertManager } from '@/lib/monitoring/alerts';

export function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    logger.info('Page view', {
      pathname,
      searchParams: searchParams.toString(),
      type: 'page_view',
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP - Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        if (lastEntry.renderTime || lastEntry.loadTime) {
          const value = (lastEntry.renderTime || lastEntry.loadTime || 0) / 1000;
          reportWebVitals({
            id: 'lcp',
            name: 'LCP',
            value,
            label: 'largest-contentful-paint',
          });
          logger.performance('LCP', value, 's');
          trackWebVital('LCP', value * 1000, 'ms');
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID - First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const value = entry.processingStart - entry.startTime;
          reportWebVitals({
            id: 'fid',
            name: 'FID',
            value: value / 1000,
            label: 'first-input-delay',
          });
          logger.performance('FID', value / 1000, 's');
          trackWebVital('FID', value, 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS - Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[];
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        reportWebVitals({
          id: 'cls',
          name: 'CLS',
          value: clsValue,
          label: 'cumulative-layout-shift',
        });
        logger.performance('CLS', clsValue);
        trackWebVital('CLS', clsValue);
        
        // Check for alerts
        const latestMetric = {
          name: 'CLS',
          value: clsValue,
          unit: '',
          timestamp: new Date().toISOString(),
          threshold: { warning: 0.1, critical: 0.25 },
        };
        alertManager.checkMetricThresholds(latestMetric);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
    // Return undefined if PerformanceObserver is not available
    return undefined;
  }, []);

  return <>{children}</>;
}

