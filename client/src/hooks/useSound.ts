import { useCallback } from 'react';

/**
 * Hook personnalisé pour les sons interactifs synthétiques modernes
 * Utilise Web Audio API pour générer des sons procéduraux (0 KB, 0ms latence)
 * Design sonore moderne et professionnel, inspiré des interfaces premium
 */
export function useSound() {
  /**
   * Son "Hover" - Son moderne et subtil
   * - Fréquence: 1200 Hz → 1500 Hz (glissando ascendant doux)
   * - Onde: Sine avec filtre passe-haut pour clarté
   * - Durée: 80ms (plus rapide, plus réactif)
   * - Volume: 3% (très subtil, non intrusif)
   * - Sensation: Feedback tactile moderne, comme un tap sur verre
   */
  const playHover = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    // Configuration oscillateur (son moderne et clair)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.08);
    
    // Filtre passe-haut pour rendre le son plus clair et moderne
    filter.type = 'highpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;
    
    // Configuration gain (volume très subtil)
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    // Connexion graphe audio avec filtre
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // Lecture
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }, []);

  /**
   * Son "Click" - Confirmation moderne et professionnelle
   * - Fréquence: 800 Hz → 1000 Hz (montée douce puis chute rapide)
   * - Onde: Sine avec enveloppe ADSR sophistiquée
   * - Durée: 120ms
   * - Volume: 6% (légèrement plus fort que hover)
   * - Sensation: Confirmation tactile moderne, comme un clic de trackpad premium
   */
  const playClick = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    const now = ctx.currentTime;
    
    // Configuration oscillateur (son moderne)
    osc.type = 'sine';
    // Montée douce puis chute rapide pour un effet plus naturel
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    
    // Filtre passe-haut pour clarté
    filter.type = 'highpass';
    filter.frequency.value = 500;
    filter.Q.value = 1;
    
    // Enveloppe ADSR moderne (Attack, Decay, Sustain, Release)
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.01); // Attack rapide
    gain.gain.exponentialRampToValueAtTime(0.04, now + 0.04); // Decay
    gain.gain.setValueAtTime(0.04, now + 0.08); // Sustain
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12); // Release
    
    // Connexion graphe audio avec filtre
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    // Lecture
    osc.start();
    osc.stop(now + 0.12);
  }, []);

  return { playHover, playClick };
}
