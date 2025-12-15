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
  
  // Get translations with fallbacks
  const heroTitle = t('services.heroTitle') || 'Trois expertises,';
  const heroSubtitle = t('services.heroSubtitle') || 'une vision.';
  const heroSubtitleGradient = t('services.heroSubtitleGradient') || 'Lab · Studio · Bureau';
  const heroDescription = t('services.heroDescription') || 'Développement, création, stratégie — trois équipes complémentaires pour accompagner votre transformation digitale de A à Z. Choisissez l\'expertise dont vous avez besoin, ou combinez-les pour un projet complet.';
  const ourServices = t('services.ourServices') || 'Nos Services';
  
  const entities = [
    {
      id: 'lab',
      number: t('services.lab.number') || '01',
      name: t('services.lab.category') || 'The Lab',
      tagline: t('services.lab.tagline') || 'Développement & Technologie',
      icon: Code,
      description: t('services.lab.description') || 'Notre équipe de développeurs construit les solutions digitales qui font tourner votre business. Applications mobiles, plateformes web, intégrations, automatisation.',
      link: '/services/ai-lab',
      services: [
        {
          icon: Smartphone,
          title: t('services.lab.services.mobileApps.title') || 'Applications Mobiles',
          description: t('services.lab.services.mobileApps.description') || 'Apps iOS, Android et cross-platform avec une UX exceptionnelle',
        },
        {
          icon: Globe,
          title: t('services.lab.services.webApps.title') || 'Applications Web',
          description: t('services.lab.services.webApps.description') || 'Plateformes web robustes et scalables sur mesure',
        },
        {
          icon: Link2,
          title: t('services.lab.services.integrations.title') || 'Intégrations & APIs',
          description: t('services.lab.services.integrations.description') || 'Connexion de vos outils pour un écosystème fluide',
        },
        {
          icon: Zap,
          title: t('services.lab.services.automation.title') || 'Automatisation',
          description: t('services.lab.services.automation.description') || 'Automatisation des tâches répétitives pour gagner du temps',
        },
      ],
      cta: t('services.lab.cta') || 'Explorer le Lab',
    },
    {
      id: 'studio',
      number: t('services.studio.number') || '02',
      name: t('services.studio.category') || 'The Studio',
      tagline: t('services.studio.tagline') || 'Design & Création',
      icon: Palette,
      description: t('services.studio.description') || 'Nos créatifs donnent vie à vos idées. Branding, UX/UI, direction artistique, campagnes visuelles — des expériences de marque qui marquent les esprits.',
      link: '/services/creative-studio',
      services: [
        {
          icon: Sparkles,
          title: t('services.studio.services.branding.title') || 'Branding & Identité',
          description: t('services.studio.services.branding.description') || 'Logos, chartes graphiques et univers de marque mémorables',
        },
        {
          icon: PenTool,
          title: t('services.studio.services.uiuxDesign.title') || 'UX/UI Design',
          description: t('services.studio.services.uiuxDesign.description') || 'Interfaces intuitives qui transforment les visiteurs en clients',
        },
        {
          icon: Camera,
          title: t('services.studio.services.artDirection.title') || 'Direction Artistique',
          description: t('services.studio.services.artDirection.description') || 'Concepts créatifs et cohérence visuelle sur tous vos supports',
        },
        {
          icon: Film,
          title: t('services.studio.services.campaigns.title') || 'Campagnes & Motion',
          description: t('services.studio.services.campaigns.description') || 'Visuels de campagne et animations qui captent l\'attention',
        },
      ],
      cta: t('services.studio.cta') || 'Explorer le Studio',
    },
    {
      id: 'bureau',
      number: t('services.bureau.number') || '03',
      name: t('services.bureau.category') || 'The Bureau',
      tagline: t('services.bureau.tagline') || 'Stratégie & Marketing',
      icon: Layers,
      description: t('services.bureau.description') || 'Nos stratèges pilotent votre transformation et orchestrent votre communication. Stratégie digitale, marketing, communication — de la vision à l\'exécution.',
      link: '/services/strategic-bureau',
      services: [
        {
          icon: Target,
          title: t('services.bureau.services.digitalStrategy.title') || 'Stratégie Digitale',
          description: t('services.bureau.services.digitalStrategy.description') || 'Vision claire et feuille de route actionnable',
        },
        {
          icon: Users,
          title: t('services.bureau.services.transformation.title') || 'Transformation',
          description: t('services.bureau.services.transformation.description') || 'Accompagnement au changement et adoption des outils',
        },
        {
          icon: TrendingUp,
          title: t('services.bureau.services.digitalMarketing.title') || 'Marketing Digital',
          description: t('services.bureau.services.digitalMarketing.description') || 'Acquisition, SEO, SEA, Social Ads et analytics',
        },
        {
          icon: MessageSquare,
          title: t('services.bureau.services.communication.title') || 'Communication',
          description: t('services.bureau.services.communication.description') || 'Stratégie éditoriale, contenus et community management',
        },
      ],
      cta: t('services.bureau.cta') || 'Explorer le Bureau',
    },
  ];

  const combinations = [
    {
      project: t('services.howItWorks.combinations.brandLaunch.project') || 'Lancement de marque',
      teams: t('services.howItWorks.combinations.brandLaunch.teams') || 'Studio + Bureau',
      deliverables: t('services.howItWorks.combinations.brandLaunch.deliverables') || 'Identité visuelle + stratégie de lancement + campagne',
    },
    {
      project: t('services.howItWorks.combinations.mobileApp.project') || 'Application mobile',
      teams: t('services.howItWorks.combinations.mobileApp.teams') || 'Lab + Studio',
      deliverables: t('services.howItWorks.combinations.mobileApp.deliverables') || 'Développement + UX/UI design',
    },
    {
      project: t('services.howItWorks.combinations.digitalOverhaul.project') || 'Refonte digitale complète',
      teams: t('services.howItWorks.combinations.digitalOverhaul.teams') || 'Lab + Studio + Bureau',
      deliverables: t('services.howItWorks.combinations.digitalOverhaul.deliverables') || 'Nouvelle plateforme + nouveau branding + stratégie marketing',
    },
    {
      project: t('services.howItWorks.combinations.marketingCampaign.project') || 'Campagne marketing',
      teams: t('services.howItWorks.combinations.marketingCampaign.teams') || 'Studio + Bureau',
      deliverables: t('services.howItWorks.combinations.marketingCampaign.deliverables') || 'Visuels + stratégie + déploiement',
    },
  ];

  const howItWorksTitle = t('services.howItWorks.title') || 'Une approche intégrée';
  const howItWorksDescription = t('services.howItWorks.description') || 'Nos trois équipes travaillent main dans la main. Selon votre projet, vous pouvez faire appel à une seule entité ou les combiner pour une solution complète.';
  const ctaTitle = t('services.cta.title') || 'Pas sûr de ce dont vous avez besoin ?';
  const ctaDescription = t('services.cta.description') || 'Discutons de votre projet. Nous vous orienterons vers la bonne équipe — ou la bonne combinaison.';
  const ctaButtonPrimary = t('services.cta.buttonPrimary') || 'Parler à un expert';
  const ctaButtonSecondary = t('services.cta.buttonSecondary') || 'Voir nos réalisations';

  return (
    <PageLayout>
      <SEO 
        title={t('seo.services.title') || 'Services'}
        description={t('seo.services.description') || 'Nos services'}
        keywords="AI services, AI strategy, digital platforms, intelligent operations, AI transformation"
        ogImage="https://nukleo.digital/og-services.jpg"
      />
      <StructuredData data={serviceSchema} />
      
      <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
        {/* Breadcrumb */}
        <div className="container max-w-6xl mx-auto pt-24 pb-4 px-4">
          <Breadcrumb items={[{ name: t('nav.services') || 'Services', url: '/services' }]} />
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-8 pb-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <span className="text-sm font-medium text-white/90">
                {ourServices}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              {heroTitle}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                {heroSubtitle}
              </span>
            </h1>
            
            <p className="text-sm md:text-base text-cyan-400/90 mb-4 font-medium">
              {heroSubtitleGradient}
            </p>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
              {heroDescription}
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
                {howItWorksTitle}
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {howItWorksDescription}
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
                        <td className="py-5 px-6 text-cyan-400 font-medium">{combo.teams}</td>
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
              {ctaTitle}
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLocalizedPath('/contact')}>
                <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 rounded-full text-lg">
                  {ctaButtonPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href={getLocalizedPath('/projects')}>
                <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300 rounded-full text-lg">
                  {ctaButtonSecondary}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
