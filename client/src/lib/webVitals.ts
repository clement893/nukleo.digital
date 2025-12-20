/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals metrics and sends them to Google Analytics
 */

import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';
import { logger } from './logger';

// Send metrics to Google Analytics
function sendToAnalytics(metric: Metric) {
  const gtag = window.gtag;
  if (!gtag) return;

  // Send to Google Analytics
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  });

  // Log in development
  if (import.meta.env.DEV) {
    logger.tagged('Web Vitals').log(metric.name, metric.value, metric.id);
  }
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  if (typeof window === 'undefined') return;
  if (import.meta.env.DEV) {
    logger.tagged('Web Vitals').log('Initializing...');
  }

  // Track all Core Web Vitals
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// Export individual metric handlers for custom tracking
export { onCLS, onFID, onFCP, onLCP, onTTFB };

