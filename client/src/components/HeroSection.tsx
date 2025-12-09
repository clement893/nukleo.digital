
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';
import { Link } from 'wouter';

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
            {/* Main Heading */}
            <h1 
              className="
                text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] 
                font-bold leading-[0.9] tracking-tighter text-white mb-6 sm:mb-8 italic
              "
            >
              Join the
              <br />
              <span 
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                AI Revolution
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg sm:text-xl text-white/70 leading-relaxed font-light mb-8 sm:mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600"
            >
              Start your transformation journey.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-900"
            >
              <Link href="/start-project">
                <Button
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="relative rounded-full text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 bg-white text-purple-900 hover:bg-white transition-all duration-500 font-bold tracking-wider hover:scale-[1.045] hover:shadow-xl hover:shadow-purple-500/25 group overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10">Join the Leaders</span>
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Button>
              </Link>
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
