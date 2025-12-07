import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullScreenMenu from './FullScreenMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '01', sublabel: 'Manifesto', href: '#manifesto' },
    { label: '02', sublabel: 'Projects', href: '#projects' },
    { label: '03', sublabel: 'About', href: '#about' },
    { label: '04', sublabel: 'Expertise', href: '#expertise' },
    { label: '05', sublabel: 'Resources', href: '#resources' },
    { label: '06', sublabel: 'FAQ', href: '#faq' },
    { label: '07', sublabel: 'Contact', href: '#contact' },
  ];

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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-baseline gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
                >
                  <span className="text-xs text-white/60">{item.label}</span>
                  <span>{item.sublabel}</span>
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <Button
              className="hidden lg:flex rounded-full bg-white text-purple-900 hover:bg-white/90 font-bold px-6"
            >
              START PROJECT
            </Button>

            {/* Menu Button (Desktop & Mobile) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-white p-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
