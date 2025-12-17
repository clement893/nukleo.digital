import { ArrowRight, Bot, Zap, Target, CheckCircle2, Brain, Cpu, Workflow } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";

export default function AgenticAIService() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <SEO 
        title={t('services.agenticAI.title') || 'Agentic AI Systems | Nukleo Digital'}
        description={t('services.agenticAI.description') || 'We develop autonomous AI agents that automate your processes, from customer relationship management to internal operations optimization.'}
        keywords="agentic AI, autonomous AI agents, AI automation, business process automation, intelligent systems"
      />
      <Header />
      
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4 px-4">
        <Breadcrumb items={[
          { name: t('nav.services') || 'Services', url: '/services' },
          { name: t('services.agenticAI.title') || 'Agentic AI Systems', url: '/services/agentic-ai' }
        ]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-purple-400 mb-6">
            <Bot className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">AGENTIC AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t('services.agenticAI.title') || 'Agentic AI Systems'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {t('services.agenticAI.subtitle') || 'Autonomous Intelligence'}
            </span>
          </h1>
          
          <p className="text-xl text-purple-400/90 mb-4 font-medium">
            {t('services.agenticAI.tagline') || 'Autonomous AI Agents'}
          </p>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            {t('services.agenticAI.description') || 'We develop autonomous AI agents that automate your processes, from customer relationship management to internal operations optimization, creating an intelligent backbone for your organization.'}
          </p>
          
          {/* Key Capabilities */}
          <div className="mt-8">
            <ul className="space-y-3 text-white/70">
              {(t('services.agenticAI.capabilities', { returnObjects: true }) as string[] || [
                'Business Process Automation (BPA)',
                'CRM and ERP Integration',
                'Supply Chain Optimization',
                'Autonomous Customer Support'
              ]).map((capability: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What is Agentic AI Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('services.agenticAI.whatIs.title') || 'What is Agentic AI?'}
          </h2>
          <p className="text-lg text-white/70 mb-6 max-w-3xl leading-relaxed">
            {t('services.agenticAI.whatIs.description') || 'Agentic AI represents a fundamental shift in how we conceive work. It\'s no longer about tools we use, but autonomous agents that collaborate with us, learn from us, and execute complex tasks independently. These systems can break down complex tasks into subtasks, make decisions, and iterate until objectives are met.'}
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <Brain className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Autonomous Decision Making</h3>
              <p className="text-white/70">AI agents that can plan, execute, and adapt without constant human intervention.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <Workflow className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Process Automation</h3>
              <p className="text-white/70">Automate complex workflows and decision-making processes across your organization.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <Cpu className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
              <p className="text-white/70">Systems that learn from interactions and improve over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">
            {t('services.agenticAI.useCases.title') || 'Use Cases'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: t('services.agenticAI.useCases.customerSupport.title') || 'Autonomous Customer Support',
                description: t('services.agenticAI.useCases.customerSupport.description') || 'AI agents that handle customer inquiries, resolve issues, and escalate when needed, providing 24/7 support.',
              },
              {
                icon: Zap,
                title: t('services.agenticAI.useCases.processAutomation.title') || 'Business Process Automation',
                description: t('services.agenticAI.useCases.processAutomation.description') || 'Automate complex workflows from data entry to decision-making, reducing manual work and errors.',
              },
              {
                icon: Brain,
                title: t('services.agenticAI.useCases.intelligentAnalytics.title') || 'Intelligent Analytics',
                description: t('services.agenticAI.useCases.intelligentAnalytics.description') || 'AI agents that analyze data, generate insights, and make recommendations autonomously.',
              },
              {
                icon: Workflow,
                title: t('services.agenticAI.useCases.supplyChain.title') || 'Supply Chain Optimization',
                description: t('services.agenticAI.useCases.supplyChain.description') || 'Optimize inventory, logistics, and procurement with autonomous decision-making agents.',
              },
            ].map((useCase, idx) => {
              const UseCaseIcon = useCase.icon;
              return (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <UseCaseIcon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
                  <p className="text-white/70">{useCase.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">
            {t('services.agenticAI.benefits.title') || 'Why Choose Agentic AI?'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">3x</div>
              <h3 className="text-xl font-semibold text-white mb-2">ROI Increase</h3>
              <p className="text-white/70">Triple your return on investment with autonomous systems.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">75%</div>
              <h3 className="text-xl font-semibold text-white mb-2">Time Savings</h3>
              <p className="text-white/70">Reduce time-to-market and operational overhead.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">10x</div>
              <h3 className="text-xl font-semibold text-white mb-2">Output Volume</h3>
              <p className="text-white/70">Scale your operations without scaling your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('services.agenticAI.cta.title') || 'Ready to Transform with Agentic AI?'}
          </h2>
          <p className="text-xl text-white/70 mb-8">
            {t('services.agenticAI.cta.description') || 'Let\'s discuss how autonomous AI agents can revolutionize your operations.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                {t('services.agenticAI.cta.button') || 'Get Started'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/services')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('services.agenticAI.cta.explore') || 'Explore All Services'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

