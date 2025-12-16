import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry for client-side error monitoring.
 * Should be called once at application startup.
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    console.log('⚠️  Sentry DSN not configured, error monitoring disabled');
    return false;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE || 'development',
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    beforeSend(event, hint) {
      // Filter sensitive data before sending to Sentry
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers?.['authorization'];
        delete event.request.headers?.['cookie'];
      }
      return event;
    },
  });

  console.log('✅ Sentry initialized for client-side error monitoring');
  return true;
}

export { Sentry };

