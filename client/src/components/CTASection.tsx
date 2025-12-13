import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function CTASection() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  return (
    <section className="py-24 lg:py-32 relative gradient-mesh overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-white mb-8" dangerouslySetInnerHTML={{ __html: t('cta.title') }} />

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed mb-12">
            {t('cta.description')}
          </p>

          <a href={getLocalizedPath('/start-project')}>
            <Button
              className="rounded-full text-lg px-10 py-8 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider hover:scale-[1.022] shimmer"
            >
              {t('cta.button')}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
