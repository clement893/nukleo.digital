import SEO from '@/components/SEO';
import StructuredData, { createArticleSchema } from '@/components/StructuredData';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import SafeHTML from '@/components/SafeHTML';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { Link } from 'wouter';

export default function Manifesto() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();

  // Helper to get array from translations
  const getTranslationArray = (key: string): string[] => {
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

  const manifestoArticleSchema = createArticleSchema({
    title: t('seo.manifesto.title') || t('manifesto.seoTitle') || 'Notre Manifeste | De l\'Expérimentation à la Mise à l\'Échelle',
    description: t('seo.manifesto.description') || t('manifesto.seoDescription') || 'Découvrez le manifeste Nukleo : notre vision pour la transformation IA qui dépasse les pilotes pour des solutions prêtes pour la production et évolutives.',
    url: 'https://nukleodigital-production.up.railway.app/manifesto',
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    author: 'Nukleo Digital',
    section: 'Manifesto',
    keywords: ['AI transformation', 'manifesto', 'agentic AI', 'AI strategy'],
    image: 'https://nukleodigital-production.up.railway.app/og-image.jpg',
  });

  return (
    <PageLayout>
      <SEO 
        title={t('seo.manifesto.title') || t('manifesto.seoTitle')}
        description={t('seo.manifesto.description') || t('manifesto.seoDescription')}
        keywords={t('manifesto.seoKeywords')}
        ogType="article"
        article={{
          publishedTime: '2024-01-01T00:00:00Z',
          modifiedTime: new Date().toISOString(),
          author: 'Nukleo Digital',
          section: 'Manifesto',
          tags: ['AI transformation', 'manifesto', 'agentic AI'],
        }}
      />
      <StructuredData data={manifestoArticleSchema} />
      <div className="min-h-screen pt-24 pb-20 px-4">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto mb-6">
          <Breadcrumb items={[{ name: t('footer.nav.manifesto') || 'Manifeste', url: '/manifesto' }]} />
        </div>
        
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-white/90">{t('manifesto.sectionLabel')}</span>
          </div>
          
          <SafeHTML html={t('manifesto.title')} tag="h1" className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight" />
          
          <p className="text-2xl text-white/70 max-w-3xl leading-relaxed">
            {t('manifesto.description')}
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white">{t('manifesto.page.eraOver.title')}</h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                {t('manifesto.page.eraOver.paragraph1')}
              </p>
              <p>
                {t('manifesto.page.eraOver.paragraph2')}
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-white mb-6">{t('manifesto.page.newParadigm.title')}</h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                {t('manifesto.page.newParadigm.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">{t('manifesto.page.newParadigm.before')}</h3>
                  <ul className="space-y-2 text-white/60">
                    {getTranslationArray('manifesto.page.newParadigm.beforeItems').map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-accent">{t('manifesto.page.newParadigm.now')}</h3>
                  <ul className="space-y-2 text-white/80">
                    {getTranslationArray('manifesto.page.newParadigm.nowItems').map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white">{t('manifesto.page.vision.title')}</h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                {t('manifesto.page.vision.paragraph1')}
              </p>
              <p>
                {t('manifesto.page.vision.paragraph2')}
              </p>
            </div>
          </section>

          {/* Section 4 - Principles */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white">{t('manifesto.page.principles.title')}</h2>
            <div className="grid gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">{t('manifesto.page.principles.leader.title')}</h3>
                <p className="text-white/70">
                  {t('manifesto.page.principles.leader.description')}
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">{t('manifesto.page.principles.reinvented.title')}</h3>
                <p className="text-white/70">
                  {t('manifesto.page.principles.reinvented.description')}
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">{t('manifesto.page.principles.limitless.title')}</h3>
                <p className="text-white/70">
                  {t('manifesto.page.principles.limitless.description')}
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">{t('manifesto.page.principles.humanCentered.title')}</h3>
                <p className="text-white/70">
                  {t('manifesto.page.principles.humanCentered.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Call to Action */}
          <section className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-purple-700/50 rounded-3xl p-8 md:p-12 text-center border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('manifesto.page.cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('manifesto.page.cta.description')}
            </p>
            <Link href={getLocalizedPath('/start-project')}>
              <a className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.022]">
                {t('manifesto.page.cta.button')}
              </a>
            </Link>
          </section>

          {/* Section 6 - Quote */}
          <section className="border-l-4 border-accent pl-8 py-4">
            <blockquote className="text-2xl md:text-3xl font-light text-white/80 italic leading-relaxed">
              {t('manifesto.page.quote.text')}
            </blockquote>
            <p className="text-white/60 mt-4">{t('manifesto.page.quote.author')}</p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
