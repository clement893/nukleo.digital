import { Globe, Layers, Zap, BarChart3 } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CapabilitiesSection() {
  const { playHover, playClick } = useSound();
  const { t } = useLanguage();
  
  const capabilities = [
    {
      icon: Globe,
      title: t('capabilities.aiWebsites.title'),
      description: t('capabilities.aiWebsites.description'),
    },
    {
      icon: Layers,
      title: t('capabilities.intelligentPlatforms.title'),
      description: t('capabilities.intelligentPlatforms.description'),
    },
    {
      icon: Zap,
      title: t('capabilities.nextGenApps.title'),
      description: t('capabilities.nextGenApps.description'),
    },
    {
      icon: BarChart3,
      title: t('capabilities.automatedMarketing.title'),
      description: t('capabilities.automatedMarketing.description'),
    },
  ];

  return (
    <section id="capabilities" className="py-16 sm:py-20 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
            {t('capabilities.sectionLabel')}
          </span>

          <h2 className="text-white mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl" dangerouslySetInnerHTML={{ __html: t('capabilities.title') }} />

          <p className="text-white/75 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">
            {t('capabilities.description')}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                onClick={playClick}
                onMouseEnter={playHover}
                className="group p-6 sm:p-8 glass transition-all duration-500 cursor-pointer h-full rounded-2xl sm:rounded-3xl overflow-hidden hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
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
