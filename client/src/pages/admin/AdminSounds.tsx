import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Save, RotateCcw } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export type SoundType = 'hover' | 'click';

export interface SoundConfig {
  name: string;
  description: string;
  hover: {
    frequencyStart: number;
    frequencyEnd: number;
    duration: number;
    volume: number;
    type: OscillatorType;
  };
  click: {
    frequencyStart: number;
    frequencyMid: number;
    frequencyEnd: number;
    duration: number;
    volume: number;
    type: OscillatorType;
  };
}

const SOUND_PRESETS: SoundConfig[] = [
  {
    name: 'Moderne (Par défaut)',
    description: 'Sons subtils et professionnels, parfaits pour une interface moderne',
    hover: {
      frequencyStart: 1200,
      frequencyEnd: 1500,
      duration: 0.08,
      volume: 0.03,
      type: 'sine',
    },
    click: {
      frequencyStart: 800,
      frequencyMid: 1000,
      frequencyEnd: 600,
      duration: 0.12,
      volume: 0.06,
      type: 'sine',
    },
  },
  {
    name: 'Classique',
    description: 'Sons plus traditionnels et rassurants',
    hover: {
      frequencyStart: 800,
      frequencyEnd: 1000,
      duration: 0.1,
      volume: 0.05,
      type: 'sine',
    },
    click: {
      frequencyStart: 600,
      frequencyMid: 800,
      frequencyEnd: 500,
      duration: 0.15,
      volume: 0.08,
      type: 'sine',
    },
  },
  {
    name: 'Électronique',
    description: 'Sons plus électroniques et futuristes',
    hover: {
      frequencyStart: 1500,
      frequencyEnd: 2000,
      duration: 0.06,
      volume: 0.04,
      type: 'square',
    },
    click: {
      frequencyStart: 1000,
      frequencyMid: 1500,
      frequencyEnd: 800,
      duration: 0.1,
      volume: 0.07,
      type: 'square',
    },
  },
  {
    name: 'Doux',
    description: 'Sons très doux et discrets',
    hover: {
      frequencyStart: 1000,
      frequencyEnd: 1200,
      duration: 0.12,
      volume: 0.02,
      type: 'sine',
    },
    click: {
      frequencyStart: 700,
      frequencyMid: 850,
      frequencyEnd: 600,
      duration: 0.18,
      volume: 0.04,
      type: 'sine',
    },
  },
  {
    name: 'Dynamique',
    description: 'Sons plus énergiques et réactifs',
    hover: {
      frequencyStart: 1400,
      frequencyEnd: 1800,
      duration: 0.05,
      volume: 0.05,
      type: 'sine',
    },
    click: {
      frequencyStart: 900,
      frequencyMid: 1200,
      frequencyEnd: 700,
      duration: 0.08,
      volume: 0.09,
      type: 'sine',
    },
  },
  {
    name: 'Silencieux',
    description: 'Désactive tous les sons',
    hover: {
      frequencyStart: 0,
      frequencyEnd: 0,
      duration: 0,
      volume: 0,
      type: 'sine',
    },
    click: {
      frequencyStart: 0,
      frequencyMid: 0,
      frequencyEnd: 0,
      duration: 0,
      volume: 0,
      type: 'sine',
    },
  },
];

const STORAGE_KEY = 'nukleo-sound-config';

export default function AdminSounds() {
  const { playHover, playClick } = useSound();
  const [selectedPreset, setSelectedPreset] = useState<SoundConfig | null>(null);
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  useEffect(() => {
    // Load saved config from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setSelectedPreset(config);
      } catch (e) {
        console.error('Failed to load sound config:', e);
      }
    } else {
      // Default to first preset
      setSelectedPreset(SOUND_PRESETS[0]);
    }

    // Load sounds enabled state
    const enabled = localStorage.getItem('nukleo-sounds-enabled');
    if (enabled !== null) {
      setSoundsEnabled(enabled === 'true');
    }
  }, []);

  const handleSelectPreset = (preset: SoundConfig) => {
    setSelectedPreset(preset);
  };

  const handleSave = () => {
    if (selectedPreset) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPreset));
      localStorage.setItem('nukleo-sounds-enabled', String(soundsEnabled));
      alert('Configuration des sons sauvegardée ! La page sera rechargée pour appliquer les changements.');
      window.location.reload();
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('nukleo-sounds-enabled', 'true');
    setSelectedPreset(SOUND_PRESETS[0]);
    setSoundsEnabled(true);
    alert('Configuration réinitialisée ! La page sera rechargée.');
    window.location.reload();
  };

  const handleTestSound = (type: SoundType, preset: SoundConfig) => {
    if (!soundsEnabled) return;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    const now = ctx.currentTime;
    
    if (type === 'hover') {
      const config = preset.hover;
      if (config.volume === 0 || config.duration === 0) return;
      
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.frequencyStart, now);
      osc.frequency.exponentialRampToValueAtTime(config.frequencyEnd, now + config.duration);
      
      filter.type = 'highpass';
      filter.frequency.value = 800;
      filter.Q.value = 1;
      
      gain.gain.setValueAtTime(config.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
    } else {
      const config = preset.click;
      if (config.volume === 0 || config.duration === 0) return;
      
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.frequencyStart, now);
      osc.frequency.exponentialRampToValueAtTime(config.frequencyMid, now + config.duration * 0.33);
      osc.frequency.exponentialRampToValueAtTime(config.frequencyEnd, now + config.duration);
      
      filter.type = 'highpass';
      filter.frequency.value = 500;
      filter.Q.value = 1;
      
      const attackTime = config.duration * 0.08;
      const decayTime = config.duration * 0.33;
      const sustainTime = config.duration * 0.67;
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(config.volume, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(config.volume * 0.67, now + decayTime);
      gain.gain.setValueAtTime(config.volume * 0.67, now + sustainTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
    }
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + (type === 'hover' ? preset.hover.duration : preset.click.duration));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <AdminHeader />
      <div className="container mx-auto py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gestion des Sons
          </h1>
          <p className="text-lg text-muted-foreground">
            Personnalisez les sons interactifs de l'interface
          </p>
        </div>

        {/* Enable/Disable Toggle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {soundsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              Activer/Désactiver les sons
            </CardTitle>
            <CardDescription>
              Activez ou désactivez tous les sons interactifs du site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                variant={soundsEnabled ? 'default' : 'outline'}
                onClick={() => setSoundsEnabled(true)}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Activés
              </Button>
              <Button
                variant={!soundsEnabled ? 'default' : 'outline'}
                onClick={() => setSoundsEnabled(false)}
              >
                <VolumeX className="w-4 h-4 mr-2" />
                Désactivés
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sound Presets */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Préréglages de sons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOUND_PRESETS.map((preset, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  selectedPreset?.name === preset.name
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleSelectPreset(preset)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {preset.name}
                    {selectedPreset?.name === preset.name && (
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    )}
                  </CardTitle>
                  <CardDescription>{preset.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestSound('hover', preset);
                      }}
                      disabled={!soundsEnabled}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Hover
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestSound('click', preset);
                      }}
                      disabled={!soundsEnabled}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Click
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="w-5 h-5" />
            Sauvegarder la configuration
          </Button>
          <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Réinitialiser
          </Button>
        </div>

        {/* Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Les sons sont générés en temps réel avec Web Audio API. Les changements nécessitent un rechargement de la page pour être appliqués à l'ensemble du site.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
