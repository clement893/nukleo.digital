import { useState } from 'react';

export default function ArrowDemoV2() {
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      {/* Header */}
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Démo V2 - Utilisation Fonctionnelle de la Flèche</h1>
        <p className="text-white/80 text-lg mb-8">
          3 nouveaux concepts pour intégrer la flèche de manière élégante et fonctionnelle. Cliquez pour voir en détail.
        </p>
      </div>

      {/* Concepts Grid */}
      {selectedConcept === null ? (
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
          {/* Concept 1: Flèche Directionnelle */}
          <div
            onClick={() => setSelectedConcept(1)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all bg-slate-900"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Concept 1</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Flèche Directionnelle dans les Sections</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Positionnée à droite des sections</li>
                  <li>• Apparaît au scroll (fade + slide)</li>
                  <li>• Guide l'œil vers le bas</li>
                  <li>• Rotation pour indiquer direction</li>
                </ul>
              </div>
              
              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-lg p-6 relative overflow-hidden">
                <div className="text-white/60 text-sm mb-4">Section Example</div>
                <div className="h-20 bg-white/5 rounded mb-4"></div>
                <img 
                  src="/nukleo-arrow.svg" 
                  alt=""
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 opacity-40 rotate-90 group-hover:translate-y-2 transition-transform duration-500"
                />
              </div>
              
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Guider la navigation
              </div>
            </div>
          </div>

          {/* Concept 2: Flèche Interactive CTA */}
          <div
            onClick={() => setSelectedConcept(2)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all bg-slate-900"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Concept 2</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Flèche Interactive sur les CTAs</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Apparaît au hover sur boutons</li>
                  <li>• Animation slide vers la droite</li>
                  <li>• Renforce l'action</li>
                  <li>• Micro-interaction élégante</li>
                </ul>
              </div>
              
              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-lg p-6 flex items-center justify-center">
                <button className="group/btn bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg transition-all relative overflow-hidden border border-white/20">
                  <span className="relative z-10">Start Project</span>
                  <img 
                    src="/nukleo-arrow.svg" 
                    alt=""
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-2 transition-all duration-300"
                  />
                </button>
              </div>
              
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Renforcer les CTAs
              </div>
            </div>
          </div>

          {/* Concept 3: Flèche Séparateur */}
          <div
            onClick={() => setSelectedConcept(3)}
            className="relative h-[600px] rounded-2xl overflow-hidden cursor-pointer group border-2 border-white/20 hover:border-white/40 transition-all bg-slate-900"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Concept 3</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-3">Flèche comme Séparateur de Sections</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Remplace dividers traditionnels</li>
                  <li>• Centrée entre sections</li>
                  <li>• Animation de pulse subtile</li>
                  <li>• Style unique Nukleo</li>
                </ul>
              </div>
              
              {/* Preview */}
              <div className="flex-1 bg-slate-800 rounded-lg p-6 flex flex-col justify-between">
                <div className="h-16 bg-white/5 rounded"></div>
                <div className="flex items-center justify-center py-4">
                  <img 
                    src="/nukleo-arrow.svg" 
                    alt=""
                    className="w-8 opacity-30 rotate-90 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="h-16 bg-white/5 rounded"></div>
              </div>
              
              <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/60 text-sm">
                Idéal pour: Transitions élégantes
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
            <div className="container py-20">
              <h1 className="text-5xl font-bold text-white mb-6 text-center">Flèche Directionnelle</h1>
              <p className="text-xl text-white/80 mb-16 text-center max-w-3xl mx-auto">
                La flèche guide naturellement l'œil vers le bas, créant un flow de lecture fluide
              </p>
              
              {/* Section 1 */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-12 mb-8 border border-white/10 group">
                <h2 className="text-3xl font-bold text-white mb-4">Intelligence Artificielle</h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                  Nous créons des solutions d'IA qui transforment votre entreprise. De la stratégie à l'implémentation, 
                  notre équipe vous accompagne dans votre transformation digitale.
                </p>
                <img 
                  src="/nukleo-arrow.svg" 
                  alt=""
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-16 opacity-20 rotate-90 group-hover:translate-y-4 transition-all duration-700"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))' }}
                />
              </div>
              
              {/* Section 2 */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-12 mb-8 border border-white/10 group">
                <h2 className="text-3xl font-bold text-white mb-4">Plateformes Digitales</h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                  Conception et développement de plateformes web modernes, performantes et scalables. 
                  Nous utilisons les technologies les plus avancées pour créer des expériences exceptionnelles.
                </p>
                <img 
                  src="/nukleo-arrow.svg" 
                  alt=""
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-16 opacity-20 rotate-90 group-hover:translate-y-4 transition-all duration-700"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))' }}
                />
              </div>
              
              {/* Section 3 */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 group">
                <h2 className="text-3xl font-bold text-white mb-4">Stratégie & Innovation</h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                  Nous vous aidons à définir une stratégie digitale claire et à innover dans votre secteur. 
                  Notre approche combine vision stratégique et exécution opérationnelle.
                </p>
                <img 
                  src="/nukleo-arrow.svg" 
                  alt=""
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-16 opacity-20 rotate-90 group-hover:translate-y-4 transition-all duration-700"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' }}
                />
              </div>
            </div>
          )}

          {/* Concept 2 Full */}
          {selectedConcept === 2 && (
            <div className="container py-20">
              <h1 className="text-5xl font-bold text-white mb-6 text-center">Flèche Interactive sur CTAs</h1>
              <p className="text-xl text-white/80 mb-16 text-center max-w-3xl mx-auto">
                La flèche apparaît au hover pour renforcer l'action et guider l'utilisateur
              </p>
              
              <div className="max-w-4xl mx-auto space-y-12">
                {/* Primary CTA */}
                <div className="text-center">
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Primary Action</h3>
                  <button className="group/btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-12 py-6 rounded-xl transition-all relative overflow-hidden text-xl font-semibold shadow-2xl">
                    <span className="relative z-10 inline-block group-hover/btn:translate-x-[-8px] transition-transform duration-300">
                      Démarrer un Projet
                    </span>
                    <img 
                      src="/nukleo-arrow.svg" 
                      alt=""
                      className="absolute right-8 top-1/2 -translate-y-1/2 w-8 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
                    />
                  </button>
                </div>
                
                {/* Secondary CTA */}
                <div className="text-center">
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Secondary Action</h3>
                  <button className="group/btn bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-lg transition-all relative overflow-hidden border border-white/20 text-lg">
                    <span className="relative z-10 inline-block group-hover/btn:translate-x-[-8px] transition-transform duration-300">
                      En Savoir Plus
                    </span>
                    <img 
                      src="/nukleo-arrow.svg" 
                      alt=""
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-6 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
                    />
                  </button>
                </div>
                
                {/* Link Style */}
                <div className="text-center">
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Link Style</h3>
                  <a href="#" className="group/link inline-flex items-center gap-3 text-white text-lg hover:text-purple-400 transition-colors">
                    <span>Découvrir nos services</span>
                    <img 
                      src="/nukleo-arrow.svg" 
                      alt=""
                      className="w-5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-2 transition-all duration-300"
                    />
                  </a>
                </div>
                
                {/* Card with CTA */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Card with CTA</h3>
                  <h4 className="text-2xl font-bold text-white mb-4">Consultation Gratuite</h4>
                  <p className="text-white/70 mb-6">
                    Discutons de votre projet et explorons comment nous pouvons vous aider à atteindre vos objectifs.
                  </p>
                  <button className="group/btn bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg transition-all relative overflow-hidden border border-white/20">
                    <span className="relative z-10 inline-block group-hover/btn:translate-x-[-8px] transition-transform duration-300">
                      Réserver un Appel
                    </span>
                    <img 
                      src="/nukleo-arrow.svg" 
                      alt=""
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Concept 3 Full */}
          {selectedConcept === 3 && (
            <div className="container py-20">
              <h1 className="text-5xl font-bold text-white mb-6 text-center">Flèche Séparateur</h1>
              <p className="text-xl text-white/80 mb-16 text-center max-w-3xl mx-auto">
                La flèche remplace les dividers traditionnels pour créer des transitions élégantes
              </p>
              
              {/* Section 1 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-4">Notre Vision</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  Transformer les entreprises grâce à l'intelligence artificielle et aux technologies de pointe. 
                  Nous croyons en un futur où la technologie amplifie le potentiel humain.
                </p>
              </div>
              
              {/* Separator */}
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-4">
                  <div className="h-px w-32 bg-gradient-to-r from-transparent to-white/20"></div>
                  <img 
                    src="/nukleo-arrow.svg" 
                    alt=""
                    className="w-10 opacity-30 rotate-90 animate-pulse"
                    style={{ 
                      filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))',
                      animationDuration: '3s'
                    }}
                  />
                  <div className="h-px w-32 bg-gradient-to-l from-transparent to-white/20"></div>
                </div>
              </div>
              
              {/* Section 2 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-4">Notre Approche</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  Nous combinons expertise technique, créativité et stratégie pour livrer des solutions qui dépassent les attentes. 
                  Chaque projet est une opportunité d'innover et de créer de la valeur.
                </p>
              </div>
              
              {/* Separator */}
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-4">
                  <div className="h-px w-32 bg-gradient-to-r from-transparent to-white/20"></div>
                  <img 
                    src="/nukleo-arrow.svg" 
                    alt=""
                    className="w-10 opacity-30 rotate-90 animate-pulse"
                    style={{ 
                      filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))',
                      animationDuration: '3s',
                      animationDelay: '1s'
                    }}
                  />
                  <div className="h-px w-32 bg-gradient-to-l from-transparent to-white/20"></div>
                </div>
              </div>
              
              {/* Section 3 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-4">Notre Impact</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  Nos clients voient des résultats mesurables : augmentation de l'efficacité, réduction des coûts, 
                  et création de nouvelles opportunités de croissance grâce à la transformation digitale.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
