import { Rocket, Building2, Building, Landmark } from 'lucide-react';

export default function WhoWeServeSection() {
  const segments = [
    {
      icon: Rocket,
      title: 'Startups & Scale-ups',
      description: 'Accelerate your growth with AI-powered automation, intelligent product features, and data-driven decision making from day one.',
      highlights: ['Rapid prototyping', 'Scalable architecture', 'Product-market fit optimization']
    },
    {
      icon: Building2,
      title: 'SMBs & Mid-Market',
      description: 'Transform your operations with practical AI solutions that deliver measurable ROI, from customer service automation to predictive analytics.',
      highlights: ['Cost-effective solutions', 'Quick implementation', 'Proven ROI']
    },
    {
      icon: Building,
      title: 'Enterprises & Fortune 500',
      description: 'Drive enterprise-wide AI transformation with strategic roadmaps, governance frameworks, and large-scale implementation expertise.',
      highlights: ['Enterprise architecture', 'Change management', 'Compliance & security']
    },
    {
      icon: Landmark,
      title: 'Governments & Institutions',
      description: 'Modernize public services with responsible AI, ensuring transparency, accessibility, and citizen-centric innovation at scale.',
      highlights: ['Public sector expertise', 'Ethical AI frameworks', 'Digital transformation']
    }
  ];

  return (
    <section className="relative py-32">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-mono uppercase tracking-widest text-purple-400 mb-4">
            Global Reach
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Who We Serve
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From ambitious startups to global enterprises, we partner with organizations of all sizes to unlock the transformative power of artificial intelligence.
          </p>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {segments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500"
              >
                {/* Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-purple-900/30 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-500">
                  <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-500">
                  {segment.title}
                </h3>

                {/* Description */}
                <p className="text-base text-white/70 leading-relaxed mb-6">
                  {segment.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {segment.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/0 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-white/60 mb-6">
            No matter your size or sector, we have the expertise to guide your AI transformation journey.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            Discuss Your Project
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
