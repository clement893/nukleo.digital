import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const [location] = useLocation();
  const { playHover, playClick } = useSound();
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  const navItems = [
    { number: '01', label: t('nav.expertise'), path: '/expertise' },
    { number: '02', label: t('nav.projects'), path: '/projects' },
    { number: '03', label: t('nav.about'), path: '/about' },
    { number: '04', label: t('nav.resources'), path: '/resources' },
    { number: '05', label: 'FAQ', path: '/faq' },
    { number: '06', label: t('nav.contact'), path: '/contact' },
    { number: '07', label: t('nav.talkToLeo'), path: '/leo' },
    { number: '08', label: t('nav.artsCulture'), path: '/arts-culture' },
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Blocage du scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-40 
        bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Blob 1 - Violet */}
      <div 
        className={`
          absolute top-1/4 left-1/4 
          w-96 h-96 
          bg-purple-500 
          rounded-full blur-3xl 
          opacity-30 
          transition-all duration-1000
          ${isOpen ? 'scale-100 animate-pulse' : 'scale-0'}
        `}
      />
      
      {/* Blob 2 - Rose */}
      <div 
        className={`
          absolute bottom-1/4 right-1/4 
          w-96 h-96 
          bg-purple-600 
          rounded-full blur-3xl 
          opacity-30 
          transition-all duration-1000 delay-200
          ${isOpen ? 'scale-100 animate-pulse' : 'scale-0'}
        `}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 pt-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={getLocalizedPath('/')} className="flex items-center group cursor-pointer" onClick={onClose}>
            <img 
              src="/Nukleo_blanc_RVB.svg" 
              alt="Nukleo Digital - AI Transformation Agency" 
              width="120"
              height="32"
              fetchPriority="high"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Close Button and CTA */}
          <div className="flex items-center gap-4">
            <Link href={getLocalizedPath('/start-project')}>
              <Button
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
                onClick={() => {
                  playClick();
                  setTimeout(onClose, 300);
                }}
              >
                {t('nav.startProject')}
              </Button>
            </Link>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 transition-colors p-2 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="h-full flex items-center justify-center relative z-10">
        <nav className="container px-6 md:px-12">
          <ul className="space-y-2 md:space-y-3 max-w-2xl mx-auto">
            {navItems.map((item, itemIdx) => (
                      <li
                        key={item.path}
                        className={`
                          transform 
                          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}
                        `}
                        style={{ 
                          transitionDelay: isOpen ? `${itemIdx * 50}ms` : "0ms" 
                        }}
                      >
                        <Link
                          href={getLocalizedPath(item.path)}
                          onClick={() => {
                            playClick();
                            setTimeout(onClose, 300);
                          }}
                        >
                          <div
                            onMouseEnter={playHover}
                            className="
                              w-full group 
                              flex items-center gap-4 md:gap-6 
                              py-2 md:py-3 px-4 md:px-6 
                              rounded-xl 
                              hover:bg-white/10 
                              transition-all duration-500
                              cursor-pointer
                              relative
                              overflow-hidden
                            "
                          >
                            <span 
                              className="
                                text-xs md:text-sm 
                                font-mono 
                                text-accent 
                                opacity-60 
                                group-hover:opacity-100 
                                transition-opacity
                              "
                            >
                              {item.number}
                            </span>
                            <span 
                              className={`
                                text-2xl md:text-3xl lg:text-4xl 
                                font-bold 
                                transition-all duration-500
                                ${location === item.path 
                                  ? 'text-white' 
                                  : 'text-white/70 group-hover:text-white group-hover:translate-x-4'
                                }
                              `}
                            >
                              {item.label}
                            </span>
                            {location === item.path && (
                              <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse" />
                            )}
                          </div>
                        </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div 
        className={`
          absolute bottom-8 md:bottom-12 left-0 right-0 px-6 md:px-12
          transition-all duration-700 delay-500
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-6">
            <a 
              href="mailto:hello@nukleo.com" 
              className="text-white/60 text-sm hover:text-white transition-colors"
            >
              hello@nukleo.com
            </a>
          </div>
          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/company/nukleo-group" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 text-sm hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
