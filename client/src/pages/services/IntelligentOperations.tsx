import { useState } from 'react';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { Menu, Settings, BarChart3, Workflow, Bot, CheckCircle, ArrowRight } from 'lucide-react';
import FullScreenMenu from '@/components/FullScreenMenu';

export default function IntelligentOperations() {
  const [menuOpen, setMenuOpen] = useState(false);

  const seoContent = (
    <SEO 
      title="Intelligent Operations | AI Automation & Optimization"
      description="Automate and optimize operations with AI. Process automation, predictive analytics & intelligent workflows. Reduce costs by 60% while improving efficiency. Learn how."
      keywords="AI automation, intelligent operations, process automation, predictive analytics, intelligent workflows, operations optimization"
    />
  );

  const services = [
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Automate repetitive tasks and workflows with intelligent AI agents that learn and adapt."
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Leverage AI to forecast trends, optimize resources, and make data-driven decisions."
    },
    {
      icon: Bot,
      title: "AI-Powered Chatbots",
      description: "Deploy intelligent conversational agents that enhance customer service and support."
    },
    {
      icon: Settings,
      title: "Operations Optimization",
      description: "Continuously improve efficiency through AI-driven insights and recommendations."
    }
  ];

  const benefits = [
    "40-60% reduction in operational costs",
    "24/7 automated operations",
    "Improved decision-making speed",
    "Enhanced employee productivity",
    "Reduced human error",
    "Real-time performance monitoring"
  ];

  return (
    <>
      {seoContent}
      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
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
              Trinity Department 03
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Intelligent</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
                Operations
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Optimize your operations with AI-powered automation and intelligence 
              that drives efficiency, reduces costs, and scales with your growth.
            </p>
            <Link href="/contact">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-rose-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300">
                Optimize Your Operations
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
              Ready to Transform Your Operations?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Let's automate and optimize your operations with AI that works smarter, not harder.
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
