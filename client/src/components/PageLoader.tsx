import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? 'all' : 'none' }}
    >
      {/* Nukleo Logo */}
      <div className="text-center">
        <div className="mb-8 animate-pulse">
          <h1 className="text-6xl font-black text-white tracking-tight">
            nukleo<span className="text-cyan-400">.</span>
          </h1>
          <p className="text-sm text-white/60 mt-2 tracking-widest">CHOOSE INTELLIGENCE</p>
        </div>

        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
