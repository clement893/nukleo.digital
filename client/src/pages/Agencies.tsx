import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  TrendingUp, Users, Shield, Clock, Euro, Target, 
  CheckCircle2, Zap, Globe, Award, BarChart3, HeartHandshake,
  Rocket, Lock, Sparkles, Code2, Smartphone, Cloud
} from "lucide-react";

export default function Agencies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Votre Équipe Technique
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Européenne Basée au Canada
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Nucleus Stratégie Europe : votre partenaire nearshore premium pour une expansion sans risque et des économies garanties
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Europe francophone 2025-2030
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                12 employés • 1,2M€ CA
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                3 ans d'expertise
              </span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">2 → 32</div>
              <div className="text-white font-semibold mb-1">Agences partenaires</div>
              <div className="text-white/60 text-sm">2025-2030</div>
            </Card>
            
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">1,9M€</div>
              <div className="text-white font-semibold mb-1">Chiffre d'affaires</div>
              <div className="text-white/60 text-sm">Objectif 2030</div>
            </Card>
            
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">189M€</div>
              <div className="text-white font-semibold mb-1">Marché potentiel</div>
              <div className="text-white/60 text-sm">4 pays cibles</div>
            </Card>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-white/70 text-sm">Satisfaction garantie</div>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">98%</div>
              <div className="text-white/70 text-sm">Respect délais</div>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">1M€</div>
              <div className="text-white/70 text-sm">Assurance protection</div>
            </Card>
            
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">725%</div>
              <div className="text-white/70 text-sm">ROI sur 5 ans</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Nucleus */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pourquoi les Agences Choisissent Nucleus
            </h2>
            <p className="text-xl text-white/70">
              Extension naturelle • Qualité garantie • Économies réelles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Operational Advantages */}
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Avantages Opérationnels</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Flexibilité Totale
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Scaling up/down selon projets</li>
                    <li>• Pas de contraintes RH internes</li>
                    <li>• Adaptation rapide aux besoins</li>
                    <li>• Gestion pics de charge optimale</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Time-to-Market Accéléré
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Équipe immédiatement disponible</li>
                    <li>• Pas de recrutement/formation</li>
                    <li>• Démarrage projets sous 48h</li>
                    <li>• Gain : 4-8 semaines vs recrutement</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Risques Minimisés
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Garanties contractuelles uniques</li>
                    <li>• Assurance responsabilité 1M€</li>
                    <li>• Pas de risque turnover équipe</li>
                    <li>• Support technique permanent</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Financial Advantages */}
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <Euro className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Avantages Financiers</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Économies Directes
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• 30-40% vs développeurs locaux</li>
                    <li>• Pas de charges sociales</li>
                    <li>• Pas de formation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ROI Garanti
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Minimum 30% contractuel</li>
                    <li>• Mesure et reporting transparents</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Coûts Prévisibles
                  </h4>
                  <ul className="text-white/70 text-sm space-y-1 ml-7">
                    <li>• Prix fixes • Pas de dépassements</li>
                    <li>• Budgets maîtrisés et respectés</li>
                  </ul>
                </div>
              </div>

              {/* Competitive Advantage Box */}
              <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <h4 className="text-white font-semibold mb-4 text-center">Avantage Concurrentiel</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-cyan-400">3x</div>
                    <div className="text-white/70 text-xs">Capacité projets</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">40%</div>
                    <div className="text-white/70 text-xs">Économies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-400">0</div>
                    <div className="text-white/70 text-xs">Risque RH</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400">24/7</div>
                    <div className="text-white/70 text-xs">Support</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quality & Expertise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <Sparkles className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Qualité & Expertise</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Excellence Technique Prouvée</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Équipe senior 5+ ans expérience</li>
                    <li>• 100% satisfaction historique Canada</li>
                    <li>• 0 projet échoué en 3 ans</li>
                    <li>• Standards qualité européens</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Communication Parfaite</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Bilinguisme natif français/anglais</li>
                    <li>• Compréhension culture business européenne</li>
                    <li>• Reporting transparent et régulier</li>
                    <li>• Disponibilité heures ouvrables Europe</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
              <HeartHandshake className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Modèle de Partenariat</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Extension d'Équipe</h4>
                  <p className="text-white/70 text-sm">
                    Intégration transparente avec vos équipes. Pas de sous-traitance visible pour clients.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Focus sur Votre Cœur de Métier</h4>
                  <p className="text-white/70 text-sm">
                    Vous gardez stratégie et relation client. Nous assurons l'exécution technique.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Croissance Accélérée</h4>
                  <p className="text-white/70 text-sm">
                    Capacité projets multipliée par 3. Nouveaux services sans investissement.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Notre Offre de Services
            </h2>
            <p className="text-xl text-white/70">
              Écosystèmes numériques complets pour agences européennes
            </p>
          </div>

          {/* 3-Phase Methodology */}
          <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Méthodologie 3 Phases</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-400">1</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Understand</h4>
                <p className="text-white/70 text-sm mb-3">
                  Analyse approfondie besoins • Audit technique • Architecture optimale
                </p>
                <div className="text-white/50 text-xs">
                  1-2 semaines • Cahier des charges
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Activate</h4>
                <p className="text-white/70 text-sm mb-3">
                  Développement agile • Tests automatisés • Validation continue
                </p>
                <div className="text-white/50 text-xs">
                  4-12 semaines • Solution fonctionnelle
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-400">3</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Evolve</h4>
                <p className="text-white/70 text-sm mb-3">
                  Formation équipes • Support continu • Optimisations performance
                </p>
                <div className="text-white/50 text-xs">
                  Support continu • Maintenance évolutive
                </div>
              </div>
            </div>
          </Card>

          {/* Service Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <Code2 className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Développement Web & Applications</h3>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• Sites web corporate et e-commerce</li>
                <li>• Applications web sur mesure</li>
                <li>• Plateformes collaboratives</li>
                <li>• Progressive Web Apps (PWA)</li>
              </ul>
              <div className="mt-4 text-white/50 text-xs">
                React, Vue.js, Node.js, PHP, Python
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <Smartphone className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Applications Mobiles</h3>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• Apps natives iOS/Android</li>
                <li>• Applications hybrides</li>
                <li>• Intégration APIs tierces</li>
                <li>• Synchronisation cloud</li>
              </ul>
              <div className="mt-4 text-white/50 text-xs">
                React Native, Flutter, Swift, Kotlin
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10">
              <Cloud className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Infrastructure & Cloud</h3>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• Architecture cloud scalable</li>
                <li>• DevOps et CI/CD</li>
                <li>• Sécurité et conformité</li>
                <li>• Monitoring et analytics</li>
              </ul>
              <div className="mt-4 text-white/50 text-xs">
                AWS, Azure, Docker, Kubernetes
              </div>
            </Card>
          </div>

          {/* Quality Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">95%</div>
              <div className="text-white/70 text-sm">Satisfaction min.</div>
            </Card>
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">98%</div>
              <div className="text-white/70 text-sm">Respect délais</div>
            </Card>
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
              <div className="text-white/70 text-sm">Support garanti</div>
            </Card>
            <Card className="p-4 bg-white/5 backdrop-blur-xl border-white/10 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">100%</div>
              <div className="text-white/70 text-sm">Code review</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Amplifier Votre Succès ?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Rejoignez les agences européennes qui font confiance à Nucleus pour leur expansion technique. 
            Discutons de votre projet dès aujourd'hui.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                Devenir Partenaire
              </Button>
            </Link>
            <Link href="/start-project">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Demander une Démo
              </Button>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
            <p className="text-white/80 text-sm mb-2">
              <strong>Financement Export Canada :</strong> 75 000$ CAD disponible
            </p>
            <p className="text-white/60 text-xs">
              Nucleus Stratégie Inc. • 12 employés • 1,2M€ CA • Canada
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
