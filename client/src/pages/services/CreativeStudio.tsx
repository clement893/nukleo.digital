import { ArrowRight, Sparkles, Palette, Video, MessageSquare, Image, Mic, Zap, Globe } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function CreativeStudioService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 text-pink-400 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">The Creative Studio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Augmented Content
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
              & Experiences
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-8">
            Nous créons du contenu et des expériences augmentées par l'AI. Du marketing agentique aux 
            campagnes multicanales intelligentes, nous amplifions votre impact créatif avec la puissance de l'intelligence artificielle.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
                Lancer une campagne
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/studio">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                En savoir plus sur le Studio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Services Créatifs</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Agentic Marketing",
                description: "Déploiement d'agents AI autonomes pour automatiser et optimiser vos campagnes marketing : génération de contenu, A/B testing, personnalisation en temps réel."
              },
              {
                icon: MessageSquare,
                title: "Content Generation",
                description: "Production de contenu à grande échelle : articles de blog, posts sociaux, newsletters, scripts vidéo, le tout adapté à votre ton et votre audience."
              },
              {
                icon: Image,
                title: "Visual Creation",
                description: "Génération d'images, illustrations et designs avec AI : visuels pour réseaux sociaux, assets marketing, mockups produits et brand assets."
              },
              {
                icon: Video,
                title: "Video & Animation",
                description: "Création de vidéos augmentées par AI : montage automatique, génération de voix-off, sous-titres intelligents et animations personnalisées."
              },
              {
                icon: Mic,
                title: "Audio & Voice",
                description: "Production audio AI : voix-off synthétiques naturelles, podcasts automatisés, traduction vocale et clonage de voix pour le branding."
              },
              {
                icon: Globe,
                title: "Omnichannel Campaigns",
                description: "Orchestration de campagnes multicanales cohérentes avec personnalisation AI sur web, social, email, SMS et publicité programmatique."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                <service.icon className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Process */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-6">Processus Créatif Augmenté</h2>
          <p className="text-white/70 mb-12 max-w-3xl">
            Notre approche hybride combine créativité humaine et puissance de l'AI pour créer du contenu qui résonne et performe.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                phase: "Ideate",
                description: "Brainstorming augmenté par AI, analyse de tendances et génération d'idées créatives à grande échelle"
              },
              {
                phase: "Create",
                description: "Production de contenu multiformat avec outils AI, itération rapide et variations personnalisées"
              },
              {
                phase: "Optimize",
                description: "A/B testing automatisé, analyse de performance en temps réel et optimisation continue"
              },
              {
                phase: "Scale",
                description: "Déploiement multicanal, adaptation locale et amplification intelligente du contenu performant"
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-3xl font-bold text-pink-400 mb-3">{phase.phase}</div>
                <p className="text-white/70 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Outils & Plateformes</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Palette className="w-12 h-12 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Génération de Contenu</h3>
              <ul className="space-y-2 text-white/70">
                <li>• GPT-4, Claude, Gemini</li>
                <li>• Midjourney, DALL-E, Stable Diffusion</li>
                <li>• Runway, Pika, Sora</li>
                <li>• ElevenLabs, Descript</li>
                <li>• Copy.ai, Jasper</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <Zap className="w-12 h-12 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Marketing Automation</h3>
              <ul className="space-y-2 text-white/70">
                <li>• HubSpot, Marketo, Salesforce</li>
                <li>• Zapier, Make, n8n</li>
                <li>• Google Analytics, Mixpanel</li>
                <li>• Segment, Amplitude</li>
                <li>• Optimizely, VWO</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <Globe className="w-12 h-12 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Distribution</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Meta Business Suite</li>
                <li>• LinkedIn Campaign Manager</li>
                <li>• Google Ads, DV360</li>
                <li>• Mailchimp, SendGrid</li>
                <li>• Buffer, Hootsuite</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Cas d'Usage</h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Content Marketing at Scale",
                description: "Génération automatisée de centaines d'articles de blog SEO-optimisés par mois, adaptés à différentes audiences et personas.",
                impact: "10x volume de contenu, -70% coûts de production"
              },
              {
                title: "Personalized Email Campaigns",
                description: "Création de campagnes email hyper-personnalisées avec contenu dynamique généré par AI selon le profil et comportement de chaque lead.",
                impact: "+250% taux d'ouverture, +180% taux de conversion"
              },
              {
                title: "Social Media Automation",
                description: "Agents AI qui créent, programment et optimisent automatiquement vos posts sur tous les réseaux sociaux avec A/B testing continu.",
                impact: "100% couverture quotidienne, +320% engagement"
              },
              {
                title: "Dynamic Ad Creative",
                description: "Génération automatique de milliers de variations de créatives publicitaires testées et optimisées en temps réel selon la performance.",
                impact: "-45% CPA, +190% ROAS"
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">{useCase.title}</h3>
                <p className="text-white/70 mb-4">{useCase.description}</p>
                <div className="inline-block bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full text-sm font-medium">
                  {useCase.impact}
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
            Prêt à amplifier votre impact créatif ?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Discutons de vos objectifs marketing et créons ensemble des campagnes qui performent à l'échelle.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
                Lancer votre première campagne AI
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Voir nos créations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
