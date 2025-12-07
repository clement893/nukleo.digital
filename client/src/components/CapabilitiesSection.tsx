import { Globe, Layers, Zap, BarChart3 } from 'lucide-react';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      icon: Globe,
      title: 'AI-Base Websites',
      description: 'Self-optimizing web experiences that adapt content and layout in real-time based on user behavior and intent.',
    },
    {
      icon: Layers,
      title: 'Intelligent Platforms',
      description: 'SaaS and internal tools built on agentic architecture, automating complex workflows and decision-making.',
    },
    {
      icon: Zap,
      title: 'Next-Gen Apps',
      description: 'Mobile and desktop applications with embedded AI cores, offering predictive features and natural language interfaces.',
    },
    {
      icon: BarChart3,
      title: 'Automated Marketing',
      description: 'End-to-end campaign management by AI agents—from content generation to ad buying and performance analysis.',
    },
  ];

  return (
    <section id="capabilities" className="py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-accent text-sm mb-8 block uppercase tracking-widest">
            CAPABILITIES
          </span>

          <h2 className="text-white mb-6">
            AI-NATIVE<br />
            INFRASTRUCTURE
          </h2>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            We don't just build websites or apps. We engineer intelligent ecosystems where every digital touchpoint is powered by autonomous agents.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className="group p-6 sm:p-8 glass transition-all duration-500 cursor-pointer h-full rounded-2xl sm:rounded-3xl"
              >
                <div className="relative z-10 mb-6 text-accent transition-colors duration-300">
                  <Icon className="w-10 h-10 stroke-1" />
                </div>

                <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {capability.title}
                </h3>

                <p className="relative z-10 text-white/75 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
