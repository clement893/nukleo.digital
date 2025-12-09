
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const { playHover, playClick } = useSound();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  

  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Rotating Hexagons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-64 h-64 opacity-10"
          style={{
            top: '20%',
            left: '10%',
            animation: 'spin 20s linear infinite',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50 1 95 25 95 75 50 99 5 75 5 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-purple-400"
            />
            <polygon
              points="50 10 85 30 85 70 50 90 15 70 15 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-400"
            />
          </svg>
        </div>

        <div 
          className="absolute w-48 h-48 opacity-10"
          style={{
            top: '60%',
            right: '15%',
            animation: 'spin 15s linear infinite reverse',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50 1 95 25 95 75 50 99 5 75 5 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-cyan-400"
            />
          </svg>
        </div>

        <div 
          className="absolute w-56 h-56 opacity-10"
          style={{
            bottom: '10%',
            left: '50%',
            animation: 'spin 25s linear infinite',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50 1 95 25 95 75 50 99 5 75 5 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-purple-400"
            />
            <polygon
              points="50 10 85 30 85 70 50 90 15 70 15 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-pink-400"
            />
          </svg>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="flex items-center justify-center">
          {/* Main Title */}
          <div className="max-w-5xl">
            {/* Main Heading with Stagger Animations */}
            <h1 
              className="
                text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] 
                text-white 
                mb-12
                leading-[0.85]
                font-black
                hover-distort
                transition-transform duration-75 ease-out
              "

            >
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-1000">
                Architects
              </span>
              <br />
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-1000 delay-200">
                of Your
              </span>
              {' '}
              <span 
                className="inline-block animate-in fade-in slide-in-from-left-20 duration-1000 delay-300 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent relative"
                style={{
                  textShadow: 'none',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 6s ease infinite'
                }}
              >
                AI Future
                {/* Glowing underline */}
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
              </span>
            </h1>

            {/* Slogan */}
            <p 
              className="text-3xl md:text-4xl text-white font-semibold mb-6 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 tracking-tight"
            >
              Choose Nukleo, Choose Intelligence
            </p>

            {/* Subtitle */}
            <p 
              className="text-xl text-white/70 leading-relaxed font-light mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700"
            >
              Serving startups, SMBs, enterprises, and governments worldwide
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-900"
            >
              <Button
                onClick={playClick}
                onMouseEnter={playHover}
                className="relative rounded-full text-lg px-12 py-8 bg-white text-purple-900 hover:bg-white transition-all duration-500 font-bold tracking-wider hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 group overflow-hidden"
              >
                <span className="relative z-10">Start Your Transformation</span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </div>
          </div>
        </div>
      </div>



      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
