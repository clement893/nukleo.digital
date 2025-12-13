import { useState } from 'react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';
import { Link } from 'wouter';
import { Menu, X, Target, TrendingUp, Users, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import FullScreenMenu from '@/components/FullScreenMenu';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AIStrategyMarketing() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const seoContent = (
    <SEO 
      title="AI Strategy & Marketing Services | Transform Your Growth"
      description="AI-powered marketing transformation: Strategic planning, customer intelligence, personalized campaigns & ROI optimization. Drive 340% growth with data-driven AI solutions."
      keywords="AI marketing strategy, AI-powered marketing, customer intelligence, personalized campaigns, ROI optimization, AI transformation"
    />
  );

  const services = [
    {
      icon: Target,
      title: "AI Strategy Development",
      description: "Craft comprehensive AI roadmaps aligned with your business objectives and market opportunities."
    },
    {
      icon: TrendingUp,
      title: "Market Positioning",
      description: "Position your AI capabilities to stand out in competitive markets and attract ideal customers."
    },
    {
      icon: Users,
      title: "Customer Journey Optimization",
      description: "Leverage AI to personalize every touchpoint and maximize customer lifetime value."
    },
    {
      icon: Lightbulb,
      title: "Innovation Consulting",
      description: "Identify breakthrough AI applications that create competitive advantages and new revenue streams."
    }
  ];

  const benefits = [
    "Clear AI vision and executable roadmap",
    "Measurable ROI from AI investments",
    "Enhanced brand positioning as an AI leader",
    "Data-driven marketing strategies",
    "Competitive intelligence and market insights",
    "Customer acquisition cost reduction"
  ];

  return (
    <>
      {seoContent}
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4">
        <Breadcrumb items={[
          { name: t('nav.services') || 'Services', url: '/services' },
          { name: 'AI Strategy & Marketing', url: '/services/ai-strategy-marketing' }
        ]} />
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-white hover:text-violet-400 transition-colors">
              nukleo.
            </a>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 text-white hover:text-violet-400 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 pt-24">
        <div className="container mx-auto px-6 py-16">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="inline-block px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-medium mb-6">
              Trinity Department 01
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">AI Strategy &</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
                Marketing
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Transform your business vision into actionable AI strategies that drive growth, 
              enhance customer experiences, and position you as a market leader.
            </p>
            <Link href="/contact">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-rose-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300">
                Start Your AI Journey
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl hover:border-violet-500/50 transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-[1.045] transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/70">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Key Benefits
            </h2>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-violet-500/10 to-rose-500/10 backdrop-blur-xl border border-white/10 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Lead with AI?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Let's craft an AI strategy that transforms your business and positions you 
              as a leader in your industry.
            </p>
            <Link href="/contact">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-rose-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
