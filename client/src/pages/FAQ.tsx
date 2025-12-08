import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSound } from '@/hooks/useSound';
import SEO from '@/components/SEO';
import StructuredData, { createFAQSchema } from '@/components/StructuredData';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Agentic AI
  {
    question: "What is agentic AI and how does it differ from generative AI?",
    answer: "Agentic AI refers to autonomous systems capable of reasoning, planning, and executing complex actions to achieve specific goals. Unlike generative AI (like ChatGPT) which simply generates content in response to prompts, AI agents can make decisions, use tools, access real-time data, and orchestrate multi-step workflows. For example, a customer support agent can not only answer a question, but also consult the customer's history, check order status in the ERP system, propose a personalized solution, and automatically create a follow-up ticket if necessary.",
    category: "Agentic AI"
  },
  {
    question: "How do multi-agent systems work?",
    answer: "Multi-agent systems consist of multiple specialized AI agents that collaborate to accomplish complex tasks. Each agent has specific expertise (research, analysis, writing, validation) and communicates with others via a central orchestrator. For example, in a marketing report generation system, one agent collects analytics data, a second analyzes it to identify trends, a third writes the report, and a fourth verifies consistency and quality. This modular approach enables sophisticated workflows while maintaining transparency and control over each process step.",
    category: "Agentic AI"
  },
  {
    question: "What's the difference between a chatbot and an AI agent?",
    answer: "A traditional chatbot follows a predefined script with fixed decision trees: if the user says X, respond Y. It cannot deviate from its script or adapt to unexpected situations. An AI agent, on the other hand, possesses reasoning, planning, and tool-use capabilities. It can understand the intent behind a complex request, break down the problem into subtasks, access multiple data sources, make contextual decisions, and adapt its approach based on intermediate results. For example, faced with a complex refund request, a chatbot will redirect to a human, while an AI agent will analyze the refund policy, verify eligibility, calculate the amount, initiate the process, and inform the customer of the timeline — all autonomously.",
    category: "Agentic AI"
  },
  
  // Transformation & Implementation
  {
    question: "How long does it take to implement agentic AI?",
    answer: "Our accelerated methodology deploys a first operational agent in 90 days with our 3-phase roadmap: Phase 1 (30 days) - Discovery and architecture, Phase 2 (30 days) - Development and integration, Phase 3 (30 days) - Testing and deployment. For a complete organizational transformation with multiple interconnected agents, expect 6 to 12 months. This iterative approach generates value quickly (quick wins from the first agent) while progressively building a robust and scalable agent ecosystem. We avoid the 'perpetual pilot' trap by targeting production-ready architecture from day one.",
    category: "Transformation & Implementation"
  },
  {
    question: "What are the most common implementation challenges?",
    answer: "The three major challenges are: 1) Data quality (67% of AI failures are due to incomplete, unstructured, or biased data), 2) Organizational change resistance (teams must understand that AI augments their capabilities rather than replacing them), and 3) Integration with existing systems (ERP, CRM, legacy databases). At Nukleo, we address these challenges from the discovery phase with a data maturity audit, an integrated change management program, and a modular integration architecture that minimizes operational disruptions.",
    category: "Transformation & Implementation"
  },
  {
    question: "How do you move from pilot to scale?",
    answer: "95% of companies remain stuck in 'perpetual pilot' mode without ever reaching scale. To succeed at scaling, follow these 5 steps: 1) Define a scalable architecture from the pilot (no 'quick and dirty' solutions), 2) Rigorously measure business KPIs (not just technical ones), 3) Document processes and create reusable playbooks, 4) Train teams for adoption (continuous change management), 5) Industrialize deployment with CI/CD and automated monitoring. With this approach, you move from pilot to production in 6 months instead of staying stuck for 2+ years without tangible results.",
    category: "Transformation & Implementation"
  },
  {
    question: "Is my company ready for agentic AI?",
    answer: "Three key readiness indicators: 1) Is your data accessible and of reasonable quality? (perfection not required, but minimum structure needed), 2) Do you have repetitive processes that consume significant time? (customer support, document processing, lead qualification), 3) Is your leadership aligned on a transformation vision? (not just an IT project, but a strategic initiative). If you answer yes to 2 out of 3, you're ready to start. We offer a free 30-minute AI maturity assessment to evaluate your specific situation and identify potential quick wins.",
    category: "Transformation & Implementation"
  },
  
  // ROI & Business Case
  {
    question: "What is the typical ROI of agentic AI?",
    answer: "Organizations implementing agentic AI observe on average: 10-15% productivity increase (teams focused on high-value tasks), 30-50% reduction in operational costs (automation of manual processes), and 20-35% revenue increase (better lead qualification, personalization at scale). ROI becomes positive between 6 and 18 months depending on use case complexity. For example, a customer support agent can handle 60-80% of level 1-2 requests, freeing human agents for complex cases, while improving response time from 24h to minutes.",
    category: "ROI & Business Case"
  },
  {
    question: "How do you measure AI agent success?",
    answer: "We measure success across 3 dimensions: 1) Business metrics (cost reduction, revenue increase, customer satisfaction, time savings — concrete, quantifiable impact), 2) Technical metrics (accuracy, response time, error rate, system availability — operational quality), 3) Adoption metrics (usage rate, user satisfaction, escalation to humans — actual adoption). We establish a baseline before deployment and track these KPIs weekly during the first 3 months, then monthly. This approach ensures we optimize not just for technical performance, but for real business impact.",
    category: "ROI & Business Case"
  },
  {
    question: "What is the investment required to start?",
    answer: "Investment varies based on scope, but here's a typical range: Simple agent (single use case, basic integration): $50K-$100K, Complex agent (multi-step workflows, multiple integrations): $100K-$250K, Multi-agent system (several specialized agents, advanced orchestration): $250K-$500K+. This includes discovery, development, integration, testing, deployment, and 3 months of post-launch support. We also offer a 'Proof of Value' approach: start with a $25K-$50K pilot (4-6 weeks) to validate the concept and ROI before committing to full deployment. This minimizes risk while demonstrating tangible value.",
    category: "ROI & Business Case"
  },
  
  // Technical & Security
  {
    question: "What technologies do you use?",
    answer: "Our technology stack combines best-in-class tools: LLMs (OpenAI GPT-4, Anthropic Claude, Google Gemini — we choose based on your specific use case), Agent frameworks (LangChain, LangGraph, AutoGen, CrewAI for orchestration), Vector databases (Pinecone, Weaviate, Qdrant for RAG), Cloud infrastructure (AWS, Azure, GCP for scalability), and Integration tools (APIs, webhooks, ETL for connection to your existing systems). We're technology-agnostic: we select the best tools for your specific needs rather than imposing a one-size-fits-all solution.",
    category: "Technical & Security"
  },
  {
    question: "How do you ensure data security and privacy?",
    answer: "Security is built into every layer: 1) Data encryption (at rest and in transit with AES-256 and TLS 1.3), 2) Access control (role-based authentication, principle of least privilege), 3) Data isolation (your data never mixes with other clients, dedicated infrastructure if needed), 4) Compliance (GDPR, CCPA, SOC 2, HIPAA depending on your industry), 5) Audit and monitoring (complete traceability of all agent actions, real-time alerts for anomalies). We also offer on-premise or private cloud deployment for organizations with strict security requirements. Your data remains YOUR data — we never use it to train models or share it with third parties.",
    category: "Technical & Security"
  },
  {
    question: "Can AI agents make errors? How do you control them?",
    answer: "Yes, AI agents can make errors, which is why we implement multiple control layers: 1) Confidence thresholds (agent escalates to human if confidence < 85%), 2) Validation rules (automatic verification of critical actions before execution), 3) Human-in-the-loop for sensitive decisions (approval required for refunds, contract modifications, etc.), 4) Continuous monitoring (detection of anomalies, performance degradation, unexpected behaviors), 5) Feedback loops (learning from errors to continuously improve). The goal is not zero errors (impossible), but controlled, transparent, and correctable errors. Every agent action is logged and auditable.",
    category: "Technical & Security"
  },
  
  // Use Cases
  {
    question: "What are the most impactful use cases?",
    answer: "The 5 use cases with best ROI: 1) Intelligent customer support (60-80% of requests automated, 24/7 resolution, response time reduced from 24h to 2 minutes), 2) Lead qualification and nurturing (automatic scoring, personalization at scale, +40% conversion rate), 3) Document processing (data extraction from invoices/contracts/forms, 90% reduction in processing time), 4) Marketing content generation (blog articles, social posts, personalized emails, 3x volume without increasing team size), 5) Internal employee assistant (HR answers, IT support, document search, +15% productivity). These use cases combine high business impact with manageable technical complexity.",
    category: "Use Cases"
  },
  {
    question: "Can agentic AI completely replace my customer support?",
    answer: "No, and that's not the goal. The optimal approach is AI-human collaboration: AI agents handle 60-80% of volume (frequent questions, simple requests, repetitive tasks) 24/7 with near-instant response time, while human agents focus on the 20-40% of complex cases that are emotionally sensitive or require creativity and empathy. Result: better customer experience (fast answers for simple cases, human expertise for complex ones), more satisfied teams (less repetition, more interesting problem-solving), and optimized costs. The human role evolves from 'responder' to 'expert-supervisor' — a positive transformation, not a replacement.",
    category: "Use Cases"
  },
  {
    question: "How can agentic AI improve my marketing?",
    answer: "Agentic AI transforms marketing across 4 axes: 1) Content generation at scale (blog articles, social posts, emails, landing pages — 3x volume with consistent quality), 2) Dynamic personalization (real-time content adaptation based on each visitor's profile, behavior, and context), 3) Continuous advertising optimization (agents automatically test creative variants, audiences, and bids to maximize ROI — 40-60% improvement), 4) Predictive analytics (identification of high-potential leads, trend forecasting, strategic recommendations). The result: more effective campaigns, improved marketing ROI, and teams focused on creative strategy rather than repetitive execution.",
    category: "Use Cases"
  },
  
  // About Nukleo
  {
    question: "What differentiates Nukleo from other AI agencies?",
    answer: "Three key differentiators: 1) Deep technical expertise — our team combines senior ML/AI engineers, cloud architects, and product specialists who have built AI systems at scale (not just API integrators), 2) Exclusive focus on agentic AI — we don't do 'generic digital transformation', we specialize in autonomous agents and multi-agent systems, 3) End-to-end AI-native approach — we don't just plug ChatGPT into your site, we re-architect your processes, data, and interfaces to be natively AI-first. Result: deployment in 90 days instead of 12-24 months, and systems that evolve with your needs rather than becoming obsolete.",
    category: "About Nukleo"
  },
  {
    question: "Do you offer training for our teams?",
    answer: "Yes, training is an integral part of every project. We offer: 1) Executive workshops (strategic vision, business cases, ROI — 4h for leadership), 2) Technical training (architecture, tools, best practices — 2 days for dev/data teams), 3) End-user training (how to interact with agents, when to escalate, feedback loops — 1 day for operational teams), 4) Train-the-trainer program (to create internal champions who can train future employees). We also provide detailed documentation, video tutorials, and 3 months of post-launch support to ensure smooth adoption. The goal: your teams become autonomous and can evolve the system without depending on us long-term.",
    category: "About Nukleo"
  },
  {
    question: "Where are you located and do you work remotely?",
    answer: "We're based in Montreal (Quebec) and Halifax (Nova Scotia), with clients across Canada and internationally. We operate in a hybrid model: in-person strategic meetings for discovery and key milestones (if geography permits), and remote collaboration for development and daily support. This approach allows us to effectively serve clients throughout North America and Europe while maintaining close relationships. We adapt to your timezone and communication preferences (French or English).",
    category: "About Nukleo"
  },
];

const categories = [
  "All",
  "Agentic AI",
  "Transformation & Implementation",
  "ROI & Business Case",
  "Technical & Security",
  "Use Cases",
  "About Nukleo"
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { playHover, playClick } = useSound();

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
      <SEO 
        title="AI Transformation FAQ | Common Questions Answered"
        description="Get answers to common AI transformation questions: implementation timeline, ROI expectations, team requirements, security & more. Expert insights from Nukleo Digital."
        keywords="AI transformation FAQ, AI implementation questions, AI ROI, AI security, AI consulting FAQ"
      />
      <StructuredData data={createFAQSchema(faqs.map(faq => ({ question: faq.question, answer: faq.answer })))} />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
            FAQ
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            Everything You Need<br />
            to Know About<br />
            Agentic AI
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            Our expert team is here to answer all your questions 
            about AI transformation and autonomous agents.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  playClick();
                  setSelectedCategory(category);
                }}
                onMouseEnter={playHover}
                className={`px-6 py-3 rounded-full font-mono text-sm tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {category}
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
              STILL HAVE QUESTIONS?
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
              Our team is ready to discuss your specific needs and help you 
              navigate your AI transformation journey.
            </p>
            <Link href="/contact">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all duration-300">
                Talk to an Expert
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
