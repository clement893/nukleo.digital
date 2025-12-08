import { BookOpen, FileText, Video, Download } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';


export default function Resources() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const subscribe = trpc.contact.subscribe.useMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await subscribe.mutateAsync({ email });
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const sources = [
    {
      type: 'Guide',
      icon: BookOpen,
      title: 'The Agentic AI Playbook',
      description: 'A comprehensive guide to implementing autonomous AI agents in your organization.',
      date: 'January 2025',
      readTime: '15 min read',
    },
    {
      type: 'Whitepaper',
      icon: FileText,
      title: 'From Pilot to Scale: AI Transformation Framework',
      description: 'Strategic framework for moving beyond experimentation to enterprise-wide AI adoption.',
      date: 'December 2024',
      readTime: '20 min read',
    },
    {
      type: 'Video',
      icon: Video,
      title: 'The Future of Agentic Marketing',
      description: 'Insights on how AI agents are reshaping marketing operations and customer experiences.',
      date: 'November 2024',
      readTime: '30 min watch',
    },
    {
      type: 'Report',
      icon: Download,
      title: 'AI Readiness Assessment 2025',
      description: 'Industry benchmarks and best practices for evaluating your organization\'s AI maturity.',
      date: 'January 2025',
      readTime: '25 min read',
    },
  ];

  const categories = ['All', 'Guides', 'Whitepapers', 'Videos', 'Reports'];

  return (
    <PageLayout>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container">
          <span className="font-mono text-accent text-sm mb-8 block uppercase tracking-widest">
            05 — RESOURCES
          </span>

          <h1 className="text-white mb-8">
            INSIGHTS &<br />
            KNOWLEDGE
          </h1>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-3xl">
            Stay ahead of the AI curve with our latest insights, technical guides, and industry analysis.
          </p>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Trend Radar */}
            <div className="glass rounded-3xl p-12 lg:p-16 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="font-mono text-accent text-sm mb-4 block uppercase tracking-widest">
                  AI TREND RADAR
                </span>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  AI TECHNOLOGY<br />
                  MAPPING
                </h2>
                
                <p className="text-white/75 text-base mb-8">
                  Interactive visualization of emerging and established AI technologies. 
                  Monthly updates to guide your technology investment decisions.
                </p>
                
                <a
                  href="/radar"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-all duration-300"
                >
                  Explore the Radar
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* AI Readiness Assessment */}
            <div className="glass rounded-3xl p-12 lg:p-16 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <span className="font-mono text-accent text-sm mb-4 block uppercase tracking-widest">
                  FREE ASSESSMENT
                </span>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  AI READINESS<br />
                  ASSESSMENT
                </h2>
                
                <p className="text-white/75 text-base mb-8">
                  Evaluate your organization's AI maturity across 6 key dimensions. 
                  Get personalized recommendations and a comprehensive report.
                </p>
                
                <a
                  href="/ai-readiness"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-rose-500 text-white rounded-full font-medium hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300"
                >
                  Start Assessment
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-12">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full text-sm font-medium glass text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="group glass rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:bg-white/10"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent/20 flex items-center justify-center rounded-full flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <span className="text-accent text-sm font-mono uppercase tracking-wider">
                        {resource.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-white/75 text-base leading-relaxed mb-6">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-white/50 text-sm">
                    <span>{resource.date}</span>
                    <span>{resource.readTime}</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button className="text-accent hover:text-accent/80 font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-purple-900/30 to-purple-800/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">
              STAY AHEAD OF<br />
              THE AI CURVE
            </h2>

            <p className="text-white/75 text-lg leading-relaxed mb-8">
              Subscribe to receive our latest insights, technical guides, and industry analysis.
            </p>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl max-w-xl mx-auto">
                <p className="text-green-400 font-medium text-center">
                  ✓ Successfully subscribed! Check your email for confirmation.
                </p>
              </div>
            )}

            {subscribe.error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl max-w-xl mx-auto">
                <p className="text-red-400 font-medium text-center">
                  ✗ Failed to subscribe. Please try again.
                </p>
              </div>
            )}

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors"
              />
              <button 
                type="submit"
                disabled={subscribe.isPending}
                className="px-8 py-4 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
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
