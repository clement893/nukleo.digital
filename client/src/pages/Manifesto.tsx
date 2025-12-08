import PageLayout from '../components/PageLayout';

export default function Manifesto() {
  return (
    <PageLayout>
      <div className="min-h-screen pt-24 pb-20 px-4">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-white/90">01 — MANIFESTO</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            MOVE FROM<br />
            PILOT TO<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.85_0.15_300)] via-[oklch(0.85_0.15_320)] to-[oklch(0.85_0.15_340)]">
              SCALE.
            </span>
          </h1>
          
          <p className="text-2xl text-white/70 max-w-3xl leading-relaxed">
            Le fossé se creuse. Pendant que certains expérimentent, les leaders réarchitecturent 
            l'ensemble de leurs opérations autour de l'IA agentique.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white">L'ère de l'expérimentation est révolue</h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                Nous avons passé les deux dernières années à tester des chatbots, à générer du contenu 
                et à explorer les possibilités de l'IA. Ces expérimentations ont été précieuses, mais 
                elles ne suffisent plus.
              </p>
              <p>
                Aujourd'hui, la question n'est plus "Comment puis-je utiliser l'IA ?" mais 
                "Comment puis-je réinventer mon organisation autour de l'IA ?"
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Le nouveau paradigme</h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                L'IA agentique représente un changement fondamental dans la façon dont nous concevons 
                le travail. Il ne s'agit plus d'outils que nous utilisons, mais d'agents autonomes qui 
                collaborent avec nous, apprennent de nous, et exécutent des tâches complexes de manière 
                indépendante.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">Avant</h3>
                  <ul className="space-y-2 text-white/60">
                    <li>• Outils passifs</li>
                    <li>• Processus manuels</li>
                    <li>• Décisions humaines uniquement</li>
                    <li>• Échelle limitée</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[oklch(0.85_0.15_320)]">Maintenant</h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• Agents autonomes</li>
                    <li>• Automatisation intelligente</li>
                    <li>• Décisions augmentées par l'IA</li>
                    <li>• Échelle exponentielle</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-white">Notre vision</h2>
            <div className="space-y-4 text-lg text-white/70 leading-relaxed">
              <p>
                Chez Nukleo Digital, nous croyons que chaque organisation peut devenir un leader de l'IA. 
                Notre mission est de vous accompagner dans cette transformation, pas à pas, de l'expérimentation 
                à l'industrialisation.
              </p>
              <p>
                Nous ne construisons pas simplement des sites web ou des applications. Nous créons des 
                écosystèmes intelligents où chaque point de contact digital est alimenté par des agents 
                autonomes qui optimisent, apprennent et s'adaptent en temps réel.
              </p>
            </div>
          </section>

          {/* Section 4 - Principles */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Nos principes</h2>
            <div className="grid gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">1. Leader, pas suiveur</h3>
                <p className="text-white/70">
                  Intégrez des capacités d'IA agentique qui peuvent tripler votre ROI, votre vitesse 
                  et votre volume de production.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">2. Opérations réinventées</h3>
                <p className="text-white/70">
                  Réarchitecturez vos workflows autour d'agents intelligents qui automatisent et 
                  optimisent en continu.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">3. Échelle sans limites</h3>
                <p className="text-white/70">
                  Créez des systèmes qui grandissent avec vous, sans les contraintes traditionnelles 
                  de ressources humaines ou de temps.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-3">4. Human-Centered</h3>
                <p className="text-white/70">
                  AI doesn't replace humans, it augments them. Our solutions free your team 
                  to focus on what truly matters: strategy, creativity, and innovation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - Call to Action */}
          <section className="bg-gradient-to-r from-[oklch(0.85_0.15_300)] via-[oklch(0.85_0.15_320)] to-[oklch(0.85_0.15_340)] rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Scale?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              The era of agentic marketing is here. Define your roadmap to become 
              an AI-native leader.
            </p>
            <button className="bg-white text-[oklch(0.35_0.15_300)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105">
              START YOUR TRANSFORMATION
            </button>
          </section>

          {/* Section 6 - Quote */}
          <section className="border-l-4 border-[oklch(0.85_0.15_320)] pl-8 py-4">
            <blockquote className="text-2xl md:text-3xl font-light text-white/80 italic leading-relaxed">
              "The future belongs to those who build tomorrow's systems today."
            </blockquote>
            <p className="text-white/60 mt-4">— The Nukleo Digital Team</p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
