import PageLayout from '@/components/PageLayout';
import TrendRadar from '@/components/TrendRadar';

export default function Radar() {
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
              CARTOGRAPHIE<br />
              TECHNOLOGIQUE
            </h1>

            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
              Visualisation interactive des technologies IA émergentes et établies. 
              Mise à jour mensuelle pour guider vos décisions d'investissement technologique.
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
                BESOIN D'UN ACCOMPAGNEMENT<br />
                STRATÉGIQUE ?
              </h2>
              <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
                Notre équipe d'experts peut vous aider à identifier les technologies IA 
                les plus pertinentes pour votre organisation et construire votre roadmap technologique.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all duration-300"
              >
                Discuter avec un expert
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
