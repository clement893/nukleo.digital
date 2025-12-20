import { useRoute, Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { allTerms } from '@/data/glossary';
import SEO from '@/components/SEO';
import StructuredData, { createArticleSchema, createFAQSchema, createBreadcrumbSchema } from '@/components/StructuredData';
import { ArrowLeft, Bookmark, Share2, ExternalLink, Lightbulb, HelpCircle, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function GlossaryTerm() {
  const [, params] = useRoute('/glossary/:termId');
  const termId = params?.termId;
  const term = allTerms.find(t => t.id === termId);
  const getLocalizedPath = useLocalizedPath();

  const [bookmarkedTerms, setBookmarkedTerms] = useState<string[]>(() => {
    const saved = localStorage.getItem('glossary-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (id: string) => {
    const newBookmarks = bookmarkedTerms.includes(id)
      ? bookmarkedTerms.filter(bid => bid !== id)
      : [...bookmarkedTerms, id];
    setBookmarkedTerms(newBookmarks);
    localStorage.setItem('glossary-bookmarks', JSON.stringify(newBookmarks));
  };

  const handleShare = async () => {
    if (navigator.share && term) {
      try {
        await navigator.share({
          title: `${term.term} - AI Glossary`,
          text: term.shortDefinition,
          url: window.location.href
        });
      } catch (err) {
        logger.tagged('GlossaryTerm').warn('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!term) {
    return (
      <PageLayout>
        <div className="container py-32 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Term Not Found</h1>
          <p className="text-white/70 mb-8">The term you're looking for doesn't exist.</p>
          <Link href={getLocalizedPath('/glossary')}>
            <Button className="bg-accent text-white hover:bg-accent/90">
              Back to Glossary
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Structured data schemas
  const articleSchema = createArticleSchema({
    title: term.term,
    description: term.shortDefinition,
    url: `https://nukleo.digital/glossary/${term.id}`,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
    keywords: [term.term, term.category, 'AI', 'artificial intelligence', ...term.relatedTerms],
  });

  const faqSchema = createFAQSchema(
    term.faq.map(f => ({
      question: f.question,
      answer: f.answer,
    }))
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://nukleo.digital' },
    { name: 'Glossary', url: 'https://nukleo.digital/glossary' },
    { name: term.term, url: `https://nukleo.digital/glossary/${term.id}` },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  };

  const relatedTermsData = term.relatedTerms
    .map(id => allTerms.find(t => t.id === id))
    .filter(Boolean);

  return (
    <PageLayout>
      <SEO 
        title={`${term.term} | AI Glossary`}
        description={term.shortDefinition}
        keywords={`${term.term}, ${term.category}, AI terminology, artificial intelligence, machine learning, ${term.relatedTerms.join(', ')}`}
        ogType="article"
        article={{
          publishedTime: '2024-01-01T00:00:00Z',
          modifiedTime: new Date().toISOString(),
          section: term.category,
          tags: [term.term, term.category, term.difficulty],
        }}
      />
      <StructuredData data={articleSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          
          <div className="container relative z-10">
            {/* Back Button */}
            <Link href={getLocalizedPath('/glossary')}>
              <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm uppercase tracking-wider">Back to Glossary</span>
              </button>
            </Link>

            {/* Category & Difficulty */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="inline-block px-4 py-2 text-sm font-mono uppercase tracking-wider bg-accent/20 text-accent rounded-full border border-accent/30">
                {term.category}
              </span>
              <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full border ${getDifficultyColor(term.difficulty)}`}>
                {getDifficultyIcon(term.difficulty)} {term.difficulty}
              </span>
            </div>

            {/* Term Name */}
            <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] text-white mb-6 leading-[0.9] font-heading font-bold">
              {term.term}
            </h1>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => toggleBookmark(term.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-accent text-white transition-all duration-300"
              >
                <Bookmark 
                  className={`w-4 h-4 ${bookmarkedTerms.includes(term.id) ? 'fill-accent text-accent' : ''}`} 
                />
                <span className="text-sm font-medium">
                  {bookmarkedTerms.includes(term.id) ? 'Bookmarked' : 'Bookmark'}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-accent text-white transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </section>

        {/* Content Section (White Background) */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Quick Definition */}
              <div className="mb-16 p-8 bg-purple-50 border-l-4 border-accent rounded-r-2xl">
                <h2 className="text-sm font-mono uppercase tracking-wider text-accent mb-4">Quick Definition</h2>
                <p className="text-2xl text-gray-900 leading-relaxed font-light">
                  {term.shortDefinition}
                </p>
              </div>

              {/* Detailed Explanation */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-accent" />
                  Detailed Explanation
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {term.longDefinition}
                </p>
              </div>

              {/* Real-World Examples */}
              {term.examples.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Lightbulb className="w-8 h-8 text-accent" />
                    Real-World Examples
                  </h2>
                  <div className="grid gap-6">
                    {term.examples.map((example, index) => (
                      <div key={index} className="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-accent transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{example.title}</h3>
                          <span className="px-3 py-1 bg-purple-100 text-accent text-xs font-mono uppercase tracking-wider rounded-full">
                            {example.industry}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {example.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {term.faq.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-accent" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {term.faq.map((item, index) => (
                      <div key={index} className="p-8 bg-white border border-gray-200 rounded-2xl hover:border-accent transition-colors">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{item.question}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Terms */}
              {relatedTermsData.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Terms</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedTermsData.map((relatedTerm) => (
                      <Link key={relatedTerm!.id} href={getLocalizedPath(`/glossary/${relatedTerm!.id}`)}>
                        <div className="p-6 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-accent rounded-xl transition-all duration-300 group cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">
                              {relatedTerm!.term}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(relatedTerm!.difficulty)}`}>
                              {getDifficultyIcon(relatedTerm!.difficulty)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedTerm!.shortDefinition}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {term.resources.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Resources & Further Reading</h2>
                  <div className="space-y-4">
                    {term.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target={resource.type === 'external' ? '_blank' : undefined}
                        rel={resource.type === 'external' ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between p-6 bg-white border border-gray-200 hover:border-accent rounded-xl transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                            {resource.type === 'blog' ? (
                              <BookOpen className="w-5 h-5 text-accent group-hover:text-white" />
                            ) : (
                              <ExternalLink className="w-5 h-5 text-accent group-hover:text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                              {resource.title}
                            </p>
                            <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                              {resource.type === 'blog' ? 'Nukleo Blog' : 'External Resource'}
                            </p>
                          </div>
                        </div>
                        <div className="text-accent group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want to apply {term.term} in your business?
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Let's discuss how this technology can drive growth for your organization.
              </p>
              <Link href={getLocalizedPath('/contact')}>
                <Button className="bg-white text-purple-900 hover:bg-white/90 text-lg px-10 py-6 rounded-full font-bold shadow-2xl hover:scale-[1.022] transition-all duration-300">
                  Discuss Your Project
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
