import { ArrowRight, Sparkles, Palette, Video, MessageSquare, Image, Mic, Zap, Globe } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function CreativeStudioService() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  // Helper to get array translations
  const getArrayTranslation = (key: string): string[] => {
    try {
      const translations = require(`../../locales/${language}.json`);
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 text-pink-400 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">{t('services.creativeStudio.badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('services.creativeStudio.heroTitle')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
              {t('services.creativeStudio.heroTitleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {t('services.creativeStudio.heroDescription')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
                {t('services.creativeStudio.ctaLaunch')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/services/creative-studio')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.creativeStudio.ctaLearnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.creativeStudio.coreServicesTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: t('services.creativeStudio.services.agenticMarketing.title'),
                description: t('services.creativeStudio.services.agenticMarketing.description')
              },
              {
                icon: MessageSquare,
                title: t('services.creativeStudio.services.contentGeneration.title'),
                description: t('services.creativeStudio.services.contentGeneration.description')
              },
              {
                icon: Image,
                title: t('services.creativeStudio.services.visualCreation.title'),
                description: t('services.creativeStudio.services.visualCreation.description')
              },
              {
                icon: Video,
                title: t('services.creativeStudio.services.videoAnimation.title'),
                description: t('services.creativeStudio.services.videoAnimation.description')
              },
              {
                icon: Mic,
                title: t('services.creativeStudio.services.audioVoice.title'),
                description: t('services.creativeStudio.services.audioVoice.description')
              },
              {
                icon: Globe,
                title: t('services.creativeStudio.services.omnichannelCampaigns.title'),
                description: t('services.creativeStudio.services.omnichannelCampaigns.description')
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <service.icon className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Process */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.creativeStudio.processTitle')}</h2>
          <p className="text-white/70 mb-12 max-w-3xl">
            {t('services.creativeStudio.processDescription')}
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                phase: t('services.creativeStudio.phases.ideate.title'),
                description: t('services.creativeStudio.phases.ideate.description')
              },
              {
                phase: t('services.creativeStudio.phases.create.title'),
                description: t('services.creativeStudio.phases.create.description')
              },
              {
                phase: t('services.creativeStudio.phases.optimize.title'),
                description: t('services.creativeStudio.phases.optimize.description')
              },
              {
                phase: t('services.creativeStudio.phases.scale.title'),
                description: t('services.creativeStudio.phases.scale.description')
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-pink-400 mb-3">{phase.phase}</div>
                <p className="text-white/70 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.creativeStudio.toolsTitle')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Palette className="w-12 h-12 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">{t('services.creativeStudio.tools.contentGeneration.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.creativeStudio.tools.contentGeneration.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <Zap className="w-12 h-12 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">{t('services.creativeStudio.tools.marketingAutomation.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.creativeStudio.tools.marketingAutomation.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <Globe className="w-12 h-12 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">{t('services.creativeStudio.tools.distribution.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.creativeStudio.tools.distribution.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.creativeStudio.useCasesTitle')}</h2>
          
          <div className="space-y-6">
            {[
              {
                title: t('services.creativeStudio.useCases.contentMarketing.title'),
                description: t('services.creativeStudio.useCases.contentMarketing.description'),
                impact: t('services.creativeStudio.useCases.contentMarketing.impact')
              },
              {
                title: t('services.creativeStudio.useCases.personalizedEmail.title'),
                description: t('services.creativeStudio.useCases.personalizedEmail.description'),
                impact: t('services.creativeStudio.useCases.personalizedEmail.impact')
              },
              {
                title: t('services.creativeStudio.useCases.socialMediaAutomation.title'),
                description: t('services.creativeStudio.useCases.socialMediaAutomation.description'),
                impact: t('services.creativeStudio.useCases.socialMediaAutomation.impact')
              },
              {
                title: t('services.creativeStudio.useCases.dynamicAdCreative.title'),
                description: t('services.creativeStudio.useCases.dynamicAdCreative.description'),
                impact: t('services.creativeStudio.useCases.dynamicAdCreative.impact')
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{useCase.title}</h3>
                <p className="text-white/70 mb-4">{useCase.description}</p>
                <div className="inline-block bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full text-sm font-medium">
                  {useCase.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('services.creativeStudio.ctaTitle')}
          </h2>
          <p className="text-xl text-white/70 mb-8">
            {t('services.creativeStudio.ctaDescription')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
                {t('services.creativeStudio.ctaButton1')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/projects')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.creativeStudio.ctaButton2')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
