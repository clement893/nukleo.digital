import { Zap, Settings } from 'lucide-react';

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="py-16 sm:py-20 lg:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left: Title and Description */}
          <div>
            <span className="font-mono text-accent text-sm mb-8 block tracking-widest">
              01 — Manifesto
            </span>

            <h2 className="text-white mb-6 sm:mb-8 text-4xl sm:text-5xl lg:text-6xl">
              Move From<br />
              <span className="text-white/40">Pilot to</span><br />
              Scale.
            </h2>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              The gap is widening. While others experiment, leaders are re-architecting their entire operation around Agentic AI.
            </p>

            <a
              href="/manifesto"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Read the full manifesto
              <span className="text-xl">→</span>
            </a>
          </div>

          {/* Right: Manifesto Cards */}
          <div className="space-y-6">
            {/* Card 1 */}
            <div className="group relative p-6 sm:p-8 lg:p-12 glass rounded-3xl">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <Zap className="w-16 h-16 lg:w-24 lg:h-24 text-accent stroke-1" />
              </div>

              <div className="mb-6 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                <Zap className="w-8 h-8 text-accent" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Leader, Not Follower
              </h3>

              <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                Integrate agentic AI capabilities that can triple your ROI, speed, and output volume.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative p-8 lg:p-12 glass rounded-3xl">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <Settings className="w-16 h-16 lg:w-24 lg:h-24 text-accent stroke-1" />
              </div>

              <div className="mb-6 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                <Settings className="w-8 h-8 text-accent" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Operations Reinvented
              </h3>

              <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                Re-architect workflows around intelligent agents that automate and optimize continuously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
