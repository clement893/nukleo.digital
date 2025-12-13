import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { useSound } from '@/hooks/useSound';
import SEO from '@/components/SEO';
import StructuredData, { createFAQSchema } from '@/components/StructuredData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { getFAQs } from '@/data/faq';

export default function FAQ() {
  const { t, language } = useLanguage();
  const { getLocalizedPath } = useLocalizedPath();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { playHover, playClick } = useSound();

  // Get FAQs from static data file
  const faqs = useMemo(() => {
    return getFAQs(language);
  }, [language]);

  const categories = useMemo(() => {
    return [
      { key: "all", label: t('faq.categories.all') },
      { key: "agenticAI", label: t('faq.categories.agenticAI') },
      { key: "transformation", label: t('faq.categories.transformation') },
      { key: "roi", label: t('faq.categories.roi') },
      { key: "technical", label: t('faq.categories.technical') },
      { key: "useCases", label: t('faq.categories.useCases') },
      { key: "aboutNukleo", label: t('faq.categories.aboutNukleo') }
    ];
  }, [t]);

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.categoryKey === selectedCategory);

  // Build structured data
  const structuredDataFaqs = useMemo(() => {
    return faqs.map(faq => ({ question: String(faq.question), answer: String(faq.answer) }));
  }, [faqs]);

  return (
    <PageLayout>
      <SEO 
        title={t('faq.seoTitle')}
        description={t('faq.seoDescription')}
        keywords={t('faq.seoKeywords')}
      />
      <StructuredData data={createFAQSchema(structuredDataFaqs)} />
      
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container">
            <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
              {t('faq.sectionLabel')}
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8" dangerouslySetInnerHTML={{ __html: String(t('faq.title') || 'FAQ') }} />

            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
              {t('faq.description')}
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-12">
          <div className="container">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(category.key);
                  }}
                  onMouseEnter={playHover}
                  className={`px-6 py-3 rounded-full font-mono text-sm tracking-wider transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'bg-accent text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="pb-24">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="text-center text-white/70 py-12">
                  <p>{language === 'fr' ? 'Chargement des questions...' : 'Loading questions...'}</p>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={`${faq.categoryKey}-${index}`}
                    className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10"
                  >
                    <button
                      onClick={() => {
                        playClick();
                        setOpenIndex(openIndex === index ? null : index);
                      }}
                      onMouseEnter={playHover}
                      className="w-full px-8 py-6 flex items-center justify-between text-left"
                    >
                      <div className="flex-1 pr-4">
                        <span className="font-mono text-accent text-xs tracking-wider block mb-2">
                          {faq.category}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-accent transition-transform duration-300 flex-shrink-0 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {openIndex === index && (
                      <div className="px-8 pb-6">
                        <p className="text-white/75 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 lg:pb-32">
          <div className="container">
            <div className="glass rounded-3xl p-12 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {t('faq.cta.title')}
              </h2>
              <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
                {t('faq.cta.description')}
              </p>
              <Link href={getLocalizedPath('/contact')}>
                <a className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all duration-300">
                  {t('faq.cta.button')}
                  <span>→</span>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
