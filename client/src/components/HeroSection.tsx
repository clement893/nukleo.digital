
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
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-700">
                Architects
              </span>
              <br />
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 delay-100">
                of Your
              </span>
              {' '}
              <span 
                className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 delay-200 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent relative"
                style={{
                  textShadow: 'none',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 3s ease infinite'
                }}
              >
                AI Future
                {/* Glowing underline */}
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
              </span>
            </h1>

            {/* Slogan */}
            <p 
              className="text-3xl md:text-4xl text-white font-semibold mb-6 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-350 tracking-tight"
            >
              Choose Nukleo, Choose Intelligence
            </p>

            {/* Subtitle */}
            <p 
              className="text-xl text-white/70 leading-relaxed font-light mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400"
            >
              Serving startups, SMBs, enterprises, and governments worldwide
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500"
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
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
