import { Rocket, Building2, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhoWeServeSection() {
  const { t, language } = useLanguage();
  
  const getArrayTranslation = (key: string): string[] => {
    try {
      const translations = require(`../locales/${language || 'en'}.json`);
      const keys = key.split('.');
      let value: any = translations.default || translations;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return [];
        }
      }
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };
  
  const segments = [
    {
      icon: Rocket,
      title: t('whoWeServe.startups.title'),
      description: t('whoWeServe.startups.description'),
      highlights: getArrayTranslation('whoWeServe.startups.highlights')
    },
    {
      icon: Building2,
      title: t('whoWeServe.smbs.title'),
      description: t('whoWeServe.smbs.description'),
      highlights: getArrayTranslation('whoWeServe.smbs.highlights')
    },
    {
      icon: Heart,
      title: t('whoWeServe.nonprofits.title'),
      description: t('whoWeServe.nonprofits.description'),
      highlights: getArrayTranslation('whoWeServe.nonprofits.highlights')
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-32">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-sm font-mono tracking-widest text-purple-400 mb-4">
            {t('whoWeServe.subtitle')}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            {t('whoWeServe.title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: t('whoWeServe.description') }} />
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {segments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <div
                key={index}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-purple-900/30 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-500">
                  <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-500">
                  {segment.title}
                </h3>

                {/* Description */}
                <p className="text-base text-white/70 leading-relaxed mb-6">
                  {segment.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {segment.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/0 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/60 mb-6">
            You don't need a Fortune 500 budget to access world-class AI. Let's level the playing field together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-white/90 text-purple-900 font-semibold transition-all duration-300 hover:scale-[1.022]"
          >
            Discuss Your Project
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
