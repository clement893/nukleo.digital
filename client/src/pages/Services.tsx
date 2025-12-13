import { Layers, BarChart3, Globe, Zap, Target, Users, Brain, Code, Workflow, MessageSquare, TrendingUp, Shield, Palette, Sparkles, Camera, PenTool } from 'lucide-react';
import SEO from '@/components/SEO';
import UniversalLEO from '@/components/UniversalLEO';
import { Link } from 'wouter';
import PageLayout from '../components/PageLayout';
import StructuredData, { serviceSchema } from '@/components/StructuredData';

export default function Services() {
  const services = [
    {
      category: 'The Bureau',
      subtitle: 'Strategic Headquarters',
      icon: Layers,
      description: 'Your strategic headquarters. Here, we transform data into decisions, insights into actions, and opportunities into measurable results. Our Strategic Bureau orchestrates your digital success with precision, agility, and an obsession for ROI.',
      link: '/services/strategic-bureau',
      services: [
        {
          icon: Target,
          title: 'AI Strategy Consulting',
          description: 'Define your AI roadmap with expert guidance on technology selection, implementation planning, and ROI optimization.',
        },
        {
          icon: MessageSquare,
          title: 'Conversational AI',
          description: 'Deploy intelligent chatbots and virtual assistants that understand context, learn from interactions, and deliver personalized experiences.',
        },
        {
          icon: TrendingUp,
          title: 'Marketing Automation',
          description: 'Automate your marketing workflows with AI-powered campaigns, lead scoring, and personalized content delivery.',
        },
        {
          icon: Brain,
          title: 'Predictive Analytics',
          description: 'Leverage AI to forecast trends, predict customer behavior, and make data-driven decisions with confidence.',
        },
      ],
    },
    {
      category: 'The Lab',
      subtitle: 'Innovation Laboratory',
      icon: BarChart3,
      description: 'Welcome to our innovation laboratory. Here, we transform cutting-edge technologies into tangible competitive advantages. Web development, custom platforms, e-commerce, AI, automation—we build the solutions that propel your growth and give you a head start.',
      link: '/services/ai-lab',
      services: [
        {
          icon: Code,
          title: 'Custom Web Applications',
          description: 'Develop bespoke web platforms with AI-powered features, real-time collaboration, and seamless integrations.',
        },
        {
          icon: Zap,
          title: 'API Development & Integration',
          description: 'Create robust APIs and integrate third-party services to build connected, intelligent ecosystems.',
        },
        {
          icon: Users,
          title: 'User Experience Design',
          description: 'Design intuitive interfaces that combine human-centered design with AI-driven personalization.',
        },
        {
          icon: Shield,
          title: 'Security & Compliance',
          description: 'Implement enterprise-grade security, data privacy controls, and compliance frameworks for your digital platforms.',
        },
      ],
    },
    {
      category: 'The Studio',
      subtitle: 'Creative Workshop',
      icon: Palette,
      description: 'Welcome to the workshop where ideas become reality. Our Creative Studio fuses strategy and creativity to create brand experiences that captivate, designs that convert, and campaigns that leave a mark. We don\'t just create beautiful, we create beautiful that performs.',
      link: '/services/creative-studio',
      services: [
        {
          icon: Sparkles,
          title: 'Brand Identity & Strategy',
          description: 'Craft compelling brand identities that resonate with your audience and differentiate you in the market.',
        },
        {
          icon: PenTool,
          title: 'UI/UX Design',
          description: 'Design stunning interfaces that blend aesthetics with functionality, creating experiences users love.',
        },
        {
          icon: Camera,
          title: 'Content Creation',
          description: 'Produce high-impact visual and written content that tells your story and drives engagement.',
        },
        {
          icon: TrendingUp,
          title: 'Campaign Design',
          description: 'Design integrated marketing campaigns that capture attention and deliver measurable results.',
        },
      ],
    },
  ];

  return (
    <PageLayout>
      <SEO 
        title="AI Services | Strategy, Platforms & Intelligent Operations"
        description="Comprehensive AI services: Strategy & Marketing, Digital Platforms, Intelligent Operations. 12 specialized solutions to accelerate your AI transformation. Explore now."
        keywords="AI services, AI strategy, digital platforms, intelligent operations, AI transformation"
        ogImage="/og-services.jpg"
      />
      <StructuredData data={serviceSchema} />
      <div className="min-h-screen pt-24 pb-20 px-4">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium text-white/90">Our Services</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight italic">
            We are by your side
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              to help you grow.
            </span>
          </h1>
          
          <p className="text-2xl text-white/70 max-w-3xl leading-relaxed">
            Three specialized studios working in harmony to transform your vision into reality. From strategy to creativity, from innovation to execution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <section key={categoryIndex} className="space-y-12">
                {/* Category Header */}
                <div className="flex items-start gap-6 pb-8 border-b border-white/10">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {category.category}
                    </h2>
                    {category.subtitle && (
                      <p className="text-lg text-accent/80 mb-4 font-medium">
                        {category.subtitle}
                      </p>
                    )}
                    <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                      {category.description}
                    </p>
                    {category.link && (
                      <Link href={category.link}>
                        <button className="mt-6 text-accent hover:text-accent/80 font-semibold inline-flex items-center gap-2 transition-colors">
                          Explore {category.category}
                          <span className="text-xl">→</span>
                        </button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {category.services.map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <div
                        key={serviceIndex}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-accent/50 transition-all group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                            <ServiceIcon className="w-6 h-6 text-accent" />
                          </div>
                          <h3 className="text-2xl font-semibold text-white flex-1">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-white/70 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-32">
          <div className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-purple-700/50 rounded-3xl p-12 text-center border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI services can transform your business and accelerate your growth.
            </p>
            <Link href="/contact">
              <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.022] inline-flex items-center gap-2">
                Start Your Transformation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
