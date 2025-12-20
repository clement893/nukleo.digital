import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Hook personnalisé pour générer des chemins localisés selon la langue actuelle.
 * 
 * Ajoute automatiquement le préfixe `/fr` pour le français et conserve les chemins
 * sans préfixe pour l'anglais. Les routes admin ne sont pas préfixées.
 * 
 * @returns Fonction qui prend un chemin et retourne le chemin localisé
 * 
 * @example
 * ```tsx
 * const getLocalizedPath = useLocalizedPath();
 * 
 * // En français
 * getLocalizedPath('/about'); // '/fr/about'
 * 
 * // En anglais
 * getLocalizedPath('/about'); // '/about'
 * 
 * // Routes admin (pas de préfixe)
 * getLocalizedPath('/admin/dashboard'); // '/admin/dashboard'
 * ```
 */
export function useLocalizedPath() {
  const { language } = useLanguage();
  
  // Ensure language is always defined, default to 'en'
  const safeLanguage = language || 'en';
  
  return (path: string): string => {
    // Remove leading slash for processing
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Admin routes don't need language prefix
    if (cleanPath.startsWith('admin')) {
      return `/${cleanPath}`;
    }
    
    // For French, add /fr prefix
    if (safeLanguage === 'fr') {
      return cleanPath ? `/fr/${cleanPath}` : '/fr';
    }
    
    // For English, no prefix (default)
    return cleanPath ? `/${cleanPath}` : '/';
  };
}
