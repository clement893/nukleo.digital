import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import UniversalLEO from '@/components/UniversalLEO';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
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
  BarChart3
} from 'lucide-react';

export default function Agencies() {
  const { t, language } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  
  return (
    <>
      <SEO 
        title={t('agencies.seoTitle') || 'Partner with Nukleo | Your AI & Digital Team on Demand'}
        description={t('agencies.seoDescription') || 'Scale your agency with Nukleo\'s expert AI & digital team. 40% cost savings, zero hiring hassle, premium quality guaranteed.'}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[oklch(0.20_0.05_300)] via-[oklch(0.15_0.05_320)] to-[oklch(0.10_0.05_340)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.15_0.05_320)]/50 to-[oklch(0.15_0.05_320)]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">{t('agencies.heroBadge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('agencies.heroTitle')}{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {t('agencies.heroTitleHighlight')}
              </span>
              <br />
              {t('agencies.heroSubtitle')}
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('agencies.heroDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href={getLocalizedPath('/start-project')}>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg group">
                  {t('agencies.ctaButton1')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={getLocalizedPath('/contact')}>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  {t('agencies.ctaButton2')}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '40%', label: t('agencies.stats.costSavings') },
                { value: '< 48h', label: t('agencies.stats.teamReady') },
                { value: '98%', label: t('agencies.stats.onTimeDelivery') },
                { value: '€1M', label: t('agencies.stats.insuredProjects') },
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

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-b from-[oklch(0.15_0.05_320)] to-[oklch(0.12_0.05_330)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {t('agencies.problemTitle')} <span className="text-red-400">{t('agencies.problemTitleHighlight')}</span>
              </h2>
              <p className="text-xl text-white/70">
                {t('agencies.problemSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: t('agencies.problems.hiring.title'),
                  description: t('agencies.problems.hiring.description'),
                },
                {
                  icon: TrendingUp,
                  title: t('agencies.problems.demand.title'),
                  description: t('agencies.problems.demand.description'),
                },
                {
                  icon: DollarSign,
                  title: t('agencies.problems.margins.title'),
                  description: t('agencies.problems.margins.description'),
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
                <span className="text-sm font-medium text-white">{t('agencies.solutionBadge')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('agencies.solutionTitle')} <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{t('agencies.solutionTitleHighlight')}</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                {t('agencies.solutionDescription')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  icon: Zap,
                  title: t('agencies.benefits.deploy.title'),
                  description: t('agencies.benefits.deploy.description'),
                  highlight: t('agencies.benefits.deploy.highlight'),
                },
                {
                  icon: DollarSign,
                  title: t('agencies.benefits.save.title'),
                  description: t('agencies.benefits.save.description'),
                  highlight: t('agencies.benefits.save.highlight'),
                },
                {
                  icon: Users,
                  title: t('agencies.benefits.scale.title'),
                  description: t('agencies.benefits.scale.description'),
                  highlight: t('agencies.benefits.scale.highlight'),
                },
                {
                  icon: Shield,
                  title: t('agencies.benefits.insurance.title'),
                  description: t('agencies.benefits.insurance.description'),
                  highlight: t('agencies.benefits.insurance.highlight'),
                },
                {
                  icon: Target,
                  title: t('agencies.benefits.experts.title'),
                  description: t('agencies.benefits.experts.description'),
                  highlight: t('agencies.benefits.experts.highlight'),
                },
                {
                  icon: Clock,
                  title: t('agencies.benefits.hours.title'),
                  description: t('agencies.benefits.hours.description'),
                  highlight: t('agencies.benefits.hours.highlight'),
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

            <div className="text-center">
              <Link href={getLocalizedPath('/contact')}>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg group">
                  {t('agencies.ctaHelp')}
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
                {t('agencies.howItWorksTitle')} <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{t('agencies.howItWorksTitleHighlight')}</span>
              </h2>
              <p className="text-xl text-white/70">
                {t('agencies.howItWorksSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: t('agencies.steps.discovery.step'),
                  title: t('agencies.steps.discovery.title'),
                  description: t('agencies.steps.discovery.description'),
                  timeline: t('agencies.steps.discovery.timeline'),
                },
                {
                  step: t('agencies.steps.assembly.step'),
                  title: t('agencies.steps.assembly.title'),
                  description: t('agencies.steps.assembly.description'),
                  timeline: t('agencies.steps.assembly.timeline'),
                },
                {
                  step: t('agencies.steps.kickoff.step'),
                  title: t('agencies.steps.kickoff.title'),
                  description: t('agencies.steps.kickoff.description'),
                  timeline: t('agencies.steps.kickoff.timeline'),
                },
              ].map((step, index) => (
                <div key={index} className="relative">
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

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('agencies.servicesTitle')} <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{t('agencies.servicesTitleHighlight')}</span>
              </h2>
              <p className="text-xl text-white/70">
                {t('agencies.servicesSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: t('agencies.serviceCategories.ai.title'),
                  services: (t('agencies.serviceCategories.ai.services', { returnObjects: true }) as string[] || []),
                },
                {
                  title: t('agencies.serviceCategories.web.title'),
                  services: (t('agencies.serviceCategories.web.services', { returnObjects: true }) as string[] || []),
                },
                {
                  title: t('agencies.serviceCategories.cloud.title'),
                  services: (t('agencies.serviceCategories.cloud.services', { returnObjects: true }) as string[] || []),
                },
                {
                  title: t('agencies.serviceCategories.data.title'),
                  services: (t('agencies.serviceCategories.data.services', { returnObjects: true }) as string[] || []),
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
                {t('agencies.pricingTitle')} <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{t('agencies.pricingTitleHighlight')}</span>
              </h2>
              <p className="text-xl text-white/70">
                {t('agencies.pricingSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: t('agencies.pricingPlans.project.name'),
                  price: t('agencies.pricingPlans.project.price'),
                  description: t('agencies.pricingPlans.project.description'),
                  features: (t('agencies.pricingPlans.project.features', { returnObjects: true }) as string[] || []),
                  cta: t('agencies.pricingPlans.project.cta'),
                },
                {
                  name: t('agencies.pricingPlans.extension.name'),
                  price: t('agencies.pricingPlans.extension.price'),
                  description: t('agencies.pricingPlans.extension.description'),
                  features: (t('agencies.pricingPlans.extension.features', { returnObjects: true }) as string[] || []),
                  cta: t('agencies.pricingPlans.extension.cta'),
                  popular: true,
                },
                {
                  name: t('agencies.pricingPlans.retainer.name'),
                  price: t('agencies.pricingPlans.retainer.price'),
                  description: t('agencies.pricingPlans.retainer.description'),
                  features: (t('agencies.pricingPlans.retainer.features', { returnObjects: true }) as string[] || []),
                  cta: t('agencies.pricingPlans.retainer.cta'),
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
                      {language === 'fr' ? 'Le Plus Populaire' : 'Most Popular'}
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

                  <Link href={getLocalizedPath('/contact')}>
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
                {t('agencies.pricingNote')}
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
                {t('agencies.testimonialsTitle')} <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{t('agencies.testimonialsTitleHighlight')}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: t('agencies.testimonials.sophie.quote'),
                  author: t('agencies.testimonials.sophie.author'),
                  role: t('agencies.testimonials.sophie.role'),
                  metric: t('agencies.testimonials.sophie.metric'),
                },
                {
                  quote: t('agencies.testimonials.marc.quote'),
                  author: t('agencies.testimonials.marc.author'),
                  role: t('agencies.testimonials.marc.role'),
                  metric: t('agencies.testimonials.marc.metric'),
                },
                {
                  quote: t('agencies.testimonials.elena.quote'),
                  author: t('agencies.testimonials.elena.author'),
                  role: t('agencies.testimonials.elena.role'),
                  metric: t('agencies.testimonials.elena.metric'),
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
              <span className="text-sm font-medium text-white">{t('agencies.finalCtaBadge')}</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('agencies.finalCtaTitle')} <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">{t('agencies.finalCtaTitleHighlight')}</span>
            </h2>

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              {t('agencies.finalCtaDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href={getLocalizedPath('/contact')}>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg group">
                  {t('agencies.finalCtaButton1')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={getLocalizedPath('/start-project')}>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  {t('agencies.finalCtaButton2')}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>{t('agencies.finalCtaFeatures.free')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>{t('agencies.finalCtaFeatures.noObligation')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>{t('agencies.finalCtaFeatures.response')}</span>
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
