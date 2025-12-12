import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LoaderDemoArtsy() {
  const [selectedLoader, setSelectedLoader] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Grid view */}
      {selectedLoader === null && (
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-center mb-4 text-white">
            Loaders Artsy & Intenses
          </h1>
          <p className="text-center text-gray-300 mb-16 text-lg">
            Cliquez sur un loader pour le voir en plein écran
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Loader 1: Kaleidoscope Psychédélique */}
            <div
              onClick={() => setSelectedLoader(1)}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-black/40 transition-all border border-white/10 hover:border-purple-500/50"
            >
              <div className="aspect-square bg-black/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <Loader1Preview />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Kaleidoscope Psychédélique</h3>
              <p className="text-gray-400">Formes géométriques tournantes, effet kaleidoscope, particules étoiles, couleurs vibrantes.</p>
            </div>

            {/* Loader 2: Liquid Motion */}
            <div
              onClick={() => setSelectedLoader(2)}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-black/40 transition-all border border-white/10 hover:border-purple-500/50"
            >
              <div className="aspect-square bg-black/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <Loader2Preview />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Liquid Motion</h3>
              <p className="text-gray-400">Fluide liquide animé, bulles montantes, distorsion liquide, gradient qui coule, très organique.</p>
            </div>

            {/* Loader 3: Cyberpunk Glitch Matrix */}
            <div
              onClick={() => setSelectedLoader(3)}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:bg-black/40 transition-all border border-white/10 hover:border-purple-500/50"
            >
              <div className="aspect-square bg-black/50 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <Loader3Preview />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cyberpunk Glitch Matrix</h3>
              <p className="text-gray-400">Matrix characters, glitch intense, scanlines, aberration chromatique, néons, grid cyberpunk.</p>
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
            {selectedLoader === 1 && "Loader 1: Kaleidoscope Psychédélique"}
            {selectedLoader === 2 && "Loader 2: Liquid Motion"}
            {selectedLoader === 3 && "Loader 3: Cyberpunk Glitch Matrix"}
          </p>
        </div>
      )}
    </div>
  );
}

