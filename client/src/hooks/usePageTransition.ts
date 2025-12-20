import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook personnalisé pour déclencher des animations de transition entre les pages.
 * 
 * Ajoute automatiquement des classes CSS au `body` lors des changements de route
 * pour permettre le redémarrage des animations CSS et éviter les flashs visuels.
 * 
 * **Comportement** :
 * - Ajoute la classe `loaded` au body pour s'assurer qu'il reste visible
 * - Ajoute la classe `page-transitioning` lors du changement de route
 * - Retire la classe après 300ms (durée des animations)
 * 
 * @example
 * ```tsx
 * // Dans votre composant App ou Layout
 * usePageTransition();
 * 
 * // Dans votre CSS
 * .page-transitioning {
 *   animation: fadeIn 0.3s ease-in-out;
 * }
 * ```
 */
export function usePageTransition() {
  const [location] = useLocation();

  useEffect(() => {
    // Ensure body is always visible - never hide it
    document.body.classList.add('loaded');
    
    // Add animation trigger class
    document.body.classList.add('page-transitioning');
    
    // Force reflow to restart animations
    void document.body.offsetHeight;
    
    // Remove class after animations complete
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transitioning');
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);
}
