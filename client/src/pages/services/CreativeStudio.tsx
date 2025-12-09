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
            We create AI-augmented content and experiences. Du marketing agentique aux 
            campagnes multicanales intelligentes, nous amplifions votre impact créatif avec la puissance de l'intelligence artificielle.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
                Launch a Campaign
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/studio">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More About the Studio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-12">Creative Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Agentic Marketing",
                description: "Deployment of autonomous AI agents to automate and optimize your marketing campaigns: content generation, A/B testing, real-time personalization."
              },
              {
                icon: MessageSquare,
                title: "Content Generation",
                description: "Large-scale content production: blog articles, social posts, newsletters, video scripts, all adapted to your tone and audience."
              },
              {
                icon: Image,
                title: "Visual Creation",
                description: "AI-powered image, illustration, and design generation: social media visuals, marketing assets, product mockups, and brand assets."
              },
              {
                icon: Video,
                title: "Video & Animation",
                description: "AI-augmented video creation: automatic editing, voiceover generation, intelligent subtitles, and personalized animations."
              },
              {
                icon: Mic,
                title: "Audio & Voice",
                description: "AI audio production: natural synthetic voiceovers, automated podcasts, voice translation, and voice cloning for branding."
              },
              {
                icon: Globe,
                title: "Omnichannel Campaigns",
                description: "Orchestration of cohesive omnichannel campaigns with AI personalization across web, social, email, SMS, and programmatic advertising."
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
          <h2 className="text-4xl font-bold text-white mb-6">Augmented Creative Process</h2>
          <p className="text-white/70 mb-12 max-w-3xl">
            Our hybrid approach combines human creativity and AI power to create content that resonates and performs.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                phase: "Ideate",
                description: "AI-augmented brainstorming, trend analysis, and large-scale creative idea generation"
              },
              {
                phase: "Create",
                description: "Multi-format content production with AI tools, rapid iteration, and personalized variations"
              },
              {
                phase: "Optimize",
                description: "Automated A/B testing, real-time performance analysis, and continuous optimization"
              },
              {
                phase: "Scale",
                description: "Omnichannel deployment, local adaptation, and intelligent amplification of high-performing content"
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
          <h2 className="text-4xl font-bold text-white mb-12">Tools Outils & Plateformes Platforms</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Palette className="w-12 h-12 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">Content Generation</h3>
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
          <h2 className="text-4xl font-bold text-white mb-12">Use Cases</h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Content Marketing at Scale",
                description: "Automated generation of hundreds of SEO-optimized blog articles per month, adapted to different audiences and personas.",
                impact: "10x content volume, -70% production costs"
              },
              {
                title: "Personalized Email Campaigns",
                description: "Creation of hyper-personalized email campaigns with AI-generated dynamic content based on each lead's profile and behavior.",
                impact: "+250% open rate, +180% conversion rate"
              },
              {
                title: "Social Media Automation",
                description: "AI agents that automatically create, schedule, and optimize your posts across all social networks with continuous A/B testing.",
                impact: "100% daily coverage, +320% engagement"
              },
              {
                title: "Dynamic Ad Creative",
                description: "Automatic generation of thousands of ad creative variations tested and optimized in real-time based on performance.",
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
            Ready to amplify your creative impact?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Let's discuss your marketing goals and create campaigns that perform at scale together.
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
