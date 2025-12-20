/**
 * Constantes globales de l'application
 * Centralise les valeurs partagées comme les breakpoints, limites, etc.
 */

/**
 * Breakpoints pour les media queries et la détection de taille d'écran
 * Utilisés pour le responsive design
 */
export const BREAKPOINTS = {
  /** Mobile: < 640px */
  sm: 640,
  /** Tablet: >= 640px et < 768px */
  md: 768,
  /** Desktop: >= 768px et < 1024px */
  lg: 1024,
  /** Large Desktop: >= 1024px et < 1280px */
  xl: 1280,
  /** Extra Large Desktop: >= 1280px */
  '2xl': 1280,
} as const;

/**
 * Valeur par défaut pour la détection mobile
 * Utilisée dans useIsMobile et autres hooks
 */
export const MOBILE_BREAKPOINT = BREAKPOINTS.md; // 768px

/**
 * Limites et contraintes de l'application
 */
export const LIMITS = {
  /** Taille maximale d'un fichier uploadé (en bytes) */
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  /** Taille maximale d'un message/commentaire */
  MAX_MESSAGE_LENGTH: 5000,
  /** Nombre maximum de tentatives de connexion */
  MAX_LOGIN_ATTEMPTS: 5,
  /** Délai d'attente avant nouvelle tentative (en ms) */
  LOGIN_RETRY_DELAY: 15 * 60 * 1000, // 15 minutes
} as const;

/**
 * Délais et timeouts
 */
export const TIMEOUTS = {
  /** Timeout pour les requêtes API (en ms) */
  API_REQUEST: 30000, // 30 secondes
  /** Délai avant affichage d'un loader (en ms) */
  LOADER_DELAY: 200,
  /** Délai de debounce pour les recherches (en ms) */
  SEARCH_DEBOUNCE: 300,
  /** Intervalle de rafraîchissement des données (en ms) */
  DATA_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * Configuration des animations
 */
export const ANIMATIONS = {
  /** Durée par défaut des transitions (en ms) */
  DEFAULT_DURATION: 300,
  /** Durée des animations rapides (en ms) */
  FAST_DURATION: 150,
  /** Durée des animations lentes (en ms) */
  SLOW_DURATION: 500,
  /** Easing par défaut */
  DEFAULT_EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * Configuration du cache
 */
export const CACHE = {
  /** Durée de cache pour les données statiques (en ms) */
  STATIC_DATA: 24 * 60 * 60 * 1000, // 24 heures
  /** Durée de cache pour les données dynamiques (en ms) */
  DYNAMIC_DATA: 5 * 60 * 1000, // 5 minutes
  /** Durée de cache pour les images (en ms) */
  IMAGES: 7 * 24 * 60 * 60 * 1000, // 7 jours
} as const;

