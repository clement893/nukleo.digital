
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

import { useEffect, useState, useRef, memo } from 'react';

function HeroSection() {
  const { playHover, playClick } = useSound();
  const { language, t } = useLanguage();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Helper to get localized path
  const getLocalizedPath = (path: string) => {
    const basePath = path === '/' ? '' : path;
    return language === 'fr' ? `/fr${basePath}` : basePath;
  };
  

  
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = 0;
    const speed = 0.5; // pixels per frame
    
    const animate = (timestamp: number) => {
      if (timestamp - lastTimestamp > 16) { // ~60fps
        setScrollPosition((prev) => prev + speed);
        lastTimestamp = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex items-center justify-center">
          {/* Main Title */}
          <div className="max-w-5xl">
            {/* Main Heading */}
            <h1 
              className="
                text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] 
                font-bold leading-[0.9] tracking-tighter text-white mb-6 sm:mb-8 italic
              "
            >
              {t('hero.title')}
              <br />
              <span 
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                {t('hero.titleHighlight')}
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg sm:text-xl text-white/70 leading-relaxed font-light mb-8 sm:mb-12 max-w-2xl"
            >
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link href={getLocalizedPath('/start-project')}>
                <Button
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="relative rounded-full text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 bg-white text-purple-900 hover:bg-white transition-all duration-500 font-bold tracking-wider hover:scale-[1.045] hover:shadow-xl hover:shadow-purple-500/25 group overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10">{t('hero.cta')}</span>
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Button>
              </Link>
            </div>

            {/* Beyond AI Text - Now before services */}
            <div className="mt-12 sm:mt-16">
              <h3 className="text-center text-white font-semibold text-xl sm:text-2xl mb-4">
                {t('home.beyondAI')}
              </h3>
              <p className="text-center text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                {t('home.beyondAIDescription')}
              </p>
            </div>

            {/* Services Carousel - Text Only */}
            <div className="mt-8">
              <div className="relative max-w-6xl mx-auto overflow-hidden py-4">
                <div 
                  ref={scrollRef}
                  className="flex gap-8 whitespace-nowrap"
                  style={{
                    transform: `translateX(-${scrollPosition}px)`,
                    transition: 'none'
                  }}
                  onTransitionEnd={() => {
                    if (scrollRef.current) {
                      const width = scrollRef.current.scrollWidth / 2;
                      if (scrollPosition >= width) {
                        setScrollPosition(0);
                      }
                    }
                  }}
                >
                  {/* Double the services for seamless loop */}
                  {[...Array(2)].map((_, setIndex) => {
                    const getServices = () => {
                      try {
                        const translations = require(`../locales/${language}.json`);
                        return translations.default?.hero?.services || translations.hero?.services || [];
                      } catch {
                        return [];
                      }
                    };
                    return getServices().map((service: string, index: number) => (
                      <span 
                        key={`${setIndex}-${index}`}
                        className="text-white/40 hover:text-white/80 text-lg sm:text-xl font-medium transition-colors duration-300 cursor-default"
                      >
                        {service}
                      </span>
                    ));
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}

export default memo(HeroSection);
