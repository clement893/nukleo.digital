import { ArrowRight, Sparkles, Palette, PenTool, Camera, Film, Image, Target, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Breadcrumb from "@/components/Breadcrumb";

export default function AILabService() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4 px-4">
        <Breadcrumb items={[
          { name: t('nav.services') || 'Services', url: '/services' },
          { name: t('services.aiLab.badge') || 'STUDIO', url: '/services/ai-lab' }
        ]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-pink-400 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">{t('services.aiLab.badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('services.aiLab.heroTitle')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
              {t('services.aiLab.heroTitleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-pink-400/90 mb-4 font-medium">
            {t('services.aiLab.heroSubtitle')}
          </p>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {t('services.aiLab.heroDescription')}
          </p>
          
          {/* Client Needs */}
          <div className="mt-8">
            <ul className="space-y-3 text-white/70">
              {(t('services.aiLab.clientNeeds.items', { returnObjects: true }) as string[] || []).map((need: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
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
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.aiLab.approachTitle')}</h2>
          <p className="text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
            {t('services.aiLab.approachDescription')}
          </p>
          
          {/* 4 Pillars */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                number: t('services.aiLab.pillars.vision.number'),
                title: t('services.aiLab.pillars.vision.title'),
                description: t('services.aiLab.pillars.vision.description'),
              },
              {
                number: t('services.aiLab.pillars.craft.number'),
                title: t('services.aiLab.pillars.craft.title'),
                description: t('services.aiLab.pillars.craft.description'),
              },
              {
                number: t('services.aiLab.pillars.coherence.number'),
                title: t('services.aiLab.pillars.coherence.title'),
                description: t('services.aiLab.pillars.coherence.description'),
              },
              {
                number: t('services.aiLab.pillars.impact.number'),
                title: t('services.aiLab.pillars.impact.title'),
                description: t('services.aiLab.pillars.impact.description'),
              },
            ].map((pillar, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-4xl font-bold text-pink-400/30 mb-4">{pillar.number}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{pillar.title}</h3>
                <p className="text-white/60">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.aiLab.expertiseTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Sparkles,
                title: t('services.aiLab.expertise.branding.title'),
                description: t('services.aiLab.expertise.branding.description'),
                deliverables: t('services.aiLab.expertise.branding.deliverables'),
              },
              {
                icon: PenTool,
                title: t('services.aiLab.expertise.uiux.title'),
                description: t('services.aiLab.expertise.uiux.description'),
                deliverables: t('services.aiLab.expertise.uiux.deliverables'),
              },
              {
                icon: Camera,
                title: t('services.aiLab.expertise.artDirection.title'),
                description: t('services.aiLab.expertise.artDirection.description'),
                deliverables: t('services.aiLab.expertise.artDirection.deliverables'),
              },
              {
                icon: Film,
                title: t('services.aiLab.expertise.campaigns.title'),
                description: t('services.aiLab.expertise.campaigns.description'),
                deliverables: t('services.aiLab.expertise.campaigns.deliverables'),
              },
              {
                icon: Image,
                title: t('services.aiLab.expertise.motion.title'),
                description: t('services.aiLab.expertise.motion.description'),
                deliverables: t('services.aiLab.expertise.motion.deliverables'),
              },
              {
                icon: Palette,
                title: t('services.aiLab.expertise.production.title'),
                description: t('services.aiLab.expertise.production.description'),
                deliverables: t('services.aiLab.expertise.production.deliverables'),
              },
            ].map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <ServiceIcon className="w-12 h-12 text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 mb-4">{service.description}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/50">
                      <span className="font-semibold text-white/70">Livrables :</span> {service.deliverables}
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
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.aiLab.teamTitle')}</h2>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            {t('services.aiLab.teamDescription')}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.aiLab.processTitle')}</h2>
          
          <div className="space-y-8">
            {[
              {
                step: t('services.aiLab.process.discovery.step'),
                title: t('services.aiLab.process.discovery.title'),
                description: t('services.aiLab.process.discovery.description'),
              },
              {
                step: t('services.aiLab.process.concept.step'),
                title: t('services.aiLab.process.concept.title'),
                description: t('services.aiLab.process.concept.description'),
              },
              {
                step: t('services.aiLab.process.design.step'),
                title: t('services.aiLab.process.design.title'),
                description: t('services.aiLab.process.design.description'),
              },
              {
                step: t('services.aiLab.process.delivery.step'),
                title: t('services.aiLab.process.delivery.title'),
                description: t('services.aiLab.process.delivery.description'),
              },
            ].map((phase, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-pink-400/30">{phase.step}</div>
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
            {t('services.aiLab.ctaTitle')}
          </h2>
          <p className="text-xl text-white/70 mb-8">
            {t('services.aiLab.ctaDescription')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
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
