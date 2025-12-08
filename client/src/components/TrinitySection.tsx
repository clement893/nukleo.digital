import { Layers, BarChart3, Globe } from 'lucide-react';
import { Link } from 'wouter';

export default function TrinitySection() {
  const services = [
    {
      number: '01',
      icon: Layers,
      title: 'AI Strategy & Marketing',
      description: 'Transform your business vision into actionable AI strategies that drive growth, enhance customer experiences, and position you as a market leader.',
      link: '/services/ai-strategy-marketing',
    },
    {
      number: '02',
      icon: BarChart3,
      title: 'Digital Platforms',
      description: 'Build intelligent, scalable platforms that transform how you operate, engage customers, and deliver value in the AI era.',
      link: '/services/digital-platforms',
    },
    {
      number: '03',
      icon: Globe,
      title: 'Intelligent Operations',
      description: 'Optimize your operations with AI-powered automation and intelligence that drives efficiency, reduces costs, and scales with your growth.',
      link: '/services/intelligent-operations',
    },
  ];

  return (
    <section className="py-40 bg-gradient-deep-purple text-white relative overflow-hidden gradient-mesh">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 invert" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-24 border-b border-black/10 pb-8">
          <h2 className="text-8xl font-heading font-bold tracking-tighter">
            The<br />
            Trinity
          </h2>

          <p className="text-xl max-w-sm font-light text-white/80 pb-2">
            Three specialized divisions acting as the pillars of your transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-l border-black/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="border-r border-b border-black/10 p-8 sm:p-10 lg:p-16 group hover:border-accent transition-colors duration-500 h-full flex flex-col justify-between min-h-[500px] sm:min-h-[600px] relative breathe depth-layer-1"
              >
                {/* Background Icon (appears on hover) */}
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Icon className="w-40 h-40 stroke-1 text-white/10" />
                </div>

                <div>
                  {/* Number */}
                  <span className="font-mono text-sm mb-8 block opacity-50">
                    {service.number}
                  </span>

                  {/* Icon Badge */}
                  <div className="w-16 h-16 border border-black/20 group-hover:border-white/20 rounded-full flex items-center justify-center mb-12 transition-colors">
                    <Icon className="w-8 h-8 opacity-100 group-hover:text-accent transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl font-heading font-bold mb-6 text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg opacity-60 leading-relaxed mb-12 group-hover:opacity-80">
                    {service.description}
                  </p>
                </div>

                {/* Link */}
                <Link 
                  href={service.link}
                  className="inline-flex items-center font-bold text-lg group-hover:translate-x-2 transition-transform relative z-10"
                >
                  Explore
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
