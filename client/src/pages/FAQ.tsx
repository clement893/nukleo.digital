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
  
  // Ensure t is a function
  if (typeof t !== 'function') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] flex items-center justify-center">
        <div className="text-white">Erreur de chargement...</div>
      </div>
    );
  }

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

  // Build FAQs from translations
  const faqs: FAQItem[] = useMemo(() => {
    const allFaqs: FAQItem[] = [];
    
    if (!translationsData || typeof t !== 'function') return allFaqs;
    
    // Helper to get array/object from translations
    const getTranslationArray = (key: string): any[] => {
      try {
        const keys = key.split('.');
        let value: any = translationsData;
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
    
    try {
      // Agentic AI
      const agenticAI = getTranslationArray('faq.questions.agenticAI');
      if (Array.isArray(agenticAI)) {
        agenticAI.forEach((item: any) => {
          if (item && typeof item === 'object' && item.question && item.answer) {
            const categoryLabel = typeof t === 'function' ? t('faq.categories.agenticAI') : 'Agentic AI';
            allFaqs.push({
              question: String(item.question),
              answer: String(item.answer),
              category: String(categoryLabel || 'Agentic AI'),
              categoryKey: 'agenticAI'
            });
          }
        });
      }

      // Transformation
      const transformation = getTranslationArray('faq.questions.transformation');
      if (Array.isArray(transformation)) {
        transformation.forEach((item: any) => {
          if (item && typeof item === 'object' && item.question && item.answer) {
            const categoryLabel = typeof t === 'function' ? t('faq.categories.transformation') : 'Transformation';
            allFaqs.push({
              question: String(item.question),
              answer: String(item.answer),
              category: String(categoryLabel || 'Transformation'),
              categoryKey: 'transformation'
            });
          }
        });
      }

      // ROI
      const roi = getTranslationArray('faq.questions.roi');
      if (Array.isArray(roi)) {
        roi.forEach((item: any) => {
          if (item && typeof item === 'object' && item.question && item.answer) {
            const categoryLabel = typeof t === 'function' ? t('faq.categories.roi') : 'ROI';
            allFaqs.push({
              question: String(item.question),
              answer: String(item.answer),
              category: String(categoryLabel || 'ROI'),
              categoryKey: 'roi'
            });
          }
        });
      }

      // Technical
      const technical = getTranslationArray('faq.questions.technical');
      if (Array.isArray(technical)) {
        technical.forEach((item: any) => {
          if (item && typeof item === 'object' && item.question && item.answer) {
            const categoryLabel = typeof t === 'function' ? t('faq.categories.technical') : 'Technical';
            allFaqs.push({
              question: String(item.question),
              answer: String(item.answer),
              category: String(categoryLabel || 'Technical'),
              categoryKey: 'technical'
            });
          }
        });
      }

      // Use Cases
      const useCases = getTranslationArray('faq.questions.useCases');
      if (Array.isArray(useCases)) {
        useCases.forEach((item: any) => {
          if (item && typeof item === 'object' && item.question && item.answer) {
            const categoryLabel = typeof t === 'function' ? t('faq.categories.useCases') : 'Use Cases';
            allFaqs.push({
              question: String(item.question),
              answer: String(item.answer),
              category: String(categoryLabel || 'Use Cases'),
              categoryKey: 'useCases'
            });
          }
        });
      }

      // About Nukleo
      const aboutNukleo = getTranslationArray('faq.questions.aboutNukleo');
      if (Array.isArray(aboutNukleo)) {
        aboutNukleo.forEach((item: any) => {
          if (item && typeof item === 'object' && item.question && item.answer) {
            const categoryLabel = typeof t === 'function' ? t('faq.categories.aboutNukleo') : 'About Nukleo';
            allFaqs.push({
              question: String(item.question),
              answer: String(item.answer),
              category: String(categoryLabel || 'About Nukleo'),
              categoryKey: 'aboutNukleo'
            });
          }
        });
      }
    } catch (error) {
      console.error('Error building FAQs:', error);
    }

    return allFaqs;
  }, [t, language, translationsData]);

  const categories = useMemo(() => {
    if (!translationsData || typeof t !== 'function') return [];
    return [
      { key: "all", label: String(t('faq.categories.all') || 'All') },
      { key: "agenticAI", label: String(t('faq.categories.agenticAI') || 'Agentic AI') },
      { key: "transformation", label: String(t('faq.categories.transformation') || 'Transformation') },
      { key: "roi", label: String(t('faq.categories.roi') || 'ROI') },
      { key: "technical", label: String(t('faq.categories.technical') || 'Technical') },
      { key: "useCases", label: String(t('faq.categories.useCases') || 'Use Cases') },
      { key: "aboutNukleo", label: String(t('faq.categories.aboutNukleo') || 'About Nukleo') }
    ];
  }, [t, translationsData]);

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.categoryKey === selectedCategory);

  // Build structured data
  const structuredDataFaqs = useMemo(() => {
    return faqs.map(faq => ({ question: String(faq.question), answer: String(faq.answer) }));
  }, [faqs]);

  // Show loading state if translations aren't loaded yet
  if (!translationsData || faqs.length === 0 || categories.length === 0) {
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
