import { Search, Filter, Bookmark, TrendingUp } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Link } from 'wouter';
import { allTerms, categories, difficulties } from '@/data/glossary';
import { Button } from '@/components/ui/button';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

export default function Glossary() {
  const getLocalizedPath = useLocalizedPath();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [bookmarkedTerms, setBookmarkedTerms] = useState<string[]>(() => {
    const saved = localStorage.getItem('glossary-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (termId: string) => {
    const newBookmarks = bookmarkedTerms.includes(termId)
      ? bookmarkedTerms.filter(id => id !== termId)
      : [...bookmarkedTerms, termId];
    setBookmarkedTerms(newBookmarks);
    localStorage.setItem('glossary-bookmarks', JSON.stringify(newBookmarks));
  };

  const filteredTerms = useMemo(() => {
    return allTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || 
                               term.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  };

  const trendingTerms = ['gpt', 'rag', 'fine-tuning', 'ai-agent'];

  const glossarySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Glossary & Knowledge Base',
    description: 'Comprehensive AI terminology glossary with 24+ terms covering machine learning, NLP, generative AI, and more. From beginner to advanced.',
    url: 'https://nukleo.digital/glossary',
    numberOfItems: allTerms.length,
    about: {
      '@type': 'Thing',
      name: 'Artificial Intelligence',
    },
  };

  return (
    <PageLayout>
      <SEO 
        title="AI Glossary & Knowledge Base | 24+ AI Terms Explained"
        description="Comprehensive AI terminology glossary covering machine learning, NLP, generative AI, computer vision, and AI ethics. From beginner to advanced with real-world examples."
        keywords="AI glossary, artificial intelligence terms, machine learning glossary, AI terminology, NLP terms, generative AI, deep learning, AI dictionary, AI definitions, AI knowledge base"
      />
      <StructuredData data={glossarySchema} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          
          <div className="container relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/50 rounded-full text-accent text-xs font-mono uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              AI Glossary & Knowledge Base
            </div>

            {/* Title */}
            <h1 className="text-[4rem] md:text-[5.5rem] lg:text-[7rem] text-white mb-6 leading-[0.85] font-heading font-bold">
              AI GLOSSARY
            </h1>

            {/* Subtitle */}
            <p className="text-2xl text-white/70 font-light leading-relaxed max-w-3xl mb-4">
              Your Complete Guide to AI Terminology
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 text-white/60 text-sm font-mono mb-12">
              <span>{allTerms.length}+ Terms</span>
              <span>•</span>
              <span>Beginner to Advanced</span>
              <span>•</span>
              <span>Real Examples</span>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search terms... (e.g., machine learning, NLP, GPT)"
                  className="w-full pl-16 pr-6 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors text-lg"
                />
              </div>

              {/* Trending Terms */}
              <div className="flex items-center gap-3 mt-6 flex-wrap">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-mono uppercase tracking-wider">Trending:</span>
                </div>
                {trendingTerms.map(termId => {
                  const term = allTerms.find(t => t.id === termId);
                  return term ? (
                    <Link key={termId} href={getLocalizedPath(`/glossary/${termId}`)}>
                      <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-accent text-white/80 hover:text-white text-sm transition-all duration-300">
                        {term.term}
                      </button>
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section (White Background) */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container">
            {/* Category Filters */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-mono uppercase tracking-wider">Category:</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
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

            {/* Difficulty Filters */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-mono uppercase tracking-wider text-gray-700">Difficulty:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                      selectedDifficulty === difficulty 
                        ? "bg-purple-900 text-white hover:bg-purple-800" 
                        : "bg-transparent text-purple-900 border-purple-900/20 hover:bg-purple-50 hover:border-accent"
                    }`}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 text-gray-600 text-sm font-mono">
              Showing {filteredTerms.length} of {allTerms.length} terms
            </div>
          </div>
        </section>

        {/* Terms Grid (White Background) */}
        <section className="py-32 bg-white">
          <div className="container">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">No terms found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTerms.map((term) => (
                  <div
                    key={term.id}
                    className="bg-gray-50 p-8 hover:bg-purple-50 border border-gray-200 hover:border-accent transition-all duration-500 group cursor-pointer h-full flex flex-col rounded-3xl relative"
                  >
                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(term.id);
                      }}
                      className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white border border-gray-200 hover:border-accent transition-all duration-300 z-10"
                    >
                      <Bookmark 
                        className={`w-4 h-4 transition-colors ${
                          bookmarkedTerms.includes(term.id) 
                            ? 'fill-accent text-accent' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </button>

                    <Link href={getLocalizedPath(`/glossary/${term.id}`)} className="flex-1 flex flex-col">
                      {/* Category & Difficulty Badges */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-purple-100 text-accent group-hover:bg-accent group-hover:text-white transition-colors rounded-full">
                          {term.category}
                        </span>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(term.difficulty)}`}>
                          {getDifficultyIcon(term.difficulty)} {term.difficulty}
                        </span>
                      </div>

                      {/* Term Name */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors leading-tight">
                        {term.term}
                      </h3>

                      {/* Short Definition */}
                      <p className="text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                        {term.shortDefinition}
                      </p>

                      {/* Example Preview */}
                      {term.examples.length > 0 && (
                        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-gray-500">Example</span>
                          </div>
                          <p className="text-sm text-gray-700 font-medium">{term.examples[0].title}</p>
                          <p className="text-xs text-gray-500 mt-1">{term.examples[0].industry}</p>
                        </div>
                      )}

                      {/* Related Terms Count */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-200">
                        <span>{term.relatedTerms.length} related terms</span>
                        <span className="text-accent font-medium group-hover:translate-x-1 transition-transform">
                          Learn more →
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                READY TO TRANSFORM<br />WITH AI?
              </h2>

              <p className="text-xl text-white/70 leading-relaxed mb-12">
                Now that you understand the terminology, let's discuss how AI can drive growth for your organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={getLocalizedPath('/ai-readiness')}>
                  <Button className="bg-white text-purple-900 hover:bg-white/90 text-lg px-10 py-7 rounded-full font-bold shadow-2xl hover:scale-[1.022] transition-all duration-300">
                    Take AI Readiness Assessment
                  </Button>
                </Link>
                <Link href={getLocalizedPath('/contact')}>
                  <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 rounded-full font-bold transition-all duration-300">
                    Discuss Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
