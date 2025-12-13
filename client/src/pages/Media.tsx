import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Media() {
  const { t, language } = useLanguage();
  const { getLocalizedPath } = useLocalizedPath();

  const pressReleases = [
    {
      date: t('media.pressReleases.items.smbServices.date'),
      title: t('media.pressReleases.items.smbServices.title'),
      excerpt: t('media.pressReleases.items.smbServices.excerpt'),
      category: t('media.pressReleases.categories.productLaunch')
    },
    {
      date: t('media.pressReleases.items.partnership.date'),
      title: t('media.pressReleases.items.partnership.title'),
      excerpt: t('media.pressReleases.items.partnership.excerpt'),
      category: t('media.pressReleases.categories.partnership')
    },
    {
      date: t('media.pressReleases.items.expansion.date'),
      title: t('media.pressReleases.items.expansion.title'),
      excerpt: t('media.pressReleases.items.expansion.excerpt'),
      category: t('media.pressReleases.categories.companyNews')
    },
  ];

  const mediaKit = [
    { name: t('media.mediaKit.items.logo.name'), size: t('media.mediaKit.items.logo.size'), type: t('media.mediaKit.items.logo.type') },
    { name: t('media.mediaKit.items.guidelines.name'), size: t('media.mediaKit.items.guidelines.size'), type: t('media.mediaKit.items.guidelines.type') },
    { name: t('media.mediaKit.items.bios.name'), size: t('media.mediaKit.items.bios.size'), type: t('media.mediaKit.items.bios.type') },
    { name: t('media.mediaKit.items.screenshots.name'), size: t('media.mediaKit.items.screenshots.size'), type: t('media.mediaKit.items.screenshots.type') },
  ];

  return (
    <PageLayout>
      <SEO 
        title={t('media.seoTitle')}
        description={t('media.seoDescription')}
        keywords={t('media.seoKeywords')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-white/90">{t('media.badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">{t('media.title')}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                {t('media.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t('media.description')} <a href="mailto:hello@nukleo.com" className="text-cyan-400 hover:underline">hello@nukleo.com</a>.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">{t('media.pressReleases.title')}</h2>
            
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
                      {new Date(release.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
            <h2 className="text-3xl font-bold text-white mb-8">{t('media.mediaKit.title')}</h2>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <p className="text-white/70 mb-6">
                {t('media.mediaKit.description')}
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
              {t('media.contact.title')}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t('media.contact.description')}
            </p>
            <a
              href="mailto:hello@nukleo.com"
              className="inline-block bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.02]"
            >
              {t('media.contact.button')}
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
