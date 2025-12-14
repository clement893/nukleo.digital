
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
    // Optimize animation for mobile - reduce frame rate on slower devices
    let animationFrameId: number;
    let lastTimestamp = 0;
    const speed = 0.5; // pixels per frame
    // Reduce animation on mobile for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const frameInterval = isMobile ? 32 : 16; // ~30fps on mobile, ~60fps on desktop
    
    const animate = (timestamp: number) => {
      if (timestamp - lastTimestamp > frameInterval) {
        setScrollPosition((prev) => prev + speed);
        lastTimestamp = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Use Intersection Observer to pause animation when not visible
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && scrollRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        },
        { threshold: 0 }
      );
      
      observer.observe(scrollRef.current);
      
      return () => {
        observer.disconnect();
        cancelAnimationFrame(animationFrameId);
      };
    }
    
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
              className={`
                ${language === 'fr' 
                  ? 'text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[8rem]' 
                  : 'text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem]'
                }
                font-bold leading-[1.1] tracking-tighter text-white mb-6 sm:mb-8 italic
              `}
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
              <div className="text-left max-w-3xl">
                <p className="text-white/60 text-xs sm:text-sm font-mono uppercase tracking-widest mb-3">
                  {t('home.beyondAI')}
                </p>
                <p className="text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {t('home.beyondAIDescription')}
                </p>
              </div>
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
                    // Use translation hook with returnObjects support
                    const services = (t('hero.services', { returnObjects: true }) as string[]) || [];
                    
                    // Ensure services is always an array
                    if (!Array.isArray(services)) {
                      return null;
                    }
                    
                    return services.map((service: string, index: number) => (
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
