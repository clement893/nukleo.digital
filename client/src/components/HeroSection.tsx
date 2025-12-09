
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex items-center justify-center">
          {/* Main Title */}
          <div className="max-w-5xl">
            {/* Main Heading with Stagger Animations */}
            <h1 
              className="
                text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 
                text-white 
                mb-8 sm:mb-12
                leading-[0.9] sm:leading-[0.85]
                font-black
                hover-distort
                transition-transform duration-75 ease-out
              "

            >
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-1000">
                AI That
              </span>
              <br />
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-1000 delay-200">
                Actually
              </span>
              <br />
              <span 
                className="inline-block animate-in fade-in slide-in-from-left-20 duration-1000 delay-300 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent relative"
                style={{
                  textShadow: 'none',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 6s ease infinite'
                }}
              >
                Transforms
              </span>
              {' '}
              <span 
                className="inline-block animate-in fade-in slide-in-from-left-20 duration-1000 delay-400 relative"
              >
                Business.
                {/* Glowing underline */}
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg sm:text-xl text-white/70 leading-relaxed font-light mb-8 sm:mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600"
            >
              Join the leaders who've moved beyond chatbots—we build intelligent systems that triple ROI, speed, and output.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-900"
            >
              <Button
                onClick={playClick}
                onMouseEnter={playHover}
                className="relative rounded-full text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 bg-white text-purple-900 hover:bg-white transition-all duration-500 font-bold tracking-wider hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 group overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10">Join the Leaders</span>
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
      `}</style>
    </section>
  );
}
