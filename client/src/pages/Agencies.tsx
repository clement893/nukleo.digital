import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UniversalLEO from '@/components/UniversalLEO';
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  Clock, 
  DollarSign,
  Star,
  Sparkles,
  Target,
  Rocket,
  Award,
  BarChart3
} from 'lucide-react';

export default function Agencies() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.20_0.05_300)] via-[oklch(0.15_0.05_320)] to-[oklch(0.10_0.05_340)]">
      <SEO 
        title="Partner with Nukleo | Your AI & Digital Team on Demand"
        description="Scale your agency with Nukleo's expert AI & digital team. 40% cost savings, zero hiring hassle, premium quality guaranteed."
      />

      {/* Hero Section - Ultra impactant */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.15_0.05_320)]/50 to-[oklch(0.15_0.05_320)]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">Trusted by 32+ European Agencies</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI & Digital Team
              </span>
              <br />
              Without the Overhead
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Scale your agency instantly with our expert team. Deliver more projects, increase margins, keep clients happy—all without hiring headaches.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/start-project">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg group">
                  Start Your First Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Book a Strategy Call
                </Button>
              </Link>
            </div>

            {/* Social proof numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '40%', label: 'Cost Savings' },
                { value: '< 48h', label: 'Team Ready' },
                { value: '98%', label: 'On-Time Delivery' },
                { value: '€1M', label: 'Insured Projects' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-20 bg-gradient-to-b from-[oklch(0.15_0.05_320)] to-[oklch(0.12_0.05_330)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Agencies Are Stuck Between <span className="text-red-400">Growth & Capacity</span>
              </h2>
              <p className="text-xl text-white/70">
                Sound familiar? You're not alone.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Hiring is Slow & Expensive',
                  description: '3-6 months to hire, €60K+ salaries, high turnover risk. You lose projects while recruiting.',
                },
                {
                  icon: TrendingUp,
                  title: 'Clients Want More, Faster',
                  description: 'AI, automation, custom platforms—demands are exploding but your team is maxed out.',
                },
                {
                  icon: DollarSign,
                  title: 'Margins Are Shrinking',
                  description: 'Local dev costs eat profits. You need premium quality at nearshore prices.',
                },
              ].map((problem, index) => (
                <div key={index} className="p-6 border-l-4 border-red-500 bg-red-500/5">
                  <problem.icon className="w-12 h-12 text-red-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                  <p className="text-white/70">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5" />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 mb-6">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">The Nukleo Solution</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Instant <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">AI & Digital Powerhouse</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                We become your technical backbone—seamlessly integrated, instantly scalable, transparently priced.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  icon: Zap,
                  title: 'Deploy in 48 Hours',
                  description: 'No recruitment, no onboarding delays. Senior team ready to start Monday.',
                  highlight: 'vs. 3-6 months hiring',
                },
                {
                  icon: DollarSign,
                  title: 'Save 40% on Dev Costs',
                  description: 'Premium Canadian talent at nearshore prices. Better margins, same quality.',
                  highlight: '€60K → €36K per dev/year',
                },
                {
                  icon: Users,
                  title: 'Scale Up or Down Instantly',
                  description: 'Need 3 devs this month, 8 next month? No problem. Zero HR overhead.',
                  highlight: 'Total flexibility',
                },
                {
                  icon: Shield,
                  title: '€1M Project Insurance',
                  description: 'Every project covered. 98% on-time delivery. 95% client satisfaction guaranteed.',
                  highlight: 'Risk-free partnership',
                },
                {
                  icon: Target,
                  title: 'AI & Automation Experts',
                  description: 'Not just coders—strategic AI partners who understand business transformation.',
                  highlight: '5+ years avg. experience',
                },
                {
                  icon: Clock,
                  title: 'European Hours, Canadian Base',
                  description: 'Bilingual team (French/English) aligned with your timezone and culture.',
                  highlight: 'Real-time collaboration',
                },
              ].map((benefit, index) => (
                <div key={index} className="p-6 border-l-4 border-cyan-500 hover:border-purple-600 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/70 mb-2">{benefit.description}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                        <Star className="w-3 h-3 text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-400">{benefit.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg group">
                  See How We Can Help Your Agency
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-[oklch(0.12_0.05_330)] to-[oklch(0.15_0.05_320)]">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                From Handshake to <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Delivery in 3 Steps</span>
              </h2>
              <p className="text-xl text-white/70">
                No complexity. No bureaucracy. Just results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Discovery Call',
                  description: '30-min strategy session. We understand your needs, tech stack, and project pipeline.',
                  timeline: 'Day 1',
                },
                {
                  step: '02',
                  title: 'Team Assembly',
                  description: 'We match senior devs to your project. Meet your team, review profiles, approve lineup.',
                  timeline: 'Day 2-3',
                },
                {
                  step: '03',
                  title: 'Project Kickoff',
                  description: 'Team integrated into your workflow. Slack, GitHub, daily standups—seamless collaboration.',
                  timeline: 'Day 4+',
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 -translate-x-1/2" />
                  )}
                  
                  <div className="relative z-10">
                    <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/70 mb-4">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-white/80">{step.timeline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services We Deliver */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Full-Stack <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">AI & Digital Services</span>
              </h2>
              <p className="text-xl text-white/70">
                From strategy to deployment, we handle the entire technical journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'AI & Machine Learning',
                  services: ['Custom AI models', 'NLP & chatbots', 'Predictive analytics', 'Computer vision', 'AI strategy consulting'],
                },
                {
                  title: 'Web & Mobile Apps',
                  services: ['React, Vue, Next.js', 'iOS & Android native', 'Progressive Web Apps', 'E-commerce platforms', 'SaaS products'],
                },
                {
                  title: 'Cloud & DevOps',
                  services: ['AWS, Azure, GCP', 'CI/CD pipelines', 'Kubernetes & Docker', 'Infrastructure as Code', 'Security & compliance'],
                },
                {
                  title: 'Data & Automation',
                  services: ['Data pipelines', 'Business intelligence', 'Process automation', 'API integrations', 'ETL workflows'],
                },
              ].map((category, index) => (
                <div key={index} className="p-6 border-l-4 border-cyan-500">
                  <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/70">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-[oklch(0.15_0.05_320)] to-[oklch(0.12_0.05_330)]">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Transparent <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Pricing</span>
              </h2>
              <p className="text-xl text-white/70">
                No hidden fees. No surprises. Just honest, competitive rates.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Project-Based',
                  price: 'Fixed Quote',
                  description: 'Perfect for defined scope projects',
                  features: [
                    'Clear deliverables',
                    'Fixed timeline',
                    'Milestone payments',
                    'Full project management',
                  ],
                  cta: 'Get a Quote',
                },
                {
                  name: 'Team Extension',
                  price: '€3,500/mo',
                  description: 'Per senior developer',
                  features: [
                    'Dedicated team members',
                    'Flexible scaling',
                    'Your project management',
                    'Monthly billing',
                  ],
                  cta: 'Build Your Team',
                  popular: true,
                },
                {
                  name: 'Retainer',
                  price: 'Custom',
                  description: 'Ongoing partnership',
                  features: [
                    'Priority support',
                    'Reserved capacity',
                    'Strategic consulting',
                    'Volume discounts',
                  ],
                  cta: 'Discuss Retainer',
                },
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={`p-8 relative ${
                    plan.popular 
                      ? 'border-l-4 border-cyan-500 bg-gradient-to-br from-cyan-500/10 to-purple-600/10' 
                      : 'border-l-4 border-white/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">
                      {plan.price}
                    </div>
                    <p className="text-white/60">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/70">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <Button 
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-white/60 mb-4">
                💰 <strong className="text-white">Export Canada Financing:</strong> CAD $75,000 available to support your growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Agencies <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Love Working With Us</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Nukleo became our AI team overnight. We went from turning down AI projects to leading with them.",
                  author: "Sophie Laurent",
                  role: "CEO, Digital Pulse Paris",
                  metric: "3x project capacity",
                },
                {
                  quote: "40% cost savings without compromising quality. Our margins improved while client satisfaction went up.",
                  author: "Marc Dubois",
                  role: "COO, TechFlow Brussels",
                  metric: "40% margin increase",
                },
                {
                  quote: "No more hiring stress. We scale up for big projects, scale down when quiet. Total flexibility.",
                  author: "Elena Rodriguez",
                  role: "Founder, Innovate Madrid",
                  metric: "Zero turnover risk",
                },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 border-l-4 border-yellow-400">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.author}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-cyan-400">{testimonial.metric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 mb-8">
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">Ready to Scale?</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let's Build Something <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Extraordinary</span>
            </h2>

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join 32+ agencies who've transformed their business with Nukleo. Book a free strategy call today—no commitment, just insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg group">
                  Book Your Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/start-project">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Start a Project
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>No obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Response in 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <UniversalLEO pageContext="agencies" />
    </>
  );
}
