import { Cpu, Compass, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export default function TrinitySection() {
  const departments = [
    {
      number: '01',
      icon: Cpu,
      name: 'Lab',
      title: 'The AI Lab',
      subtitle: 'Technology Foundation',
      description: 'Building the robust and flexible technological foundation for AI integration. From intelligent data platforms to custom AI agents and intelligent process automation.',
      link: '/services/ai-lab',
    },
    {
      number: '02',
      icon: Compass,
      name: 'Bureau',
      title: 'The Strategic Bureau',
      subtitle: 'Transformation Orchestration',
      description: 'Defining strategy, driving transformation, and measuring AI impact. From maturity audits to agentic transformation strategy and AI governance.',
      link: '/services/strategic-bureau',
    },
    {
      number: '03',
      icon: Sparkles,
      name: 'Studio',
      title: 'The Creative Studio',
      subtitle: 'Augmented Content & Experiences',
      description: 'Using AI to create brand experiences and content at unparalleled scale and relevance. From augmented content creation to agentic marketing campaigns.',
      link: '/services/creative-studio',
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

        {/* Departments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-l border-black/10">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div
                key={index}
                className="border-r border-b border-black/10 p-8 sm:p-10 lg:p-16 group hover:border-accent transition-all duration-500 h-full flex flex-col justify-between min-h-[500px] sm:min-h-[600px] relative breathe depth-layer-1 overflow-hidden hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Background Icon (appears on hover) */}
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <Icon className="w-40 h-40 stroke-1 text-white/10" />
                </div>

                <div>
                  {/* Number & Name */}
                  <div className="flex items-center gap-3 mb-8">
                    <span className="font-mono text-sm opacity-50">
                      {dept.number}
                    </span>
                    <span className="text-sm font-bold tracking-wider opacity-50">
                      {dept.name.toUpperCase()}
                    </span>
                  </div>

                  {/* Icon Badge */}
                  <div className="w-16 h-16 border border-black/20 group-hover:border-white/20 rounded-full flex items-center justify-center mb-12 transition-colors">
                    <Icon className="w-8 h-8 opacity-100 group-hover:text-accent transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl font-heading font-bold mb-2 text-white">
                    {dept.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-lg font-medium mb-6 text-accent">
                    {dept.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-lg opacity-60 leading-relaxed mb-12 group-hover:opacity-80">
                    {dept.description}
                  </p>
                </div>

                {/* Link */}
                <Link 
                  href={dept.link}
                  className="inline-flex items-center font-bold text-lg group-hover:translate-x-2 transition-transform relative z-10"
                >
                  Explore {dept.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
