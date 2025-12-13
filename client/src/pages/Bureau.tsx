import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Compass, Target, Shield, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Bureau() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const services = [
    {
      icon: Target,
      title: t('bureau.services.aiMaturity.title'),
      description: t('bureau.services.aiMaturity.description')
    },
    {
      icon: Compass,
      title: t('bureau.services.transformationStrategy.title'),
      description: t('bureau.services.transformationStrategy.description')
    },
    {
      icon: Shield,
      title: t('bureau.services.governance.title'),
      description: t('bureau.services.governance.description')
    },
    {
      icon: TrendingUp,
      title: t('bureau.services.performanceAnalysis.title'),
      description: t('bureau.services.performanceAnalysis.description')
    }
  ];

  return (
    <>
      <SEO 
        title={t('bureau.title') + ' | ' + t('bureau.subtitle') + ' | Nukleo Digital'}
        description={t('bureau.heroDescription')}
        keywords="AI strategy, digital transformation, AI governance, AI maturity, transformation orchestration, AI consulting"
      />
      
      <Header />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm font-mono text-white/70">02 BUREAU</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t('bureau.title')}
              </h1>
              
              <p className="text-2xl md:text-3xl text-accent font-medium mb-8">
                {t('bureau.subtitle')}
              </p>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                {t('bureau.heroDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">{t('bureau.mission')}</h2>
              
              <div className="p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-2xl text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('bureau.missionText') }} />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('bureau.services.title')}</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div 
                      key={index}
                      className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-[1.045] transition-transform">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-white/70 leading-relaxed">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Journey */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('bureau.journey.title')}</h2>
              
              <div className="space-y-12">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('bureau.journey.discovery.title')}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t('bureau.journey.discovery.description')}
                    </p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('bureau.journey.strategy.title')}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t('bureau.journey.strategy.description')}
                    </p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('bureau.journey.execution.title')}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t('bureau.journey.execution.description')}
                    </p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('bureau.journey.scale.title')}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t('bureau.journey.scale.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">{t('bureau.impact.title')}</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                  <div className="text-5xl font-bold text-accent mb-3">3x</div>
                  <p className="text-white/70">{t('bureau.impact.roi')}</p>
                </div>
                
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                  <div className="text-5xl font-bold text-accent mb-3">50%</div>
                  <p className="text-white/70">{t('bureau.impact.timeToMarket')}</p>
                </div>
                
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                  <div className="text-5xl font-bold text-accent mb-3">10x</div>
                  <p className="text-white/70">{t('bureau.impact.efficiency')}</p>
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
                {t('bureau.cta.title')}
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                {t('bureau.cta.description')}
              </p>
              <a 
                href={getLocalizedPath('/contact')} 
                className="inline-block px-8 py-4 bg-white text-purple-950 font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.022]"
              >
                {t('bureau.cta.button')}
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
