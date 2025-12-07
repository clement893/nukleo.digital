import { Users, Target, Zap, Globe } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We exist to help organizations harness the full potential of AI and become leaders in their industries.',
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We push boundaries and explore emerging technologies to deliver cutting-edge solutions.',
    },
    {
      icon: Users,
      title: 'Partnership Approach',
      description: 'Your success is our success. We work alongside you as strategic partners, not just vendors.',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'From Montréal to Halifax and beyond, we help organizations worldwide transform through AI.',
    },
  ];

  return (
    <PageLayout>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <span className="font-mono text-accent text-sm mb-8 block uppercase tracking-widest">
            03 — ABOUT
          </span>

          <h1 className="text-white mb-8">
            ARCHITECTS<br />
            OF THE FUTURE
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            We are a team of strategists, engineers, and creators united by a singular vision: to help organizations thrive in the age of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-white mb-6">
                OUR<br />
                STORY
              </h2>
              <p className="text-white/75 text-base lg:text-lg leading-relaxed mb-6">
                Founded in 2024, Nukleo emerged from a simple observation: while everyone talks about AI, few organizations truly understand how to integrate it at scale.
              </p>
              <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                We built Nukleo to bridge that gap—combining deep technical expertise with strategic vision to help leaders move from experimentation to transformation.
              </p>
            </div>

            <div className="glass rounded-3xl p-8 lg:p-12">
              <div className="space-y-8">
                <div>
                  <div className="text-accent text-4xl lg:text-5xl font-bold mb-2">50+</div>
                  <div className="text-white/75 text-sm uppercase tracking-wider">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-accent text-4xl lg:text-5xl font-bold mb-2">$200M+</div>
                  <div className="text-white/75 text-sm uppercase tracking-wider">Value Generated</div>
                </div>
                <div>
                  <div className="text-accent text-4xl lg:text-5xl font-bold mb-2">95%</div>
                  <div className="text-white/75 text-sm uppercase tracking-wider">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-white mb-6">
              OUR<br />
              VALUES
            </h2>
            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-3xl p-8 lg:p-10 transition-all duration-500"
                >
                  <div className="mb-6 w-16 h-16 bg-accent/20 flex items-center justify-center rounded-full">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>

                  <p className="text-white/75 text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-white mb-6">
              THE<br />
              TEAM
            </h2>
            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              A multidisciplinary team of experts in AI, strategy, engineering, and design.
            </p>
          </div>

          <div className="glass rounded-3xl p-12 lg:p-16 text-center">
            <p className="text-white/75 text-lg leading-relaxed max-w-3xl mx-auto">
              Our team brings together decades of combined experience from leading tech companies, consulting firms, and innovative startups. We're engineers who understand business, strategists who code, and creators who think in systems.
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-white mb-6">
              WHERE WE<br />
              OPERATE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-white mb-4">Montréal</h3>
              <p className="text-white/75 mb-4">
                7236 Rue Waverly<br />
                Montréal, QC H2R 0C2
              </p>
            </div>

            <div className="glass rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-white mb-4">Halifax</h3>
              <p className="text-white/75 mb-4">
                1800 Argyle St Unit 801<br />
                Halifax, NS B3J 3N8
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PageLayout>
  );
}
