import { Link } from "wouter";
import { ArrowRight, Heart, DollarSign, Users, Megaphone, Sparkles, Award, TrendingUp, Quote } from "lucide-react";
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
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="w-4 h-4 text-white/60" />
                <span className="text-xs font-mono tracking-wider text-white/60">NUKLEO.ART</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Culture is Our{' '}
                <span className="text-white/90">Heartbeat</span>
              </h1>
              
              <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                A story of commitment, action, and impact
              </p>
            </div>
          </div>
        </section>

        {/* ACT 1: THE CHALLENGE */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <div className="inline-block mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">ACT I</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                The Challenge
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Culture is facing unprecedented challenges
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">📉</div>
                <h3 className="text-xl font-semibold mb-3">Budget Cuts</h3>
                <p className="text-white/70 leading-relaxed">
                  Drastic funding reductions are forcing artists and cultural institutions to make impossible choices between survival and creation.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-3">Precarious Conditions</h3>
                <p className="text-white/70 leading-relaxed">
                  Artists face unstable income, lack of benefits, and uncertain futures—making it harder to focus on what they do best: creating.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="bg-white/5 rounded-2xl p-10 border border-white/10">
              <Quote className="w-8 h-8 text-white/30 mb-4" />
              <p className="text-xl text-white/90 leading-relaxed italic">
                "The fragility of Quebec's cultural sector requires concrete efforts to ensure its accessibility and encourage its innovation."
              </p>
            </div>
          </div>
        </section>

        {/* ACT 2: OUR BELIEF */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <div className="inline-block mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">ACT II</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Belief
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                At Nukleo, we believe culture is the beating heart of society—enriching minds, nourishing lives, and strengthening communities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-xl font-semibold mb-3">Heritage</h3>
                <p className="text-white/70 leading-relaxed">
                  Culture preserves our history and identity for future generations.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-3">Creativity</h3>
                <p className="text-white/70 leading-relaxed">
                  Culture inspires education and stimulates innovation.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-white/70 leading-relaxed">
                  Culture creates connections and fosters belonging.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="bg-white/5 rounded-2xl p-10 border border-white/10">
              <Quote className="w-8 h-8 text-white/30 mb-4" />
              <p className="text-xl text-white/90 leading-relaxed italic">
                "We believe it is imperative to direct our investments with discernment to strengthen our cultural growth, as the cultural sector is an economic driver and a pillar of our collective identity."
              </p>
            </div>
          </div>
        </section>

        {/* ACT 3: OUR ACTION */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <div className="inline-block mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">ACT III</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Action
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                We don't just talk about supporting culture—we act on it every day.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-12">
              {/* Commitment 1 */}
              <div className="relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden">
                  <span className="text-xs font-mono text-white/60">01</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">01</span>
                        <h3 className="text-2xl font-semibold">Affordable Pricing</h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        We offer <strong className="text-white/90">40% discount</strong> on our services for cultural organizations, making digital transformation accessible to those who need it most.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitment 2 */}
              <div className="relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden">
                  <span className="text-xs font-mono text-white/60">02</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">02</span>
                        <h3 className="text-2xl font-semibold">Financial Support</h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        We dedicate <strong className="text-white/90">1% of our annual revenue</strong> as direct donations to cultural organizations, and mobilize other entrepreneurs to join us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitment 3 */}
              <div className="relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden">
                  <span className="text-xs font-mono text-white/60">03</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">03</span>
                        <h3 className="text-2xl font-semibold">Live Culture</h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        Each team member receives <strong className="text-white/90">$350 annually</strong> for Canadian cultural outings. Because supporting culture starts with experiencing it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitment 4 */}
              <div className="relative pl-12 md:pl-0">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center md:hidden">
                  <span className="text-xs font-mono text-white/60">04</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 items-center justify-center">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="hidden md:inline text-sm font-mono text-white/40">04</span>
                        <h3 className="text-2xl font-semibold">Raise Awareness</h3>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        We actively promote arts and culture within our company, among partners, and in our community—staying informed and engaged with contemporary cultural issues.
                      </p>
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
            <div className="mb-16 text-center">
              <div className="inline-block mb-4">
                <span className="text-sm font-mono tracking-wider text-white/40">ACT IV</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                The Impact
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Join us in making a real difference
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-4xl font-bold mb-2">40%</div>
                <div className="text-white/60 text-sm">Discount for cultural projects</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="text-4xl font-bold mb-2">1%</div>
                <div className="text-white/60 text-sm">Of annual revenue as donations</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-4xl font-bold mb-2">$350</div>
                <div className="text-white/60 text-sm">Per employee for culture</div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white/5 rounded-2xl p-12 border border-white/10 text-center">
              <Sparkles className="w-10 h-10 mx-auto mb-6 text-white/60" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's grow culture together
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you're an artist, cultural organization, or fellow entrepreneur—join us in making a real difference.
              </p>
              <Link href="/contact">
                <button className="bg-white text-[rgb(107,23,22)] px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                  <span>Start the Conversation</span>
                  <ArrowRight className="w-5 h-5" />
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
