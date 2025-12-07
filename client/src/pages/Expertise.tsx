import { Brain, Code, Palette, TrendingUp, Database, Sparkles } from 'lucide-react';

export default function Expertise() {
  const expertiseAreas = [
    {
      icon: Brain,
      title: 'Agentic AI Systems',
      description: 'Design and implementation of autonomous AI agents that can reason, plan, and execute complex tasks independently.',
      capabilities: [
        'Multi-agent orchestration',
        'Natural language processing',
        'Decision-making frameworks',
        'Continuous learning systems',
      ],
    },
    {
      icon: Code,
      title: 'AI-Native Platforms',
      description: 'Building intelligent platforms and applications with AI at their core, not as an afterthought.',
      capabilities: [
        'Intelligent SaaS development',
        'Real-time personalization',
        'Predictive analytics',
        'Automated workflows',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Transformation Strategy',
      description: 'Strategic planning and execution to help organizations become AI-native leaders in their industries.',
      capabilities: [
        'AI readiness assessment',
        'Roadmap development',
        'Change management',
        'ROI optimization',
      ],
    },
    {
      icon: Palette,
      title: 'Creative Studio',
      description: 'AI-augmented content creation at scale, producing personalized experiences across all channels.',
      capabilities: [
        'Automated content generation',
        'Brand voice synthesis',
        'Multi-channel campaigns',
        'Dynamic personalization',
      ],
    },
    {
      icon: Database,
      title: 'Intelligent Data Platforms',
      description: 'Building robust data infrastructure that powers AI-driven insights and decision-making.',
      capabilities: [
        'Data pipeline automation',
        'Real-time analytics',
        'Predictive modeling',
        'Knowledge graphs',
      ],
    },
    {
      icon: Sparkles,
      title: 'AI Consulting',
      description: 'Expert guidance on AI strategy, implementation, and optimization for organizations at any stage.',
      capabilities: [
        'Technology evaluation',
        'Vendor selection',
        'Team training',
        'Performance optimization',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <span className="font-mono text-accent text-sm mb-8 block uppercase tracking-widest">
            04 — EXPERTISE
          </span>

          <h1 className="text-white mb-8">
            DEEP<br />
            EXPERTISE
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            Our multidisciplinary approach combines cutting-edge AI technology with strategic thinking and creative execution.
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-3xl p-8 lg:p-10 transition-all duration-500"
                >
                  <div className="mb-6 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {area.title}
                  </h3>

                  <p className="text-white/75 text-base leading-relaxed mb-6">
                    {area.description}
                  </p>

                  <div className="space-y-2">
                    {area.capabilities.map((capability, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-white/60 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-900/30 to-purple-800/30">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-white mb-6">
              OUR<br />
              PROCESS
            </h2>
            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
              A proven methodology for successful AI transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '01', title: 'Discover', description: 'Deep dive into your operations, challenges, and opportunities.' },
              { number: '02', title: 'Design', description: 'Architect the AI-native solution tailored to your needs.' },
              { number: '03', title: 'Develop', description: 'Build and integrate intelligent systems with precision.' },
              { number: '04', title: 'Deploy', description: 'Launch, optimize, and scale your transformation.' },
            ].map((step, index) => (
              <div key={index} className="glass rounded-3xl p-6 lg:p-8">
                <div className="text-accent/40 text-sm font-mono mb-4 tracking-widest">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="glass rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="text-white mb-6">
              LET'S BUILD<br />
              TOGETHER
            </h2>

            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Ready to leverage our expertise for your AI transformation?
            </p>

            <a
              href="/contact"
              className="inline-block rounded-full text-lg px-10 py-6 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider uppercase"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
