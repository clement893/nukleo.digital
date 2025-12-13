import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
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

// FAQ data directly in component - English
const faqsEn: FAQItem[] = [
  { question: "What is agentic AI?", answer: "Agentic AI refers to autonomous systems capable of reasoning, planning, and executing complex actions.", category: "Agentic AI", categoryKey: "agenticAI" },
  { question: "How long does implementation take?", answer: "Our accelerated methodology deploys a first operational agent in 90 days.", category: "Transformation", categoryKey: "transformation" },
  { question: "What is the typical ROI?", answer: "Organizations observe on average: 10-15% productivity increase, 30-50% reduction in operational costs.", category: "ROI", categoryKey: "roi" },
  { question: "What technologies do you use?", answer: "Our tech stack combines LLMs (OpenAI GPT-4, Anthropic Claude), Agent frameworks (LangChain, LangGraph), and cloud infrastructure.", category: "Technical", categoryKey: "technical" },
  { question: "What are the most impactful use cases?", answer: "The 5 use cases with the best ROI: Intelligent customer support, Lead qualification, Document processing, Marketing content generation, Internal employee assistant.", category: "Use Cases", categoryKey: "useCases" },
  { question: "What differentiates Nukleo?", answer: "Three key differentiators: Deep technical expertise, Exclusive focus on agentic AI, End-to-end AI-native approach.", category: "About Nukleo", categoryKey: "aboutNukleo" }
];

// FAQ data directly in component - French
const faqsFr: FAQItem[] = [
  { question: "Qu'est-ce que l'IA agentique ?", answer: "L'IA agentique fait référence à des systèmes autonomes capables de raisonner, planifier et exécuter des actions complexes.", category: "IA agentique", categoryKey: "agenticAI" },
  { question: "Combien de temps faut-il pour implémenter ?", answer: "Notre méthodologie accélérée déploie un premier agent opérationnel en 90 jours.", category: "Transformation", categoryKey: "transformation" },
  { question: "Quel est le ROI typique ?", answer: "Les organisations observent en moyenne : augmentation de productivité de 10-15%, réduction des coûts opérationnels de 30-50%.", category: "ROI", categoryKey: "roi" },
  { question: "Quelles technologies utilisez-vous ?", answer: "Notre stack technologique combine LLMs (OpenAI GPT-4, Anthropic Claude), Frameworks d'agents (LangChain, LangGraph), et infrastructure cloud.", category: "Technique", categoryKey: "technical" },
  { question: "Quels sont les cas d'usage les plus impactants ?", answer: "Les 5 cas d'usage avec le meilleur ROI : Support client intelligent, Qualification de leads, Traitement de documents, Génération de contenu marketing, Assistant interne employé.", category: "Cas d'usage", categoryKey: "useCases" },
  { question: "Qu'est-ce qui différencie Nukleo ?", answer: "Trois différenciateurs clés : Expertise technique approfondie, Focus exclusif sur l'IA agentique, Approche IA-native de bout en bout.", category: "À propos de Nukleo", categoryKey: "aboutNukleo" }
];

export default function FAQ() {
  const { t, language } = useLanguage();
  const { getLocalizedPath } = useLocalizedPath();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { playHover, playClick } = useSound();

  const faqs = language === 'fr' ? faqsFr : faqsEn;

  const categories = [
    { key: "all", label: language === 'fr' ? "Tout" : "All" },
    { key: "agenticAI", label: language === 'fr' ? "IA agentique" : "Agentic AI" },
    { key: "transformation", label: language === 'fr' ? "Transformation" : "Transformation" },
    { key: "roi", label: "ROI" },
    { key: "technical", label: language === 'fr' ? "Technique" : "Technical" },
    { key: "useCases", label: language === 'fr' ? "Cas d'usage" : "Use Cases" },
    { key: "aboutNukleo", label: language === 'fr' ? "À propos de Nukleo" : "About Nukleo" }
  ];

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.categoryKey === selectedCategory);

  const structuredDataFaqs = faqs.map(faq => ({ question: faq.question, answer: faq.answer }));

  return (
    <PageLayout>
      <SEO 
        title={language === 'fr' ? "FAQ Transformation IA | Questions Répondues" : "FAQ AI Transformation | Answered Questions"}
        description={language === 'fr' ? "Obtenez des réponses aux questions courantes sur la transformation IA." : "Get answers to common questions about AI transformation."}
        keywords={language === 'fr' ? "FAQ transformation IA, questions implémentation IA" : "FAQ AI transformation, AI implementation questions"}
      />
      <StructuredData data={createFAQSchema(structuredDataFaqs)} />
      
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container">
            <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
              FAQ
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8" dangerouslySetInnerHTML={{ __html: language === 'fr' ? "Tout ce que vous devez<br />savoir sur<br />l'IA agentique" : "Everything you need<br />to know about<br />agentic AI" }} />

            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
              {language === 'fr' ? "Notre équipe d'experts est là pour répondre à toutes vos questions sur la transformation IA et les agents autonomes." : "Our expert team is here to answer all your questions about AI transformation and autonomous agents."}
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
                  <p>{language === 'fr' ? 'Aucune question trouvée pour cette catégorie.' : 'No questions found for this category.'}</p>
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
                {language === 'fr' ? "Encore des questions ?" : "Still have questions?"}
              </h2>
              <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
                {language === 'fr' ? "Notre équipe est prête à discuter de vos besoins spécifiques et à vous aider à naviguer dans votre parcours de transformation IA." : "Our team is ready to discuss your specific needs and help you navigate your AI transformation journey."}
              </p>
              <Link href={getLocalizedPath('/contact')}>
                <a className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all duration-300">
                  {language === 'fr' ? "Parler à un expert" : "Talk to an expert"}
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
