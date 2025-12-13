import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to preload and apply the background of the destination page
 * Prevents color flash when transitioning between pages with different backgrounds
 */

// Map routes to their background styles
const pageBackgrounds: Record<string, string> = {
  '/': 'gradient', // Home has custom gradient
  '/fr': 'gradient',
  '/en': 'gradient',
  '/expertise': 'gradient',
  '/fr/expertise': 'gradient',
  '/projects': 'gradient',
  '/fr/projects': 'gradient',
  '/contact': 'gradient',
  '/fr/contact': 'gradient',
  '/resources': 'gradient',
  '/fr/resources': 'gradient',
  '/about': 'custom', // About has custom gradient (violet-fuchsia-rose)
  '/fr/about': 'custom',
  '/faq': 'black',
  '/fr/faq': 'black',
  '/services': 'gradient',
  '/fr/services': 'gradient',
  '/studio': 'black',
  '/fr/studio': 'black',
  '/lab': 'black',
  '/fr/lab': 'black',
  '/bureau': 'black',
  '/fr/bureau': 'black',
};

const gradientStyle = `linear-gradient(
  135deg,
  #1e3a8a 0%,
  #3730a3 20%,
  #5b21b6 35%,
  #7c3aed 50%,
  #6d28d9 65%,
  #7f1d1d 85%,
  #991b1b 100%
)`;

const customGradientStyle = `linear-gradient(to bottom right, rgb(30, 0, 50), rgb(80, 0, 60), rgb(100, 0, 40))`;

// About page uses: bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950
const aboutGradientStyle = `linear-gradient(to bottom right, rgb(19, 7, 32), rgb(48, 7, 48), rgb(48, 7, 32))`;

export function usePageBackground() {
  const [location] = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    // Normalize path (remove language prefix for matching)
    const normalizedPath = location.replace(/^\/(fr|en)/, '') || '/';
    const backgroundType = pageBackgrounds[normalizedPath] || pageBackgrounds[location] || 'gradient';

    // Only update if location changed
    if (location !== prevLocationRef.current) {
      // Apply background immediately based on destination page
      let backgroundStyle = '';
      
      switch (backgroundType) {
        case 'black':
          backgroundStyle = '#0a0a0a';
          break;
        case 'custom':
          // About page specific gradient
          backgroundStyle = aboutGradientStyle;
          break;
        case 'gradient':
        default:
          backgroundStyle = gradientStyle;
          break;
      }

      // Apply background to body immediately
      document.body.style.background = backgroundStyle;
      document.body.style.backgroundAttachment = 'fixed';
      
      prevLocationRef.current = location;
    }
  }, [location]);
}
