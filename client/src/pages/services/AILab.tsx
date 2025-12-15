import { ArrowRight, Cpu, Database, Network, Zap, Brain, Code2, Shield } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function AILabService() {
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
          <div className="flex items-center gap-2 text-cyan-400 mb-6">
            <Cpu className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">{t('services.aiLab.badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('services.aiLab.heroTitle')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {t('services.aiLab.heroTitleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {t('services.aiLab.heroDescription')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                {t('services.aiLab.ctaStart')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/services/ai-lab')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.aiLab.ctaLearnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.aiLab.capabilitiesTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: t('services.aiLab.capabilities.aiAgents.title'),
                description: t('services.aiLab.capabilities.aiAgents.description')
              },
              {
                icon: Database,
                title: t('services.aiLab.capabilities.dataPlatforms.title'),
                description: t('services.aiLab.capabilities.dataPlatforms.description')
              },
              {
                icon: Network,
                title: t('services.aiLab.capabilities.apiIntegration.title'),
                description: t('services.aiLab.capabilities.apiIntegration.description')
              },
              {
                icon: Code2,
                title: t('services.aiLab.capabilities.customModels.title'),
                description: t('services.aiLab.capabilities.customModels.description')
              },
              {
                icon: Zap,
                title: t('services.aiLab.capabilities.performance.title'),
                description: t('services.aiLab.capabilities.performance.description')
              },
              {
                icon: Shield,
                title: t('services.aiLab.capabilities.security.title'),
                description: t('services.aiLab.capabilities.security.description')
              }
            ].map((capability, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <capability.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{capability.title}</h3>
                <p className="text-white/70">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.aiLab.techStackTitle')}</h2>
          <p className="text-white/70 mb-12 max-w-3xl">
            {t('services.aiLab.techStackDescription')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t('services.aiLab.techStack.aiMl.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.aiLab.techStack.aiMl.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t('services.aiLab.techStack.dataInfrastructure.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.aiLab.techStack.dataInfrastructure.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">{t('services.aiLab.techStack.development.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.aiLab.techStack.development.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.aiLab.approachTitle')}</h2>
          
          <div className="space-y-8">
            {[
              {
                step: t('services.aiLab.steps.discovery.step'),
                title: t('services.aiLab.steps.discovery.title'),
                description: t('services.aiLab.steps.discovery.description')
              },
              {
                step: t('services.aiLab.steps.poc.step'),
                title: t('services.aiLab.steps.poc.title'),
                description: t('services.aiLab.steps.poc.description')
              },
              {
                step: t('services.aiLab.steps.development.step'),
                title: t('services.aiLab.steps.development.title'),
                description: t('services.aiLab.steps.development.description')
              },
              {
                step: t('services.aiLab.steps.deployment.step'),
                title: t('services.aiLab.steps.deployment.title'),
                description: t('services.aiLab.steps.deployment.description')
              },
              {
                step: t('services.aiLab.steps.support.step'),
                title: t('services.aiLab.steps.support.title'),
                description: t('services.aiLab.steps.support.description')
              }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-cyan-400/20">{phase.step}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{phase.title}</h3>
                  <p className="text-white/70">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('services.aiLab.ctaTitle')}
          </h2>
          <p className="text-xl text-white/70 mb-8">
            {t('services.aiLab.ctaDescription')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                {t('services.aiLab.ctaButton1')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/projects')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.aiLab.ctaButton2')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
