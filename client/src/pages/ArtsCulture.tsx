import { Link } from "wouter";
import { ArrowRight, Heart, DollarSign, Users, Megaphone, Sparkles, Award, TrendingUp, Quote, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SafeHTML from "@/components/SafeHTML";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function ArtsCulture() {
  const { t } = useLanguage();
  const getLocalizedPath = useLocalizedPath();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <>
      <SEO 
        title={t('artsCultureCommitment.seoTitle')}
        description={t('artsCultureCommitment.seoDescription')}
        keywords={t('artsCultureCommitment.seoKeywords')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] text-white overflow-hidden relative">
        <div className="grain-overlay" />
        
        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animation: `float ${particle.duration}s infinite ease-in-out`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Rotating Hexagons */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute w-64 h-64 opacity-10"
            style={{
              top: '20%',
              left: '10%',
              animation: 'spin 20s linear infinite',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50 1 95 25 95 75 50 99 5 75 5 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-purple-400"
              />
              <polygon
                points="50 10 85 30 85 70 50 90 15 70 15 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-pink-400"
              />
            </svg>
          </div>

          <div 
            className="absolute w-48 h-48 opacity-10"
            style={{
              top: '60%',
              right: '15%',
              animation: 'spin 15s linear infinite reverse',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50 1 95 25 95 75 50 99 5 75 5 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-400"
              />
            </svg>
          </div>

          <div 
            className="absolute w-56 h-56 opacity-10"
            style={{
              bottom: '10%',
              left: '50%',
              animation: 'spin 25s linear infinite',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50 1 95 25 95 75 50 99 5 75 5 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-orange-400"
              />
              <polygon
                points="50 15 80 32 80 68 50 85 20 68 20 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-yellow-400"
              />
            </svg>
          </div>
        </div>
        
        {/* Subtle animated background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000"
            style={{
              top: `${20 + scrollY * 0.05}%`,
              left: `${10 + mousePosition.x * 0.01}%`,
            }}
          />
          <div 
            className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000" 
            style={{ 
              animationDelay: '1s',
              bottom: `${20 + scrollY * 0.03}%`,
              right: `${10 + mousePosition.y * 0.01}%`,
            }}
          />
        </div>
        
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 group hover:border-white/20 transition-colors cursor-default">
                <Sparkles className="w-4 h-4 text-white/60 group-hover:animate-spin" />
                <span className="text-xs font-mono tracking-wider text-white/60">{t('artsCultureCommitment.hero.badge')}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t('artsCultureCommitment.hero.title')}{' '}
                <span className="relative inline-block">
                  <span className="text-white/90">{t('artsCultureCommitment.hero.titleHighlight')}</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-white/30" />
                  </svg>
                </span>
              </h1>
              
              <SafeHTML html={t('artsCultureCommitment.hero.subtitle')} tag="p" className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed" />
            </div>
          </div>
        </section>

        {/* ACT 1: THE CHALLENGE */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-16 text-center relative">
              {/* Sharp geometric accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-white/0 to-white/20" />
              
              <div className="inline-block mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">{t('artsCultureCommitment.act1.label')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t('artsCultureCommitment.act1.title')} <span className="font-light italic">{t('artsCultureCommitment.act1.titleHighlight')}</span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                {t('artsCultureCommitment.act1.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div 
                className="group relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-red-400/30 transition-all duration-300 cursor-default overflow-hidden"
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Sharp corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-red-400/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />
                </div>
                
                <div className="text-4xl mb-4 inline-block group-hover:animate-bounce">📉</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-red-300 transition-colors">{t('artsCultureCommitment.act1.budgetCuts.title')}</h3>
                <SafeHTML html={t('artsCultureCommitment.act1.budgetCuts.description')} tag="p" className="text-white/70 leading-relaxed" />
                
                {/* Reveal on hover */}
                <div className={`mt-4 text-sm text-red-300/80 italic transition-opacity duration-300 ${hoveredCard === 1 ? 'opacity-100' : 'opacity-0'}`}>
                  {t('artsCultureCommitment.act1.budgetCuts.hover')}
                </div>
              </div>

              <div 
                className="group relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-orange-400/30 transition-all duration-300 cursor-default overflow-hidden"
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Sharp corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-orange-400/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />
                </div>
                
                <div className="text-4xl mb-4 inline-block group-hover:animate-bounce">⚠️</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-300 transition-colors">{t('artsCultureCommitment.act1.precariousConditions.title')}</h3>
                <SafeHTML html={t('artsCultureCommitment.act1.precariousConditions.description')} tag="p" className="text-white/70 leading-relaxed" />
                
                {/* Reveal on hover */}
                <div className={`mt-4 text-sm text-orange-300/80 italic transition-opacity duration-300 ${hoveredCard === 2 ? 'opacity-100' : 'opacity-0'}`}>
                  {t('artsCultureCommitment.act1.precariousConditions.hover')}
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="relative group bg-white/5 rounded-2xl p-10 border border-white/10 hover:border-white/20 transition-colors cursor-default">
              {/* Diagonal accent line */}
              <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-red-400/50 to-transparent" />
              
              <Quote className="w-8 h-8 text-white/30 mb-4 group-hover:text-white/40 transition-colors" />
              <SafeHTML html={t('artsCultureCommitment.act1.quote')} tag="p" className="text-xl text-white/90 leading-relaxed italic" />
            </div>
          </div>
        </section>

        {/* ACT 2: OUR BELIEF */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-16 text-center relative">
              {/* Sharp geometric accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-white/0 to-white/20" />
              
              <div className="inline-block mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">{t('artsCultureCommitment.act2.label')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t('artsCultureCommitment.act2.title')} <span className="font-light italic">{t('artsCultureCommitment.act2.titleHighlight')}</span>
              </h2>
              <SafeHTML html={t('artsCultureCommitment.act2.subtitle')} tag="p" className="text-lg text-white/60 max-w-2xl mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="group relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-300 cursor-default">
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 group-hover:border-purple-400/30 transition-colors" />
                
                <div className="text-4xl mb-4 inline-block group-hover:scale-[1.045] transition-transform">🏛️</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">{t('artsCultureCommitment.act2.heritage.title')}</h3>
                <SafeHTML html={t('artsCultureCommitment.act2.heritage.description')} tag="p" className="text-white/70 leading-relaxed" />
              </div>

              <div className="group relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-pink-400/30 transition-all duration-300 cursor-default">
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 group-hover:border-pink-400/30 transition-colors" />
                
                <div className="text-4xl mb-4 inline-block group-hover:scale-[1.045] transition-transform">💡</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-300 transition-colors">{t('artsCultureCommitment.act2.creativity.title')}</h3>
                <SafeHTML html={t('artsCultureCommitment.act2.creativity.description')} tag="p" className="text-white/70 leading-relaxed" />
              </div>

              <div className="group relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-default">
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 group-hover:border-blue-400/30 transition-colors" />
                
                <div className="text-4xl mb-4 inline-block group-hover:scale-[1.045] transition-transform">🤝</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors">{t('artsCultureCommitment.act2.community.title')}</h3>
                <SafeHTML html={t('artsCultureCommitment.act2.community.description')} tag="p" className="text-white/70 leading-relaxed" />
              </div>
            </div>

            {/* Quote Block */}
            <div className="relative group bg-white/5 rounded-2xl p-10 border border-white/10 hover:border-white/20 transition-colors cursor-default">
              <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-purple-400/50 to-transparent" />
              
              <Quote className="w-8 h-8 text-white/30 mb-4 group-hover:text-white/40 transition-colors" />
              <SafeHTML html={t('artsCultureCommitment.act2.quote')} tag="p" className="text-xl text-white/90 leading-relaxed italic" />
            </div>
          </div>
        </section>

        {/* ACT 3: OUR ACTION */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-16 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-white/0 to-white/20" />
              
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">{t('artsCultureCommitment.act3.label')}</span>
                <Zap className="w-4 h-4 text-yellow-400/60 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t('artsCultureCommitment.act3.title')} <span className="font-light italic">{t('artsCultureCommitment.act3.titleHighlight')}</span>
              </h2>
              <SafeHTML html={t('artsCultureCommitment.act3.subtitle')} tag="p" className="text-lg text-white/60 max-w-2xl mx-auto" />
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              {/* Commitment 1 */}
              <div className="group relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden group-hover:scale-[1.045] transition-transform">
                  <span className="text-xs font-mono text-white/60">01</span>
                </div>
                <div className="relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-green-400/30 transition-all duration-300 overflow-hidden">
                  {/* Diagonal accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-full h-full bg-green-400/5 transform rotate-45 translate-x-16 -translate-y-16" />
                  </div>
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center group-hover:bg-green-400/10 transition-colors">
                      <DollarSign className="w-6 h-6 group-hover:scale-[1.045] transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">01</span>
                        <h3 className="text-2xl font-semibold group-hover:text-green-300 transition-colors">{t('artsCultureCommitment.act3.affordablePricing.title')}</h3>
                      </div>
                      <SafeHTML html={t('artsCultureCommitment.act3.affordablePricing.description')} tag="p" className="text-white/70 leading-relaxed" />
                      <div className="mt-4 text-sm text-green-300/60 italic group-hover:text-green-300/80 transition-colors">
                        {t('artsCultureCommitment.act3.affordablePricing.hover')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitment 2 */}
              <div className="group relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden group-hover:scale-[1.045] transition-transform">
                  <span className="text-xs font-mono text-white/60">02</span>
                </div>
                <div className="relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-red-400/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-full h-full bg-red-400/5 transform rotate-45 translate-x-16 -translate-y-16" />
                  </div>
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center group-hover:bg-red-400/10 transition-colors">
                      <Heart className="w-6 h-6 group-hover:scale-[1.045] group-hover:animate-pulse transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">02</span>
                        <h3 className="text-2xl font-semibold group-hover:text-red-300 transition-colors">{t('artsCultureCommitment.act3.financialSupport.title')}</h3>
                      </div>
                      <SafeHTML html={t('artsCultureCommitment.act3.financialSupport.description')} tag="p" className="text-white/70 leading-relaxed" />
                      <div className="mt-4 text-sm text-red-300/60 italic group-hover:text-red-300/80 transition-colors">
                        {t('artsCultureCommitment.act3.financialSupport.hover')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitment 3 */}
              <div className="group relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden group-hover:scale-[1.045] transition-transform">
                  <span className="text-xs font-mono text-white/60">03</span>
                </div>
                <div className="relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-full h-full bg-blue-400/5 transform rotate-45 translate-x-16 -translate-y-16" />
                  </div>
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center group-hover:bg-blue-400/10 transition-colors">
                      <Users className="w-6 h-6 group-hover:scale-[1.045] transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">03</span>
                        <h3 className="text-2xl font-semibold group-hover:text-blue-300 transition-colors">{t('artsCultureCommitment.act3.liveCulture.title')}</h3>
                      </div>
                      <SafeHTML html={t('artsCultureCommitment.act3.liveCulture.description')} tag="p" className="text-white/70 leading-relaxed" />
                      <div className="mt-4 text-sm text-blue-300/60 italic group-hover:text-blue-300/80 transition-colors">
                        {t('artsCultureCommitment.act3.liveCulture.hover')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitment 4 */}
              <div className="group relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden group-hover:scale-[1.045] transition-transform">
                  <span className="text-xs font-mono text-white/60">04</span>
                </div>
                <div className="relative bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-full h-full bg-purple-400/5 transform rotate-45 translate-x-16 -translate-y-16" />
                  </div>
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center group-hover:bg-purple-400/10 transition-colors">
                      <Megaphone className="w-6 h-6 group-hover:scale-[1.045] transition-transform" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">04</span>
                        <h3 className="text-2xl font-semibold group-hover:text-purple-300 transition-colors">{t('artsCultureCommitment.act3.raiseAwareness.title')}</h3>
                      </div>
                      <SafeHTML html={t('artsCultureCommitment.act3.raiseAwareness.description')} tag="p" className="text-white/70 leading-relaxed" />
                      <div className="mt-4 text-sm text-purple-300/60 italic group-hover:text-purple-300/80 transition-colors">
                        {t('artsCultureCommitment.act3.raiseAwareness.hover')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACT 4: THE IMPACT */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-16 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-white/0 to-white/20" />
              
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">{t('artsCultureCommitment.act4.label')}</span>
                <Target className="w-4 h-4 text-green-400/60" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t('artsCultureCommitment.act4.title')} <span className="font-light italic">{t('artsCultureCommitment.act4.titleHighlight')}</span>
              </h2>
              <SafeHTML html={t('artsCultureCommitment.act4.subtitle')} tag="p" className="text-lg text-white/60 max-w-2xl mx-auto" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="group text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400/30 transition-all duration-300 cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-green-400/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-green-400/10 transition-colors">
                  <Award className="w-6 h-6 group-hover:scale-[1.045] transition-transform" />
                </div>
                <div className="text-5xl font-bold mb-2 group-hover:text-green-300 transition-colors">40%</div>
                <div className="text-white/60 text-sm">{t('artsCultureCommitment.act4.stats.discount')}</div>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/30 transition-all duration-300 cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-red-400/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-red-400/10 transition-colors">
                  <Heart className="w-6 h-6 group-hover:scale-[1.045] group-hover:animate-pulse transition-transform" />
                </div>
                <div className="text-5xl font-bold mb-2 group-hover:text-red-300 transition-colors">1%</div>
                <div className="text-white/60 text-sm">{t('artsCultureCommitment.act4.stats.donations')}</div>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-blue-400/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-400/10 transition-colors">
                  <TrendingUp className="w-6 h-6 group-hover:scale-[1.045] transition-transform" />
                </div>
                <div className="text-5xl font-bold mb-2 group-hover:text-blue-300 transition-colors">$350</div>
                <div className="text-white/60 text-sm">{t('artsCultureCommitment.act4.stats.perEmployee')}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative group bg-white/5 rounded-2xl p-12 border border-white/10 hover:border-white/20 transition-colors text-center overflow-hidden">
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20 group-hover:border-white/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20 group-hover:border-white/40 transition-colors" />
              
              <Sparkles className="w-10 h-10 mx-auto mb-6 text-white/60 group-hover:animate-spin" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('artsCultureCommitment.act4.cta.title')} <span className="font-light italic">{t('artsCultureCommitment.act4.cta.titleHighlight')}</span>
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('artsCultureCommitment.act4.cta.description')}
              </p>
              <Link href={getLocalizedPath('/contact')}>
                <button className="group/btn bg-white text-[rgb(107,23,22)] px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all inline-flex items-center gap-2 hover:gap-3">
                  <span>{t('artsCultureCommitment.act4.cta.button')}</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </>
  );
}
