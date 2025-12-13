import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Cpu, Database, Cog, Workflow } from 'lucide-react';

export default function Lab() {
  const capabilities = [
    {
      icon: Database,
      title: 'Intelligent Data Platforms',
      description: 'Unifying and preparing your data ecosystem for AI. We build robust data architectures that serve as the foundation for intelligent systems, ensuring data quality, accessibility, and governance.'
    },
    {
      icon: Cpu,
      title: 'Custom AI Agent Development',
      description: 'Creating autonomous agents tailored to your specific business needs. From customer service bots to intelligent process assistants, we develop AI agents that learn, adapt, and deliver value continuously.'
    },
    {
      icon: Cog,
      title: 'Third-Party AI Integration',
      description: 'Orchestrating the best AI models and services on the market. We integrate leading solutions from OpenAI, Anthropic, Mistral, and others to create a powerful AI stack customized for your operations.'
    },
    {
      icon: Workflow,
      title: 'Intelligent Process Automation (IPA)',
      description: 'Moving beyond simple RPA with adaptive workflows. We implement intelligent automation that understands context, makes decisions, and continuously optimizes itself based on outcomes.'
    }
  ];

  return (
    <>
      <SEO 
        title="The AI Lab | Technology Foundation | Nukleo Digital"
        description="Building robust and flexible technological foundations for AI integration. Custom AI agents, intelligent data platforms, and intelligent process automation."
        keywords="AI lab, AI development, custom AI agents, intelligent automation, AI infrastructure, data platforms"
      />
      
      <Header />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm font-mono text-white/70">01 LAB</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                The AI Lab
              </h1>
              
              <p className="text-2xl md:text-3xl text-accent font-medium mb-8">
                Technology Foundation
              </p>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                We build the robust and flexible technological foundation that powers your AI transformation. 
                From intelligent data platforms to custom AI agents, we create the infrastructure that makes 
                AI-native operations possible.
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
                  To build the technological backbone that enables your organization to operate as an 
                  <span className="text-accent font-semibold"> AI-native company</span>. We don't just implement tools we 
                  architect systems that learn, adapt, and scale with your ambitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Core Capabilities</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <div 
                      key={index}
                      className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:scale-[1.045] transition-transform">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{capability.title}</h3>
                      <p className="text-white/70 leading-relaxed">{capability.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Approach</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Assess & Design</h3>
                    <p className="text-white/70 leading-relaxed">
                      We start by understanding your current infrastructure, data landscape, and business objectives. 
                      Then we design an AI architecture that aligns with your strategic goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Build & Integrate</h3>
                    <p className="text-white/70 leading-relaxed">
                      We develop custom AI solutions and integrate best-in-class third-party services, 
                      creating a cohesive ecosystem that works seamlessly with your existing systems.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Optimize & Scale</h3>
                    <p className="text-white/70 leading-relaxed">
                      We continuously monitor, refine, and enhance your AI infrastructure, ensuring it evolves 
                      with your needs and delivers measurable ROI at every stage.
                    </p>
                  </div>
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
                Ready to Build Your AI Foundation?
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Let's discuss how The AI Lab can architect the technological infrastructure 
                that powers your transformation.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-white text-purple-950 font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.022]"
              >
                Start the Conversation
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
