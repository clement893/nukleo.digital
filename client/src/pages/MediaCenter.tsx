import { Download, ExternalLink, Mail, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function MediaCenter() {
  const { data: mediaAssets, isLoading } = trpc.mediaAssets.list.useQuery();

  const pressReleases = [
    {
      date: '2024-12-01',
      title: 'Nukleo Digital Launches Revolutionary Agentic AI Platform',
      excerpt: 'New platform enables enterprises to deploy autonomous AI agents that transform business operations.',
      link: '/contact',
    },
    {
      date: '2024-11-15',
      title: 'Nukleo Digital Secures $10M Series A Funding',
      excerpt: 'Investment will accelerate AI strategy consulting services and expand global reach.',
      link: '/contact',
    },
    {
      date: '2024-10-20',
      title: 'Partnership with Leading Healthcare Provider Announced',
      excerpt: 'Collaboration aims to revolutionize patient care through intelligent AI integration.',
      link: '/contact',
    },
  ];

  const coverage = [
    {
      outlet: 'TechCrunch',
      title: 'How Nukleo Digital is Redefining AI Strategy for Enterprises',
      date: '2024-11-28',
      link: '/contact',
    },
    {
      outlet: 'Forbes',
      title: 'The Future of Agentic AI: An Interview with Nukleo Digital',
      date: '2024-11-10',
      link: '/contact',
    },
    {
      outlet: 'VentureBeat',
      title: 'Nukleo Digital\'s Approach to Intelligent Operations',
      date: '2024-10-25',
      link: '/contact',
    },
  ];

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${bytes} B`;
  };

  return (
    <>
      <SEO
        title="Media Center | Press Releases & Media Kit | Nukleo Digital"
        description="Access Nukleo Digital's press releases, media kit, brand assets, and latest news. Download logos, company information, and press materials for media use."
        keywords="Nukleo Digital press, media kit, press releases, brand assets, company logos, media resources, press contact, AI agency news"
        ogImage="https://nukleo.digital/og-image.jpg"
        ogType="website"
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Media Center
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-8">
                Press releases, media kit, and latest news about Nukleo Digital
              </p>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <Calendar className="w-8 h-8 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Press Releases
                </h2>
              </div>

              <div className="space-y-6">
                {pressReleases.map((release, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <p className="text-accent text-sm font-semibold mb-2">
                          {new Date(release.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                          {release.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {release.excerpt}
                        </p>
                      </div>
                      <Button
                        className="bg-accent hover:bg-accent/90 text-white shrink-0"
                        asChild
                      >
                        <a href={release.link} className="flex items-center gap-2">
                          Read More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <Download className="w-8 h-8 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Media Kit
                </h2>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <p className="text-white/70 mb-8 text-lg">
                  Download our brand assets, logos, and company information for media use.
                </p>

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white/50 mt-4">Loading media assets...</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {mediaAssets?.map((asset) => (
                      <a
                        key={asset.id}
                        href={asset.url}
                        download={asset.name}
                        className="flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                            <FileText className="w-6 h-6 text-accent" />
                          </div>
                          <div className="text-left">
                            <p className="text-white font-semibold group-hover:text-accent transition-colors">
                              {asset.name}
                            </p>
                            <p className="text-white/50 text-sm">{formatFileSize(asset.size)}</p>
                          </div>
                        </div>
                        <Download className="w-5 h-5 text-white/50 group-hover:text-accent transition-colors" />
                      </a>
                    ))}
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-white/10">
                  <Button className="w-full bg-gradient-to-r from-accent to-pink-500 hover:from-accent/90 hover:to-pink-500/90 text-white font-semibold py-6 text-lg">
                    <Download className="w-5 h-5 mr-2" />
                    Download Complete Media Kit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <ExternalLink className="w-8 h-8 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Media Coverage
                </h2>
              </div>

              <div className="space-y-4">
                {coverage.map((article, index) => (
                  <a
                    key={index}
                    href={article.link}
                    className="block bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-accent text-sm font-semibold mb-2">
                          {article.outlet} • {new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-accent transition-colors shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Press Contact */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-accent/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-accent/30 text-center">
                <Mail className="w-16 h-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Press Inquiries
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  For media inquiries, interviews, or press kit requests, please contact our press team.
                </p>
                <div className="space-y-4">
                  <p className="text-white text-xl font-semibold">
                    press@nukleo.digital
                  </p>
                  <p className="text-white/70">
                    We typically respond within 24 hours
                  </p>
                </div>
                <Button className="mt-8 bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-6 text-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Press Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
