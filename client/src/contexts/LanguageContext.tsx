import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default language detection
function detectLanguage(): Language {
  // Check localStorage first
  const saved = localStorage.getItem('nukleo-language');
  if (saved === 'fr' || saved === 'en') {
    return saved;
  }
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'fr') {
    return 'fr';
  }
  
  // Default to English
  return 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(detectLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Load translations based on current language
  useEffect(() => {
    import(`../locales/${language}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English
        if (language !== 'en') {
          import('../locales/en.json')
            .then((module) => setTranslations(module.default))
            .catch(() => setTranslations({}));
        }
      });
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
      // No language prefix, default to English
      if (language !== 'en') {
        setLanguageState('en');
        localStorage.setItem('nukleo-language', 'en');
      }
    }
  }, [location, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nukleo-language', lang);
    
    // Update URL
    const pathWithoutLang = location.replace(/^\/(fr|en)/, '') || '/';
    const newPath = lang === 'fr' ? `/fr${pathWithoutLang}` : pathWithoutLang;
    setLocation(newPath);
  };

  // Translation function with nested key support (e.g., "hero.title")
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Support nested keys like "hero.title"
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Key not found, return the key itself
        return key;
      }
    }
    
    let translation = typeof value === 'string' ? value : key;
    
    // Replace parameters
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
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
