import { useState, useMemo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSound } from '@/hooks/useSound';
import SEO from '@/components/SEO';
import StructuredData, { createFAQSchema } from '@/components/StructuredData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  categoryKey: string;
}

export default function FAQ() {
  const { t, language } = useLanguage();
  const { getLocalizedPath } = useLocalizedPath();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { playHover, playClick } = useSound();
  const [translationsData, setTranslationsData] = useState<any>(null);

  // Load translations dynamically
  useEffect(() => {
    let cancelled = false;
    import(`../locales/${language || 'en'}.json`)
      .then((module) => {
        if (!cancelled) {
          setTranslationsData(module.default);
        }
      })
      .catch(() => {
        // Fallback to English
        import('../locales/en.json')
          .then((module) => {
            if (!cancelled) {
              setTranslationsData(module.default);
            }
          })
          .catch(() => {
            if (!cancelled) {
              setTranslationsData({});
            }
          });
      });
    
    return () => {
      cancelled = true;
    };
  }, [language]);

  // Helper to get value from translations data
  const getValue = (key: string, data: any): any => {
    if (!data) return null;
    try {
      const keys = key.split('.');
      let value: any = data;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return null;
        }
      }
      return value;
    } catch {
      return null;
    }
  };

  // Build FAQs from translations
  const faqs: FAQItem[] = useMemo(() => {
    const allFaqs: FAQItem[] = [];
    
    if (!translationsData) return allFaqs;
    
    const categoryMap: Record<string, string> = {
      agenticAI: getValue('faq.categories.agenticAI', translationsData) || 'Agentic AI',
      transformation: getValue('faq.categories.transformation', translationsData) || 'Transformation',
      roi: getValue('faq.categories.roi', translationsData) || 'ROI',
      technical: getValue('faq.categories.technical', translationsData) || 'Technical',
      useCases: getValue('faq.categories.useCases', translationsData) || 'Use Cases',
      aboutNukleo: getValue('faq.categories.aboutNukleo', translationsData) || 'About Nukleo'
    };
    
    try {
      const questionCategories = [
        { key: 'agenticAI', path: 'faq.questions.agenticAI' },
        { key: 'transformation', path: 'faq.questions.transformation' },
        { key: 'roi', path: 'faq.questions.roi' },
        { key: 'technical', path: 'faq.questions.technical' },
        { key: 'useCases', path: 'faq.questions.useCases' },
        { key: 'aboutNukleo', path: 'faq.questions.aboutNukleo' }
      ];

      questionCategories.forEach(({ key, path }) => {
        const questions = getValue(path, translationsData);
        if (Array.isArray(questions)) {
          questions.forEach((item: any) => {
            if (item && typeof item === 'object' && item.question && item.answer) {
              allFaqs.push({
                question: String(item.question),
                answer: String(item.answer),
                category: String(categoryMap[key] || key),
                categoryKey: key
              });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error building FAQs:', error);
    }

    return allFaqs;
  }, [translationsData]);

  const categories = useMemo(() => {
    if (!translationsData) return [];
    return [
      { key: "all", label: getValue('faq.categories.all', translationsData) || 'All' },
      { key: "agenticAI", label: getValue('faq.categories.agenticAI', translationsData) || 'Agentic AI' },
      { key: "transformation", label: getValue('faq.categories.transformation', translationsData) || 'Transformation' },
      { key: "roi", label: getValue('faq.categories.roi', translationsData) || 'ROI' },
      { key: "technical", label: getValue('faq.categories.technical', translationsData) || 'Technical' },
      { key: "useCases", label: getValue('faq.categories.useCases', translationsData) || 'Use Cases' },
      { key: "aboutNukleo", label: getValue('faq.categories.aboutNukleo', translationsData) || 'About Nukleo' }
    ];
  }, [translationsData]);

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.categoryKey === selectedCategory);

  // Build structured data
  const structuredDataFaqs = useMemo(() => {
    return faqs.map(faq => ({ question: String(faq.question), answer: String(faq.answer) }));
  }, [faqs]);

  // Show loading state if translations aren't loaded yet
  if (!translationsData || faqs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
      <SEO 
        title={t('faq.seoTitle')}
        description={t('faq.seoDescription')}
        keywords={t('faq.seoKeywords')}
      />
      <StructuredData data={createFAQSchema(structuredDataFaqs)} />
      <Header />
      
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
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
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
            ))}
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

      <Footer />
    </div>
  );
}
