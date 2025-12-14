import { Brain, Code, Palette, TrendingUp, Database, Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createServiceSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Expertise() {
  const { t } = useLanguage();
  const expertiseAreas = [
    {
      icon: Brain,
      translationKey: 'agenticAI',
    },
    {
      icon: Code,
      translationKey: 'aiNative',
    },
    {
      icon: TrendingUp,
      translationKey: 'transformation',
    },
    {
      icon: Palette,
      translationKey: 'creativeStudio',
    },
    {
      icon: Database,
      translationKey: 'dataPlatforms',
    },
    {
      icon: Sparkles,
      translationKey: 'aiConsulting',
    },
  ];

  const expertiseServiceSchema = createServiceSchema({
    name: 'AI Transformation Expertise',
    description: t('seo.expertise.description') || "Discover our AI expertise: Agentic AI systems, AI-native platforms, transformation strategy, creative studio & intelligent data. Proven 4-phase methodology for success.",
    url: 'https://nukleodigital-production.up.railway.app/expertise',
  });

  return (
    <PageLayout>
      <SEO 
        title={t('seo.expertise.title') || "Our AI Expertise | Agentic AI, Platforms & Strategy"}
        description={t('seo.expertise.description') || "Discover our AI expertise: Agentic AI systems, AI-native platforms, transformation strategy, creative studio & intelligent data. Proven 4-phase methodology for success."}
        keywords="AI expertise, agentic AI systems, AI-native platforms, AI transformation strategy, AI methodology"
        ogImage="https://nukleodigital-production.up.railway.app/og-expertise.jpg"
      />
      <StructuredData data={expertiseServiceSchema} />
    <div className="min-h-screen bg-gradient-nukleo">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <Breadcrumb items={[{ name: t('nav.expertise'), url: '/expertise' }]} />
          <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
            Expertise
          </span>

          <h1 className="text-white mb-8 text-5xl md:text-6xl lg:text-7xl font-bold">
            {t('expertise.heroTitle')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              {t('expertise.heroSubtitle')}
            </span>
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            {t('expertise.description')}
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-3xl p-8 lg:p-10 transition-all duration-500"
                >
                  <div className="mb-6 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(`expertise.areas.${area.translationKey}.title`)}
                  </h3>

                  <p className="text-white/75 text-base leading-relaxed mb-6">
                    {t(`expertise.areas.${area.translationKey}.description`)}
                  </p>

                  <div className="space-y-2">
                    {(() => {
                      const capabilities = t(`expertise.areas.${area.translationKey}.capabilities`, { returnObjects: true });
                      const capabilitiesArray = Array.isArray(capabilities) ? capabilities : [];
                      return capabilitiesArray.map((capability: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-white/60 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {capability}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-900/30 to-purple-800/30">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-white mb-6">
              {t('expertise.process.title')}
            </h2>
            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
              {t('expertise.process.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '01', translationKey: 'discover' },
              { number: '02', translationKey: 'design' },
              { number: '03', translationKey: 'develop' },
              { number: '04', translationKey: 'deploy' },
            ].map((step, index) => (
              <div key={index} className="glass rounded-3xl p-6 lg:p-8">
                <div className="text-accent/40 text-sm font-mono mb-4 tracking-widest">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(`expertise.process.steps.${step.translationKey}.title`)}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {t(`expertise.process.steps.${step.translationKey}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="glass rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="text-white mb-6">
              {t('expertise.cta.title')}
            </h2>

            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              {t('expertise.cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/services"
                className="inline-flex items-center gap-2 rounded-full text-lg px-10 py-6 bg-accent/10 border border-accent/30 text-white hover:bg-accent/20 transition-all duration-500 font-bold tracking-wider"
              >
                {t('expertise.cta.viewServices')}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full text-lg px-10 py-6 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider"
              >
                {t('expertise.cta.getInTouch')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PageLayout>
  );
}
