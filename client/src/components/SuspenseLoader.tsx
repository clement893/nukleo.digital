import { useEffect, useState } from 'react';

export default function SuspenseLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90; // Stop at 90% until component loads
        }
        return prev + 10;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse" />
      
      {/* Grain texture */}
      <div className="grain-overlay" />

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Rotating hexagon */}
        <div className="relative w-24 h-24">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border-2 border-pink-500/30 rounded-full animate-spin-reverse" />
          
          {/* Center hexagon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 relative">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-pulse-glow"
              >
                <polygon
                  points="50 1 95 25 95 75 50 99 5 75 5 25"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
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

        {/* Loading text */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-white tracking-wider">
            Chargement...
          </h2>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.8));
          }
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
      `}</style>
    </div>
  );
}
