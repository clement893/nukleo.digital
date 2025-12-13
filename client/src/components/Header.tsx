import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import FullScreenMenu from './FullScreenMenu';
import { useSound } from '@/hooks/useSound';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled ? 'px-6 md:px-12 pt-4' : 'px-6 md:px-12 pt-8'}
        `}
      >
        <div 
          className={`
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isScrolled 
              ? 'glass-dark rounded-full px-8 py-4' 
              : 'bg-transparent'
            }
          `}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex flex-col group cursor-pointer">
              <img 
                src="/Nukleo_blanc_RVB.svg" 
                alt="Nukleo Digital - AI Transformation Agency" 
                width="120"
                height="32"
                fetchPriority="high"
                decoding="async"
                className="h-8 w-auto object-contain mb-1"
              />
              <span className="text-[10px] text-white/60 font-medium tracking-wider">
                Choose Intelligence
              </span>
            </a>

            {/* Right: CTA + Burger Menu */}
            <div className="flex items-center gap-4">
              <Link href="/start-project">
                <Button
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="
                    rounded-full 
                    px-6 md:px-8 
                    py-4 md:py-6 
                    bg-white 
                    text-purple-900 
                    hover:bg-white/90 
                    transition-all duration-500 
                    font-bold 
                    tracking-wider 
                    text-xs
                    hover:scale-[1.045]
                    flex items-center gap-2
                  "
                >
                  Start Project
                </Button>
              </Link>

              {/* Burger Menu Button */}
              <button
                onClick={() => { playClick(); setIsMenuOpen(true); }}
                onMouseEnter={playHover}
                className="text-white hover:bg-white/10 transition-colors p-2 rounded-lg"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
