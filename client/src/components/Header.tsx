import { useState, useEffect } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullScreenMenu from './FullScreenMenu';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playHover, playClick } = useSound();
  const { theme, toggleTheme } = useTheme();

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
                src="/nukleo-logo.webp" 
                alt="Nukleo" 
                width="120"
                height="32"
                fetchPriority="high"
                className="h-8 w-auto object-contain brightness-0 invert mb-1"
              />
              <span className="text-[10px] text-white/60 font-medium tracking-wider">
                Choose Intelligence
              </span>
            </a>

            {/* Right: Theme Toggle + CTA + Burger Menu */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={() => { playClick(); toggleTheme?.(); }}
                onMouseEnter={playHover}
                className="
                  w-10 h-10 md:w-12 md:h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  backdrop-blur-sm
                  flex items-center justify-center
                  transition-all duration-500
                  hover:scale-110
                  group
                "
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-900 group-hover:-rotate-12 transition-transform duration-500" />
                )}
              </button>

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
                  hover:scale-110
                  flex items-center gap-2
                "
              >
                Start Project
              </Button>

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
