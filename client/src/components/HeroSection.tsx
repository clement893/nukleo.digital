import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

export default function HeroSection() {
  const { playHover, playClick } = useSound();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 gradient-mesh overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Main Title */}
          <div className="lg:col-span-7">
            {/* Main Heading */}
            <h1 className="text-white mb-12">
              ARCHITECTS<br />
              OF YOUR<br />
              AI<br />
              FUTURE
            </h1>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button
                onClick={playClick}
                onMouseEnter={playHover}
                className="rounded-full text-lg px-10 py-8 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider uppercase hover:scale-105 shimmer"
              >
                START YOUR TRANSFORMATION
              </Button>

              <button 
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:glass-strong transition-all duration-500">
                  <Play className="w-4 h-4 text-white ml-1 fill-white" />
                </div>
                <span className="text-sm font-mono uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                  WATCH REEL
                </span>
              </button>
            </div>
          </div>

          {/* Right: Description */}
          <div className="lg:col-span-5">
            <p className="text-xl text-white/75 leading-relaxed font-light">
              We transform your marketing, platforms, and operations to make you thrive in the age of artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
