import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

export default function Media() {
  const pressReleases = [
    {
      date: '2024-12-01',
      title: 'Nukleo Digital Launches AI Transformation Services for SMBs',
      excerpt: 'New suite of AI-powered solutions designed to help small and medium businesses compete in the digital age.',
      category: 'Product Launch'
    },
    {
      date: '2024-11-15',
      title: 'Partnership Announcement: Nukleo & Leading Tech Firms',
      excerpt: 'Strategic partnerships to deliver cutting-edge AI solutions across multiple industries.',
      category: 'Partnership'
    },
    {
      date: '2024-10-20',
      title: 'Nukleo Digital Expands AI Consulting Practice',
      excerpt: 'Growing team of AI experts to meet increasing demand for intelligent automation solutions.',
      category: 'Company News'
    },
  ];

  const mediaKit = [
    { name: 'Company Logo (PNG)', size: '2.4 MB', type: 'Image' },
    { name: 'Brand Guidelines', size: '1.8 MB', type: 'PDF' },
    { name: 'Executive Bios', size: '450 KB', type: 'PDF' },
    { name: 'Product Screenshots', size: '5.2 MB', type: 'ZIP' },
  ];

  return (
    <PageLayout>
      <SEO 
        title="Media & Press | Latest News and Resources"
        description="Access Nukleo Digital's latest press releases, media kit, and company news. Download logos, brand guidelines, and connect with our press team."
        keywords="Nukleo press, media kit, press releases, company news, brand assets"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white/90">Press & Media</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Media</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Center
              </span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Latest news, press releases, and media resources from Nukleo Digital. For press inquiries, contact us at <a href="mailto:hello@nukleo.com" className="text-cyan-400 hover:underline">hello@nukleo.com</a>.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Latest Press Releases</h2>
            
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {release.category}
                    </span>
                    <span className="text-sm text-white/50">
                      {new Date(release.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                    {release.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed">
                    {release.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Media Kit</h2>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <p className="text-white/70 mb-6">
                Download our brand assets, logos, and company information for media coverage.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaKit.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-sm text-white/50">{item.type} • {item.size}</p>
                    </div>
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Press Inquiries
            </h2>
            <p className="text-xl text-white/70 mb-8">
              For media inquiries, interviews, or additional information, please contact our press team.
            </p>
            <a
              href="mailto:hello@nukleo.com"
              className="inline-block bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.02]"
            >
              Contact Press Team
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
