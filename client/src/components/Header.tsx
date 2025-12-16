import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import FullScreenMenu from './FullScreenMenu';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playHover, playClick } = useSound();
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  // Memoize handlers to prevent re-renders
  const handleMenuOpen = useCallback(() => {
    playClick();
    setIsMenuOpen(true);
  }, [playClick]);
  
  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    // Optimize scroll handler for mobile - use passive listener and throttle
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300 sm:duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled ? 'px-4 sm:px-6 md:px-12 pt-3 sm:pt-4' : 'px-4 sm:px-6 md:px-12 pt-6 sm:pt-8'}
        `}
      >
        <div 
          className={`
            transition-all duration-300 sm:duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isScrolled 
              ? 'glass-dark rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4' 
              : 'bg-transparent'
            }
          `}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href={getLocalizedPath('/')} className="flex flex-col items-center group cursor-pointer touch-manipulation">
              <img 
                src="/Nukleo_blanc_RVB.svg" 
                alt={t('alt.logo') || 'Logo Nukleo Digital - Agence de transformation IA'} 
                width="120"
                height="32"
                fetchPriority="high"
                decoding="async"
                loading="eager"
                className="h-7 sm:h-8 w-auto object-contain mb-0.5 sm:mb-1"
                style={{ aspectRatio: '120 / 32' }}
              />
              <span className={`text-[9px] sm:text-[10px] text-white/60 font-medium tracking-wider text-center transition-all duration-300 sm:duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100 h-auto mb-0'
              }`}>
                {t('header.tagline')}
              </span>
            </Link>

            {/* Right: CTA + Burger Menu */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href={getLocalizedPath('/start-project')} className="hidden xs:block">
                <Button
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="
                    rounded-full 
                    px-4 sm:px-6 md:px-8 
                    py-2.5 sm:py-4 md:py-6 
                    bg-white 
                    text-purple-900 
                    active:bg-white/90 sm:hover:bg-white/90 
                    transition-all duration-300 
                    font-bold 
                    tracking-wider 
                    text-[10px] sm:text-xs md:text-sm
                    active:scale-[0.98] sm:hover:scale-[1.045]
                    flex items-center gap-1.5 sm:gap-2
                    touch-manipulation
                  "
                >
                  {t('nav.startProject')}
                </Button>
              </Link>

              {/* Burger Menu Button */}
              <button
                onClick={isMenuOpen ? handleMenuClose : handleMenuOpen}
                onMouseEnter={playHover}
                className="
                  flex items-center gap-1.5 sm:gap-2
                  text-white 
                  active:bg-white/20 sm:hover:bg-white/10 
                  transition-all duration-300 
                  px-2.5 sm:px-3 py-1.5 sm:py-2 
                  rounded-lg 
                  touch-manipulation
                  font-medium
                  text-xs sm:text-sm
                  border border-white/20 sm:hover:border-white/30
                  backdrop-blur-sm
                "
                aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  <Menu 
                    className={`
                      absolute inset-0 w-full h-full
                      transition-all duration-300 ease-in-out
                      ${isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
                    `}
                  />
                  <X 
                    className={`
                      absolute inset-0 w-full h-full
                      transition-all duration-300 ease-in-out
                      ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}
                    `}
                  />
                </div>
                <span className="hidden sm:inline-block whitespace-nowrap">
                  {isMenuOpen ? t('header.closeMenu') : t('header.menu')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}

export default memo(Header);
