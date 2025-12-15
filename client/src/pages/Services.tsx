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
  
  // Test: Get translations with fallbacks
  const heroTitle = t('services.heroTitle') || 'Trois expertises,';
  const heroSubtitle = t('services.heroSubtitle') || 'une vision.';
  const heroSubtitleGradient = t('services.heroSubtitleGradient') || 'Lab · Studio · Bureau';
  const heroDescription = t('services.heroDescription') || 'Développement, création, stratégie — trois équipes complémentaires pour accompagner votre transformation digitale de A à Z.';
  const ourServices = t('services.ourServices') || 'Nos Services';
  
  const entities = [
    {
      id: 'lab',
      number: t('services.lab.number') || '01',
      name: t('services.lab.category') || 'The Lab',
      tagline: t('services.lab.tagline') || 'Développement & Technologie',
      icon: Code,
      description: t('services.lab.description') || 'Notre équipe de développeurs construit les solutions digitales qui font tourner votre business.',
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
      description: t('services.studio.description') || 'Nos créatifs donnent vie à vos idées. Branding, UX/UI, direction artistique, campagnes visuelles.',
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
      description: t('services.bureau.description') || 'Nos stratèges pilotent votre transformation et orchestrent votre communication.',
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
  const howItWorksDescription = t('services.howItWorks.description') || 'Nos trois équipes travaillent main dans la main.';
  const ctaTitle = t('services.cta.title') || 'Pas sûr de ce dont vous avez besoin ?';
  const ctaDescription = t('services.cta.description') || 'Discutons de votre projet.';
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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        <div className="container mx-auto px-4 pt-24 pb-20">
          <Breadcrumb items={[{ name: t('nav.services') || 'Services', url: '/services' }]} />
          
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-20 mt-12">
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
              <span className="text-sm font-medium text-white">{ourServices}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {heroTitle}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                {heroSubtitle}
              </span>
            </h1>
            
            <p className="text-lg text-cyan-400 mb-4 font-medium">
              {heroSubtitleGradient}
            </p>
            
            <p className="text-xl text-white/80 max-w-3xl">
              {heroDescription}
            </p>
          </div>

          {/* Three Entities */}
          <div className="max-w-7xl mx-auto mb-32">
            <div className="grid lg:grid-cols-3 gap-8">
              {entities.map((entity) => {
                const EntityIcon = entity.icon;
                return (
                  <div key={entity.id} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-5xl font-bold text-white/20">{entity.number}</span>
                      <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center">
                        <EntityIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2">{entity.name}</h2>
                    <p className="text-cyan-400 font-semibold mb-4">{entity.tagline}</p>
                    <p className="text-white/70 mb-8">{entity.description}</p>
                    
                    <div className="space-y-4 mb-8">
                      {entity.services.map((service, idx) => {
                        const ServiceIcon = service.icon;
                        return (
                          <div key={idx} className="flex items-start gap-3">
                            <ServiceIcon className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="text-white font-semibold">{service.title}</h3>
                              <p className="text-white/50 text-sm">{service.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Link href={getLocalizedPath(entity.link)}>
                      <button className="flex items-center gap-2 text-cyan-400 hover:text-white font-semibold">
                        {entity.cta}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              {howItWorksTitle}
            </h2>
            <p className="text-lg text-white/70 mb-12 text-center max-w-3xl mx-auto">
              {howItWorksDescription}
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      {language === 'fr' ? 'Projet' : 'Project'}
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      {language === 'fr' ? 'Équipes' : 'Teams'}
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      {language === 'fr' ? 'Livrables' : 'Deliverables'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {combinations.map((combo, idx) => (
                    <tr key={idx} className="border-b border-white/5">
                      <td className="py-4 px-6 text-white font-medium">{combo.project}</td>
                      <td className="py-4 px-6 text-cyan-400">{combo.teams}</td>
                      <td className="py-4 px-6 text-white/60">{combo.deliverables}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {ctaTitle}
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLocalizedPath('/contact')}>
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 flex items-center justify-center gap-2">
                  {ctaButtonPrimary}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href={getLocalizedPath('/projects')}>
                <button className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10">
                  {ctaButtonSecondary}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
