import { useCallback } from 'react';

/**
 * Hook personnalisé pour les sons interactifs synthétiques
 * Utilise Web Audio API pour générer des sons procéduraux (0 KB, 0ms latence)
 */
export function useSound() {
  /**
   * Son "Hover" - Pip ascendant léger
   * - Fréquence: 400 Hz → 600 Hz (glissando ascendant)
   * - Onde: Sine (pure, douce)
   * - Durée: 100ms
   * - Volume: 5% (très subtil)
   * - Sensation: Bulle qui éclate, note de xylophone miniature
   */
  const playHover = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Configuration oscillateur (son)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    
    // Configuration gain (volume)
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    // Connexion graphe audio
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Lecture
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, []);

  /**
   * Son "Click" - Boop descendant confirmé
   * - Fréquence: 300 Hz → 100 Hz (glissando descendant)
   * - Onde: Triangle (harmoniques impaires, plus riche)
   * - Durée: 150ms
   * - Volume: 10% (2x plus fort que hover)
   * - Sensation: Bouton qui s'enfonce, touche de synthé vintage
   */
  const playClick = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Configuration oscillateur (son)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    
    // Configuration gain (volume)
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    // Connexion graphe audio
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Lecture
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, []);

  return { playHover, playClick };
}
