import { Cpu, Compass, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function TrinitySection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const departments = [
    {
      number: '01',
      icon: Cpu,
      name: 'Lab',
      title: t('trinity.lab.title'),
      subtitle: t('trinity.lab.subtitle'),
      description: t('trinity.lab.description'),
      link: '/services/ai-lab',
    },
    {
      number: '02',
      icon: Compass,
      name: 'Bureau',
      title: t('trinity.bureau.title'),
      subtitle: t('trinity.bureau.subtitle'),
      description: t('trinity.bureau.description'),
      link: '/services/strategic-bureau',
    },
    {
      number: '03',
      icon: Sparkles,
      name: 'Studio',
      title: t('trinity.studio.title'),
      subtitle: t('trinity.studio.subtitle'),
      description: t('trinity.studio.description'),
      link: '/services/creative-studio',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-deep-purple text-white relative overflow-hidden gradient-mesh">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 invert" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
            {t('trinity.sectionLabel')}
          </span>
          <h2 className="text-white mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl font-heading" dangerouslySetInnerHTML={{ __html: t('trinity.title') }} />
          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl">
            {t('trinity.description')}
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div
                key={index}
                className="group relative p-6 sm:p-6 lg:p-8 glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Number & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm text-white/50">
                      {dept.number}
                    </span>
                    <span className="text-sm font-bold tracking-wider text-white/50">
                      {dept.name.toUpperCase()}
                    </span>
                  </div>

                  {/* Icon Badge */}
                  <div className="mb-4 w-12 h-12 bg-accent/20 flex items-center justify-center rounded-lg">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                    {dept.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm lg:text-base font-medium mb-4 text-accent">
                    {dept.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-white/75 text-sm lg:text-base leading-relaxed mb-6">
                    {dept.description}
                  </p>

                  {/* Link */}
                  <Link 
                    href={getLocalizedPath(dept.link)}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    {t('trinity.explore')} {dept.name}
                    <span className="text-xl">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
