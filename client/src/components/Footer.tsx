import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Footer() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  const navigation = [
    { label: t('footer.nav.manifesto'), href: '/manifesto' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.expertise'), href: '/expertise' },
    { label: t('footer.nav.clients'), href: '/clients' },
    { label: t('nav.resources'), href: '/resources' },
    { label: t('nav.contact'), href: '/contact' },
    { label: t('footer.nav.media'), href: '/media' },
    { label: t('footer.nav.agencies'), href: '/agencies' },
  ];

  const services = [
    { label: t('footer.services.agenticAI'), href: '/services/agentic-ai' },
    { label: t('footer.services.aiNative'), href: '/services/digital-platforms' },
    { label: t('footer.services.transformation'), href: '/services/ai-strategy-marketing' },
    { label: t('footer.services.creativeStudio'), href: '/services/creative-studio' },
    { label: t('footer.services.aiConsulting'), href: '/services/intelligent-operations' },
  ];

  return (
    <footer 
      className="text-white py-12 lg:py-16 relative overflow-hidden"
      style={{
        backgroundColor: '#21242E',
        // Optimize background image loading - use CSS instead of inline style for better caching
        backgroundImage: 'url(/arrow-brand.png)',
        backgroundSize: '80px 80px',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        opacity: 0.95,
        // Optimize rendering on mobile
        willChange: 'auto',
        transform: 'translateZ(0)'
      }}
    >
      {/* Overlay pour atténuer le pattern */}
      <div className="absolute inset-0 bg-[#21242E]/60 pointer-events-none" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <Link href={getLocalizedPath('/')} className="mb-4 block">
              <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo" className="h-8 w-auto" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/company/nukleo-group" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold tracking-wider mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={getLocalizedPath(item.href)}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold tracking-wider mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={getLocalizedPath(item.href)}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold tracking-wider mb-4">{t('footer.contact')}</h3>
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
                href="mailto:hello@nukleo.digital"
                className="flex items-center gap-2 text-violet-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@nukleo.digital
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-2">{t('footer.newsletterTitle')}</h3>
            <p className="text-white/60 text-sm mb-6">
              {t('footer.newsletterDescription')}
            </p>
            <form className="flex gap-3">
              <Input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8">
                {t('footer.newsletterButton')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <div>{t('footer.copyright', { year: new Date().getFullYear() })}</div>
          <div className="flex gap-6">
            <Link href={getLocalizedPath('/privacy')} className="hover:text-white transition-colors">{t('footer.links.privacy')}</Link>
            <Link href={getLocalizedPath('/terms')} className="hover:text-white transition-colors">{t('footer.links.terms')}</Link>
            <Link href={getLocalizedPath('/cookies')} className="hover:text-white transition-colors">{t('footer.links.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
