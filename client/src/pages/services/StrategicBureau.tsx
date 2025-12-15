import { ArrowRight, Compass, Target, Users, TrendingUp, Shield, Lightbulb, BarChart3, FileCheck } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Breadcrumb from "@/components/Breadcrumb";

export default function StrategicBureauService() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  // Helper to get array translations
  const getArrayTranslation = (key: string): string[] => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4">
        <Breadcrumb items={[
          { name: t('nav.services') || 'Services', url: '/services' },
          { name: t('services.strategicBureau.badge') || 'Le bureau stratégique', url: '/services/strategic-bureau' }
        ]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-4">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 text-purple-400 mb-6">
            <Compass className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">{t('services.strategicBureau.badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('services.strategicBureau.heroTitle')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {t('services.strategicBureau.heroTitleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {t('services.strategicBureau.heroDescription')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                {t('services.strategicBureau.ctaStart')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/services/strategic-bureau')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.strategicBureau.ctaLearnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.strategicBureau.coreServicesTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: t('services.strategicBureau.services.aiStrategy.title'),
                description: t('services.strategicBureau.services.aiStrategy.description')
              },
              {
                icon: BarChart3,
                title: t('services.strategicBureau.services.businessCase.title'),
                description: t('services.strategicBureau.services.businessCase.description')
              },
              {
                icon: Users,
                title: t('services.strategicBureau.services.changeManagement.title'),
                description: t('services.strategicBureau.services.changeManagement.description')
              },
              {
                icon: FileCheck,
                title: t('services.strategicBureau.services.governance.title'),
                description: t('services.strategicBureau.services.governance.description')
              },
              {
                icon: TrendingUp,
                title: t('services.strategicBureau.services.performanceTracking.title'),
                description: t('services.strategicBureau.services.performanceTracking.description')
              },
              {
                icon: Shield,
                title: t('services.strategicBureau.services.riskManagement.title'),
                description: t('services.strategicBureau.services.riskManagement.description')
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <service.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Framework */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.strategicBureau.frameworkTitle')}</h2>
          <p className="text-white/70 mb-12 max-w-3xl">
            {t('services.strategicBureau.frameworkDescription')}
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                phase: t('services.strategicBureau.phases.discover.title'),
                description: t('services.strategicBureau.phases.discover.description')
              },
              {
                phase: t('services.strategicBureau.phases.define.title'),
                description: t('services.strategicBureau.phases.define.description')
              },
              {
                phase: t('services.strategicBureau.phases.deploy.title'),
                description: t('services.strategicBureau.phases.deploy.description')
              },
              {
                phase: t('services.strategicBureau.phases.drive.title'),
                description: t('services.strategicBureau.phases.drive.description')
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-400 mb-3">{phase.phase}</div>
                <p className="text-white/70 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.strategicBureau.deliverablesTitle')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Lightbulb className="w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">{t('services.strategicBureau.deliverables.strategic.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.strategicBureau.deliverables.strategic.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <BarChart3 className="w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">{t('services.strategicBureau.deliverables.operational.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.strategicBureau.deliverables.operational.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <Users className="w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">{t('services.strategicBureau.deliverables.organizational.title')}</h3>
              <ul className="space-y-2 text-white/70">
                {getArrayTranslation('services.strategicBureau.deliverables.organizational.items').map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.strategicBureau.approachTitle')}</h2>
          
          <div className="space-y-8">
            {[
              {
                step: t('services.strategicBureau.steps.assessment.step'),
                title: t('services.strategicBureau.steps.assessment.title'),
                description: t('services.strategicBureau.steps.assessment.description')
              },
              {
                step: t('services.strategicBureau.steps.strategy.step'),
                title: t('services.strategicBureau.steps.strategy.title'),
                description: t('services.strategicBureau.steps.strategy.description')
              },
              {
                step: t('services.strategicBureau.steps.pilot.step'),
                title: t('services.strategicBureau.steps.pilot.title'),
                description: t('services.strategicBureau.steps.pilot.description')
              },
              {
                step: t('services.strategicBureau.steps.scale.step'),
                title: t('services.strategicBureau.steps.scale.title'),
                description: t('services.strategicBureau.steps.scale.description')
              },
              {
                step: t('services.strategicBureau.steps.optimize.step'),
                title: t('services.strategicBureau.steps.optimize.title'),
                description: t('services.strategicBureau.steps.optimize.description')
              }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-purple-400/20">{phase.step}</div>
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
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('services.strategicBureau.ctaTitle')}
          </h2>
          <p className="text-xl text-white/70 mb-8">
            {t('services.strategicBureau.ctaDescription')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                {t('services.strategicBureau.ctaButton1')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/ai-readiness')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.strategicBureau.ctaButton2')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
