/**
 * Sentry Edge Configuration
 * Configuration pour le tracking d'erreurs sur Edge Runtime
 */

// Sentry is optional - only initialize if package is installed
try {
  const Sentry = require('@sentry/nextjs');
  
  Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV || 'development',
  });
} catch (e) {
  // Sentry not installed, skip initialization
  console.log('Sentry not installed, skipping edge configuration');
}

