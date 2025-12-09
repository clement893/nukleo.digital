import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Sparkles, Palette, Zap, Users } from 'lucide-react';

export default function Studio() {
  const capabilities = [
    {
      icon: Palette,
      title: 'Augmented Content Creation',
      description: 'Producing content (text, image, video) at unprecedented scale, personalized in real-time. We leverage generative AI to create brand-aligned content that resonates with each audience segment.'
    },
    {
      icon: Users,
      title: 'AI-Personalized Customer Experiences',
      description: 'Creating unique and dynamic customer journeys powered by AI. From personalized recommendations to adaptive interfaces, we design experiences that evolve with each interaction.'
    },
    {
      icon: Zap,
      title: 'Agentic Marketing Campaigns',
      description: 'Deploying autonomous campaigns that continuously optimize themselves. Our AI agents test, learn, and adapt in real-time, maximizing engagement and conversion across all channels.'
    },
    {
      icon: Sparkles,
      title: 'Brand Identity in the AI Era',
      description: 'Defining how your brand interacts and is perceived in a world of AI assistants and agents. We help you establish a distinctive voice and presence in AI-mediated experiences.'
    }
  ];

  return (
    <>
      <SEO 
        title="The Creative Studio | Augmented Content & Experiences | Nukleo Digital"
        description="Using AI to create brand experiences and content at unparalleled scale and relevance. From augmented content creation to agentic marketing campaigns."
        keywords="AI content creation, agentic marketing, personalized experiences, AI creative studio, generative AI, content automation"
      />
      
      <Header />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm font-mono text-white/70">03 — STUDIO</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                The Creative Studio
              </h1>
              
              <p className="text-2xl md:text-3xl text-accent font-medium mb-8">
                Augmented Content & Experiences
              </p>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                We use AI to create brand experiences and content at unparalleled scale and relevance. 
                From generative content to autonomous marketing campaigns, we help you connect with 
                audiences in ways that were previously impossible.
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
                  To harness the creative power of AI to deliver 
                  <span className="text-accent font-semibold"> hyper-personalized experiences at scale</span>. 
                  We don't replace human creativity—we amplify it, enabling your brand to create 
                  meaningful connections with every customer, in every moment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Creative Capabilities</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;
                  return (
                    <div 
                      key={index}
                      className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-pink-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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

        {/* The Agentic Marketing Revolution */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">The Agentic Marketing Revolution</h2>
              
              <div className="space-y-8">
                <p className="text-xl text-white/80 leading-relaxed">
                  We're entering the era of <span className="text-accent font-semibold">Agentic Marketing</span>—where 
                  autonomous AI systems don't just execute campaigns, they learn, decide, and act independently 
                  to achieve your business objectives.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-accent">Traditional Marketing</h3>
                    <ul className="space-y-3 text-white/70">
                      <li>• Manual campaign setup</li>
                      <li>• Periodic optimization</li>
                      <li>• One-size-fits-all messaging</li>
                      <li>• Delayed insights</li>
                      <li>• Limited personalization</li>
                    </ul>
                  </div>

                  <div className="p-8 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-purple-600/10 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-accent">Agentic Marketing</h3>
                    <ul className="space-y-3 text-white/90">
                      <li>• Autonomous campaign orchestration</li>
                      <li>• Real-time continuous optimization</li>
                      <li>• Hyper-personalized at scale</li>
                      <li>• Instant insights and actions</li>
                      <li>• Adaptive to each customer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Use Cases</h2>
              
              <div className="space-y-8">
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">01</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Dynamic Content Generation</h3>
                      <p className="text-white/70 leading-relaxed">
                        Generate thousands of unique product descriptions, blog posts, and social media 
                        content tailored to different audience segments—all while maintaining brand voice 
                        and quality standards.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">02</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Personalized Customer Journeys</h3>
                      <p className="text-white/70 leading-relaxed">
                        Create unique experiences for each visitor based on their behavior, preferences, 
                        and context. AI agents adapt content, recommendations, and interfaces in real-time 
                        to maximize engagement and conversion.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">03</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Autonomous Campaign Optimization</h3>
                      <p className="text-white/70 leading-relaxed">
                        Deploy marketing campaigns that continuously test, learn, and optimize themselves 
                        across channels. AI agents adjust messaging, timing, targeting, and budget allocation 
                        to maximize ROI without manual intervention.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-pink-950 to-purple-950 opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready to Amplify Your Creativity?
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Let's explore how The Creative Studio can help you create experiences and 
                content that captivate audiences at unprecedented scale.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-white text-purple-950 font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Let's Create Together
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
