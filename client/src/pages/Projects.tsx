import SEO from '@/components/SEO';
import UniversalLEO from '@/components/UniversalLEO';
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: t('projects.filters.all') },
    { key: 'AI Platforms', label: t('projects.filters.aiPlatforms') },
    { key: 'Marketing', label: t('projects.filters.marketing') },
    { key: 'Web Apps', label: t('projects.filters.webApps') },
    { key: 'Strategy', label: t('projects.filters.strategy') },
  ];

  const projects = [
    {
      id: 1,
      title: t('projects.items.autonomousMarketing.title'),
      category: 'AI Platforms',
      description: t('projects.items.autonomousMarketing.description'),
      metrics: { roi: '+340%', time: '-75%', output: '10x' },
      image: '/projects/project1.jpg',
    },
    {
      id: 2,
      title: t('projects.items.intelligentEcommerce.title'),
      category: 'Web Apps',
      description: t('projects.items.intelligentEcommerce.description'),
      metrics: { roi: '+220%', time: '-60%', output: '8x' },
      image: '/projects/project2.jpg',
    },
    {
      id: 3,
      title: t('projects.items.enterpriseTransformation.title'),
      category: 'Strategy',
      description: t('projects.items.enterpriseTransformation.description'),
      metrics: { roi: '+450%', time: '-80%', output: '12x' },
      image: '/projects/project3.jpg',
    },
    {
      id: 4,
      title: t('projects.items.contentGeneration.title'),
      category: 'Marketing',
      description: t('projects.items.contentGeneration.description'),
      metrics: { roi: '+280%', time: '-70%', output: '15x' },
      image: '/projects/project4.jpg',
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageLayout>
      <SEO 
        title="AI Transformation Projects | Success Stories & Case Studies"
        description="Explore our AI transformation projects: real results across healthcare, finance, retail & government. See how we deliver measurable ROI. View case studies now."
        keywords="AI transformation projects, AI case studies, AI success stories, AI implementation examples, AI project portfolio"
      />
    <div className="min-h-screen bg-gradient-nukleo">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <Breadcrumb items={[{ name: t('nav.projects'), url: '/projects' }]} />

          <h1 className="text-white mb-8">
            {t('projects.heroTitle')}<br />
            {t('projects.heroSubtitle')}
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            {t('projects.description')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-accent text-white'
                    : 'glass text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group glass rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10"
              >
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-purple-800/50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-6xl font-bold">{project.id}</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-accent text-sm font-mono tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-white/75 text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                    <div>
                      <div className="text-accent text-2xl font-bold mb-1">{project.metrics.roi}</div>
                      <div className="text-white/50 text-xs tracking-wider">ROI Increase</div>
                    </div>
                    <div>
                      <div className="text-accent text-2xl font-bold mb-1">{project.metrics.time}</div>
                      <div className="text-white/50 text-xs tracking-wider">Time Saved</div>
                    </div>
                    <div>
                      <div className="text-accent text-2xl font-bold mb-1">{project.metrics.output}</div>
                      <div className="text-white/50 text-xs tracking-wider">Output Boost</div>
                    </div>
                  </div>

                  <a href="/contact">
                    <Button
                      variant="ghost"
                      className="text-accent hover:text-accent/80 p-0 h-auto font-medium group/btn"
                    >
                      View Case Study
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="glass rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="text-white mb-6">
              Ready to<br />
              Transform?
            </h2>

            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Let's discuss how we can architect your AI-powered future.
            </p>

            <a href="/start-project">
              <Button
                size="lg"
                className="rounded-full text-lg px-10 py-8 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider shimmer"
              >
                Start Your Transformation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
    </PageLayout>
  );
}
