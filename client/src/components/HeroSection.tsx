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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background with Parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-pink-950">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-[120px] animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            animation: 'pulse 5s ease-in-out infinite 1s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`,
            animation: 'pulse 6s ease-in-out infinite 2s'
          }}
        />
        
        {/* Scan Lines Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-scan" />
        </div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Main Title */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-mono uppercase tracking-widest">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
                Global AI Transformation Partner
              </span>
            </div>

            {/* Main Heading with Stagger Animations */}
            <h1 className="
              text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] 
              text-white 
              mb-12
              leading-[0.85]
              font-black
            ">
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 hover:scale-105 transition-transform">
                ARCHITECTS
              </span>
              <br />
              <span className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 delay-100 hover:scale-105 transition-transform">
                OF YOUR
              </span>
              {' '}
              <span 
                className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 delay-200 hover:scale-105 transition-transform"
              >
                AI
              </span>
              <br />
              <span 
                className="inline-block animate-in fade-in slide-in-from-left-20 duration-700 delay-300 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-110 transition-transform relative"
                style={{
                  textShadow: 'none',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 3s ease infinite'
                }}
              >
                FUTURE
                {/* Glowing underline */}
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-xl opacity-50 animate-pulse" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl text-white/90 leading-relaxed font-light mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400 italic">
              Serving startups, SMBs, enterprises, and governments worldwide
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Button
                onClick={playClick}
                onMouseEnter={playHover}
                className="relative rounded-full text-lg px-12 py-8 bg-white text-purple-900 hover:bg-white transition-all duration-500 font-bold tracking-wider uppercase hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 group overflow-hidden"
              >
                <span className="relative z-10">START YOUR TRANSFORMATION</span>
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
                <span className="text-base font-mono uppercase tracking-widest text-white/90 group-hover:text-white transition-colors font-semibold">
                  WATCH REEL
                </span>
              </button>
            </div>
          </div>

          {/* Right: Description with Glass Card */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-20 duration-700 delay-600">
            <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-6">
                  We transform organizations with AI-powered solutions that drive growth, efficiency, and innovation.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">500+</div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">95%</div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">50M+</div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">ROI</div>
                  </div>
                </div>
              </div>
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
