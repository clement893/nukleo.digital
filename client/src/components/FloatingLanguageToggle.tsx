import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function FloatingLanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
  };

  const languages: Record<Language, { label: string; flag: string }> = {
    fr: { label: 'FR', flag: '🇫🇷' },
    en: { label: 'EN', flag: '🇬🇧' },
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Button
        onClick={toggleLanguage}
        variant="outline"
        size="sm"
        className="
          bg-white/10 backdrop-blur-md border-white/20 
          text-white hover:bg-white/20 
          hover:border-white/30
          transition-all duration-300
          shadow-lg hover:shadow-xl
          rounded-full
          px-4 py-2
          gap-2
          group
        "
        aria-label={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
      >
        <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        <span className="text-sm font-medium">
          {languages[language].flag} {languages[language].label}
        </span>
      </Button>
    </div>
  );
}
