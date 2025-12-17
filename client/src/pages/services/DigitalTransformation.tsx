import { ArrowRight, Target, CheckCircle2, Compass, Users, TrendingUp, Brain, Shield, Zap } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";

export default function DigitalTransformationService() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <SEO 
        title={t('services.digitalTransformation.title') || 'Digital Transformation | Nukleo Digital'}
        description={t('services.digitalTransformation.description') || 'Consulting and support for digital transformation in the AI age. We guide organizations through their digital transformation journey.'}
        keywords="digital transformation, AI transformation, digital strategy, change management, process modernization, digital consulting"
      />
      <Header />
      
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4 px-4">
        <Breadcrumb items={[
          { name: t('nav.services') || 'Services', url: '/services' },
          { name: t('services.digitalTransformation.title') || 'Digital Transformation', url: '/services/digital-transformation' }
        ]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-blue-400 mb-6">
            <Compass className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">DIGITAL TRANSFORMATION</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('services.digitalTransformation.heroTitle') || 'Digital'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
              {t('services.digitalTransformation.heroTitleHighlight') || 'Transformation'}
            </span>
          </h1>
          
          <p className="text-xl text-blue-400/90 mb-4 font-medium">
            {t('services.digitalTransformation.heroSubtitle') || 'Consulting & Support in the AI Age'}
          </p>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {t('services.digitalTransformation.heroDescription') || 'Navigate your digital transformation journey with expert guidance. We help organizations modernize their operations, integrate AI technologies, and build sustainable competitive advantages in the digital era.'}
          </p>
          
          {/* Client Needs */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t('services.digitalTransformation.clientNeeds.title')}</h2>
            <ul className="space-y-3 text-white/70">
              {(t('services.digitalTransformation.clientNeeds.items', { returnObjects: true }) as string[] || []).map((need: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.digitalTransformation.approachTitle')}</h2>
          <p className="text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
            {t('services.digitalTransformation.approachDescription')}
          </p>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.digitalTransformation.expertiseTitle')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: t('services.digitalTransformation.expertise.strategy.title'),
                description: t('services.digitalTransformation.expertise.strategy.description'),
                technologies: t('services.digitalTransformation.expertise.strategy.technologies'),
              },
              {
                icon: Brain,
                title: t('services.digitalTransformation.expertise.aiIntegration.title'),
                description: t('services.digitalTransformation.expertise.aiIntegration.description'),
                technologies: t('services.digitalTransformation.expertise.aiIntegration.technologies'),
              },
              {
                icon: Zap,
                title: t('services.digitalTransformation.expertise.processModernization.title'),
                description: t('services.digitalTransformation.expertise.processModernization.description'),
                technologies: t('services.digitalTransformation.expertise.processModernization.technologies'),
              },
              {
                icon: Users,
                title: t('services.digitalTransformation.expertise.changeManagement.title'),
                description: t('services.digitalTransformation.expertise.changeManagement.description'),
                technologies: t('services.digitalTransformation.expertise.changeManagement.technologies'),
              },
              {
                icon: TrendingUp,
                title: t('services.digitalTransformation.expertise.digitalCulture.title'),
                description: t('services.digitalTransformation.expertise.digitalCulture.description'),
                technologies: t('services.digitalTransformation.expertise.digitalCulture.technologies'),
              },
              {
                icon: Shield,
                title: t('services.digitalTransformation.expertise.transformationGovernance.title'),
                description: t('services.digitalTransformation.expertise.transformationGovernance.description'),
                technologies: t('services.digitalTransformation.expertise.transformationGovernance.technologies'),
              },
            ].map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <ServiceIcon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 mb-4">{service.description}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/50">
                      <span className="font-semibold text-white/70">Technologies :</span> {service.technologies}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.digitalTransformation.teamTitle')}</h2>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            {t('services.digitalTransformation.teamDescription')}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.digitalTransformation.processTitle')}</h2>
          
          <div className="space-y-8">
            {[
              {
                step: t('services.digitalTransformation.process.assessment.step'),
                title: t('services.digitalTransformation.process.assessment.title'),
                description: t('services.digitalTransformation.process.assessment.description'),
              },
              {
                step: t('services.digitalTransformation.process.strategy.step'),
                title: t('services.digitalTransformation.process.strategy.title'),
                description: t('services.digitalTransformation.process.strategy.description'),
              },
              {
                step: t('services.digitalTransformation.process.execution.step'),
                title: t('services.digitalTransformation.process.execution.title'),
                description: t('services.digitalTransformation.process.execution.description'),
              },
              {
                step: t('services.digitalTransformation.process.adoption.step'),
                title: t('services.digitalTransformation.process.adoption.title'),
                description: t('services.digitalTransformation.process.adoption.description'),
              },
              {
                step: t('services.digitalTransformation.process.optimization.step'),
                title: t('services.digitalTransformation.process.optimization.title'),
                description: t('services.digitalTransformation.process.optimization.description'),
              },
            ].map((phase, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-blue-400/30">{phase.step}</div>
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
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('services.digitalTransformation.ctaTitle')}
          </h2>
          <p className="text-xl text-white/70 mb-8">
            {t('services.digitalTransformation.ctaDescription')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                {t('services.digitalTransformation.ctaButton1')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/services')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.digitalTransformation.ctaButton2')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

