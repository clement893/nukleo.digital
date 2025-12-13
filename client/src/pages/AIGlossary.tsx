import { Search, Filter, Bookmark } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { allAIGlossaryTerms, aiGlossaryCategories, importanceLevels, type ImportanceLevel } from '@/data/ai-glossary';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AIGlossary() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImportance, setSelectedImportance] = useState<ImportanceLevel | 'All'>('All');
  const [bookmarkedTerms, setBookmarkedTerms] = useState<string[]>(() => {
    const saved = localStorage.getItem('ai-glossary-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (termId: string) => {
    const newBookmarks = bookmarkedTerms.includes(termId)
      ? bookmarkedTerms.filter(id => id !== termId)
      : [...bookmarkedTerms, termId];
    setBookmarkedTerms(newBookmarks);
    localStorage.setItem('ai-glossary-bookmarks', JSON.stringify(newBookmarks));
  };

  const filteredTerms = useMemo(() => {
    return allAIGlossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (term.shortDefinition && term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      const matchesImportance = selectedImportance === 'All' || term.importance === selectedImportance;
      return matchesSearch && matchesCategory && matchesImportance;
    });
  }, [searchQuery, selectedCategory, selectedImportance]);

  const getImportanceColor = (importance: ImportanceLevel) => {
    switch (importance) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getImportanceIcon = (importance: ImportanceLevel) => {
    switch (importance) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  const glossarySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Glossary | Nukleo',
    description: t('aiGlossary.description', 'Comprehensive AI terminology glossary covering essential AI terms, definitions, and concepts.'),
    url: 'https://nukleo.digital/ai-glossary',
    numberOfItems: allAIGlossaryTerms.length,
    about: {
      '@type': 'Thing',
      name: 'Artificial Intelligence',
    },
  };

  return (
    <PageLayout>
      <SEO 
        title={t('aiGlossary.seoTitle', 'AI Glossary | Complete Guide to AI Terminology | Nukleo')}
        description={t('aiGlossary.seoDescription', 'Comprehensive AI terminology glossary covering essential AI terms, definitions, and concepts. From fundamentals to advanced topics.')}
        keywords={t('aiGlossary.seoKeywords', 'AI glossary, artificial intelligence terms, AI terminology, AI definitions, AI dictionary, machine learning glossary, AI knowledge base')}
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
              {t('aiGlossary.badge', 'Glossaire IA')}
            </div>

            {/* Title */}
            <h1 className="text-[4rem] md:text-[5.5rem] lg:text-[7rem] text-white mb-6 leading-[0.85] font-heading font-bold">
              {t('aiGlossary.title', 'GLOSSAIRE IA')}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl text-white/70 font-light leading-relaxed max-w-3xl mb-4">
              {t('aiGlossary.subtitle', 'Votre guide complet de la terminologie IA')}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 text-white/60 text-sm font-mono mb-12">
              <span>{allAIGlossaryTerms.length} {t('aiGlossary.terms', 'Termes')}</span>
              <span>•</span>
              <span>{aiGlossaryCategories.length - 1} {t('aiGlossary.categories', 'Catégories')}</span>
              <span>•</span>
              <span>{t('aiGlossary.searchable', 'Rechercheable')}</span>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('aiGlossary.searchPlaceholder', 'Rechercher des termes... (ex: machine learning, NLP, GPT)')}
                  className="w-full pl-16 pr-6 py-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors text-lg"
                />
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
                  <span className="text-sm font-mono uppercase tracking-wider">{t('aiGlossary.category', 'Catégorie')}:</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {aiGlossaryCategories.map((category) => (
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

            {/* Importance Filters */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-mono uppercase tracking-wider text-gray-700">{t('aiGlossary.importance', 'Importance')}:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedImportance === 'All' ? "default" : "outline"}
                  onClick={() => setSelectedImportance('All')}
                  className={`rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                    selectedImportance === 'All' 
                      ? "bg-purple-900 text-white hover:bg-purple-800" 
                      : "bg-transparent text-purple-900 border-purple-900/20 hover:bg-purple-50 hover:border-accent"
                  }`}
                >
                  {t('aiGlossary.all', 'Tout')}
                </Button>
                {importanceLevels.map((importance) => (
                  <Button
                    key={importance}
                    variant={selectedImportance === importance ? "default" : "outline"}
                    onClick={() => setSelectedImportance(importance)}
                    className={`rounded-full text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                      selectedImportance === importance 
                        ? "bg-purple-900 text-white hover:bg-purple-800" 
                        : "bg-transparent text-purple-900 border-purple-900/20 hover:bg-purple-50 hover:border-accent"
                    }`}
                  >
                    {getImportanceIcon(importance)} {importance}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 text-gray-600 text-sm font-mono">
              {t('aiGlossary.showing', 'Affichage de')} {filteredTerms.length} {t('aiGlossary.of', 'sur')} {allAIGlossaryTerms.length} {t('aiGlossary.terms', 'termes')}
            </div>
          </div>
        </section>

        {/* Terms Grid (White Background) */}
        <section className="py-32 bg-white">
          <div className="container">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">{t('aiGlossary.noTerms', 'Aucun terme trouvé')}</p>
                <p className="text-gray-500">{t('aiGlossary.adjustFilters', 'Essayez d\'ajuster votre recherche ou vos filtres')}</p>
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

                    <div className="flex-1 flex flex-col">
                      {/* Category & Importance Badges */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-purple-100 text-accent group-hover:bg-accent group-hover:text-white transition-colors rounded-full">
                          {term.category}
                        </span>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getImportanceColor(term.importance)}`}>
                          {getImportanceIcon(term.importance)} {term.importance}
                        </span>
                      </div>

                      {/* Term Name */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors leading-tight">
                        {term.term}
                      </h3>

                      {/* Definition */}
                      <p className="text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                        {term.shortDefinition || term.definition}
                      </p>
                    </div>
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
                {t('aiGlossary.ctaTitle', 'PRÊT À TRANSFORMER<br />AVEC L\'IA?')}
              </h2>

              <p className="text-xl text-white/70 leading-relaxed mb-12">
                {t('aiGlossary.ctaDescription', 'Maintenant que vous comprenez la terminologie, discutons de la façon dont l\'IA peut stimuler la croissance de votre organisation.')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/ai-readiness-assessment">
                  <Button className="bg-white text-purple-900 hover:bg-white/90 text-lg px-10 py-7 rounded-full font-bold shadow-2xl hover:scale-[1.022] transition-all duration-300">
                    {t('aiGlossary.ctaButton1', 'Passer l\'évaluation de maturité IA')}
                  </Button>
                </a>
                <a href="/contact">
                  <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 rounded-full font-bold transition-all duration-300">
                    {t('aiGlossary.ctaButton2', 'Discuter de votre projet')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
