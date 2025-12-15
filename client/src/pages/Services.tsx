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
      
      <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
        {/* Breadcrumb */}
        <div className="container max-w-6xl mx-auto pt-24 pb-4 px-4">
          <Breadcrumb items={[{ name: t('nav.services'), url: '/services' }]} />
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-8 pb-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
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
            
            <p className="text-sm md:text-base text-cyan-400/90 mb-4 font-medium">
              {t('services.heroSubtitleGradient')}
            </p>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
              {t('services.heroDescription')}
            </p>
          </div>
        </section>

        {/* Three Entities Grid */}
        <section className="py-20 px-4 bg-black/20">
          <div className="container max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {entities.map((entity) => {
                const EntityIcon = entity.icon;
                return (
                  <div 
                    key={entity.id}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-mono text-5xl font-bold text-white/20">{entity.number}</span>
                      <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all">
                        <EntityIcon className="w-8 h-8 text-white/70 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>
                    
                    {/* Title & Tagline */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      {entity.name}
                    </h2>
                    <p className="text-cyan-400/90 font-semibold mb-6 text-lg">{entity.tagline}</p>
                    
                    {/* Description */}
                    <p className="text-white/70 text-base leading-relaxed mb-8">
                      {entity.description}
                    </p>
                    
                    {/* Services List */}
                    <div className="space-y-5 mb-8">
                      {entity.services.map((service, idx) => {
                        const ServiceIcon = service.icon;
                        return (
                          <div key={idx} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                              <ServiceIcon className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-base mb-1">{service.title}</h3>
                              <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* CTA */}
                    <Link href={getLocalizedPath(entity.link)}>
                      <button className="inline-flex items-center gap-2 text-cyan-400 hover:text-white font-semibold transition-colors group/btn text-lg">
                        {entity.cta}
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-black/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('services.howItWorks.title')}
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {t('services.howItWorks.description')}
              </p>
            </div>
            
            {/* Combinations Table */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left py-5 px-6 text-white/80 font-semibold text-sm uppercase tracking-wider">
                        {language === 'fr' ? 'Projet' : 'Project'}
                      </th>
                      <th className="text-left py-5 px-6 text-white/80 font-semibold text-sm uppercase tracking-wider">
                        {language === 'fr' ? 'Équipes' : 'Teams'}
                      </th>
                      <th className="text-left py-5 px-6 text-white/80 font-semibold text-sm uppercase tracking-wider">
                        {language === 'fr' ? 'Livrables' : 'Deliverables'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.map((combo, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors last:border-b-0">
                        <td className="py-5 px-6 text-white font-semibold text-base">{combo.project}</td>
                        <td className="py-5 px-6">
                          <span className="text-cyan-400 font-medium">{combo.teams}</span>
                        </td>
                        <td className="py-5 px-6 text-white/60 text-sm leading-relaxed">{combo.deliverables}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          <div className="container relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLocalizedPath('/contact')}>
                <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 rounded-full text-lg">
                  {t('services.cta.buttonPrimary')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href={getLocalizedPath('/projects')}>
                <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300 rounded-full text-lg">
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
