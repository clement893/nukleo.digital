import { useRoute } from 'wouter';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createArticleSchema } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import SafeHTML from '@/components/SafeHTML';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function ResourceArticle() {
  // Try both routes: /resources/:id and /fr/resources/:id
  const [matchEn, paramsEn] = useRoute('/resources/:id');
  const [matchFr, paramsFr] = useRoute('/fr/resources/:id');
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  // Get params from whichever route matched
  const params = matchEn ? paramsEn : (matchFr ? paramsFr : null);
  const articleId = params?.id || '';
  
  // Map article IDs to translation keys
  const articleMap: Record<string, string> = {
    'agentic-ai-playbook': 'agenticPlaybook',
    'pilot-to-scale': 'pilotToScale',
    'agentic-marketing': 'agenticMarketing',
    'building-agentic-systems': 'buildingAgentic',
    'roi-ai-investment': 'roiInvestment',
  };
  
  const translationKey = articleMap[articleId];
  
  if (!translationKey || !articleId) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-nukleo flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{t('resources.articleNotFound') || 'Article Not Found'}</h1>
            <Link href={getLocalizedPath('/resources')}>
              <a className="text-accent hover:text-white">{t('resources.backToResources') || 'Back to Resources'}</a>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  const title = t(`resources.articles.${translationKey}.title`);
  const description = t(`resources.articles.${translationKey}.description`);
  const readTime = t(`resources.articles.${translationKey}.readTime`);
  const content = t(`resources.articles.${translationKey}.content`, { returnObjects: false }) || description;
  
  // Check if title exists (if empty, article not found)
  if (!title || title.trim() === '') {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-nukleo flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{t('resources.articleNotFound') || 'Article Not Found'}</h1>
            <Link href={getLocalizedPath('/resources')}>
              <a className="text-accent hover:text-white">{t('resources.backToResources') || 'Back to Resources'}</a>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // Get article date from resources list
  const articleDates: Record<string, string> = {
    'agentic-ai-playbook': '2025-01-15',
    'pilot-to-scale': '2025-01-12',
    'agentic-marketing': '2025-01-10',
    'building-agentic-systems': '2025-01-10',
    'roi-ai-investment': '2025-01-05',
  };
  
  const date = articleDates[articleId] || '2025-01-01';
  
  const articleSchema = createArticleSchema({
    headline: title,
    description: description,
    datePublished: date,
    author: {
      name: 'Nukleo Digital',
      url: 'https://nukleodigital-production.up.railway.app',
    },
    publisher: {
      name: 'Nukleo Digital',
      logo: 'https://nukleodigital-production.up.railway.app/logo.png',
    },
    url: `https://nukleodigital-production.up.railway.app/resources/${articleId}`,
  });
  
  return (
    <PageLayout>
      <SEO 
        title={`${title} | ${t('resources.seoTitle') || 'Resources'}`}
        description={description}
        keywords={t('resources.seoKeywords')}
      />
      <StructuredData data={articleSchema} />
      <div className="min-h-screen bg-gradient-nukleo">
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container">
            <Breadcrumb items={[
              { name: t('nav.resources') || 'Resources', url: getLocalizedPath('/resources') },
              { name: title, url: getLocalizedPath(`/resources/${articleId}`) }
            ]} />
            
            <div className="max-w-4xl mx-auto">
              <Link href={getLocalizedPath('/resources')}>
                <a className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-10 transition-colors group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  {t('common.back') || 'Back to Resources'}
                </a>
              </Link>
              
              <div className="mb-8">
                <span className="inline-block px-4 py-2 text-xs font-mono uppercase tracking-wider bg-accent/20 border border-accent/30 text-accent rounded-full">
                  {t(`resources.articles.${translationKey}.category`) || 'Article'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                {title}
              </h1>
              
              <div className="flex items-center gap-4 text-white/60 text-sm mb-12">
                <span className="font-medium">{readTime}</span>
                <span>•</span>
                <span>{new Date(date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="pb-24 lg:pb-32">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
                <div className="prose prose-invert prose-lg max-w-none">
                  {/* Description */}
                  <div className="mb-12 pb-8 border-b border-white/10">
                    <p className="text-white/90 text-xl leading-relaxed font-light">
                      {description}
                    </p>
                  </div>
                  
                  {/* Article content */}
                  {content && content !== description && (
                    <SafeHTML 
                      html={content}
                      className="prose prose-invert prose-base max-w-none 
                        prose-headings:text-white prose-headings:font-bold
                        prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
                        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4 prose-h3:leading-tight
                        prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-8 prose-h4:mb-3
                        prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-base prose-p:mb-6
                        prose-strong:text-white prose-strong:font-semibold
                        prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                        prose-ul:text-white/80 prose-ul:my-6 prose-ul:space-y-3
                        prose-ol:text-white/80 prose-ol:my-6 prose-ol:space-y-3
                        prose-li:text-white/80 prose-li:text-base prose-li:leading-relaxed prose-li:pl-2
                        prose-li:marker:text-accent prose-li:marker:font-bold
                        prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/70 prose-blockquote:my-8"
                    />
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