// ========== LOADER 1: KALEIDOSCOPE PSYCHÉDÉLIQUE ==========
function Loader1Preview() {
  return (
    <div className="relative w-32 h-32">
      <style>{`
        @keyframes kaleidoRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes colorShift {
          0% { background: linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6)); }
          33% { background: linear-gradient(135deg, rgba(236, 72, 153, 0.6), rgba(34, 211, 238, 0.6)); }
          66% { background: linear-gradient(135deg, rgba(34, 211, 238, 0.6), rgba(168, 85, 247, 0.6)); }
          100% { background: linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6)); }
        }
      `}</style>
      <img
        src="/Nukleo_blanc_RVB.svg"
        alt="Nukleo"
        className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))',
        }}
      />
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-12 h-12"
          style={{
            animation: `kaleidoRotate ${3 + i * 0.5}s linear infinite, colorShift 3s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function Loader1Full() {
  return (
    <div className="relative w-96 h-96">
      <style>{`
        @keyframes kaleidoRotateFull {
          from { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); }
          to { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
        }
        @keyframes colorShiftFull {
          0%, 100% { 
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8));
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
          }
          25% { 
            background: linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(34, 211, 238, 0.8));
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.8);
          }
          50% { 
            background: linear-gradient(135deg, rgba(34, 211, 238, 0.8), rgba(255, 215, 0, 0.8));
            box-shadow: 0 0 40px rgba(34, 211, 238, 0.8);
          }
          75% { 
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.8), rgba(168, 85, 247, 0.8));
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
          }
        }
        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(2) rotate(180deg); opacity: 0; }
        }
      `}</style>
      
      {/* Logo central */}
      <img
        src="/Nukleo_blanc_RVB.svg"
        alt="Nukleo"
        className="w-48 h-48 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          filter: 'drop-shadow(0 0 60px rgba(168, 85, 247, 1)) drop-shadow(0 0 120px rgba(236, 72, 153, 0.8))',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      
      {/* Formes géométriques kaleidoscope */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            width: `${80 + i * 15}px`,
            height: `${80 + i * 15}px`,
            animation: `kaleidoRotateFull ${4 + i * 0.3}s linear infinite, colorShiftFull 4s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
            clipPath: i % 3 === 0 
              ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' // Diamant
              : i % 3 === 1
              ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' // Pentagone
              : 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // Octogone
          }}
        />
      ))}
      
      {/* Particules étoiles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute top-1/2 left-1/2"
          style={{
            width: '4px',
            height: '4px',
            background: 'white',
            borderRadius: '50%',
            animation: `starBurst 2s ease-out infinite`,
            animationDelay: `${i * 0.1}s`,
            transform: `translate(-50%, -50%) rotate(${i * 18}deg) translateY(-100px)`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}
    </div>
  );
}

// ========== LOADER 2: LIQUID MOTION ==========
function Loader2Preview() {
  return (
    <div className="relative w-32 h-32 overflow-hidden">
      <style>{`
        @keyframes liquidWave {
          0%, 100% { d: path("M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z"); }
          50% { d: path("M0,50 Q25,60 50,50 T100,50 L100,100 L0,100 Z"); }
        }
        @keyframes bubbleRise {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
      `}</style>
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.6)" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z"
          fill="url(#liquidGradient)"
          style={{ animation: 'liquidWave 3s ease-in-out infinite' }}
        />
      </svg>
      
      <img
        src="/Nukleo_blanc_RVB.svg"
        alt="Nukleo"
        className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))',
          animation: 'float 3s ease-in-out infinite',
        }}
      />
      
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-3 h-3 rounded-full bg-white/40"
          style={{
            left: `${20 + i * 15}%`,
            animation: `bubbleRise ${2 + i * 0.3}s ease-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

function Loader2Full() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <style>{`
        @keyframes liquidWaveFull {
          0%, 100% { 
            d: path("M0,300 Q200,250 400,300 T800,300 Q1000,250 1200,300 T1600,300 L1600,1000 L0,1000 Z"); 
          }
          25% { 
            d: path("M0,300 Q200,350 400,300 T800,300 Q1000,350 1200,300 T1600,300 L1600,1000 L0,1000 Z"); 
          }
          50% { 
            d: path("M0,350 Q200,300 400,350 T800,350 Q1000,300 1200,350 T1600,350 L1600,1000 L0,1000 Z"); 
          }
          75% { 
            d: path("M0,300 Q200,250 400,300 T800,300 Q1000,250 1200,300 T1600,300 L1600,1000 L0,1000 Z"); 
          }
        }
        @keyframes liquidGradientFlow {
          0% { stop-offset: 0%; }
          100% { stop-offset: 100%; }
        }
        @keyframes bubbleRiseFull {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(2); opacity: 0; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
          25% { transform: translate(-50%, -50%) translateY(-30px) rotate(5deg); }
          50% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
          75% { transform: translate(-50%, -50%) translateY(-30px) rotate(-5deg); }
        }
      `}</style>
      
      {/* Liquid waves */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="liquidGradientFull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)">
              <animate attributeName="stop-color" values="rgba(168, 85, 247, 0.4); rgba(236, 72, 153, 0.4); rgba(34, 211, 238, 0.4); rgba(168, 85, 247, 0.4)" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.4)">
              <animate attributeName="stop-color" values="rgba(236, 72, 153, 0.4); rgba(34, 211, 238, 0.4); rgba(168, 85, 247, 0.4); rgba(236, 72, 153, 0.4)" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.4)">
              <animate attributeName="stop-color" values="rgba(34, 211, 238, 0.4); rgba(168, 85, 247, 0.4); rgba(236, 72, 153, 0.4); rgba(34, 211, 238, 0.4)" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        
        {/* Multiple liquid layers */}
        <path
          d="M0,300 Q200,250 400,300 T800,300 Q1000,250 1200,300 T1600,300 L1600,1000 L0,1000 Z"
          fill="url(#liquidGradientFull)"
          opacity="0.6"
          style={{ animation: 'liquidWaveFull 8s ease-in-out infinite' }}
        />
        <path
          d="M0,400 Q200,350 400,400 T800,400 Q1000,350 1200,400 T1600,400 L1600,1000 L0,1000 Z"
          fill="url(#liquidGradientFull)"
          opacity="0.4"
          style={{ animation: 'liquidWaveFull 6s ease-in-out infinite', animationDelay: '-2s' }}
        />
        <path
          d="M0,500 Q200,450 400,500 T800,500 Q1000,450 1200,500 T1600,500 L1600,1000 L0,1000 Z"
          fill="url(#liquidGradientFull)"
          opacity="0.3"
          style={{ animation: 'liquidWaveFull 10s ease-in-out infinite', animationDelay: '-4s' }}
        />
      </svg>
      
      {/* Logo flottant */}
      <img
        src="/Nukleo_blanc_RVB.svg"
        alt="Nukleo"
        className="w-64 h-64 absolute top-1/2 left-1/2 z-20"
        style={{
          filter: 'drop-shadow(0 0 80px rgba(168, 85, 247, 1)) drop-shadow(0 0 160px rgba(236, 72, 153, 0.8))',
          animation: 'logoFloat 4s ease-in-out infinite',
        }}
      />
      
      {/* Bulles montantes */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.6), rgba(168, 85, 247, 0.3))`,
            animation: `bubbleRiseFull ${4 + Math.random() * 4}s ease-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.4)',
          }}
        />
      ))}
    </div>
  );
}

