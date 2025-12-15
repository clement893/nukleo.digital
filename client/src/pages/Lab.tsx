import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cpu, Database, Cog, Workflow } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Lab() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const capabilities = [
    {
      icon: Database,
      title: t('lab.capabilities.dataPlatforms.title'),
      description: t('lab.capabilities.dataPlatforms.description')
    },
    {
      icon: Cpu,
      title: t('lab.capabilities.customAgents.title'),
      description: t('lab.capabilities.customAgents.description')
    },
    {
      icon: Cog,
      title: t('lab.capabilities.integration.title'),
      description: t('lab.capabilities.integration.description')
    },
    {
      icon: Workflow,
      title: t('lab.capabilities.automation.title'),
      description: t('lab.capabilities.automation.description')
    }
  ];

  return (
    <>
      <SEO 
        title={t('lab.title') + ' | ' + t('lab.subtitle') + ' | Nukleo Digital'}
        description={t('lab.heroDescription')}
        keywords="AI lab, AI development, custom AI agents, intelligent automation, AI infrastructure, data platforms"
      />
      
      <Header />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm font-mono text-white/70">01 LAB</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t('lab.title')}
              </h1>
              
              <p className="text-2xl md:text-3xl text-accent font-medium mb-8">
                {t('lab.subtitle')}
              </p>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                {t('lab.heroDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">{t('lab.mission')}</h2>
              
              <div className="p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-2xl text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('lab.missionText') }} />
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('lab.capabilities.title')}</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <div 
                      key={index}
                      className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:scale-[1.045] transition-transform">
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

        {/* Approach Section */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('lab.approach.title')}</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('lab.approach.assess.title')}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t('lab.approach.assess.description')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('lab.approach.build.title')}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t('lab.approach.build.description')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{t('lab.approach.optimize.title')}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {t('lab.approach.optimize.description')}
                    </p>
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
                {t('lab.cta.title')}
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                {t('lab.cta.description')}
              </p>
              <a 
                href={getLocalizedPath('/contact')} 
                className="inline-block px-8 py-4 bg-white text-purple-950 font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.022]"
              >
                {t('lab.cta.button')}
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
