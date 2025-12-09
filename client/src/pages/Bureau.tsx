import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Compass, Target, Shield, TrendingUp } from 'lucide-react';

export default function Bureau() {
  const services = [
    {
      icon: Target,
      title: 'AI Maturity Audit & Roadmap',
      description: 'Assessing your current position in the AI landscape and charting a clear path to AI leadership. We evaluate your capabilities, identify gaps, and create a 9-to-12-month transformation roadmap.'
    },
    {
      icon: Compass,
      title: 'Agentic Transformation Strategy',
      description: 'Redefining your operating model with AI at its center. We help you transition from experimentation to enterprise-wide transformation, embedding agentic AI as the foundation for growth.'
    },
    {
      icon: Shield,
      title: 'AI Governance & Ethics',
      description: 'Implementing the guardrails for responsible and high-performing AI. We establish frameworks for ethical AI use, compliance, risk management, and transparent decision-making.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analysis & ROI',
      description: 'Measuring the tangible impact of AI on your business goals. We track KPIs, analyze outcomes, and continuously optimize your AI investments to maximize return and strategic value.'
    }
  ];

  return (
    <>
      <SEO 
        title="The Strategic Bureau | Transformation Orchestration | Nukleo Digital"
        description="Defining strategy, driving transformation, and measuring AI impact. From maturity audits to agentic transformation strategy and AI governance."
        keywords="AI strategy, digital transformation, AI governance, AI maturity, transformation orchestration, AI consulting"
      />
      
      <Header />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm font-mono text-white/70">02 — BUREAU</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                The Strategic Bureau
              </h1>
              
              <p className="text-2xl md:text-3xl text-accent font-medium mb-8">
                Transformation Orchestration
              </p>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                We define the strategy, drive the transformation, and measure the impact of AI across 
                your organization. From vision to execution, we orchestrate your journey from AI-curious 
                to AI-native.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Mission</h2>
              
              <div className="p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-2xl text-white/90 leading-relaxed">
                  To guide your organization through the complex journey of 
                  <span className="text-accent font-semibold"> AI transformation</span>. We don't just create strategies—we 
                  orchestrate change, align stakeholders, and ensure your AI initiatives deliver measurable 
                  business value at every stage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Strategic Services</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div 
                      key={index}
                      className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-white/70 leading-relaxed">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Journey */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">The Transformation Journey</h2>
              
              <div className="space-y-12">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Discovery & Assessment</h3>
                    <p className="text-white/70 leading-relaxed">
                      We conduct a comprehensive AI maturity audit, evaluating your current capabilities, 
                      data readiness, organizational culture, and competitive positioning. This baseline 
                      assessment identifies opportunities and constraints.
                    </p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Strategy & Roadmap</h3>
                    <p className="text-white/70 leading-relaxed">
                      We design your agentic transformation strategy, defining clear objectives, prioritizing 
                      use cases, and creating a phased roadmap. This includes governance frameworks, resource 
                      planning, and change management strategies.
                    </p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Execution & Optimization</h3>
                    <p className="text-white/70 leading-relaxed">
                      We orchestrate implementation across your organization, coordinating with The Lab and 
                      The Studio. We continuously measure performance, track ROI, and adjust the strategy 
                      to maximize business impact.
                    </p>
                  </div>
                </div>

                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Scale & Leadership</h3>
                    <p className="text-white/70 leading-relaxed">
                      We help you scale successful pilots enterprise-wide and position your organization 
                      as an AI leader in your industry. This includes thought leadership, innovation programs, 
                      and continuous capability building.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">Expected Impact</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                  <div className="text-5xl font-bold text-accent mb-3">3x</div>
                  <p className="text-white/70">ROI on AI investments within 12 months</p>
                </div>
                
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                  <div className="text-5xl font-bold text-accent mb-3">50%</div>
                  <p className="text-white/70">Reduction in time-to-market for new initiatives</p>
                </div>
                
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                  <div className="text-5xl font-bold text-accent mb-3">10x</div>
                  <p className="text-white/70">Increase in operational efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-purple-950 opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready to Lead Your Transformation?
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Let's discuss how The Strategic Bureau can orchestrate your journey 
                from AI experimentation to enterprise-wide transformation.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-white text-purple-950 font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Begin Your Journey
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
