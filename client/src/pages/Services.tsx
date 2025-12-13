import { Layers, BarChart3, Globe, Zap, Target, Users, Brain, Code, Workflow, MessageSquare, TrendingUp, Shield, Palette, Sparkles, Camera, PenTool } from 'lucide-react';
import SEO from '@/components/SEO';
import UniversalLEO from '@/components/UniversalLEO';
import { Link } from 'wouter';
import PageLayout from '../components/PageLayout';
import StructuredData, { serviceSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Services() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  const services = [
    {
      category: t('services.bureau.category'),
      subtitle: t('services.bureau.subtitle'),
      icon: Layers,
      description: t('services.bureau.description'),
      link: '/services/strategic-bureau',
      services: [
        {
          icon: Target,
          title: t('services.bureau.services.aiStrategy.title'),
          description: t('services.bureau.services.aiStrategy.description'),
        },
        {
          icon: MessageSquare,
          title: t('services.bureau.services.conversationalAI.title'),
          description: t('services.bureau.services.conversationalAI.description'),
        },
        {
          icon: TrendingUp,
          title: 'Marketing Automation',
          description: 'Automate your marketing workflows with AI-powered campaigns, lead scoring, and personalized content delivery.',
        },
        {
          icon: Brain,
          title: t('services.bureau.services.predictiveAnalytics.title'),
          description: t('services.bureau.services.predictiveAnalytics.description'),
        },
      ],
    },
    {
      category: t('services.lab.category'),
      subtitle: t('services.lab.subtitle'),
      icon: BarChart3,
      description: t('services.lab.description'),
      link: '/services/ai-lab',
      services: [
        {
          icon: Code,
          title: t('services.lab.services.customWebApps.title'),
          description: t('services.lab.services.customWebApps.description'),
        },
        {
          icon: Zap,
          title: t('services.lab.services.apiDevelopment.title'),
          description: t('services.lab.services.apiDevelopment.description'),
        },
        {
          icon: Users,
          title: t('services.lab.services.uxDesign.title'),
          description: t('services.lab.services.uxDesign.description'),
        },
        {
          icon: Shield,
          title: t('services.lab.services.security.title'),
          description: t('services.lab.services.security.description'),
        },
      ],
    },
    {
      category: t('services.studio.category'),
      subtitle: t('services.studio.subtitle'),
      icon: Palette,
      description: t('services.studio.description'),
      link: '/services/creative-studio',
      services: [
        {
          icon: Sparkles,
          title: t('services.studio.services.brandIdentity.title'),
          description: t('services.studio.services.brandIdentity.description'),
        },
        {
          icon: PenTool,
          title: t('services.studio.services.uiuxDesign.title'),
          description: t('services.studio.services.uiuxDesign.description'),
        },
        {
          icon: Camera,
          title: t('services.studio.services.contentCreation.title'),
          description: t('services.studio.services.contentCreation.description'),
        },
        {
          icon: TrendingUp,
          title: t('services.studio.services.campaignDesign.title'),
          description: t('services.studio.services.campaignDesign.description'),
        },
      ],
    },
  ];

  return (
    <PageLayout>
      <SEO 
        title={t('seo.services.title')}
        description={t('seo.services.description')}
        keywords="AI services, AI strategy, digital platforms, intelligent operations, AI transformation"
        ogImage="https://nukleo.digital/og-services.jpg"
      />
      <StructuredData data={serviceSchema} />
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: t('nav.services'), url: '/services' }]} />
        </div>
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-white/90">{t('services.ourServices')}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight italic">
            {t('services.heroTitle')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              {t('services.heroSubtitle')}
            </span>
          </h1>
          
          <p className="text-2xl text-white/70 max-w-3xl leading-relaxed">
            {t('services.heroDescription')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <section key={categoryIndex} className="space-y-12">
                {/* Category Header */}
                <div className="flex items-start gap-6 pb-8 border-b border-white/10">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {category.category}
                    </h2>
                    {category.subtitle && (
                      <p className="text-lg text-accent/80 mb-4 font-medium">
                        {category.subtitle}
                      </p>
                    )}
                    <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                      {category.description}
                    </p>
                    {category.link && (
                      <Link href={category.link}>
                        <button className="mt-6 text-accent hover:text-accent/80 font-semibold inline-flex items-center gap-2 transition-colors">
                          {t('services.explore')} {category.category}
                          <span className="text-xl">→</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {category.services.map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <div
                        key={serviceIndex}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-accent/50 transition-all group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                            <ServiceIcon className="w-6 h-6 text-accent" />
                          </div>
                          <h3 className="text-2xl font-semibold text-white flex-1">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-white/70 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-32">
          <div className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-purple-700/50 rounded-3xl p-12 text-center border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('services.cta.description')}
            </p>
            <Link href={getLocalizedPath('/contact')}>
              <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.022] inline-flex items-center gap-2">
                {t('services.cta.button')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
