import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const navItems = [
    { number: '01', label: 'Manifesto', href: '#manifesto' },
    { number: '02', label: 'Projects', href: '#projects' },
    { number: '03', label: 'About', href: '#about' },
    { number: '04', label: 'Expertise', href: '#expertise' },
    { number: '05', label: 'Resources', href: '#resources' },
    { number: '06', label: 'FAQ', href: '#faq' },
    { number: '07', label: 'Contact', href: '#contact' },
    { number: '08', label: 'Art & Culture', href: '#art-culture' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-in fade-in duration-500">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center" onClick={onClose}>
              <img 
                src="/nukleo-logo.png" 
                alt="Nukleo" 
                className="h-8 w-auto"
              />
            </a>

            {/* Close Button and CTA */}
            <div className="flex items-center gap-4">
              <Button
                className="rounded-full bg-white text-purple-900 hover:bg-white/90 font-bold px-6"
                onClick={onClose}
              >
                START PROJECT
              </Button>
              <button
                onClick={onClose}
                className="text-white hover:text-white/80 transition-colors p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="h-full flex items-center justify-center">
        <nav className="container">
          <ul className="space-y-4 lg:space-y-6">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className="animate-in slide-in-from-left duration-700"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-6 text-white hover:text-white/80 transition-all duration-300"
                >
                  <span className="text-sm lg:text-base font-mono text-white/40 group-hover:text-white/60 transition-colors min-w-[3rem]">
                    {item.number}
                  </span>
                  <span className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 pb-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white/60 text-sm">
            <div className="flex gap-6">
              <a href="mailto:hello@nukleo.digital" className="hover:text-white transition-colors">
                hello@nukleo.digital
              </a>
              <a href="tel:+15149777-1234" className="hover:text-white transition-colors">
                +1 (514) 777-1234
              </a>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
