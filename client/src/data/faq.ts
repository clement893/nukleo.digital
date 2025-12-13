// FAQ data structure
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  categoryKey: string;
}

// Import translations statically
import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';

const getFAQData = (lang: 'fr' | 'en'): FAQItem[] => {
  const translations = lang === 'fr' ? frTranslations : enTranslations;
  const allFaqs: FAQItem[] = [];
  
  const categoryMap: Record<string, string> = {
    agenticAI: translations.faq?.categories?.agenticAI || 'Agentic AI',
    transformation: translations.faq?.categories?.transformation || 'Transformation',
    roi: translations.faq?.categories?.roi || 'ROI',
    technical: translations.faq?.categories?.technical || 'Technical',
    useCases: translations.faq?.categories?.useCases || 'Use Cases',
    aboutNukleo: translations.faq?.categories?.aboutNukleo || 'About Nukleo'
  };
  
  const questionCategories = [
    { key: 'agenticAI', path: 'faq.questions.agenticAI' },
    { key: 'transformation', path: 'faq.questions.transformation' },
    { key: 'roi', path: 'faq.questions.roi' },
    { key: 'technical', path: 'faq.questions.technical' },
    { key: 'useCases', path: 'faq.questions.useCases' },
    { key: 'aboutNukleo', path: 'faq.questions.aboutNukleo' }
  ];

  questionCategories.forEach(({ key, path }) => {
    const keys = path.split('.');
    let value: any = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
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

  return allFaqs;
};

export const getFAQs = (lang: 'fr' | 'en' = 'en'): FAQItem[] => {
  return getFAQData(lang);
};
