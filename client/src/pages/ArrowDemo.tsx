import { useState } from 'react';

export default function ArrowDemo() {
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      {/* Header */}
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Démo Interactive - Intégration Flèche Nukleo</h1>
        <p className="text-white/80 text-lg mb-8">
          Testez les 3 concepts en temps réel. Cliquez sur un concept pour le voir en plein écran.
        </p>
      </div>

      {/* Concepts Grid */}
      {selectedConcept === null ? (
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
          {/* Concept 1: Parallax Subtil */}
          <div
            onClick={() => setSelectedConcept(1)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
              {/* Parallax arrows */}
              {[...Array(8)].map((_, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  className="absolute pointer-events-none transition-transform duration-1000 group-hover:translate-y-4"
                  style={{
                    width: `${80 + Math.random() * 120}px`,
                    opacity: 0.08,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    filter: 'none',
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Concept 1</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Parallax Subtil avec Outline</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Flèches en outline dispersées</li>
                  <li>• Opacité très faible (8%)</li>
                  <li>• Tailles et rotations variées</li>
                  <li>• Effet parallax au hover</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Élégance minimaliste
              </div>
            </div>
          </div>

          {/* Concept 2: Gradient Coloré */}
          <div
            onClick={() => setSelectedConcept(2)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
              {/* Gradient floating arrows */}
              {[
                { top: '10%', left: '5%', size: 150, color: 'hue-rotate-[270deg]' },
                { top: '60%', right: '10%', size: 120, color: 'hue-rotate-[330deg]' },
                { bottom: '15%', left: '15%', size: 100, color: 'hue-rotate-[200deg]' },
                { top: '30%', right: '5%', size: 80, color: 'hue-rotate-[180deg]' },
              ].map((arrow, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  className="absolute pointer-events-none animate-float"
                  style={{
                    ...arrow,
                    width: `${arrow.size}px`,
                    opacity: 0.15,
                    filter: `${arrow.color} blur(2px)`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${6 + i}s`,
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Concept 2</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Gradient Coloré Flottant</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Dégradés violet→rose→cyan</li>
                  <li>• Positionnement stratégique</li>
                  <li>• Animation de flottement</li>
                  <li>• Blur léger pour profondeur</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Impact visuel fort
              </div>
            </div>
          </div>

          {/* Concept 3: Pattern Géométrique */}
          <div
            onClick={() => setSelectedConcept(3)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
              {/* Pattern grid */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 gap-16 p-8">
                {[...Array(48)].map((_, i) => (
                  <img
                    key={i}
                    src="/nukleo-arrow.svg"
                    alt=""
                    className="w-full h-full object-contain pointer-events-none"
                    style={{
                      opacity: 0.05,
                      transform: 'rotate(45deg)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Concept 3</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Pattern Géométrique Répétitif</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Grille uniforme de flèches</li>
                  <li>• Opacité très subtile (5%)</li>
                  <li>• Rotation 45° uniforme</li>
                  <li>• Texture élégante</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Cohérence et texture
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Screen View */
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
          {/* Close button */}
          <button
            onClick={() => setSelectedConcept(null)}
            className="absolute top-8 right-8 z-50 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all border border-white/20"
          >
            ← Retour aux concepts
          </button>

          {/* Concept 1 Full */}
          {selectedConcept === 1 && (
            <div className="relative w-full h-full overflow-hidden">
              {/* Parallax arrows with scroll effect */}
              {[...Array(20)].map((_, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  className="absolute pointer-events-none transition-transform duration-700"
                  style={{
                    width: `${60 + Math.random() * 180}px`,
                    opacity: 0.08,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / 20;
                    const y = (e.clientY - rect.top - rect.height / 2) / 20;
                    e.currentTarget.style.transform = `rotate(${Math.random() * 360}deg) translate(${x}px, ${y}px)`;
                  }}
                />
              ))}
              <div className="relative z-10 container flex items-center justify-center h-full">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-white mb-6">Concept 1: Parallax Subtil</h1>
                  <p className="text-2xl text-white/80 mb-8">Bougez votre souris pour voir l'effet parallax</p>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 max-w-2xl mx-auto">
                    <p className="text-white/90 text-lg leading-relaxed">
                      Les flèches réagissent au mouvement de la souris, créant un effet de profondeur subtil et élégant.
                      Parfait pour ajouter de la texture sans distraire du contenu principal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Concept 2 Full */}
          {selectedConcept === 2 && (
            <div className="relative w-full h-full overflow-hidden">
              {/* Large gradient floating arrows */}
              {[
                { top: '5%', left: '3%', size: 250, color: 'hue-rotate-[270deg]', delay: 0 },
                { top: '50%', right: '5%', size: 200, color: 'hue-rotate-[330deg]', delay: 1 },
                { bottom: '10%', left: '10%', size: 180, color: 'hue-rotate-[200deg]', delay: 2 },
                { top: '25%', right: '3%', size: 150, color: 'hue-rotate-[180deg]', delay: 3 },
                { bottom: '40%', left: '40%', size: 120, color: 'hue-rotate-[240deg]', delay: 4 },
                { top: '70%', right: '30%', size: 160, color: 'hue-rotate-[300deg]', delay: 2.5 },
              ].map((arrow, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  className="absolute pointer-events-none animate-float"
                  style={{
                    ...arrow,
                    width: `${arrow.size}px`,
                    opacity: 0.15,
                    filter: `${arrow.color} blur(3px)`,
                    animationDelay: `${arrow.delay}s`,
                    animationDuration: `${8 + i}s`,
                  }}
                />
              ))}
              <div className="relative z-10 container flex items-center justify-center h-full">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-white mb-6">Concept 2: Gradient Coloré</h1>
                  <p className="text-2xl text-white/80 mb-8">Les flèches flottent avec des couleurs vibrantes</p>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 max-w-2xl mx-auto">
                    <p className="text-white/90 text-lg leading-relaxed">
                      Des flèches colorées avec dégradés violet, rose et cyan créent un arrière-plan dynamique et
                      énergique. L'animation de flottement ajoute du mouvement constant et de la vie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Concept 3 Full */}
          {selectedConcept === 3 && (
            <div className="relative w-full h-full overflow-hidden">
              {/* Dense pattern grid */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-12 p-8">
                {[...Array(144)].map((_, i) => (
                  <img
                    key={i}
                    src="/nukleo-arrow.svg"
                    alt=""
                    className="w-full h-full object-contain pointer-events-none"
                    style={{
                      opacity: 0.05,
                      transform: 'rotate(45deg)',
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 container flex items-center justify-center h-full">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-white mb-6">Concept 3: Pattern Géométrique</h1>
                  <p className="text-2xl text-white/80 mb-8">Une texture subtile et cohérente</p>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 max-w-2xl mx-auto">
                    <p className="text-white/90 text-lg leading-relaxed">
                      Un motif répétitif de flèches crée une texture élégante et minimaliste. L'opacité très faible
                      assure que le pattern reste discret tout en ajoutant de la profondeur visuelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(3deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
