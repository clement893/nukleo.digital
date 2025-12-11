import * as Sentry from "@sentry/node";

// Initialize Sentry for error monitoring
export function initSentry() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
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

    console.log('✅ Sentry initialized for error monitoring');
    return true;
  } else {
    console.log('⚠️  Sentry DSN not configured, error monitoring disabled');
    return false;
  }
}

export { Sentry };
