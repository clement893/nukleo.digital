import { Link } from "wouter";
import { ArrowRight, Heart, DollarSign, Users, Megaphone, Sparkles, Award, TrendingUp, Quote, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function ArtsCulture() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

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
        title="Arts & Culture | Nukleo Digital"
        description="Our commitment to supporting arts and culture. Discover how Nukleo invests in cultural innovation and supports artists and institutions."
        keywords="arts and culture, cultural support, artist support, cultural innovation, Nukleo commitment"
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
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-mono tracking-wider">NUKLEO.ART</span>
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight hover:scale-105 transition-transform duration-300">
                Culture is{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient">
                  Our Heartbeat
                </span>
              </h1>
              
              <p 
                className="text-2xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed hover:text-white/90 transition-colors duration-300"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              >
                A story of commitment, action, and impact
              </p>
            </div>
          </div>
        </section>

        {/* ACT 1: THE CHALLENGE */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border border-red-400/30 mb-6">
                <Zap className="w-5 h-5 text-red-400" />
                <span className="text-sm font-mono tracking-wider text-red-300">ACT I: THE CHALLENGE</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Culture is in{' '}
                <span className="text-red-400">Crisis</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 h-full">
                  <div className="text-6xl font-bold text-red-400 mb-4">📉</div>
                  <h3 className="text-2xl font-bold mb-4">Budget Cuts</h3>
                  <p className="text-white/80 leading-relaxed">
                    Drastic funding reductions are forcing artists and cultural institutions to make impossible choices between survival and creation.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 h-full">
                  <div className="text-6xl font-bold text-orange-400 mb-4">⚠️</div>
                  <h3 className="text-2xl font-bold mb-4">Precarious Conditions</h3>
                  <p className="text-white/80 leading-relaxed">
                    Artists face unstable income, lack of benefits, and uncertain futures—making it harder to focus on what they do best: creating.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="relative group hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-red-500/30 hover:border-red-500/50 transition-all duration-300">
                <Quote className="w-12 h-12 text-red-400 mb-6 opacity-50" />
                <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed italic mb-6">
                  "The fragility of Quebec's cultural sector requires concrete efforts to ensure its accessibility and encourage its innovation."
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-orange-400 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ACT 2: OUR BELIEF */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/20 border border-purple-400/30 mb-6">
                <Heart className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-mono tracking-wider text-purple-300">ACT II: OUR BELIEF</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Culture is{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Essential
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                At Nukleo, we believe culture is the beating heart of society—enriching minds, nourishing lives, and strengthening communities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group relative hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="text-5xl mb-6">🏛️</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">Heritage</h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors">
                    Culture preserves our history and identity for future generations.
                  </p>
                </div>
              </div>

              <div className="group relative hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="text-5xl mb-6">💡</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-pink-300 transition-colors">Creativity</h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors">
                    Culture inspires education and stimulates innovation.
                  </p>
                </div>
              </div>

              <div className="group relative hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="text-5xl mb-6">🤝</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors">Community</h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors">
                    Culture creates connections and fosters belonging.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="relative group hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
                <Quote className="w-12 h-12 text-purple-400 mb-6 opacity-50" />
                <p className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed italic mb-6">
                  "We believe it is imperative to direct our investments with discernment to strengthen our cultural growth, as the cultural sector is an economic driver and a pillar of our collective identity."
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ACT 3: OUR ACTION */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 border border-green-400/30 mb-6">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm font-mono tracking-wider text-green-300">ACT III: OUR ACTION</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Four{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  Concrete Commitments
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                We don't just talk about supporting culture—we act on it every day.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-green-500" />

              {/* Commitment 1 */}
              <div className="relative mb-16 md:grid md:grid-cols-2 md:gap-16">
                <div className="md:text-right mb-8 md:mb-0">
                  <div className="inline-block md:float-right">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6 md:flex-row-reverse md:justify-end">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/50 to-pink-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                            <DollarSign className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="text-sm font-mono text-purple-300 mb-1">01</div>
                            <h3 className="text-2xl font-bold">Affordable Pricing</h3>
                          </div>
                        </div>
                        <p className="text-white/80 leading-relaxed mb-4">
                          We offer <strong className="text-purple-300">40% discount</strong> on our services for cultural organizations, making digital transformation accessible to those who need it most.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 rounded-full bg-purple-500 border-4 border-[rgb(107,23,22)] z-10" />
                </div>
              </div>

              {/* Commitment 2 */}
              <div className="relative mb-16 md:grid md:grid-cols-2 md:gap-16">
                <div className="md:col-start-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600/20 to-orange-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/50 to-orange-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <Heart className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-sm font-mono text-pink-300 mb-1">02</div>
                          <h3 className="text-2xl font-bold">Financial Support</h3>
                        </div>
                      </div>
                      <p className="text-white/80 leading-relaxed mb-4">
                        We dedicate <strong className="text-pink-300">1% of our annual revenue</strong> as direct donations to cultural organizations, and mobilize other entrepreneurs to join us.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 rounded-full bg-pink-500 border-4 border-[rgb(107,23,22)] z-10" />
                </div>
              </div>

              {/* Commitment 3 */}
              <div className="relative mb-16 md:grid md:grid-cols-2 md:gap-16">
                <div className="md:text-right mb-8 md:mb-0">
                  <div className="inline-block md:float-right">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6 md:flex-row-reverse md:justify-end">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/50 to-purple-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                            <Users className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="text-sm font-mono text-blue-300 mb-1">03</div>
                            <h3 className="text-2xl font-bold">Live Culture</h3>
                          </div>
                        </div>
                        <p className="text-white/80 leading-relaxed mb-4">
                          Each team member receives <strong className="text-blue-300">$350 annually</strong> for Canadian cultural outings. Because supporting culture starts with experiencing it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 rounded-full bg-blue-500 border-4 border-[rgb(107,23,22)] z-10" />
                </div>
              </div>

              {/* Commitment 4 */}
              <div className="relative md:grid md:grid-cols-2 md:gap-16">
                <div className="md:col-start-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/50 to-teal-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <Megaphone className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-sm font-mono text-green-300 mb-1">04</div>
                          <h3 className="text-2xl font-bold">Raise Awareness</h3>
                        </div>
                      </div>
                      <p className="text-white/80 leading-relaxed mb-4">
                        We actively promote arts and culture within our company, among partners, and in our community—staying informed and engaged with contemporary cultural issues.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 rounded-full bg-green-500 border-4 border-[rgb(107,23,22)] z-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACT 4: THE IMPACT */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-yellow-500/20 border border-yellow-400/30 mb-6">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-mono tracking-wider text-yellow-300">ACT IV: THE IMPACT</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Join the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Movement
                </span>
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">40%</div>
                <div className="text-white/70 group-hover:text-white transition-colors">Discount for cultural projects</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500/50 to-orange-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">1%</div>
                <div className="text-white/70 group-hover:text-white transition-colors">Of annual revenue as donations</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-500/50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">$350</div>
                <div className="text-white/70 group-hover:text-white transition-colors">Per employee for culture</div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative hover:scale-102 transition-transform duration-300 group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-16 border border-white/30 hover:border-white/50 text-center transition-all duration-300">
                <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-400" />
                <h2 className="text-5xl font-bold mb-6 hover:scale-105 transition-transform duration-300 inline-block">
                  Let's grow culture together
                </h2>
                <p className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed hover:text-white transition-colors duration-300">
                  Whether you're an artist, cultural organization, or fellow entrepreneur—join us in making a real difference.
                </p>
                <Link href="/contact">
                  <button className="group/btn relative bg-white text-purple-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-3 hover:scale-105 hover:shadow-2xl">
                    <span>Start the Conversation</span>
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </div>
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
