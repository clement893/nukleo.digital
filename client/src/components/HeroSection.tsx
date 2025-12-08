import { Play } from 'lucide-react';
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
            <h1 className="
              text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] 
              text-white 
              mb-12
              leading-[0.85]
              font-black
              hover-distort
            ">
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-700">
                Architects
              </span>
              <br />
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 delay-100">
                of Your
              </span>
              {' '}
              <span 
                className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 delay-200 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-110 transition-transform relative"
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
            <p className="text-3xl md:text-4xl text-white font-semibold mb-6 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-350 tracking-tight">
              Choose Nukleo, Choose Intelligence
            </p>

            {/* Subtitle */}
            <p className="text-xl text-white/70 leading-relaxed font-light mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
              Serving startups, SMBs, enterprises, and governments worldwide
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Button
                onClick={playClick}
                onMouseEnter={playHover}
                className="relative rounded-full text-lg px-12 py-8 bg-white text-purple-900 hover:bg-white transition-all duration-500 font-bold tracking-wider hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 group overflow-hidden"
              >
                <span className="relative z-10">Start Your Transformation</span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>

              <button 
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                  <Play className="w-5 h-5 text-white ml-1 fill-white group-hover:scale-125 transition-transform duration-500" />
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" />
                </div>
                <span className="text-base font-mono tracking-widest text-white/90 group-hover:text-white transition-colors font-semibold">
                  Watch Reel
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
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
