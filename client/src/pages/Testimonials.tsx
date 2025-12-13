import { testimonials } from '@/data/testimonials';
import SEO from '@/components/SEO';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { Link } from 'wouter';

export default function Testimonials() {
  const { t, language } = useLanguage();
  const { getLocalizedPath } = useLocalizedPath();

  return (
    <>
      <SEO
        title={t('testimonials.seoTitle')}
        description={t('testimonials.seoDescription')}
        keywords={t('testimonials.seoKeywords')}
      />
      
      <PageLayout>
        <div className="min-h-screen py-20">
          {/* Hero Section */}
          <section className="container px-6 md:px-12 mb-20">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                <span className="text-sm font-mono text-white/70">{t('testimonials.page.badge')}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t('testimonials.page.title')}
                <br />
                <span className="text-white/60">{t('testimonials.page.subtitle')}</span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                {t('testimonials.page.description')}
              </p>
            </div>
          </section>

          {/* Testimonials Grid */}
          <section className="container px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="
                    group
                    p-8 md:p-10
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    backdrop-blur-sm
                    hover:bg-white/10
                    hover:border-white/20
                    transition-all duration-500
                  "
                >
                  {/* Quote Icon */}
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    {/* Avatar with Initials */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {testimonial.contact.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-lg truncate">
                        {testimonial.contact}
                      </p>
                      <p className="text-white/60 text-sm truncate">
                        {testimonial.title}
                      </p>
                      <p className="text-white/40 text-sm font-mono truncate">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="container px-6 md:px-12 mt-32">
            <div className="
              max-w-4xl mx-auto
              p-12 md:p-16
              rounded-3xl
              bg-gradient-to-br from-purple-900/50 via-purple-800/50 to-blue-900/50
              border border-white/10
              backdrop-blur-sm
              text-center
            ">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('testimonials.page.cta.title')}
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                {t('testimonials.page.cta.description')}
              </p>
              <Link href={getLocalizedPath('/contact')}>
                <a className="
                  inline-flex items-center gap-3
                  px-8 py-4
                  rounded-full
                  bg-white
                  text-purple-900
                  font-bold
                  hover:bg-white/90
                  transition-all duration-300
                  hover:scale-[1.022]
                ">
                  {t('testimonials.page.cta.button')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </Link>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
