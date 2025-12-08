import { useEffect, useState } from 'react';

/**
 * Hook pour créer un effet parallax subtil au scroll
 * @param speed - Vitesse du parallax (0.3 = lent, 0.5 = moyen, 0.7 = rapide)
 * @returns offsetY - Décalage vertical en pixels
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
