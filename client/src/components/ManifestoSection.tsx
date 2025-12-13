import { Zap, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function ManifestoSection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  return (
    <section id="manifesto" className="py-16 sm:py-20 lg:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left: Title and Description */}
          <div>
            <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
              {t('manifesto.sectionLabel')}
            </span>

            <h2 className="text-white mb-6 sm:mb-8 text-4xl sm:text-5xl lg:text-6xl" dangerouslySetInnerHTML={{ __html: t('manifesto.title') }} />

            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              {t('manifesto.description')}
            </p>

            <a
              href={getLocalizedPath('/manifesto')}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
            >
              {t('manifesto.readMore')}
              <span className="text-xl">→</span>
            </a>
          </div>

          {/* Right: Manifesto Cards */}
          <div className="space-y-6">
            {/* Card 1 */}
            <div className="group relative p-6 sm:p-8 lg:p-12 glass rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10">
              {/* Glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                <Zap className="w-16 h-16 lg:w-24 lg:h-24 text-accent stroke-1" />
              </div>

              <div className="mb-6 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                <Zap className="w-8 h-8 text-accent" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t('manifesto.card1.title')}
              </h3>

              <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                {t('manifesto.card1.description')}
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative p-8 lg:p-12 glass rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.009] hover:shadow-xl hover:shadow-purple-500/10">
              {/* Glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                <Settings className="w-16 h-16 lg:w-24 lg:h-24 text-accent stroke-1" />
              </div>

              <div className="mb-6 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                <Settings className="w-8 h-8 text-accent" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t('manifesto.card2.title')}
              </h3>

              <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                {t('manifesto.card2.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
