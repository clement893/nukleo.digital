import { useEffect, useState } from 'react';

export default function ModernLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if loader has already been shown in this session
    const hasShownLoader = sessionStorage.getItem('loaderShown');
    
    if (hasShownLoader) {
      setIsVisible(false);
      return;
    }

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Hide loader after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('loaderShown', 'true');
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse" />
      
      {/* Grain texture */}
      <div className="grain-overlay" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Rotating hexagon */}
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border-2 border-pink-500/30 rounded-full animate-spin-reverse" />
          <div className="absolute inset-4 border-2 border-blue-500/30 rounded-full animate-spin-slow" />
          
          {/* Center hexagon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 relative">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-pulse-glow"
              >
                <polygon
                  points="50 1 95 25 95 75 50 99 5 75 5 25"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  className="animate-draw-hex"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Loading text with glitch effect */}
        <div className="relative">
          <h2 className="text-4xl font-bold text-white tracking-wider animate-glitch">
            NUKLEO
          </h2>
          <div className="absolute inset-0 text-4xl font-bold text-purple-500 tracking-wider animate-glitch-1 opacity-70">
            NUKLEO
          </div>
          <div className="absolute inset-0 text-4xl font-bold text-pink-500 tracking-wider animate-glitch-2 opacity-70">
            NUKLEO
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer" />
          </div>
        </div>

        {/* Loading percentage */}
        <div className="text-white/60 text-sm font-mono tabular-nums">
          {progress}%
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.8));
          }
        }

        @keyframes draw-hex {
          0% {
            stroke-dasharray: 0 1000;
          }
          100% {
            stroke-dasharray: 1000 0;
          }
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitch-1 {
          0%, 100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(0 0 50% 0);
            transform: translate(-3px, 2px);
          }
          40% {
            clip-path: inset(50% 0 0 0);
            transform: translate(3px, -2px);
          }
          60% {
            clip-path: inset(0 0 70% 0);
            transform: translate(-2px, 3px);
          }
          80% {
            clip-path: inset(30% 0 0 0);
            transform: translate(2px, -3px);
          }
        }

        @keyframes glitch-2 {
          0%, 100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(30% 0 0 0);
            transform: translate(2px, -2px);
          }
          40% {
            clip-path: inset(0 0 30% 0);
            transform: translate(-2px, 2px);
          }
          60% {
            clip-path: inset(60% 0 0 0);
            transform: translate(3px, -3px);
          }
          80% {
            clip-path: inset(0 0 60% 0);
            transform: translate(-3px, 3px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-draw-hex {
          animation: draw-hex 2s ease-in-out infinite;
        }

        .animate-glitch {
          animation: glitch 0.5s infinite;
        }

        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.4s infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
