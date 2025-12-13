import SEO from '@/components/SEO';
import PageLayout from '../components/PageLayout';

export default function Manifesto() {
  return (
    <PageLayout>
      <SEO 
        title="Our Manifesto | Move From Pilot to Scale"
        description="Discover the Nukleo manifesto: our vision for AI transformation that moves beyond pilots to production-ready, scalable solutions. Read our approach to AI success."
        keywords="AI transformation manifesto, AI vision, AI philosophy, AI approach, scaling AI solutions"
      />
      <div className="min-h-screen pt-24 pb-20 px-4">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-white/90">01 Manifesto</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Move From<br />
            Pilot to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Scale.
            </span>
          </h1>
          
          <p className="text-2xl text-white/70 max-w-3xl leading-relaxed">
            The gap is widening. While some experiment, leaders are rearchitecting 
            their entire operations around agentic AI.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white">The Era of Experimentation is Over</h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                We've spent the past two years testing chatbots, generating content, 
                and exploring AI possibilities. These experiments have been valuable, but 
                they're no longer enough.
              </p>
              <p>
                Today, the question is no longer "How can I use AI?" but 
                "How can I reinvent my organization around AI?"
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-white mb-6">The New Paradigm</h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                Agentic AI represents a fundamental shift in how we conceive work. It's no longer 
                about tools we use, but autonomous agents that collaborate with us, learn from us, 
                and execute complex tasks independently.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">Before</h3>
                  <ul className="space-y-2 text-white/60">
                    <li>• Passive tools</li>
                    <li>• Manual processes</li>
                    <li>• Human-only decisions</li>
                    <li>• Limited scale</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-accent">Now</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Autonomous agents</li>
                    <li>• Intelligent automation</li>
                    <li>• AI-augmented decisions</li>
                    <li>• Exponential scale</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white">Our Vision</h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                At Nukleo Digital, we believe every organization can become an AI leader. 
                Our mission is to guide you through this transformation, step by step, from experimentation 
                to industrialization.
              </p>
              <p>
                We don't simply build websites or applications. We create intelligent 
                ecosystems where every digital touchpoint is powered by autonomous agents 
                that optimize, learn, and adapt in real-time.
              </p>
            </div>
          </section>

          {/* Section 4 - Principles */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Our Principles</h2>
            <div className="grid gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">1. Leader, Not Follower</h3>
                <p className="text-white/70">
                  Integrate agentic AI capabilities that can triple your ROI, speed, 
                  and production volume.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">2. Reinvented Operations</h3>
                <p className="text-white/70">
                  Rearchitect your workflows around intelligent agents that automate and 
                  continuously optimize.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">3. Limitless Scale</h3>
                <p className="text-white/70">
                  Create systems that grow with you, without traditional constraints 
                  of human resources or time.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">4. Human-Centered</h3>
                <p className="text-white/70">
                  AI doesn't replace humans, it augments them. Our solutions free your team 
                  to focus on what truly matters: strategy, creativity, and innovation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Call to Action */}
          <section className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-purple-700/50 rounded-3xl p-8 md:p-12 text-center border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Scale?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              The era of agentic marketing is here. Define your roadmap to become 
              an AI-native leader.
            </p>
            <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.022]">
              Start Your Transformation
            </button>
          </section>

          {/* Section 6 - Quote */}
          <section className="border-l-4 border-accent pl-8 py-4">
            <blockquote className="text-2xl md:text-3xl font-light text-white/80 italic leading-relaxed">
              "The future belongs to those who build tomorrow's systems today."
            </blockquote>
            <p className="text-white/60 mt-4">The Nukleo Digital Team</p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
