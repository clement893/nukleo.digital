import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullScreenMenu from './FullScreenMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/10">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/nukleo-logo.png" 
                alt="Nukleo" 
                className="h-8 w-auto"
              />
            </a>

            {/* Right: CTA + Burger Menu */}
            <div className="flex items-center gap-4">
              <Button
                className="rounded-full bg-white text-purple-900 hover:bg-white/90 font-bold px-6 text-sm uppercase tracking-wide"
              >
                START PROJECT
              </Button>

              {/* Burger Menu Button (Always Visible) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
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
