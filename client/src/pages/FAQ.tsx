import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is Agentic AI?',
      answer: 'Agentic AI refers to autonomous AI systems that can reason, plan, and execute complex tasks independently. Unlike traditional AI that simply responds to prompts, agentic AI can break down goals, make decisions, use tools, and adapt its approach based on results—acting more like a digital team member than a simple automation tool.',
    },
    {
      question: 'How long does a typical AI transformation project take?',
      answer: 'Project timelines vary based on scope and complexity. A focused pilot implementation typically takes 8-12 weeks, while a comprehensive enterprise transformation can span 6-12 months. We work in iterative phases to deliver value quickly while building toward your long-term vision.',
    },
    {
      question: 'What kind of ROI can we expect?',
      answer: 'Our clients typically see 200-400% ROI within the first year through increased efficiency, reduced costs, and new revenue opportunities. Specific results depend on your industry, use cases, and implementation scope. We provide detailed ROI projections during the discovery phase.',
    },
    {
      question: 'Do we need a large technical team to work with you?',
      answer: 'No. We work with organizations at all stages of technical maturity. Our team can handle everything from strategy to implementation, or we can augment your existing team. We also provide training and knowledge transfer to build your internal AI capabilities.',
    },
    {
      question: 'How do you ensure data security and privacy?',
      answer: 'Security and privacy are fundamental to everything we build. We implement enterprise-grade security measures, comply with relevant regulations (GDPR, CCPA, etc.), and can work within your existing security frameworks. All data handling is transparent and under your control.',
    },
    {
      question: 'Can you integrate with our existing systems?',
      answer: 'Yes. We specialize in building AI solutions that integrate seamlessly with your existing technology stack—whether that\'s CRM systems, marketing platforms, databases, or custom applications. Our approach is designed to enhance, not replace, your current infrastructure.',
    },
    {
      question: 'What industries do you work with?',
      answer: 'We work across industries including technology, finance, healthcare, retail, manufacturing, and professional services. Our expertise in AI and transformation strategy translates across sectors, and we customize our approach to your specific industry context and requirements.',
    },
    {
      question: 'How do you measure success?',
      answer: 'We define clear, measurable KPIs at the start of every project—whether that\'s cost reduction, revenue growth, time savings, or quality improvements. We provide regular reporting and analytics dashboards so you can track progress and ROI in real-time.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <span className="font-mono text-accent text-sm mb-8 block uppercase tracking-widest">
            06 — FAQ
          </span>

          <h1 className="text-white mb-8">
            FREQUENTLY<br />
            ASKED QUESTIONS
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            Everything you need to know about working with Nukleo and implementing AI transformation.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg lg:text-xl font-bold text-white pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-accent flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 pb-6 text-white/75 text-base lg:text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-900/30 to-purple-800/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">
              STILL HAVE<br />
              QUESTIONS?
            </h2>

            <p className="text-white/75 text-lg leading-relaxed mb-8">
              Our team is here to help. Get in touch and we'll answer any questions you have about AI transformation.
            </p>

            <a
              href="/contact"
              className="inline-block rounded-full text-lg px-10 py-6 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider uppercase"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
