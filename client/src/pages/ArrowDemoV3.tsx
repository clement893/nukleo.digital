import { useState } from 'react';

export default function ArrowDemoV3() {
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      {/* Header */}
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Démo V3 - Flèches Ultra-Subtiles en Background</h1>
        <p className="text-white/80 text-lg mb-8">
          3 concepts discrets et élégants. Flèches toujours vers la droite, opacité très faible. Cliquez pour voir en détail.
        </p>
      </div>

      {/* Concepts Grid */}
      {selectedConcept === null ? (
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
          {/* Concept 1: Dispersées Ultra-Subtiles */}
          <div
            onClick={() => setSelectedConcept(1)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all bg-slate-900"
          >
            {/* Background arrows */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    width: `${40 + Math.random() * 80}px`,
                    opacity: 0.03,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: 'rotate(0deg)',
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Concept 1</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Flèches Dispersées Ultra-Subtiles</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Opacité 3% (presque invisible)</li>
                  <li>• Dispersées aléatoirement</li>
                  <li>• Toutes vers la droite</li>
                  <li>• Tailles variées (40-120px)</li>
                  <li>• Aucune animation (statique)</li>
                </ul>
              </div>
              
              <div className="flex-1"></div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Texture discrète
              </div>
            </div>
          </div>

          {/* Concept 2: Dégradé Progressif */}
          <div
            onClick={() => setSelectedConcept(2)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all bg-slate-900"
          >
            {/* Background arrows with gradient opacity */}
            <div className="absolute inset-0">
              {[
                { top: '15%', left: '5%', size: 60, opacity: 0.02 },
                { top: '35%', left: '15%', size: 80, opacity: 0.03 },
                { top: '55%', left: '8%', size: 70, opacity: 0.025 },
                { top: '75%', left: '12%', size: 90, opacity: 0.04 },
                { top: '25%', right: '10%', size: 100, opacity: 0.06 },
                { top: '50%', right: '5%', size: 85, opacity: 0.07 },
                { top: '70%', right: '15%', size: 75, opacity: 0.05 },
              ].map((arrow, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    ...arrow,
                    width: `${arrow.size}px`,
                    transform: 'rotate(0deg)',
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Concept 2</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Flèches en Dégradé Progressif</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Opacité 2-7% (dégradé gauche→droite)</li>
                  <li>• Positionnement stratégique</li>
                  <li>• Toutes vers la droite</li>
                  <li>• Crée profondeur subtile</li>
                  <li>• Aucune animation</li>
                </ul>
              </div>
              
              <div className="flex-1"></div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Profondeur élégante
              </div>
            </div>
          </div>

          {/* Concept 3: Watermark Style */}
          <div
            onClick={() => setSelectedConcept(3)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all bg-slate-900"
          >
            {/* Large watermark arrows */}
            <div className="absolute inset-0">
              <svg
                className="absolute top-[20%] left-[10%] w-[200px] opacity-[0.02] pointer-events-none"
                viewBox="0 0 100 100"
              >
                <use href="/nukleo-arrow.svg#arrow" />
              </svg>
              <img
                src="/nukleo-arrow.svg"
                alt=""
                role="presentation"
                aria-hidden="true"
                className="absolute top-[20%] left-[10%] w-[200px] opacity-[0.02] pointer-events-none"
                style={{ filter: 'invert(1)' }}
              />
              <img
                src="/nukleo-arrow.svg"
                alt=""
                role="presentation"
                aria-hidden="true"
                className="absolute bottom-[15%] right-[8%] w-[250px] opacity-[0.025] pointer-events-none"
                style={{ filter: 'invert(1)' }}
              />
              <img
                src="/nukleo-arrow.svg"
                alt=""
                role="presentation"
                aria-hidden="true"
                className="absolute top-[50%] left-[40%] w-[180px] opacity-[0.015] pointer-events-none"
                style={{ filter: 'invert(1)' }}
              />
            </div>
            
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Concept 3</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Flèches Watermark Style</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Opacité 1.5-2.5% (ultra-discret)</li>
                  <li>• 3-4 grandes flèches max</li>
                  <li>• Positionnées comme watermarks</li>
                  <li>• Toutes vers la droite</li>
                  <li>• Ajoute texture sans distraire</li>
                </ul>
              </div>
              
              <div className="flex-1"></div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Minimalisme extrême
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Screen View */
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={() => setSelectedConcept(null)}
            className="fixed top-8 right-8 z-50 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all border border-white/20"
          >
            ← Retour aux concepts
          </button>

          {/* Concept 1 Full */}
          {selectedConcept === 1 && (
            <div className="relative min-h-screen">
              {/* Ultra-subtle dispersed arrows */}
              {[...Array(30)].map((_, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    width: `${40 + Math.random() * 80}px`,
                    opacity: 0.03,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: 'rotate(0deg)',
                    filter: 'invert(1)',
                  }}
                />
              ))}
              
              <div className="relative z-10 container py-20">
                <h1 className="text-5xl font-bold text-white mb-6 text-center">Flèches Dispersées Ultra-Subtiles</h1>
                <p className="text-xl text-white/80 mb-16 text-center max-w-3xl mx-auto">
                  30 flèches dispersées aléatoirement avec opacité 3%. Presque invisibles, elles ajoutent une texture discrète sans distraire.
                </p>
                
                <div className="space-y-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">Exemple de Section</h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Les flèches en arrière-plan sont presque invisibles (3% d'opacité), créant une texture subtile qui n'interfère pas avec le contenu. 
                      Elles sont toutes orientées vers la droite, renforçant subtilement le sens de progression et de mouvement.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">Contenu Principal</h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Le contenu reste parfaitement lisible et au premier plan. Les flèches ajoutent simplement une couche de profondeur visuelle 
                      sans jamais devenir distrayantes. C'est l'équilibre parfait entre présence et discrétion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Concept 2 Full */}
          {selectedConcept === 2 && (
            <div className="relative min-h-screen">
              {/* Strategic arrows with gradient opacity */}
              {[
                { top: '10%', left: '3%', size: 60, opacity: 0.02 },
                { top: '25%', left: '8%', size: 80, opacity: 0.03 },
                { top: '45%', left: '5%', size: 70, opacity: 0.025 },
                { top: '65%', left: '10%', size: 90, opacity: 0.04 },
                { top: '85%', left: '6%', size: 75, opacity: 0.035 },
                { top: '15%', right: '5%', size: 100, opacity: 0.06 },
                { top: '35%', right: '8%', size: 85, opacity: 0.07 },
                { top: '55%', right: '3%', size: 95, opacity: 0.065 },
                { top: '75%', right: '10%', size: 80, opacity: 0.05 },
                { top: '30%', left: '40%', size: 65, opacity: 0.04 },
                { top: '60%', left: '45%', size: 70, opacity: 0.045 },
              ].map((arrow, i) => (
                <img
                  key={i}
                  src="/nukleo-arrow.svg"
                  alt=""
                  className="absolute pointer-events-none"
                  style={{
                    ...arrow,
                    width: `${arrow.size}px`,
                    transform: 'rotate(0deg)',
                    filter: 'invert(1)',
                  }}
                />
              ))}
              
              <div className="relative z-10 container py-20">
                <h1 className="text-5xl font-bold text-white mb-6 text-center">Flèches en Dégradé Progressif</h1>
                <p className="text-xl text-white/80 mb-16 text-center max-w-3xl mx-auto">
                  Opacité progressive de gauche (2%) vers droite (7%). Crée une profondeur subtile et guide l'œil naturellement.
                </p>
                
                <div className="space-y-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">Profondeur Subtile</h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Les flèches à gauche sont presque invisibles (2%), tandis que celles à droite sont légèrement plus visibles (7%). 
                      Ce dégradé crée une sensation de profondeur et de mouvement vers la droite, sans être agressif visuellement.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">Positionnement Stratégique</h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Chaque flèche est positionnée de manière réfléchie pour équilibrer la composition. Elles ne se chevauchent jamais 
                      avec le contenu important et créent un rythme visuel harmonieux sur toute la page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Concept 3 Full */}
          {selectedConcept === 3 && (
            <div className="relative min-h-screen">
              {/* Large watermark arrows */}
              <img
                src="/nukleo-arrow.svg"
                alt=""
                role="presentation"
                aria-hidden="true"
                className="absolute top-[15%] left-[5%] w-[250px] opacity-[0.02] pointer-events-none"
                style={{ filter: 'invert(1)' }}
              />
              <img
                src="/nukleo-arrow.svg"
                alt=""
                role="presentation"
                aria-hidden="true"
                className="absolute bottom-[10%] right-[3%] w-[300px] opacity-[0.025] pointer-events-none"
                style={{ filter: 'invert(1)' }}
              />
              <img
                src="/nukleo-arrow.svg"
                alt=""
                role="presentation"
                aria-hidden="true"
                className="absolute top-[50%] left-[35%] w-[200px] opacity-[0.015] pointer-events-none"
                style={{ filter: 'invert(1)' }}
              />
              
              <div className="relative z-10 container py-20">
                <h1 className="text-5xl font-bold text-white mb-6 text-center">Flèches Watermark Style</h1>
                <p className="text-xl text-white/80 mb-16 text-center max-w-3xl mx-auto">
                  3-4 grandes flèches positionnées comme des watermarks. Opacité 1.5-2.5% pour un effet ultra-discret et minimaliste.
                </p>
                
                <div className="space-y-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">Minimalisme Extrême</h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                      Seulement 3-4 flèches de grande taille, positionnées stratégiquement comme des watermarks. Leur opacité ultra-faible (1.5-2.5%) 
                      les rend presque imperceptibles, créant une signature visuelle subtile sans jamais distraire du contenu.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">Texture Sans Distraction</h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                      L'approche watermark ajoute une couche de texture et de profondeur sans encombrer l'espace visuel. 
                      C'est l'option la plus minimaliste, parfaite pour un design épuré et professionnel où chaque élément compte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
