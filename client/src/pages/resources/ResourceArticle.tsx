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
                    <>
                      <style>{`
                        .article-content h2 {
                          font-size: 1.75rem;
                          line-height: 1.3;
                          margin-top: 3rem;
                          margin-bottom: 1.5rem;
                          color: #ffffff;
                          font-weight: 700;
                          position: relative;
                          padding-left: 1.25rem;
                          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        }
                        .article-content h2::before {
                          content: '';
                          position: absolute;
                          left: 0;
                          top: 50%;
                          transform: translateY(-50%);
                          width: 4px;
                          height: 1.2em;
                          background: linear-gradient(135deg, #00d4ff, #0099ff);
                          border-radius: 2px;
                        }
                        .article-content h3 {
                          font-size: 1.375rem;
                          line-height: 1.4;
                          margin-top: 2rem;
                          margin-bottom: 1rem;
                          color: #ffffff;
                          font-weight: 600;
                        }
                        .article-content h4 {
                          font-size: 1.125rem;
                          line-height: 1.4;
                          margin-top: 1.5rem;
                          margin-bottom: 0.75rem;
                          color: #ffffff;
                          font-weight: 600;
                        }
                        .article-content p {
                          margin-bottom: 1.25rem;
                          line-height: 1.7;
                          color: rgba(255, 255, 255, 0.85);
                        }
                        .article-content ul,
                        .article-content ol {
                          margin-bottom: 1.75rem;
                          margin-top: 0.5rem;
                          padding-left: 1.5rem;
                        }
                        .article-content li {
                          margin-bottom: 0.75rem;
                          line-height: 1.7;
                          color: rgba(255, 255, 255, 0.85);
                        }
                        .article-content li::marker {
                          color: #00d4ff;
                          font-weight: 700;
                        }
                        .article-content strong {
                          color: #00d4ff;
                          font-weight: 600;
                        }
                        .article-content a {
                          color: #00d4ff;
                          text-decoration: none;
                          font-weight: 500;
                          transition: all 0.2s ease;
                        }
                        .article-content a:hover {
          text-decoration: underline;
          color: #00b8e6;
        }
                      `}</style>
                      <SafeHTML 
                        html={content}
                        className="article-content prose prose-invert prose-base max-w-none 
                          prose-headings:text-white
                          prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:leading-tight
                          prose-h2:!text-[1.75rem] prose-h2:!font-bold prose-h2:!mt-12 prose-h2:!mb-6 prose-h2:!leading-[1.3]
                          prose-h3:!text-[1.375rem] prose-h3:!font-semibold prose-h3:!mt-8 prose-h3:!mb-4 prose-h3:!leading-[1.4]
                          prose-h4:!text-[1.125rem] prose-h4:!font-semibold prose-h4:!mt-6 prose-h4:!mb-3 prose-h4:!leading-[1.4]
                          prose-p:text-white/80 prose-p:leading-[1.7] prose-p:text-base prose-p:mb-5
                          prose-strong:text-accent prose-strong:font-semibold
                          prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                          prose-ul:text-white/80 prose-ul:my-6 prose-ul:space-y-2
                          prose-ol:text-white/80 prose-ol:my-6 prose-ol:space-y-2
                          prose-li:text-white/80 prose-li:text-base prose-li:leading-relaxed prose-li:pl-2 prose-li:mb-2
                          prose-li:marker:text-accent prose-li:marker:font-bold
                          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/70 prose-blockquote:my-8"
                      />
                    </>
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