// ========== LOADER 3: CYBERPUNK GLITCH MATRIX ==========
function Loader3Preview() {
  return (
    <div className="relative w-32 h-32 overflow-hidden bg-black">
      <style>{`
        @keyframes matrixFall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes glitchShift {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(3px, -2px); }
          60% { transform: translate(-2px, -3px); }
          80% { transform: translate(2px, 3px); }
        }
        @keyframes rgbSplit {
          0%, 100% { 
            filter: drop-shadow(2px 0 0 rgba(255, 0, 0, 0.8)) drop-shadow(-2px 0 0 rgba(0, 255, 255, 0.8));
          }
          50% { 
            filter: drop-shadow(-2px 0 0 rgba(255, 0, 0, 0.8)) drop-shadow(2px 0 0 rgba(0, 255, 255, 0.8));
          }
        }
      `}</style>
      
      {/* Matrix characters */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-green-500 text-xs font-mono opacity-30"
          style={{
            left: `${i * 15}%`,
            animation: `matrixFall ${2 + i * 0.3}s linear infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
        </div>
      ))}
      
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />
      
      {/* Logo avec glitch */}
      <img
        src="/Nukleo_blanc_RVB.svg"
        alt="Nukleo"
        className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          animation: 'glitchShift 0.3s infinite, rgbSplit 0.5s infinite',
        }}
      />
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.1) 0px, transparent 2px, transparent 4px)',
        animation: 'scan 8s linear infinite',
      }} />
    </div>
  );
}

function Loader3Full() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <style>{`
        @keyframes matrixFallFull {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes glitchShiftFull {
          0%, 100% { transform: translate(-50%, -50%); }
          10% { transform: translate(calc(-50% - 10px), calc(-50% + 5px)); }
          20% { transform: translate(calc(-50% + 10px), calc(-50% - 5px)); }
          30% { transform: translate(calc(-50% - 5px), calc(-50% - 10px)); }
          40% { transform: translate(calc(-50% + 5px), calc(-50% + 10px)); }
          50% { transform: translate(-50%, -50%); }
        }
        @keyframes rgbSplitFull {
          0%, 100% { 
            filter: drop-shadow(5px 0 0 rgba(255, 0, 0, 1)) 
                    drop-shadow(-5px 0 0 rgba(0, 255, 255, 1))
                    drop-shadow(0 0 40px rgba(0, 255, 255, 0.8));
          }
          50% { 
            filter: drop-shadow(-5px 0 0 rgba(255, 0, 0, 1)) 
                    drop-shadow(5px 0 0 rgba(0, 255, 255, 1))
                    drop-shadow(0 0 40px rgba(255, 0, 255, 0.8));
          }
        }
        @keyframes neonPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 
                        0 0 40px rgba(0, 255, 255, 0.6),
                        0 0 60px rgba(0, 255, 255, 0.4);
          }
          50% { 
            box-shadow: 0 0 40px rgba(255, 0, 255, 1), 
                        0 0 80px rgba(255, 0, 255, 0.8),
                        0 0 120px rgba(255, 0, 255, 0.6);
          }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
      
      {/* Matrix rain */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute text-green-400 font-mono opacity-60"
          style={{
            left: `${i * 2}%`,
            fontSize: `${12 + Math.random() * 8}px`,
            animation: `matrixFallFull ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {Array.from({ length: 20 }, () => 
            String.fromCharCode(33 + Math.floor(Math.random() * 94))
          ).join('\n')}
        </div>
      ))}
      
      {/* Cyberpunk grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.15) 2px, transparent 2px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.15) 2px, transparent 2px)
        `,
        backgroundSize: '50px 50px',
        animation: 'neonPulse 2s ease-in-out infinite',
      }} />
      
      {/* Logo avec glitch intense */}
      <img
        src="/Nukleo_blanc_RVB.svg"
        alt="Nukleo"
        className="w-64 h-64 absolute top-1/2 left-1/2 z-20"
        style={{
          animation: 'glitchShiftFull 0.2s infinite, rgbSplitFull 0.4s infinite',
        }}
      />
      
      {/* Scanline animée */}
      <div 
        className="absolute left-0 right-0 h-1 bg-cyan-400/50 blur-sm"
        style={{
          animation: 'scanline 4s linear infinite',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
        }}
      />
      
      {/* Horizontal scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.05) 0px, transparent 2px, transparent 4px)',
      }} />
      
      {/* Néons pulsants aux coins */}
      {[
        { top: '10%', left: '10%' },
        { top: '10%', right: '10%' },
        { bottom: '10%', left: '10%' },
        { bottom: '10%', right: '10%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            ...pos,
            animation: 'neonPulse 1.5s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
