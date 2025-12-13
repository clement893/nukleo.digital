import { Filter } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useState } from 'react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Resources() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const subscribe = trpc.contact.subscribe.useMutation();

  // Helper to get array from translations
  const getArrayTranslation = (key: string): string[] => {
    try {
      const translations = require(`../locales/${language || 'en'}.json`);
      const keys = key.split('.');
      let value: any = translations.default || translations;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return [];
        }
      }
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await subscribe.mutateAsync({ email });
      setIsSubmitted(true);
      setEmail('');
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const tools = [
    {
      badge: t('resources.tools.aiReadiness.badge'),
      title: t('resources.tools.aiReadiness.title'),
      description: t('resources.tools.aiReadiness.description'),
      tags: getArrayTranslation('resources.tools.aiReadiness.tags'),
      link: getLocalizedPath('/ai-readiness'),
      buttonText: t('resources.tools.aiReadiness.buttonText')
    },
    {
      badge: 'AI Trend Radar',
      title: 'AI Trend Radar',
      description: 'Visualisez l\'évolution des technologies IA selon leur maturité et leur impact business. Mise à jour quotidienne avec analyse générée par IA.',
      tags: ['Tendances IA', 'Technologies émergentes', 'Impact business', 'Maturité technologique'],
      link: getLocalizedPath('/ai-trend-radar'),
      buttonText: 'Explorer le Radar'
    },
    {
      badge: t('resources.tools.radar.badge'),
      title: t('resources.tools.radar.title'),
      description: t('resources.tools.radar.description'),
      tags: getArrayTranslation('resources.tools.radar.tags'),
      link: getLocalizedPath('/radar'),
      buttonText: t('resources.tools.radar.buttonText')
    }
  ];

  const categories = [
    { key: 'all', label: t('resources.filter.all') },
    { key: 'industryInsights', label: t('resources.filter.industryInsights') },
    { key: 'technicalGuide', label: t('resources.filter.technicalGuide') },
    { key: 'strategy', label: t('resources.filter.strategy') },
    { key: 'caseStudy', label: t('resources.filter.caseStudy') }
  ];

  const resources = [
    {
      id: 'agentic-ai-playbook',
      category: 'technicalGuide',
      title: t('resources.articles.agenticPlaybook.title'),
      description: t('resources.articles.agenticPlaybook.description'),
      readTime: t('resources.articles.agenticPlaybook.readTime'),
      date: '2025-01-15'
    },
    {
      id: 'pilot-to-scale',
      category: 'strategy',
      title: t('resources.articles.pilotToScale.title'),
      description: t('resources.articles.pilotToScale.description'),
      readTime: t('resources.articles.pilotToScale.readTime'),
      date: '2025-01-12'
    },
    {
      id: 'agentic-marketing',
      category: 'industryInsights',
      title: t('resources.articles.agenticMarketing.title'),
      description: t('resources.articles.agenticMarketing.description'),
      readTime: t('resources.articles.agenticMarketing.readTime'),
      date: '2025-01-10'
    },
    {
      id: 'building-agentic-systems',
      category: 'technicalGuide',
      title: t('resources.articles.buildingAgentic.title'),
      description: t('resources.articles.buildingAgentic.description'),
      readTime: t('resources.articles.buildingAgentic.readTime'),
      date: '2025-01-10'
    },
    {
      id: 'roi-ai-investment',
      category: 'strategy',
      title: t('resources.articles.roiInvestment.title'),
      description: t('resources.articles.roiInvestment.description'),
      readTime: t('resources.articles.roiInvestment.readTime'),
      date: '2025-01-05'
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  return (
    <PageLayout>
      <SEO 
        title={t('resources.seoTitle')}
        description={t('resources.seoDescription')}
        keywords={t('resources.seoKeywords')}
      />
      <div className="min-h-screen bg-gradient-nukleo">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          
          <div className="container relative z-10">
            <Breadcrumb items={[{ name: t('nav.resources') || 'Resources', url: '/resources' }]} />
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/50 rounded-full text-accent text-xs font-mono uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              {t('resources.badge')}
            </div>

            {/* Title */}
            <h1 className="text-[5rem] md:text-[6.5rem] lg:text-[8rem] text-white mb-8 leading-[0.85] font-heading font-bold uppercase">
              {t('resources.title')}
            </h1>

            {/* Description */}
            <p className="text-2xl text-white/70 font-light leading-relaxed max-w-3xl border-l-2 border-accent pl-6">
              {t('resources.description')}
            </p>
          </div>
        </section>

        {/* Interactive Tools Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 relative overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-white rounded-full" />
                {t('resources.tools.sectionLabel')}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {t('resources.tools.title')}
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                {t('resources.tools.description')}
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {tools.map((tool, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-12 flex flex-col">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-6 self-start">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    {tool.badge}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-white/80 mb-8 leading-relaxed flex-grow">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tool.tags && tool.tags.length > 0 && tool.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={tool.link}>
                    <Button className="bg-white text-purple-900 hover:bg-white/90 text-base px-6 py-6 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.022] w-full">
                      {tool.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section (White Background) */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-wider">{t('resources.filter.label')}</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category.key 
                      ? "bg-purple-900 text-white hover:bg-purple-800" 
                      : "bg-transparent text-purple-900 border-purple-900/20 hover:bg-purple-50 hover:border-accent"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid (White Background) */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => {
                const categoryLabel = categories.find(c => c.key === resource.category)?.label || resource.category;
                return (
                  <Link key={resource.id} href={getLocalizedPath(`/resources/${resource.id}`)}>
                    <div className="bg-gray-50 p-12 hover:bg-purple-50 border border-gray-200 hover:border-accent transition-all duration-500 group cursor-pointer h-full flex flex-col rounded-3xl">
                      {/* Badge */}
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-purple-100 text-accent group-hover:bg-accent group-hover:text-white transition-colors rounded-full">
                          {categoryLabel}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors leading-tight">
                        {resource.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-gray-600 leading-relaxed mb-8 flex-grow">
                        {resource.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-200">
                        <span>{resource.readTime}</span>
                        <span>{new Date(resource.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Newsletter Section (Gradient) */}
        <section className="py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 relative overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t('resources.newsletter.title') }} />

              <p className="text-xl text-white/70 leading-relaxed mb-12">
                {t('resources.newsletter.description')}
              </p>

              {isSubmitted && (
                <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-green-300 font-medium text-center">
                    {t('resources.newsletter.success')}
                  </p>
                </div>
              )}

              {subscribe.error && (
                <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-red-300 font-medium text-center">
                    {t('resources.newsletter.error')}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t('resources.newsletter.placeholder')}
                  className="flex-1 px-8 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors text-lg"
                />
                <button 
                  type="submit"
                  disabled={subscribe.isPending}
                  className="px-10 py-5 rounded-full bg-white text-purple-900 font-bold hover:bg-white/90 transition-all duration-300 hover:scale-[1.022] shadow-2xl text-lg disabled:opacity-50"
                >
                  {subscribe.isPending ? t('resources.newsletter.subscribing') : t('resources.newsletter.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
