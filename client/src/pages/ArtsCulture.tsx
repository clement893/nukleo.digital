import { Link } from "wouter";
import { ArrowRight, Heart, DollarSign, Users, Megaphone, Sparkles, Award, TrendingUp } from "lucide-react";
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

  return (
    <>
      <SEO 
        title="Arts & Culture | Nukleo Digital"
        description="Our commitment to supporting arts and culture. Discover how Nukleo invests in cultural innovation and supports artists and institutions."
        keywords="arts and culture, cultural support, artist support, cultural innovation, Nukleo commitment"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] text-white overflow-hidden">
        <div className="grain-overlay" />
        
        {/* Funky animated background elements */}
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
          <div 
            className="absolute w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000"
            style={{
              top: `${50 + Math.sin(scrollY * 0.01) * 10}%`,
              left: `${50 + Math.cos(scrollY * 0.01) * 10}%`,
              animationDelay: '2s',
            }}
          />
        </div>
        
        <Header />

        {/* Hero Section - Funky */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-sm font-mono tracking-wider">NUKLEO.ART</span>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight hover:scale-105 transition-transform duration-500">
                Our{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient hover:animate-pulse">
                    Manifest
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-2xl -z-10 animate-pulse" />
                </span>
              </h1>
              
              <p 
                className="text-2xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed hover:text-white/90 transition-colors duration-300"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              >
                A heartfelt commitment to culture
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section - Funky */}
        <section className="relative py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:rotate-2 hover:scale-110 transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-125 transition-transform">40%</div>
                <div className="text-white/70 group-hover:text-white transition-colors">Discount for cultural projects</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:-rotate-2 hover:scale-110 transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                  <Heart className="w-8 h-8 group-hover:animate-pulse" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-125 transition-transform">1%</div>
                <div className="text-white/70 group-hover:text-white transition-colors">Of annual revenue as donations</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:rotate-2 hover:scale-110 transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-125 transition-transform">$350</div>
                <div className="text-white/70 group-hover:text-white transition-colors">Per employee for culture</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Intro - Funky */}
            <div className="relative mb-24">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-700">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:rotate-12 transition-transform duration-500">
                    <Heart className="w-10 h-10 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold mb-6 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
                      Supporting arts and culture, a heartfelt commitment
                    </h2>
                    <p className="text-xl text-white/80 leading-relaxed hover:text-white transition-colors duration-300">
                      At Nukleo, we firmly believe that the arts and culture industry is the beating heart of our society. It enriches our minds, nourishes our lives, and strengthens our sense of community. As actors in digital transformation, we recognize the importance of investing in cultural innovation and supporting the artists, institutions, and initiatives that shape our world with creativity and passion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Arts & Culture - Funky cards */}
            <div className="mb-24">
              <h2 className="text-5xl font-bold mb-12 text-center hover:scale-110 transition-transform duration-500">
                Why arts and culture?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group relative hover:-translate-y-4 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500 animate-pulse" />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:bg-white/15 group-hover:rotate-3 transition-all duration-500 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 group-hover:rotate-180 transition-transform duration-700">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">Heritage & Identity</h3>
                    <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors">
                      Culture is the reflection of our history and identity. It preserves our heritage for future generations.
                    </p>
                  </div>
                </div>

                <div className="group relative hover:-translate-y-4 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:bg-white/15 group-hover:-rotate-3 transition-all duration-500 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6 group-hover:rotate-180 transition-transform duration-700">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-pink-300 transition-colors">Education & Creativity</h3>
                    <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors">
                      Culture inspires and contributes to our education. It nourishes our curiosity and stimulates our creativity.
                    </p>
                  </div>
                </div>

                <div className="group relative hover:-translate-y-4 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500 animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:bg-white/15 group-hover:rotate-3 transition-all duration-500 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:rotate-180 transition-transform duration-700">
                      <Users className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors">Community & Connection</h3>
                    <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors">
                      Culture creates connections between individuals and fosters a sense of belonging and inclusion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Context Section - Funky */}
            <div className="mb-24">
              <div className="relative hover:scale-105 transition-transform duration-700">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-2xl animate-pulse" />
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center hover:rotate-12 transition-transform duration-500">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold hover:text-orange-300 transition-colors duration-300">
                      The importance of supporting culture in Quebec today
                    </h2>
                  </div>
                  
                  <div className="space-y-6 text-lg text-white/80 leading-relaxed pl-22 hover:text-white transition-colors duration-300">
                    <p>
                      Budget cuts and precarious working conditions in the cultural sector have created major challenges for artists and institutions. The fragility of Quebec's cultural sector requires concrete efforts to ensure its accessibility and encourage its innovation.
                    </p>
                    <p className="text-white/90 font-medium hover:scale-105 transition-transform duration-300 inline-block">
                      In this context, our commitment to supporting arts and culture is essential. At Nukleo, we believe it is imperative to direct our investments with discernment to strengthen our cultural growth, as we firmly believe that the cultural sector is an economic driver and a pillar of our collective identity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Commitments - Funky */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <h2 className="text-6xl font-bold mb-6 hover:scale-110 transition-transform duration-500 inline-block">
                  Our Commitments
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto hover:text-white transition-colors duration-300">
                  Four concrete commitments to actively support the cultural ecosystem
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Commitment 1 */}
                <div className="group relative hover:-translate-y-4 hover:rotate-1 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/60 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                        <DollarSign className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-purple-300 mb-1 group-hover:scale-125 transition-transform inline-block">01</div>
                        <h3 className="text-2xl font-bold group-hover:text-purple-300 transition-colors">Offer Affordable Pricing</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4 group-hover:text-white transition-colors">
                      Aware of the financial challenges many cultural organizations face, we offer reduced rates for our services. Nukleo is committed to meeting the growing needs of the arts industry by providing accessible and tailored solutions.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-purple-300 font-bold text-2xl">40%</span>
                      <span className="text-white/90">discount on cultural projects</span>
                    </div>
                  </div>
                </div>

                {/* Commitment 2 */}
                <div className="group relative hover:-translate-y-4 hover:-rotate-1 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/60 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                        <Heart className="w-8 h-8 group-hover:animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-pink-300 mb-1 group-hover:scale-125 transition-transform inline-block">02</div>
                        <h3 className="text-2xl font-bold group-hover:text-pink-300 transition-colors">Provide Financial Support</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4 group-hover:text-white transition-colors">
                      We commit to dedicating 1% of our annual revenue as direct donations to cultural organizations. Beyond this, we organize initiatives that mobilize investments from other entrepreneurs who share our passion for arts and culture.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-400/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-pink-300 font-bold text-2xl">1%</span>
                      <span className="text-white/90">of annual revenue</span>
                    </div>
                  </div>
                </div>

                {/* Commitment 3 */}
                <div className="group relative hover:-translate-y-4 hover:rotate-1 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/60 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                        <Users className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-blue-300 mb-1 group-hover:scale-125 transition-transform inline-block">03</div>
                        <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors">Live and Breathe Culture</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4 group-hover:text-white transition-colors">
                      At Nukleo, each team member has an annual budget of $350 dedicated to Canadian cultural outings. Shows, exhibitions, concerts, festivals: we encourage our team to immerse themselves in the cultural richness around us.
                    </p>
                    <p className="text-white/90 font-medium italic text-lg group-hover:scale-105 transition-transform inline-block">
                      Because supporting culture starts with experiencing it.
                    </p>
                  </div>
                </div>

                {/* Commitment 4 */}
                <div className="group relative hover:-translate-y-4 hover:-rotate-1 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 group-hover:border-white/60 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                        <Megaphone className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-green-300 mb-1 group-hover:scale-125 transition-transform inline-block">04</div>
                        <h3 className="text-2xl font-bold group-hover:text-green-300 transition-colors">Raise Awareness & Promote</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4 group-hover:text-white transition-colors">
                      We recognize the importance of culture and invite our community to actively invest in it. As cultural actors, we stay informed about contemporary issues and actively participate in cultural exchanges and initiatives.
                    </p>
                    <p className="text-white/90 font-medium group-hover:scale-105 transition-transform inline-block">
                      We are committed to promoting arts and culture both within our company and among our partners and clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section - Ultra Funky */}
            <div className="relative hover:scale-105 transition-transform duration-700">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-16 border border-white/30 hover:border-white/60 text-center overflow-hidden transition-all duration-500">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                
                <div className="relative z-10">
                  <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-400 animate-bounce" />
                  <h2 className="text-5xl font-bold mb-6 hover:scale-110 transition-transform duration-500 inline-block">
                    Let's grow culture together
                  </h2>
                  <p className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed hover:text-white transition-colors duration-300">
                    Join us in our commitment to support arts and culture. Together, we can make a difference.
                  </p>
                  <Link href="/contact">
                    <button className="group relative bg-white text-purple-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-3 hover:scale-110 hover:shadow-2xl hover:rotate-2">
                      <span>Contact Us</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300 -z-10 animate-pulse" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
