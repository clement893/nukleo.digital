import { ArrowRight, Compass, Target, Users, TrendingUp, Shield, Lightbulb, BarChart3, FileCheck } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function StrategicBureauService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 text-purple-400 mb-6">
            <Compass className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">The Strategic Bureau</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transformation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Orchestration
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            Nous orchestrons votre transformation AI de bout en bout. De la vision stratégique à l'exécution opérationnelle, 
            nous alignons technologie, processus et équipes pour créer un impact mesurable et durable.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                Démarrer votre transformation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/bureau">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                En savoir plus sur le Bureau
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Services Stratégiques</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "AI Strategy & Roadmap",
                description: "Définition de votre vision AI, identification des opportunités à fort impact et construction d'une roadmap de transformation pragmatique et mesurable."
              },
              {
                icon: BarChart3,
                title: "Business Case & ROI",
                description: "Analyse approfondie du ROI potentiel, modélisation financière et construction de business cases solides pour sécuriser l'investissement."
              },
              {
                icon: Users,
                title: "Change Management",
                description: "Accompagnement de vos équipes dans l'adoption de l'AI, formation, gestion du changement et création d'une culture data-driven."
              },
              {
                icon: FileCheck,
                title: "Governance & Compliance",
                description: "Mise en place de frameworks de gouvernance AI, politiques d'utilisation éthique et conformité réglementaire (GDPR, AI Act)."
              },
              {
                icon: TrendingUp,
                title: "Performance Tracking",
                description: "Définition de KPIs pertinents, mise en place de dashboards de suivi et optimisation continue basée sur les données."
              },
              {
                icon: Shield,
                title: "Risk Management",
                description: "Identification et mitigation des risques liés à l'AI (biais, sécurité, dépendance) avec des stratégies de contingence robustes."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <service.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Framework */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-6">Framework de Transformation</h2>
          <p className="text-white/70 mb-12 max-w-3xl">
            Notre méthodologie éprouvée pour orchestrer des transformations AI réussies, de la vision à l'impact.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                phase: "Discover",
                description: "Audit de maturité AI, identification des opportunités et alignement avec la stratégie business"
              },
              {
                phase: "Define",
                description: "Construction de la vision AI, priorisation des use cases et définition de la roadmap"
              },
              {
                phase: "Deploy",
                description: "Exécution des projets pilotes, scaling des solutions et intégration dans les processus"
              },
              {
                phase: "Drive",
                description: "Optimisation continue, mesure de l'impact et évolution de la stratégie"
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-400 mb-3">{phase.phase}</div>
                <p className="text-white/70 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Livrables Clés</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Lightbulb className="w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Stratégiques</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Vision & Roadmap AI</li>
                <li>• Business Cases détaillés</li>
                <li>• Framework de gouvernance</li>
                <li>• Politique d'utilisation éthique</li>
                <li>• Stratégie de change management</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <BarChart3 className="w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Opérationnels</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Plans d'exécution détaillés</li>
                <li>• Dashboards de suivi KPI</li>
                <li>• Processus optimisés</li>
                <li>• Guides d'utilisation</li>
                <li>• Plans de formation</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <Users className="w-12 h-12 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Organisationnels</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Organigrammes cibles</li>
                <li>• Fiches de poste AI</li>
                <li>• Parcours de formation</li>
                <li>• Communautés de pratique</li>
                <li>• Plans de communication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Notre Approche</h2>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Assessment & Vision",
                description: "Évaluation de votre maturité AI, identification des quick wins et construction d'une vision ambitieuse mais réaliste."
              },
              {
                step: "02",
                title: "Strategy & Roadmap",
                description: "Définition de la stratégie AI alignée avec vos objectifs business et construction d'une roadmap de transformation par phases."
              },
              {
                step: "03",
                title: "Pilot & Validate",
                description: "Lancement de projets pilotes pour valider l'approche, mesurer l'impact et ajuster la stratégie avant le scaling."
              },
              {
                step: "04",
                title: "Scale & Integrate",
                description: "Déploiement à grande échelle, intégration dans les processus existants et formation des équipes pour l'autonomie."
              },
              {
                step: "05",
                title: "Optimize & Evolve",
                description: "Mesure continue de la performance, optimisation des solutions et évolution de la stratégie selon les résultats."
              }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-purple-400/20">{phase.step}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{phase.title}</h3>
                  <p className="text-white/70">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à orchestrer votre transformation AI ?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Discutons de votre vision et construisons ensemble la stratégie qui transformera votre organisation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                Planifier un diagnostic stratégique
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/ai-readiness">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Évaluer votre maturité AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
