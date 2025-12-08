import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ArtsCulture() {
  return (
    <>
      <SEO 
        title="Arts & Culture | Nukleo Digital"
        description="Explore how Nukleo Digital bridges technology and creativity. Discover our commitment to arts, culture, and innovation in the AI transformation space."
        keywords="AI and arts, technology and culture, creative AI, digital innovation, cultural transformation"
      />
      
      <Header />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-sm font-mono text-white/70">01 — Arts & Culture</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Where Technology Meets{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Creativity
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
                At Nukleo, we believe that the future of AI is not just technical—it's cultural. 
                We explore the intersection of artificial intelligence, human creativity, and societal impact.
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-24 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Vision</h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Innovation Through Art</h3>
                    <p className="text-white/70 leading-relaxed">
                      We champion projects that use AI to push creative boundaries, from generative art to 
                      AI-assisted music composition and interactive storytelling.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Cultural Impact</h3>
                    <p className="text-white/70 leading-relaxed">
                      We study and shape how AI transforms cultural production, consumption, and preservation. 
                      Our work considers ethical implications and societal benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Initiatives Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Initiatives</h2>
              
              <div className="space-y-8">
                {/* Initiative 1 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">01</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">AI Art Residency Program</h3>
                      <p className="text-white/70 leading-relaxed mb-4">
                        We partner with artists, musicians, and creators to explore AI as a creative medium. 
                        Our residency program provides resources, mentorship, and technical infrastructure 
                        for groundbreaking projects at the intersection of art and technology.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">Generative Art</span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">Music AI</span>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Interactive Media</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Initiative 2 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">02</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Cultural Heritage Preservation</h3>
                      <p className="text-white/70 leading-relaxed mb-4">
                        We develop AI solutions to digitize, preserve, and make accessible cultural artifacts, 
                        historical documents, and endangered languages. Technology serves humanity's collective memory.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">Digital Archives</span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">Language AI</span>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">3D Reconstruction</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Initiative 3 */}
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">03</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">Ethics & Society Forum</h3>
                      <p className="text-white/70 leading-relaxed mb-4">
                        We host regular discussions, workshops, and publications exploring the ethical, 
                        philosophical, and societal dimensions of AI. Bringing together technologists, 
                        artists, ethicists, and policymakers.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">AI Ethics</span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">Policy</span>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">Community</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-purple-950 opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Join the Conversation
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Whether you're an artist, researcher, or simply curious about the cultural 
                dimensions of AI, we'd love to hear from you.
              </p>
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 bg-white text-purple-950 font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
