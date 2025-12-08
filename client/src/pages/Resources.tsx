import { Filter } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useState } from 'react';
import SEO from '@/components/SEO';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Resources() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const subscribe = trpc.contact.subscribe.useMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await subscribe.mutateAsync({ email });
      setIsSubmitted(true);
      setEmail('');
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const tools = [
    {
      badge: 'Diagnostic Tool',
      title: 'AI Readiness Assessment',
      description: 'Discover where you stand in your AI transformation journey. Get personalized insights across 6 key dimensions with instant results.',
      tags: ['20 Questions', '5 Maturity Levels', 'Instant Results'],
      link: '/ai-readiness',
      buttonText: 'Start Assessment'
    },
    {
      badge: 'Research Tool',
      title: 'AI Trend Radar',
      description: 'Explore our interactive radar of emerging and established AI technologies. Monthly updates to guide your investment decisions.',
      tags: ['10+ Technologies', 'Monthly Updates', 'Interactive Map'],
      link: '/radar',
      buttonText: 'Explore Radar'
    },
    {
      badge: 'Knowledge Base',
      title: 'AI Glossary',
      description: 'Your complete guide to AI terminology. 100+ terms with real-world examples, from beginner to advanced concepts.',
      tags: ['100+ Terms', 'Real Examples', 'Searchable'],
      link: '/glossary',
      buttonText: 'Browse Glossary'
    }
  ];

  const categories = ['All', 'Industry Insights', 'Technical Guide', 'Strategy', 'Case Study'];

  const resources = [
    {
      id: 'agentic-ai-playbook',
      category: 'Technical Guide',
      title: 'The Agentic AI Playbook',
      description: 'A comprehensive guide to implementing autonomous AI agents in your organization. From architecture to deployment.',
      readTime: '15 min',
      date: '2025-01-15'
    },
    {
      id: 'pilot-to-scale',
      category: 'Strategy',
      title: 'From Pilot to Scale: AI Transformation Framework',
      description: 'Strategic framework for moving beyond experimentation to enterprise-wide AI adoption with measurable results.',
      readTime: '20 min',
      date: '2025-01-12'
    },
    {
      id: 'agentic-marketing',
      category: 'Industry Insights',
      title: 'The Future of Agentic Marketing',
      description: 'How AI agents are reshaping marketing operations and customer experiences. Real-world case studies and ROI metrics.',
      readTime: '12 min',
      date: '2025-01-10'
    },
    {
      id: 'building-agentic-systems',
      category: 'Technical Guide',
      title: 'Building Agentic Systems',
      description: 'Technical deep-dive into designing, building, and deploying autonomous AI agent systems at scale.',
      readTime: '18 min',
      date: '2025-01-10'
    },
    {
      id: 'ai-trends-2025',
      category: 'Industry Insights',
      title: '2025 AI Trends',
      description: 'The most important AI trends shaping business in 2025. From multimodal models to agentic workflows.',
      readTime: '14 min',
      date: '2025-01-08'
    },
    {
      id: 'roi-ai-investment',
      category: 'Strategy',
      title: 'Measuring ROI on AI Investments',
      description: 'Practical frameworks and metrics for measuring the return on investment of your AI initiatives.',
      readTime: '10 min',
      date: '2025-01-05'
    }
  ];

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  return (
    <PageLayout>
      <SEO 
        title="Resources | AI Insights, Guides & Research"
        description="Insights, guides, and research from the frontlines of AI transformation. Stay ahead with expert analysis, practical frameworks, and interactive tools."
        keywords="AI resources, AI guides, AI research, AI insights, AI tools, AI readiness assessment, AI trend radar, AI glossary, ROI calculator, AI transformation"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          
          <div className="container relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/50 rounded-full text-accent text-xs font-mono uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Knowledge Base
            </div>

            {/* Title */}
            <h1 className="text-[5rem] md:text-[6.5rem] lg:text-[8rem] text-white mb-8 leading-[0.85] font-heading font-bold">
              RESOURCES
            </h1>

            {/* Description */}
            <p className="text-2xl text-white/70 font-light leading-relaxed max-w-3xl border-l-2 border-accent pl-6">
              Insights, guides, and research from the frontlines of AI transformation. Stay ahead with expert analysis and practical frameworks.
            </p>
          </div>
        </section>

        {/* Interactive Tools Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 relative overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-white rounded-full" />
                Interactive Tools
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Explore Our AI Tools
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Free diagnostic and research tools to accelerate your AI transformation journey
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {tools.map((tool, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-12 flex flex-col">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-6 self-start">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    {tool.badge}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-white/80 mb-8 leading-relaxed flex-grow">
                    {tool.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tool.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={tool.link}>
                    <Button className="bg-white text-purple-900 hover:bg-white/90 text-base px-6 py-6 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                      {tool.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section (White Background) */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-wider">Filter by:</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === category 
                      ? "bg-purple-900 text-white hover:bg-purple-800" 
                      : "bg-transparent text-purple-900 border-purple-900/20 hover:bg-purple-50 hover:border-accent"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid (White Background) */}
        <section className="py-32 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <Link key={resource.id} href={`/resources/${resource.id}`}>
                  <div className="bg-gray-50 p-12 hover:bg-purple-50 border border-gray-200 hover:border-accent transition-all duration-500 group cursor-pointer h-full flex flex-col rounded-3xl">
                    {/* Badge */}
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-purple-100 text-accent group-hover:bg-accent group-hover:text-white transition-colors rounded-full">
                        {resource.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors leading-tight">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-600 leading-relaxed mb-8 flex-grow">
                      {resource.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-200">
                      <span>{resource.readTime}</span>
                      <span>{new Date(resource.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Newsletter Section (Gradient) */}
        <section className="py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 relative overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                STAY AHEAD OF<br />THE AI CURVE
              </h2>

              <p className="text-xl text-white/70 leading-relaxed mb-12">
                Subscribe to receive our latest insights, technical guides, and industry analysis directly in your inbox.
              </p>

              {isSubmitted && (
                <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-green-300 font-medium text-center">
                    ✓ Successfully subscribed! Check your email for confirmation.
                  </p>
                </div>
              )}

              {subscribe.error && (
                <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-red-300 font-medium text-center">
                    ✗ Failed to subscribe. Please try again.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-8 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors text-lg"
                />
                <button 
                  type="submit"
                  disabled={subscribe.isPending}
                  className="px-10 py-5 rounded-full bg-white text-purple-900 font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl text-lg disabled:opacity-50"
                >
                  {subscribe.isPending ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
