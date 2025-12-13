import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Hook to generate localized paths
 * @param path - The path to localize (e.g., '/about' or '/')
 * @returns The localized path (e.g., '/fr/about' or '/about' for English)
 */
export function useLocalizedPath() {
  const { language } = useLanguage();
  
  return (path: string): string => {
    // Remove leading slash for processing
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Admin routes don't need language prefix
    if (cleanPath.startsWith('admin')) {
      return `/${cleanPath}`;
    }
    
    // For French, add /fr prefix
    if (language === 'fr') {
      return cleanPath ? `/fr/${cleanPath}` : '/fr';
    }
    
    // For English, no prefix (default)
    return cleanPath ? `/${cleanPath}` : '/';
  };
}
