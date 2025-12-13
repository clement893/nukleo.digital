import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { Link } from 'wouter';

const clients = [
  {
    name: 'MBAM',
    fullName: 'Musée des beaux-arts de Montréal',
    industry: 'Museum & Culture',
    description: 'Transforming visitor experiences through AI-powered personalization and intelligent content delivery.',
    services: ['AI Strategy', 'Digital Platforms', 'Content Intelligence'],
    results: ['45% increase in visitor engagement', 'Personalized tours for 100K+ visitors', 'Multilingual AI assistant']
  },
  {
    name: 'Summit Law',
    fullName: 'Summit Law Group',
    industry: 'Legal Services',
    description: 'Streamlining legal operations with intelligent document processing and case management automation.',
    services: ['Intelligent Operations', 'AI Automation', 'Document Intelligence'],
    results: ['60% reduction in document processing time', 'Automated contract analysis', 'Enhanced client service']
  },
  {
    name: 'Affilia',
    fullName: 'Affilia Centre de santé',
    industry: 'Healthcare',
    description: 'Enhancing patient care with AI-driven appointment scheduling and personalized health recommendations.',
    services: ['AI Strategy', 'Intelligent Operations', 'Patient Experience'],
    results: ['40% improvement in appointment efficiency', 'Reduced wait times', 'Better patient outcomes']
  },
  {
    name: 'GoCoupons',
    fullName: 'GoCoupons',
    industry: 'E-commerce & Retail',
    description: 'Powering personalized shopping experiences with AI-driven recommendations and dynamic pricing.',
    services: ['AI Marketing', 'Recommendation Engine', 'Dynamic Pricing'],
    results: ['3.5x increase in conversion rate', 'Personalized offers for 500K+ users', '340% ROI increase']
  },
  {
    name: 'Humankind',
    fullName: 'Humankind',
    industry: 'Social Impact',
    description: 'Amplifying social impact through AI-powered community engagement and resource optimization.',
    services: ['AI Strategy', 'Community Intelligence', 'Impact Analytics'],
    results: ['2x community engagement', 'Optimized resource allocation', 'Data-driven impact measurement']
  },
  {
    name: 'CDÉNÉ',
    fullName: 'Centre de développement des entreprises',
    industry: 'Business Development',
    description: 'Accelerating business growth with AI-driven insights and intelligent matchmaking.',
    services: ['AI Strategy', 'Business Intelligence', 'Matchmaking Algorithms'],
    results: ['50% faster business matching', 'Enhanced entrepreneur support', 'Data-driven growth strategies']
  },
  {
    name: 'MatchStick',
    fullName: 'MatchStick Marketing',
    industry: 'Marketing Agency',
    description: 'Scaling creative production with AI-augmented content creation and campaign optimization.',
    services: ['AI Marketing', 'Content Generation', 'Campaign Intelligence'],
    results: ['10x content production capacity', 'Automated A/B testing', 'Improved campaign ROI']
  },
  {
    name: 'Recrute Action',
    fullName: 'Recrute Action',
    industry: 'Recruitment',
    description: 'Revolutionizing talent acquisition with AI-powered candidate matching and screening.',
    services: ['AI Automation', 'Candidate Intelligence', 'Screening Algorithms'],
    results: ['70% reduction in screening time', 'Better candidate matches', 'Enhanced recruiter productivity']
  },
  {
    name: 'Spruce',
    fullName: 'Spruce Technology',
    industry: 'Technology',
    description: 'Building next-generation AI-native platforms for modern businesses.',
    services: ['AI-Native Platforms', 'System Architecture', 'Technical Consulting'],
    results: ['Scalable AI infrastructure', 'Reduced technical debt', 'Faster time-to-market']
  },
  {
    name: 'Succès Scolaire',
    fullName: 'Succès Scolaire',
    industry: 'Education',
    description: 'Personalizing learning experiences with AI-powered tutoring and adaptive content.',
    services: ['AI Strategy', 'Adaptive Learning', 'Student Intelligence'],
    results: ['Personalized learning paths', 'Improved student outcomes', 'Efficient tutor matching']
  },
  {
    name: 'Toit à moi',
    fullName: 'Toit à moi',
    industry: 'Real Estate',
    description: 'Transforming property search with AI-driven recommendations and market intelligence.',
    services: ['AI Marketing', 'Property Intelligence', 'Market Analytics'],
    results: ['Smarter property matching', 'Market trend predictions', 'Enhanced buyer experience']
  },
  {
    name: 'Ukko Solutions',
    fullName: 'Ukko Solutions',
    industry: 'Technology Consulting',
    description: 'Delivering AI-powered business solutions and digital transformation services.',
    services: ['AI Strategy', 'Digital Transformation', 'Technical Consulting'],
    results: ['Accelerated digital transformation', 'AI-driven insights', 'Competitive advantage']
  },
];

export default function Clients() {
  const { t } = useLanguage();
  const { getLocalizedPath } = useLocalizedPath();

  return (
    <PageLayout>
      <SEO 
        title={t('clients.seoTitle')}
        description={t('clients.seoDescription')}
        keywords={t('clients.seoKeywords')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white/90">{t('clients.badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">{t('clients.title')}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                {t('clients.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t('clients.description')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                12+
              </div>
              <div className="text-white/70 text-lg">
                {t('clients.stats.clients')}
              </div>
            </div>
            
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
                8+
              </div>
              <div className="text-white/70 text-lg">
                {t('clients.stats.industries')}
              </div>
            </div>
            
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
                340%
              </div>
              <div className="text-white/70 text-lg">
                {t('clients.stats.roi')}
              </div>
            </div>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {clients.map((client, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                      {client.name}
                    </h3>
                    <span className="text-xs text-white/50 font-mono tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {client.industry}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{client.fullName}</p>
                </div>

                {/* Description */}
                <p className="text-white/70 mb-6 leading-relaxed">
                  {client.description}
                </p>

                {/* Services */}
                <div className="mb-6">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-3">{t('clients.labels.servicesProvided')}</p>
                  <div className="flex flex-wrap gap-2">
                    {client.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-300"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-3">{t('clients.labels.keyResults')}</p>
                  <ul className="space-y-2">
                    {client.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('clients.cta.title')}
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              {t('clients.cta.description')}
            </p>
            <Link href={getLocalizedPath('/contact')}>
              <a className="inline-block bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.022]">
                {t('clients.cta.button')}
              </a>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
