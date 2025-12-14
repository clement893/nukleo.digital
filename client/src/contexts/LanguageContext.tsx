import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number> | { returnObjects?: boolean }) => string | any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cache for loaded translations to avoid re-loading
const translationCache: Record<Language, Record<string, any> | null> = {
  en: null,
  fr: null,
};

// Default language detection from URL
function detectLanguageFromURL(): Language {
  // Check URL first (most reliable)
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(fr|en)/);
  if (langMatch) {
    return langMatch[1] as Language;
  }
  
  // Check localStorage
  const saved = localStorage.getItem('nukleo-language');
  if (saved === 'fr' || saved === 'en') {
    return saved;
  }
  
  // Default to English for routes without language prefix
  return 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(detectLanguageFromURL);
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  // Load translations with caching - prioritize current language
  useEffect(() => {
    // If translations are already cached, use them immediately
    if (translationCache[language]) {
      setTranslations(translationCache[language]!);
      setTranslationsLoaded(true);
      return;
    }

    // Load translations asynchronously but cache them
    // Don't set loaded to false if we're switching languages and have a fallback
    const hasFallback = translationCache.en || translationCache.fr;
    if (!hasFallback) {
      setTranslationsLoaded(false);
    }
    
    import(`../locales/${language}.json`)
      .then((module) => {
        if (module.default && typeof module.default === 'object') {
          translationCache[language] = module.default;
          setTranslations(module.default);
          setTranslationsLoaded(true);
        } else {
          console.error(`Invalid translation format for ${language}`);
          // Fallback to English if available in cache
          if (translationCache.en) {
            setTranslations(translationCache.en);
            setTranslationsLoaded(true);
          } else {
            import('../locales/en.json')
              .then((module) => {
                translationCache.en = module.default || {};
                setTranslations(module.default || {});
                setTranslationsLoaded(true);
              })
              .catch(() => {
                setTranslations({});
                setTranslationsLoaded(true);
              });
          }
        }
      })
      .catch((error) => {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English if available in cache
        if (translationCache.en) {
          setTranslations(translationCache.en);
          setTranslationsLoaded(true);
        } else {
          import('../locales/en.json')
            .then((module) => {
              translationCache.en = module.default || {};
              setTranslations(module.default || {});
              setTranslationsLoaded(true);
            })
            .catch(() => {
              setTranslations({});
              setTranslationsLoaded(true);
            });
        }
      });
  }, [language]);

  // Preload the other language in the background for faster switching
  useEffect(() => {
    const otherLang: Language = language === 'fr' ? 'en' : 'fr';
    if (!translationCache[otherLang]) {
      import(`../locales/${otherLang}.json`)
        .then((module) => {
          if (module.default && typeof module.default === 'object') {
            translationCache[otherLang] = module.default;
          }
        })
        .catch(() => {
          // Silently fail - we'll load it when needed
        });
    }
  }, [language]);

  // Extract language from URL on mount and when location changes
  useEffect(() => {
    // Skip admin routes
    if (location.startsWith('/admin')) {
      return;
    }
    
    const langMatch = location.match(/^\/(fr|en)/);
    if (langMatch) {
      const urlLang = langMatch[1] as Language;
      if (urlLang !== language) {
        setLanguageState(urlLang);
        localStorage.setItem('nukleo-language', urlLang);
      }
    } else {
      // No language prefix, force English for all routes without /fr/ prefix
      setLanguageState('en');
      localStorage.setItem('nukleo-language', 'en');
    }
  }, [location]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nukleo-language', lang);
    
    // Update URL
    const pathWithoutLang = location.replace(/^\/(fr|en)/, '') || '/';
    const newPath = lang === 'fr' ? `/fr${pathWithoutLang}` : pathWithoutLang;
    setLocation(newPath);
  };

  // Translation function with nested key support (e.g., "hero.title")
  const t = (key: string, params?: Record<string, string | number> | { returnObjects?: boolean }): string | any => {
    // Check if returnObjects is requested
    const returnObjects = params && typeof params === 'object' && 'returnObjects' in params && params.returnObjects === true;
    const actualParams = returnObjects ? undefined : params as Record<string, string | number> | undefined;
    
    // If translations are not loaded yet, return empty string/array to prevent showing keys
    // This prevents the flash of translation keys while loading
    if (!translationsLoaded || !translations || Object.keys(translations).length === 0) {
      return returnObjects ? [] : '';
    }
    
    // Support nested keys like "hero.title"
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Key not found, log in development and return empty string/array instead of key
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation missing for key: ${key} (language: ${language})`);
        }
        return returnObjects ? [] : '';
      }
    }
    
    // If we reached here but value is undefined/null, return empty string/array
    if (value === undefined || value === null) {
      return returnObjects ? [] : '';
    }
    
    // If returnObjects is true and value is an object/array, return it directly
    if (returnObjects) {
      // Ensure we return an array if value exists, otherwise empty array
      if (Array.isArray(value)) {
        return value;
      }
      // If value exists but is not an array, return empty array to prevent .map() errors
      return [];
    }
    
    // Otherwise, return as string
    let translation = typeof value === 'string' ? value : String(value || '');
    
    // Replace parameters
    if (actualParams) {
      Object.entries(actualParams).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

