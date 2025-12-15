import { ArrowRight, Target, Compass, Users, TrendingUp, MessageSquare, Globe, CheckCircle2 } from "lucide-react";
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4 px-4">
        <Breadcrumb items={[
          { name: t('nav.services') || 'Services', url: '/services' },
          { name: t('services.strategicBureau.badge') || 'BUREAU', url: '/services/strategic-bureau' }
        ]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
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
          
          <p className="text-xl text-purple-400/90 mb-4 font-medium">
            {t('services.strategicBureau.heroSubtitle')}
          </p>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {t('services.strategicBureau.heroDescription')}
          </p>
          
          {/* Client Needs */}
          <div className="mt-8">
            <ul className="space-y-3 text-white/70">
              {(t('services.strategicBureau.clientNeeds.items', { returnObjects: true }) as string[] || []).map((need: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
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
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.strategicBureau.approachTitle')}</h2>
          <p className="text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
            {t('services.strategicBureau.approachDescription')}
          </p>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.strategicBureau.expertiseTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: t('services.strategicBureau.expertise.digitalStrategy.title'),
                description: t('services.strategicBureau.expertise.digitalStrategy.description'),
                deliverables: t('services.strategicBureau.expertise.digitalStrategy.deliverables'),
              },
              {
                icon: Users,
                title: t('services.strategicBureau.expertise.transformation.title'),
                description: t('services.strategicBureau.expertise.transformation.description'),
                deliverables: t('services.strategicBureau.expertise.transformation.deliverables'),
              },
              {
                icon: TrendingUp,
                title: t('services.strategicBureau.expertise.marketingStrategy.title'),
                description: t('services.strategicBureau.expertise.marketingStrategy.description'),
                deliverables: t('services.strategicBureau.expertise.marketingStrategy.deliverables'),
              },
              {
                icon: MessageSquare,
                title: t('services.strategicBureau.expertise.communication.title'),
                description: t('services.strategicBureau.expertise.communication.description'),
                deliverables: t('services.strategicBureau.expertise.communication.deliverables'),
              },
              {
                icon: Globe,
                title: t('services.strategicBureau.expertise.digitalMarketing.title'),
                description: t('services.strategicBureau.expertise.digitalMarketing.description'),
                deliverables: t('services.strategicBureau.expertise.digitalMarketing.deliverables'),
              },
              {
                icon: MessageSquare,
                title: t('services.strategicBureau.expertise.communityManagement.title'),
                description: t('services.strategicBureau.expertise.communityManagement.description'),
                deliverables: t('services.strategicBureau.expertise.communityManagement.deliverables'),
              },
            ].map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <ServiceIcon className="w-12 h-12 text-purple-400 mb-4" />
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
          <h2 className="text-4xl font-bold text-white mb-6">{t('services.strategicBureau.teamTitle')}</h2>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            {t('services.strategicBureau.teamDescription')}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">{t('services.strategicBureau.processTitle')}</h2>
          
          <div className="space-y-8">
            {[
              {
                step: t('services.strategicBureau.process.listen.step'),
                title: t('services.strategicBureau.process.listen.title'),
                description: t('services.strategicBureau.process.listen.description'),
              },
              {
                step: t('services.strategicBureau.process.diagnose.step'),
                title: t('services.strategicBureau.process.diagnose.title'),
                description: t('services.strategicBureau.process.diagnose.description'),
              },
              {
                step: t('services.strategicBureau.process.plan.step'),
                title: t('services.strategicBureau.process.plan.title'),
                description: t('services.strategicBureau.process.plan.description'),
              },
              {
                step: t('services.strategicBureau.process.execute.step'),
                title: t('services.strategicBureau.process.execute.title'),
                description: t('services.strategicBureau.process.execute.description'),
              },
              {
                step: t('services.strategicBureau.process.measure.step'),
                title: t('services.strategicBureau.process.measure.title'),
                description: t('services.strategicBureau.process.measure.description'),
              },
            ].map((phase, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-purple-400/30">{phase.step}</div>
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
            <Link href={getLocalizedPath('/projects')}>
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
