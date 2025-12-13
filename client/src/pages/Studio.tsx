import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Sparkles, Palette, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Studio() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  // Helper to get array translations
  const getArrayTranslation = (key: string): string[] => {
    try {
      const translations = require(`../locales/${language}.json`);
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
  const capabilities = [
    {
      icon: Palette,
      title: t('studio.capabilities.contentCreation.title'),
      description: t('studio.capabilities.contentCreation.description')
    },
    {
      icon: Users,
      title: t('studio.capabilities.personalizedExperiences.title'),
      description: t('studio.capabilities.personalizedExperiences.description')
    },
    {
      icon: Zap,
      title: t('studio.capabilities.agenticMarketing.title'),
      description: t('studio.capabilities.agenticMarketing.description')
    },
    {
      icon: Sparkles,
      title: t('studio.capabilities.brandIdentity.title'),
      description: t('studio.capabilities.brandIdentity.description')
    }
  ];

  return (
    <>
      <SEO 
        title={t('studio.title') + ' | ' + t('studio.subtitle') + ' | Nukleo Digital'}
        description={t('studio.heroDescription')}
        keywords="AI content creation, agentic marketing, personalized experiences, AI creative studio, generative AI, content automation"
      />
      
      <Header />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm font-mono text-white/70">03 STUDIO</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t('studio.title')}
              </h1>
              
              <p className="text-2xl md:text-3xl text-accent font-medium mb-8">
                {t('studio.subtitle')}
              </p>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                {t('studio.heroDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">{t('studio.mission')}</h2>
              
              <div className="p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-2xl text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('studio.missionText') }} />
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('studio.capabilities.title')}</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <div 
                      key={index}
                      className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-[1.045] transition-transform">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{capability.title}</h3>
                      <p className="text-white/70 leading-relaxed">{capability.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* The Agentic Marketing Revolution */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">{t('studio.revolution.title')}</h2>
              
              <div className="space-y-8">
                <p className="text-xl text-white/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('studio.revolution.description') }} />

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-accent">{t('studio.revolution.traditional.title')}</h3>
                    <ul className="space-y-3 text-white/70">
                      {getArrayTranslation('studio.revolution.traditional.items').map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-purple-600/10 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-accent">{t('studio.revolution.agentic.title')}</h3>
                    <ul className="space-y-3 text-white/90">
                      {getArrayTranslation('studio.revolution.agentic.items').map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('studio.useCases.title')}</h2>
              
              <div className="space-y-8">
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">01</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{t('studio.useCases.dynamicContent.title')}</h3>
                      <p className="text-white/70 leading-relaxed">
                        {t('studio.useCases.dynamicContent.description')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">02</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{t('studio.useCases.personalizedJourneys.title')}</h3>
                      <p className="text-white/70 leading-relaxed">
                        {t('studio.useCases.personalizedJourneys.description')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">03</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{t('studio.useCases.autonomousOptimization.title')}</h3>
                      <p className="text-white/70 leading-relaxed">
                        {t('studio.useCases.autonomousOptimization.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-purple-950 opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                {t('studio.cta.title')}
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                {t('studio.cta.description')}
              </p>
              <a 
                href={getLocalizedPath('/contact')} 
                className="inline-block px-8 py-4 bg-white text-purple-950 font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.022]"
              >
                {t('studio.cta.button')}
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
