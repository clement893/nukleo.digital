import SEO from '@/components/SEO';
import PageLayout from '@/components/PageLayout';
import TrendRadar from '@/components/TrendRadar';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Radar() {
  const getLocalizedPath = useLocalizedPath();
  return (
    <PageLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container">
            <span className="font-mono text-accent text-sm mb-8 block uppercase tracking-widest">
              AI TREND RADAR
            </span>

            <h1 className="text-white mb-8">
              TECHNOLOGY<br />
              MAPPING
            </h1>

            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
              Interactive visualization of emerging and established AI technologies. 
              Monthly updates to guide your technology investment decisions.
            </p>
          </div>
        </section>

        {/* AI Trend Radar */}
        <TrendRadar />

        {/* CTA Section */}
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="glass rounded-3xl p-12 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                NEED STRATEGIC<br />
                GUIDANCE?
              </h2>
              <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
                Our expert team can help you identify the most relevant AI technologies 
                for your organization and build your technology roadmap.
              </p>
              <a
                href={getLocalizedPath('/contact')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all duration-300"
              >
                Talk to an Expert
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
