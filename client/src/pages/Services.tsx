import { Code, Palette, Layers, ArrowRight, Smartphone, Globe, Zap, Link2, PenTool, Sparkles, Camera, Film, Target, Users, MessageSquare, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import StructuredData, { serviceSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Services() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  const entities = [
    {
      id: 'lab',
      number: t('services.lab.number'),
      name: t('services.lab.category'),
      tagline: t('services.lab.tagline'),
      icon: Code,
      description: t('services.lab.description'),
      link: '/services/ai-lab',
      services: [
        {
          icon: Smartphone,
          title: t('services.lab.services.mobileApps.title'),
          description: t('services.lab.services.mobileApps.description'),
        },
        {
          icon: Globe,
          title: t('services.lab.services.webApps.title'),
          description: t('services.lab.services.webApps.description'),
        },
        {
          icon: Link2,
          title: t('services.lab.services.integrations.title'),
          description: t('services.lab.services.integrations.description'),
        },
        {
          icon: Zap,
          title: t('services.lab.services.automation.title'),
          description: t('services.lab.services.automation.description'),
        },
      ],
      cta: t('services.lab.cta'),
    },
    {
      id: 'studio',
      number: t('services.studio.number'),
      name: t('services.studio.category'),
      tagline: t('services.studio.tagline'),
      icon: Palette,
      description: t('services.studio.description'),
      link: '/services/creative-studio',
      services: [
        {
          icon: Sparkles,
          title: t('services.studio.services.branding.title'),
          description: t('services.studio.services.branding.description'),
        },
        {
          icon: PenTool,
          title: t('services.studio.services.uiuxDesign.title'),
          description: t('services.studio.services.uiuxDesign.description'),
        },
        {
          icon: Camera,
          title: t('services.studio.services.artDirection.title'),
          description: t('services.studio.services.artDirection.description'),
        },
        {
          icon: Film,
          title: t('services.studio.services.campaigns.title'),
          description: t('services.studio.services.campaigns.description'),
        },
      ],
      cta: t('services.studio.cta'),
    },
    {
      id: 'bureau',
      number: t('services.bureau.number'),
      name: t('services.bureau.category'),
      tagline: t('services.bureau.tagline'),
      icon: Layers,
      description: t('services.bureau.description'),
      link: '/services/strategic-bureau',
      services: [
        {
          icon: Target,
          title: t('services.bureau.services.digitalStrategy.title'),
          description: t('services.bureau.services.digitalStrategy.description'),
        },
        {
          icon: Users,
          title: t('services.bureau.services.transformation.title'),
          description: t('services.bureau.services.transformation.description'),
        },
        {
          icon: TrendingUp,
          title: t('services.bureau.services.digitalMarketing.title'),
          description: t('services.bureau.services.digitalMarketing.description'),
        },
        {
          icon: MessageSquare,
          title: t('services.bureau.services.communication.title'),
          description: t('services.bureau.services.communication.description'),
        },
      ],
      cta: t('services.bureau.cta'),
    },
  ];

  // Exemples de combinaisons
  const combinations = [
    {
      project: t('services.howItWorks.combinations.brandLaunch.project'),
      teams: t('services.howItWorks.combinations.brandLaunch.teams'),
      deliverables: t('services.howItWorks.combinations.brandLaunch.deliverables'),
    },
    {
      project: t('services.howItWorks.combinations.mobileApp.project'),
      teams: t('services.howItWorks.combinations.mobileApp.teams'),
      deliverables: t('services.howItWorks.combinations.mobileApp.deliverables'),
    },
    {
      project: t('services.howItWorks.combinations.digitalOverhaul.project'),
      teams: t('services.howItWorks.combinations.digitalOverhaul.teams'),
      deliverables: t('services.howItWorks.combinations.digitalOverhaul.deliverables'),
    },
    {
      project: t('services.howItWorks.combinations.marketingCampaign.project'),
      teams: t('services.howItWorks.combinations.marketingCampaign.teams'),
      deliverables: t('services.howItWorks.combinations.marketingCampaign.deliverables'),
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
      
      <div className="min-h-screen bg-[#1a1a1c] pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumb items={[{ name: t('nav.services'), url: '/services' }]} />
        </div>
        
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-white/90">
              {t('services.ourServices')}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {t('services.heroTitle')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              {t('services.heroSubtitle')}
            </span>
          </h1>
          
          <p className="text-sm md:text-base text-accent/80 mb-4 font-medium">
            {t('services.heroSubtitleGradient')}
          </p>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">
            {t('services.heroDescription')}
          </p>
        </div>

        {/* Three Entities Grid */}
        <div className="max-w-7xl mx-auto px-4 mb-32">
          <div className="grid lg:grid-cols-3 gap-px bg-white/10">
            {entities.map((entity) => {
              const EntityIcon = entity.icon;
              return (
                <div 
                  key={entity.id}
                  className="bg-[#1a1a1c] p-8 lg:p-10 group hover:bg-white/5 transition-all duration-500"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-4xl font-bold text-white/10">{entity.number}</span>
                    <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center group-hover:border-accent transition-colors">
                      <EntityIcon className="w-7 h-7 text-white/60 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                  
                  {/* Title & Tagline */}
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                    {entity.name}
                  </h2>
                  <p className="text-accent/80 font-medium mb-4">{entity.tagline}</p>
                  
                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-8">
                    {entity.description}
                  </p>
                  
                  {/* Services List */}
                  <div className="space-y-4 mb-8">
                    {entity.services.map((service, idx) => {
                      const ServiceIcon = service.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <ServiceIcon className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" />
                          <div>
                            <span className="text-white font-medium text-sm">{service.title}</span>
                            <p className="text-white/40 text-xs">{service.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* CTA */}
                  <Link href={getLocalizedPath(entity.link)}>
                    <button className="inline-flex items-center gap-2 text-accent hover:text-white font-medium transition-colors group/btn">
                      {entity.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <section className="py-20 relative" style={{ backgroundColor: '#29292B' }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-5 invert" />
          
          <div className="container relative z-10 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {t('services.howItWorks.title')}
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                {t('services.howItWorks.description')}
              </p>
            </div>
            
            {/* Combinations Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-white/60 font-medium text-sm">
                      {language === 'fr' ? 'Projet' : 'Project'}
                    </th>
                    <th className="text-left py-4 px-4 text-white/60 font-medium text-sm">
                      {language === 'fr' ? 'Équipes' : 'Teams'}
                    </th>
                    <th className="text-left py-4 px-4 text-white/60 font-medium text-sm">
                      {language === 'fr' ? 'Livrables' : 'Deliverables'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {combinations.map((combo, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{combo.project}</td>
                      <td className="py-4 px-4">
                        <span className="text-accent">{combo.teams}</span>
                      </td>
                      <td className="py-4 px-4 text-white/60 text-sm">{combo.deliverables}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden" style={{ 
          background: 'linear-gradient(135deg, rgb(60,15,15) 0%, rgb(40,60,120) 50%, rgb(60,15,15) 100%)' 
        }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-5 invert" />
          
          <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLocalizedPath('/contact')}>
                <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold hover:bg-white/90 transition-all duration-300">
                  {t('services.cta.buttonPrimary')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href={getLocalizedPath('/projects')}>
                <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300">
                  {t('services.cta.buttonSecondary')}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
