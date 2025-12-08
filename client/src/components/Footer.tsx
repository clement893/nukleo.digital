import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const navigation = [
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Resources', href: '#resources' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    { label: 'Agentic AI Systems', href: '#' },
    { label: 'AI-Native Platforms', href: '#' },
    { label: 'Transformation Strategy', href: '#' },
    { label: 'Creative Studio', href: '#' },
    { label: 'AI Consulting', href: '#' },
  ];

  return (
    <footer className="bg-black text-white py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <a href="/" className="text-2xl font-bold font-['Space_Grotesk'] mb-4 block">
              nukleo.
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Architects of your AI future. We transform your marketing, platforms, and operations to help you thrive in the age of artificial intelligence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">NAVIGATION</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">SERVICES</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">CONTACT</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-white font-medium mb-1">Montréal</div>
                <div className="text-white/60">
                  7236 Rue Waverly<br />
                  Montréal, QC H2R 0C2
                </div>
              </div>
              <div>
                <div className="text-white font-medium mb-1">Halifax</div>
                <div className="text-white/60">
                  1800 Argyle St Unit 801<br />
                  Halifax, NS B3J 3N8
                </div>
              </div>
              <a
                href="mailto:hello@nukleo.com"
                className="flex items-center gap-2 text-violet-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@nukleo.com
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-2">Stay Ahead of the AI Curve</h3>
            <p className="text-white/60 text-sm mb-6">
              Subscribe to receive our latest insights, technical guides, and industry analysis.
            </p>
            <form className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <div>© 2025 Nukleo. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
