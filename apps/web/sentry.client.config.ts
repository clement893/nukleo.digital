/**
 * Sentry Client Configuration
 * Configuration pour le tracking d'erreurs côté client
 */

// Sentry is optional - only initialize if package is installed
try {
  const Sentry = require('@sentry/nextjs');
  
  Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Ajuster la valeur de sample dans la production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Ajuster la valeur de sample pour profiling
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Environnement
  environment: process.env.NODE_ENV || 'development',
  
  // Activer les replays de session
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Ignorer certaines erreurs
  ignoreErrors: [
    // Erreurs de réseau
    'NetworkError',
    'Network request failed',
    // Erreurs de résolution
    'Resolving',
    // Erreurs de navigateur
    'Non-Error promise rejection captured',
  ],
  
  // Filtres d'URL
  denyUrls: [
    // Extensions de navigateur
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
  ],
  
  // Intégrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  });
} catch (e) {
  // Sentry not installed, skip initialization
  console.log('Sentry not installed, skipping client configuration');
}

