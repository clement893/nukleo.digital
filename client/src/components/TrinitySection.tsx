import { Layers, BarChart3, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TrinitySection() {
  const services = [
    {
      number: '01',
      icon: Layers,
      title: 'The AI Lab',
      description: 'Building the robust and flexible technological foundation. Intelligent data platforms and custom autonomous agents.',
    },
    {
      number: '02',
      icon: BarChart3,
      title: 'Strategic Bureau',
      description: 'Defining strategy, driving transformation, and measuring impact. Charting your path to AI leadership.',
    },
    {
      number: '03',
      icon: Globe,
      title: 'Creative Studio',
      description: 'Augmented content creation at scale. Personalized, dynamic, and continuously optimized brand experiences.',
    },
  ];

  return (
    <section id="trinity" className="py-24 lg:py-32 relative" style={{
      background: 'linear-gradient(135deg, oklch(0.40 0.20 280) 0%, oklch(0.50 0.22 300) 100%)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white mb-6">
            THE<br />
            TRINITY
          </h2>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            Three specialized divisions acting as the pillars of your transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 lg:p-10 glass-strong rounded-3xl breathe transition-all duration-500"
              >
                {/* Number */}
                <div className="text-accent/40 text-sm font-mono mb-6 tracking-widest">
                  {service.number}
                </div>

                {/* Icon */}
                <div className="mb-8 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                  <Icon className="w-8 h-8 text-accent" />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/75 text-base leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="text-accent hover:text-accent/80 p-0 h-auto font-medium"
                >
                  Explore →
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
