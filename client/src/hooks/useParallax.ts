import { useEffect, useState } from 'react';

/**
 * Hook personnalisé pour créer un effet parallax subtil au scroll.
 * 
 * Calcule un décalage vertical basé sur la position de scroll et une vitesse
 * configurable. Utilise `requestAnimationFrame` pour des performances optimales.
 * 
 * @param speed - Vitesse du parallax (défaut: 0.5)
 *   - `0.3` = lent (effet subtil)
 *   - `0.5` = moyen (effet équilibré)
 *   - `0.7` = rapide (effet prononcé)
 * 
 * @returns `offsetY` - Décalage vertical en pixels à appliquer à l'élément
 * 
 * @example
 * ```tsx
 * const offsetY = useParallax(0.5);
 * 
 * return (
 *   <div style={{ transform: `translateY(${offsetY}px)` }}>
 *     Contenu avec effet parallax
 *   </div>
 * );
 * ```
 */
export function useParallax(speed: number = 0.5) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.pageYOffset * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offsetY;
}
