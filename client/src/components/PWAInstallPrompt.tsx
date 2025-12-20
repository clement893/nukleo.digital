/**
 * PWA Install Prompt Component
 * 
 * Displays a prompt to install the Progressive Web App when:
 * - The app is not already installed
 * - The browser supports PWA installation
 * - The user hasn't dismissed the prompt recently
 */

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Check if user has dismissed the prompt recently (within 7 days)
    const dismissedAt = localStorage.getItem('pwa-install-dismissed');
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after a delay (e.g., 3 seconds after page load)
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user's choice
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      // User accepted the install prompt
      setShowPrompt(false);
      setDeferredPrompt(null);
    } else {
      // User dismissed the install prompt
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember that user dismissed the prompt
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-white dark:bg-gray-800 border-2 border-purple-500 rounded-2xl shadow-2xl p-6 animate-slide-up"
      role="dialog"
      aria-labelledby="pwa-install-title"
      aria-describedby="pwa-install-description"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <Download className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        </div>
        <div className="flex-1">
          <h3 id="pwa-install-title" className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {t('pwa.install.title') || 'Install Nukleo Digital'}
          </h3>
          <p id="pwa-install-description" className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('pwa.install.description') || 'Install our app for a faster, more convenient experience.'}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleInstall}
              className="bg-purple-500 hover:bg-purple-600 text-white"
              aria-label={t('pwa.install.button') || 'Install app'}
            >
              {t('pwa.install.button') || 'Install'}
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
              aria-label={t('pwa.install.dismiss') || 'Dismiss'}
            >
              {t('pwa.install.dismiss') || 'Not now'}
            </Button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label={t('pwa.install.close') || 'Close'}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

