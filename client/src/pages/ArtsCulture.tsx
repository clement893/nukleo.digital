import { Link } from "wouter";
import { ArrowRight, Heart, DollarSign, Users, Megaphone } from "lucide-react";
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
      
      <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] text-white">
        <div className="grain-overlay" />
        
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">manifest</span>
              </h1>
              <p className="text-3xl md:text-4xl font-light text-white/90">
                nukleo.ART
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Intro */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 mb-16 border border-white/10">
              <h2 className="text-4xl font-bold mb-8">
                Soutenir les arts et la culture, un engagement de cœur
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Chez Nukleo, nous croyons fermement que l'industrie de l'art et culture est le cœur battant de notre société. Elle enrichit nos esprits, nourrit notre vie et renforce le vivre ensemble. En tant qu'acteurs de la transformation numérique, nous reconnaissons l'importance d'investir dans l'innovation culturelle et de soutenir les artistes, les institutions et les initiatives qui façonnent notre monde avec créativité et passion.
              </p>
            </div>

            {/* Why Arts & Culture */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8">Pourquoi les arts et la culture ?</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  La culture est le reflet de notre histoire et de notre identité. Elle est le miroir de notre passé et de notre patrimoine qui préserve notre héritage pour les générations futures. La culture inspire et contribue à notre éducation. Elle nous permet d'apprendre, nourrit notre curiosité et stimule notre créativité, agissant comme un levier qui offre une plateforme d'expression et d'innovation pour toutes les voix.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  La culture renforce les communautés et crée des liens. Elle crée des connexions entre les individus et favorise un sentiment d'appartenance, nous rassemblant autour de valeurs communes et encourageant le dialogue et l'inclusion. En investissant dans l'art et la culture, nous encourageons le dialogue, l'inclusion et la cohésion sociale.
                </p>
              </div>
            </div>

            {/* Importance Today */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-8">L'importance de soutenir la culture au Québec aujourd'hui</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  Les réductions budgétaires et la précarité des conditions de travail dans le secteur culturel ont créé des défis majeurs pour les artistes et les institutions. La fragilité du secteur culturel québécois nécessite des efforts concrets pour garantir son accessibilité et encourager son innovation.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Dans ce contexte, notre engagement à soutenir l'art et la culture est essentiel. Chez Nukleo, nous trouvons qu'il est impératif de diriger nos investissements avec discernement afin de renforcer notre croissance culturelle, car nous croyons fermement que le secteur culturel est un moteur économique et un pilier de notre identité collective. En participant activement à cette industrie, nous renforçons non seulement notre identité collective, mais nous soutenons également l'essor économique et social de notre société sur la scène locale et internationale.
                </p>
              </div>
            </div>

            {/* Our Commitments */}
            <div className="mb-16">
              <h2 className="text-5xl font-bold mb-12 text-center">Our Commitments</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Commitment 1 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <DollarSign className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold">Offer Affordable Pricing</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Aware of the financial challenges many cultural organizations face, we offer reduced rates for our services. Nukleo is committed to meeting the growing needs of the arts industry by providing accessible and tailored solutions.
                  </p>
                  <p className="text-white/90 font-medium">
                    To support artists and foster their growth, we apply a <span className="text-purple-400 font-bold">40% discount</span> on all cultural projects we take on, giving them access to high-quality digital and technological services at affordable prices.
                  </p>
                </div>

                {/* Commitment 2 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                      <Heart className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold">Provide Financial Support</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4">
                    We commit to dedicating <span className="text-pink-400 font-bold">1% of our annual revenue</span> as direct donations to cultural organizations.
                  </p>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Beyond this 1%, we're committed to structuring and organizing initiatives that mobilize investments from other entrepreneurs who share our passion for arts and culture and understand the importance of contributing to its growth.
                  </p>
                  <p className="text-white/90 font-medium">
                    Through this commitment, we aim to actively contribute to the sustainable development of the cultural sector.
                  </p>
                </div>

                {/* Commitment 3 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Users className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold">Live and Breathe Culture Every Day</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4">
                    At Nukleo, each team member has an annual budget of <span className="text-blue-400 font-bold">$350</span> dedicated to Canadian cultural outings. Shows, exhibitions, concerts, festivals: we encourage our team to immerse themselves in the cultural richness around us.
                  </p>
                  <p className="text-white/90 font-medium italic">
                    Because supporting culture starts with experiencing it.
                  </p>
                </div>

                {/* Commitment 4 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                      <Megaphone className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold">Raise Awareness & Promote</h3>
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

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20 text-center">
              <h2 className="text-4xl font-bold mb-6">Faisons grandir la culture ensemble</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Rejoignez-nous dans notre engagement pour soutenir les arts et la culture. Ensemble, nous pouvons faire une différence.
              </p>
              <Link href="/contact">
                <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-2 group">
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
