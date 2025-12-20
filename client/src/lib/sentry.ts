import * as Sentry from '@sentry/react';
import { logger } from './logger';

/**
 * Initialize Sentry for client-side error monitoring with advanced features.
 * Should be called once at application startup.
 * Includes performance monitoring, session replay, and alerting configuration.
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    logger.tagged('Sentry').warn('DSN not configured, error monitoring disabled');
    return false;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE || 'development',
    
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0, // Always capture replays on errors
    
    // Release tracking
    release: import.meta.env.VITE_SENTRY_RELEASE || undefined,

    integrations: [
      Sentry.browserTracingIntegration({
        // Trace navigation and route changes
        enableInp: true, // Interaction to Next Paint
      }),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
        // Mask sensitive inputs
        maskAllInputs: true,
      }),
      Sentry.feedbackIntegration({
        // User feedback widget
        colorScheme: 'system',
      }),
    ],

    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'ChunkLoadError',
      // Network errors that are expected
      'NetworkError',
      'Failed to fetch',
      'Network request failed',
    ],

    beforeSend(event, hint) {
      // Filter sensitive data before sending to Sentry
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers?.['authorization'];
        delete event.request.headers?.['cookie'];
      }

      // Remove sensitive data from user context
      if (event.user) {
        delete event.user.ip_address;
      }

      // Filter out health check errors
      if (event.request?.url?.includes('/health')) {
        return null;
      }

      return event;
    },

    // Configure alerting thresholds
    beforeSendTransaction(event) {
      // Track slow page loads
      if (event.transaction && event.contexts?.trace?.duration) {
        const duration = event.contexts.trace.duration;
        if (duration > 3000) { // 3 seconds
          event.tags = { ...event.tags, slow_page_load: true };
        }
      }
      return event;
    },
  });

  // Set tags for better filtering
  Sentry.setTag('app', 'nukleo-digital');
  Sentry.setTag('version', import.meta.env.VITE_APP_VERSION || 'unknown');

  logger.tagged('Sentry').log('Initialized for client-side error monitoring');
  return true;
}

/**
 * Capture exception with context
 */
export function captureException(error: Error, context?: Record<string, unknown>) {
  if (context) {
    Sentry.withScope((scope) => {
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value);
      });
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Capture message with level
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id?: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  Sentry.addBreadcrumb(breadcrumb);
}

/**
 * Track performance metric
 */
export function trackPerformance(name: string, value: number, unit: string = 'millisecond') {
  Sentry.metrics.distribution(name, value, {
    unit,
    tags: {
      environment: import.meta.env.MODE || 'development',
    },
  });
}

export { Sentry };

