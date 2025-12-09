import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    // Check if loading screen has already been shown in this session
    const hasShown = sessionStorage.getItem('loadingScreenShown');
    return !hasShown;
  });

  useEffect(() => {
    if (!isVisible) return;

    // Mark as shown in sessionStorage
    sessionStorage.setItem('loadingScreenShown', 'true');

    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] 
        bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]
        flex items-center justify-center
        transition-opacity duration-700
        ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
        {/* Logo with pulse animation */}
        <div className="relative">
          <img 
            src="/nukleo-logo-2025.webp" 
            alt="Nukleo" 
            width="400"
            height="100"
            className="h-20 w-auto object-contain animate-pulse"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl bg-white/30 animate-pulse" />
        </div>

        {/* Slogan with typing effect */}
        <div className="text-center">
          <p className="text-2xl md:text-3xl text-white font-semibold tracking-tight animate-in slide-in-from-bottom-4 duration-700 delay-300">
            Choose Intelligence
          </p>
          
          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-white rounded-full animate-[loading_2s_ease-in-out]" />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
