import { ArrowRight, Target, TrendingUp, Users, Lightbulb, CheckCircle2, Sparkles, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import Breadcrumb from "@/components/Breadcrumb";
import SEO from "@/components/SEO";

export default function AIStrategyMarketing() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <SEO 
        title="AI Strategy & Marketing Services | Transform Your Growth"
        description="AI-powered marketing transformation: Strategic planning, customer intelligence, personalized campaigns & ROI optimization. Drive 340% growth with data-driven AI solutions."
        keywords="AI marketing strategy, AI-powered marketing, customer intelligence, personalized campaigns, ROI optimization, AI transformation"
      />
      <Header />
      
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4 px-4">
        <Breadcrumb items={[
          { name: t('nav.services') || 'Services', url: '/services' },
          { name: 'AI Strategy & Marketing', url: '/services/ai-strategy-marketing' }
        ]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-violet-400 mb-6">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">AI STRATEGY & MARKETING</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            AI Strategy &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-rose-400">
              Marketing
            </span>
          </h1>
          
          <p className="text-xl text-violet-400/90 mb-4 font-medium">
            Strategic Planning & Growth
          </p>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            Transform your business vision into actionable AI strategies that drive growth, enhance customer experiences, and position you as a market leader.
          </p>
          
          {/* Client Needs */}
          <div className="mt-8">
            <ul className="space-y-3 text-white/70">
              {[
                "You need a clear AI roadmap aligned with business goals",
                "You want to leverage AI for competitive advantage",
                "You're looking to optimize customer acquisition and retention",
                "You need data-driven marketing strategies"
              ].map((need: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Strategic AI Transformation</h2>
          <p className="text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
            We combine strategic thinking with AI expertise to create comprehensive roadmaps that align with your business objectives. Our approach ensures measurable ROI and sustainable growth through data-driven decision-making and innovative AI applications.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Our Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "AI Strategy Development",
                description: "Craft comprehensive AI roadmaps aligned with your business objectives and market opportunities.",
              },
              {
                icon: TrendingUp,
                title: "Market Positioning",
                description: "Position your AI capabilities to stand out in competitive markets and attract ideal customers.",
              },
              {
                icon: Users,
                title: "Customer Journey Optimization",
                description: "Leverage AI to personalize every touchpoint and maximize customer lifetime value.",
              },
              {
                icon: Lightbulb,
                title: "Innovation Consulting",
                description: "Identify breakthrough AI applications that create competitive advantages and new revenue streams.",
              },
              {
                icon: Sparkles,
                title: "Campaign Strategy",
                description: "Develop AI-powered marketing campaigns that deliver measurable results and optimize ROI.",
              },
              {
                icon: BarChart3,
                title: "Performance Analytics",
                description: "Track and analyze AI marketing performance with advanced analytics and insights.",
              },
            ].map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                  <ServiceIcon className="w-12 h-12 text-violet-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-white/70">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Key Benefits</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Clear AI vision and executable roadmap",
              "Measurable ROI from AI investments",
              "Enhanced brand positioning as an AI leader",
              "Data-driven marketing strategies",
              "Competitive intelligence and market insights",
              "Customer acquisition cost reduction"
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Our Process</h2>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery & Assessment",
                description: "Understand your business context, goals, and current AI maturity level.",
              },
              {
                step: "02",
                title: "Strategy Development",
                description: "Create a comprehensive AI strategy roadmap aligned with your objectives.",
              },
              {
                step: "03",
                title: "Implementation Planning",
                description: "Define priorities, timelines, and resource requirements for execution.",
              },
              {
                step: "04",
                title: "Execution & Optimization",
                description: "Deploy AI solutions and continuously optimize for maximum impact.",
              },
            ].map((phase, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-violet-400/30">{phase.step}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{phase.title}</h3>
                  <p className="text-white/70">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Lead with AI?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Let's craft an AI strategy that transforms your business and positions you as a leader in your industry.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={getLocalizedPath('/contact')}>
              <Button size="lg" className="bg-violet-500 hover:bg-violet-600 text-white">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href={getLocalizedPath('/services')}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Explore All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
