import { ArrowRight, Cpu, Database, Network, Zap, Brain, Code2, Shield } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function AILabService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 text-cyan-400 mb-6">
            <Cpu className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">The AI Lab</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Technology
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Foundation
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            Nous construisons l'infrastructure technologique qui alimente votre transformation AI. 
            Du développement d'agents intelligents à l'architecture de données, nous créons les fondations 
            techniques de votre avenir augmenté.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Démarrer un projet
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/lab">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                En savoir plus sur le Lab
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Capacités Techniques</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Agents & Automation",
                description: "Développement d'agents intelligents autonomes capables d'exécuter des tâches complexes, d'apprendre et de s'adapter à votre environnement métier."
              },
              {
                icon: Database,
                title: "Data Platforms & Pipelines",
                description: "Architecture et implémentation de plateformes de données modernes avec pipelines ETL/ELT, data lakes et data warehouses optimisés."
              },
              {
                icon: Network,
                title: "API & Integration",
                description: "Conception et développement d'APIs robustes et d'intégrations système pour connecter vos outils et données de manière fluide."
              },
              {
                icon: Code2,
                title: "Custom AI Models",
                description: "Fine-tuning et déploiement de modèles AI personnalisés adaptés à vos cas d'usage spécifiques et vos données propriétaires."
              },
              {
                icon: Zap,
                title: "Performance Optimization",
                description: "Optimisation des performances, scalabilité et réduction des coûts d'infrastructure pour vos systèmes AI et data."
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                description: "Implémentation de mesures de sécurité robustes et conformité aux réglementations (GDPR, SOC2, ISO) pour vos systèmes AI."
              }
            ].map((capability, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <capability.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{capability.title}</h3>
                <p className="text-white/70">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-6">Stack Technologique</h2>
          <p className="text-white/70 mb-12 max-w-3xl">
            Nous utilisons les technologies les plus avancées et éprouvées pour construire des solutions robustes et scalables.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">AI & ML</h3>
              <ul className="space-y-2 text-white/70">
                <li>• OpenAI GPT-4, Claude, Gemini</li>
                <li>• LangChain, LlamaIndex</li>
                <li>• TensorFlow, PyTorch</li>
                <li>• Hugging Face Transformers</li>
                <li>• Vector Databases (Pinecone, Weaviate)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Data & Infrastructure</h3>
              <ul className="space-y-2 text-white/70">
                <li>• AWS, Google Cloud, Azure</li>
                <li>• Snowflake, BigQuery, Databricks</li>
                <li>• Apache Airflow, dbt</li>
                <li>• PostgreSQL, MongoDB, Redis</li>
                <li>• Docker, Kubernetes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Development</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Python, TypeScript, Go</li>
                <li>• FastAPI, Node.js, React</li>
                <li>• GraphQL, REST APIs</li>
                <li>• CI/CD (GitHub Actions, GitLab)</li>
                <li>• Monitoring (Datadog, Grafana)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Notre Approche</h2>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery & Architecture",
                description: "Audit technique de votre infrastructure existante, identification des besoins et conception de l'architecture cible."
              },
              {
                step: "02",
                title: "Proof of Concept",
                description: "Développement rapide d'un POC pour valider la faisabilité technique et démontrer la valeur avant l'investissement complet."
              },
              {
                step: "03",
                title: "Development & Integration",
                description: "Développement itératif avec intégration continue dans vos systèmes existants, tests rigoureux et documentation complète."
              },
              {
                step: "04",
                title: "Deployment & Optimization",
                description: "Déploiement en production avec monitoring, optimisation des performances et formation de vos équipes techniques."
              },
              {
                step: "05",
                title: "Support & Evolution",
                description: "Support technique continu, maintenance proactive et évolution de la solution selon vos besoins changeants."
              }
            ].map((phase, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="text-5xl font-bold text-cyan-400/20">{phase.step}</div>
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
      <section className="py-20 px-4">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à construire votre infrastructure AI ?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Discutons de vos besoins techniques et concevons ensemble la solution adaptée à vos ambitions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Planifier une consultation technique
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Voir nos réalisations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
