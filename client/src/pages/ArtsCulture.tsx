import { Link } from "wouter";
import { ArrowRight, Heart, DollarSign, Users, Megaphone, Sparkles, Award, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function ArtsCulture() {
  return (
    <>
      <SEO 
        title="Arts & Culture | Nukleo Digital"
        description="Our commitment to supporting arts and culture. Discover how Nukleo invests in cultural innovation and supports artists and institutions."
        keywords="arts and culture, cultural support, artist support, cultural innovation, Nukleo commitment"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] text-white overflow-hidden">
        <div className="grain-overlay" />
        
        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <Header />

        {/* Hero Section - Improved */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-sm font-mono tracking-wider">NUKLEO.ART</span>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Our{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient">
                    manifest
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl -z-10" />
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Un engagement de cœur pour la culture
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section - New */}
        <section className="relative py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">40%</div>
                <div className="text-white/70">Réduction pour projets culturels</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">1%</div>
                <div className="text-white/70">Du revenu annuel en dons</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">$350</div>
                <div className="text-white/70">Par employé pour la culture</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section - Improved */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Intro - Redesigned */}
            <div className="relative mb-24">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 hover:border-white/30 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Heart className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold mb-6">
                      Soutenir les arts et la culture, un engagement de cœur
                    </h2>
                    <p className="text-xl text-white/80 leading-relaxed">
                      Chez Nukleo, nous croyons fermement que l'industrie de l'art et culture est le cœur battant de notre société. Elle enrichit nos esprits, nourrit notre vie et renforce le vivre ensemble. En tant qu'acteurs de la transformation numérique, nous reconnaissons l'importance d'investir dans l'innovation culturelle et de soutenir les artistes, les institutions et les initiatives qui façonnent notre monde avec créativité et passion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Arts & Culture - Redesigned with cards */}
            <div className="mb-24">
              <h2 className="text-5xl font-bold mb-12 text-center">Pourquoi les arts et la culture ?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Patrimoine & Identité</h3>
                    <p className="text-white/70 leading-relaxed">
                      La culture est le reflet de notre histoire et de notre identité. Elle préserve notre héritage pour les générations futures.
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Éducation & Créativité</h3>
                    <p className="text-white/70 leading-relaxed">
                      La culture inspire et contribue à notre éducation. Elle nourrit notre curiosité et stimule notre créativité.
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                      <Users className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Communauté & Liens</h3>
                    <p className="text-white/70 leading-relaxed">
                      La culture crée des connexions entre les individus et favorise un sentiment d'appartenance et d'inclusion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Context Section - Improved */}
            <div className="mb-24">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-orange-500/20">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold">L'importance de soutenir la culture au Québec aujourd'hui</h2>
                  </div>
                  
                  <div className="space-y-6 text-lg text-white/80 leading-relaxed pl-22">
                    <p>
                      Les réductions budgétaires et la précarité des conditions de travail dans le secteur culturel ont créé des défis majeurs pour les artistes et les institutions. La fragilité du secteur culturel québécois nécessite des efforts concrets pour garantir son accessibilité et encourager son innovation.
                    </p>
                    <p className="text-white/90 font-medium">
                      Dans ce contexte, notre engagement à soutenir l'art et la culture est essentiel. Chez Nukleo, nous trouvons qu'il est impératif de diriger nos investissements avec discernement afin de renforcer notre croissance culturelle, car nous croyons fermement que le secteur culturel est un moteur économique et un pilier de notre identité collective.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Commitments - Improved */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <h2 className="text-6xl font-bold mb-6">Our Commitments</h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Quatre engagements concrets pour soutenir activement l'écosystème culturel
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Commitment 1 */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <DollarSign className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-purple-300 mb-1">01</div>
                        <h3 className="text-2xl font-bold">Offer Affordable Pricing</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4">
                      Aware of the financial challenges many cultural organizations face, we offer reduced rates for our services. Nukleo is committed to meeting the growing needs of the arts industry by providing accessible and tailored solutions.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30">
                      <span className="text-purple-300 font-bold text-2xl">40%</span>
                      <span className="text-white/90">discount on cultural projects</span>
                    </div>
                  </div>
                </div>

                {/* Commitment 2 */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Heart className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-pink-300 mb-1">02</div>
                        <h3 className="text-2xl font-bold">Provide Financial Support</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4">
                      We commit to dedicating 1% of our annual revenue as direct donations to cultural organizations. Beyond this, we organize initiatives that mobilize investments from other entrepreneurs who share our passion for arts and culture.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-400/30">
                      <span className="text-pink-300 font-bold text-2xl">1%</span>
                      <span className="text-white/90">of annual revenue</span>
                    </div>
                  </div>
                </div>

                {/* Commitment 3 */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-blue-300 mb-1">03</div>
                        <h3 className="text-2xl font-bold">Live and Breathe Culture</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4">
                      At Nukleo, each team member has an annual budget of $350 dedicated to Canadian cultural outings. Shows, exhibitions, concerts, festivals: we encourage our team to immerse themselves in the cultural richness around us.
                    </p>
                    <p className="text-white/90 font-medium italic text-lg">
                      Because supporting culture starts with experiencing it.
                    </p>
                  </div>
                </div>

                {/* Commitment 4 */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Megaphone className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-green-300 mb-1">04</div>
                        <h3 className="text-2xl font-bold">Raise Awareness & Promote</h3>
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-4">
                      Nous reconnaissons l'importance de la culture et invitons notre communauté à s'y investir activement. En tant qu'acteur de la culture, nous restons informés des enjeux contemporains et participons activement aux échanges et aux initiatives culturelles.
                    </p>
                    <p className="text-white/90 font-medium">
                      Nous nous engageons à promouvoir l'art et la culture tant au sein de notre entreprise que parmi nos partenaires et clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section - Improved */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-16 border border-white/30 text-center overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-400 animate-pulse" />
                  <h2 className="text-5xl font-bold mb-6">Faisons grandir la culture ensemble</h2>
                  <p className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Rejoignez-nous dans notre engagement pour soutenir les arts et la culture. Ensemble, nous pouvons faire une différence.
                  </p>
                  <Link href="/contact">
                    <button className="group relative bg-white text-purple-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-3 hover:scale-105 hover:shadow-2xl">
                      <span>Contact Us</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300 -z-10" />
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
