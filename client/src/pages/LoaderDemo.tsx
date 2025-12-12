import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LoaderDemo() {
  const [selectedLoader, setSelectedLoader] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Grid view */}
      {selectedLoader === null && (
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-center mb-4 text-white">
            Animations de Loading
          </h1>
          <p className="text-center text-gray-300 mb-16 text-lg">
            Cliquez sur une animation pour la voir en plein écran
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Loader 1: Pulse & Glow */}
            <div
              onClick={() => setSelectedLoader(1)}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-black/40 transition-all border border-white/10 hover:border-purple-500/50"
            >
              <div className="aspect-square bg-black/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <Loader1Preview />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pulse & Glow</h3>
              <p className="text-gray-400">Logo qui pulse avec glow violet/rose/cyan. Minimaliste et élégant.</p>
            </div>

            {/* Loader 2: Rotation & Particles */}
            <div
              onClick={() => setSelectedLoader(2)}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-black/40 transition-all border border-white/10 hover:border-purple-500/50"
            >
              <div className="aspect-square bg-black/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <Loader2Preview />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Rotation & Particles</h3>
              <p className="text-gray-400">Logo qui tourne avec particules orbitales. Dynamique et moderne.</p>
            </div>

            {/* Loader 3: Fade & Scale */}
            <div
              onClick={() => setSelectedLoader(3)}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-black/40 transition-all border border-white/10 hover:border-purple-500/50"
            >
              <div className="aspect-square bg-black/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <Loader3Preview />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Fade & Scale</h3>
              <p className="text-gray-400">Logo avec fade progressif et scale subtil. Doux et professionnel.</p>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen view */}
      {selectedLoader !== null && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center">
          <Button
            onClick={() => setSelectedLoader(null)}
            variant="outline"
            className="absolute top-8 right-8 z-50"
          >
            ← Retour
          </Button>

          {selectedLoader === 1 && <Loader1Full />}
          {selectedLoader === 2 && <Loader2Full />}
          {selectedLoader === 3 && <Loader3Full />}

          <p className="text-white/60 mt-12 text-lg">
            {selectedLoader === 1 && "Animation 1: Pulse & Glow"}
            {selectedLoader === 2 && "Animation 2: Rotation & Particles"}
            {selectedLoader === 3 && "Animation 3: Fade & Scale"}
          </p>
        </div>
      )}
    </div>
  );
}

// ========== LOADER 1: PULSE & GLOW ==========
function Loader1Preview() {
  return (
    <div className="relative">
      <img
        src="/nukleo-logo.svg"
        alt="Nukleo"
        className="w-20 h-20 animate-pulse"
        style={{
          filter: 'invert(1) drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))',
        }}
      />
    </div>
  );
}

function Loader1Full() {
  return (
    <div className="relative">
      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            filter: invert(1) drop-shadow(0 0 30px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.6));
            transform: scale(1);
          }
          50% {
            filter: invert(1) drop-shadow(0 0 50px rgba(168, 85, 247, 1)) drop-shadow(0 0 100px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 150px rgba(34, 211, 238, 0.6));
            transform: scale(1.05);
          }
        }
      `}</style>
      <img
        src="/nukleo-logo.svg"
        alt="Nukleo"
        className="w-48 h-48"
        style={{
          animation: 'pulseGlow 2s ease-in-out infinite',
        }}
      />
    </div>
  );
}

// ========== LOADER 2: ROTATION & PARTICLES ==========
function Loader2Preview() {
  return (
    <div className="relative w-20 h-20">
      <img
        src="/nukleo-logo.svg"
        alt="Nukleo"
        className="w-20 h-20 animate-spin"
        style={{
          filter: 'invert(1)',
          animationDuration: '3s',
        }}
      />
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-500 rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateY(-30px)`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

function Loader2Full() {
  return (
    <div className="relative w-48 h-48">
      <style>{`
        @keyframes rotateSmooth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateY(-100px); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateY(-100px); }
        }
      `}</style>
      
      <img
        src="/nukleo-logo.svg"
        alt="Nukleo"
        className="w-48 h-48 absolute top-1/2 left-1/2"
        style={{
          filter: 'invert(1) drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))',
          animation: 'rotateSmooth 4s linear infinite',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
          style={{
            background: `linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))`,
            animation: `orbit 3s linear infinite`,
            animationDelay: `${i * 0.375}s`,
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)',
          }}
        />
      ))}
    </div>
  );
}

// ========== LOADER 3: FADE & SCALE ==========
function Loader3Preview() {
  return (
    <div className="relative">
      <img
        src="/nukleo-logo.svg"
        alt="Nukleo"
        className="w-20 h-20"
        style={{
          filter: 'invert(1)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
    </div>
  );
}

function Loader3Full() {
  return (
    <div className="relative">
      <style>{`
        @keyframes fadeScale {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.95);
            filter: invert(1) drop-shadow(0 0 20px rgba(168, 85, 247, 0.4));
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
            filter: invert(1) drop-shadow(0 0 40px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.6));
          }
        }
      `}</style>
      <img
        src="/nukleo-logo.svg"
        alt="Nukleo"
        className="w-48 h-48"
        style={{
          animation: 'fadeScale 2.5s ease-in-out infinite',
        }}
      />
    </div>
  );
}
