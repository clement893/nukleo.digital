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
                Start a Project
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
          <h2 className="text-4xl font-bold text-white mb-12">Technical Capabilities</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Agents & Automation",
                description: "Development of autonomous intelligent agents capable of executing complex tasks, learning, and adapting to your business environment."
              },
              {
                icon: Database,
                title: "Data Platforms & Pipelines",
                description: "Architecture and implementation of modern data platforms with ETL/ELT pipelines, data lakes, and optimized data warehouses."
              },
              {
                icon: Network,
                title: "API & Integration",
                description: "Design and development of robust APIs and system integrations to seamlessly connect your tools and data."
              },
              {
                icon: Code2,
                title: "Custom AI Models",
                description: "Fine-tuning and deployment of custom AI models tailored to your specific use cases and proprietary data."
              },
              {
                icon: Zap,
                title: "Performance Optimization",
                description: "Performance optimization, scalability, and infrastructure cost reduction for your AI and data systems."
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                description: "Implementation of robust security measures and regulatory compliance (GDPR, SOC2, ISO) for your AI systems."
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
            We use the most advanced and proven technologies to build robust and scalable solutions.
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
                description: "Rapid POC development to validate technical feasibility and demonstrate value before full investment."
              },
              {
                step: "03",
                title: "Development & Integration",
                description: "Iterative development with continuous integration into your existing systems, rigorous testing, and complete documentation."
              },
              {
                step: "04",
                title: "Deployment & Optimization",
                description: "Production deployment with monitoring, performance optimization, and training for your technical teams."
              },
              {
                step: "05",
                title: "Support & Evolution",
                description: "Continuous technical support, proactive maintenance, and solution evolution according to your changing needs."
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
            Ready to build your AI infrastructure?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Let's discuss your technical needs and design the solution tailored to your ambitions together.
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
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
