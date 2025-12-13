import { useState } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { AITrendRadarVisualization } from '@/components/radar/AITrendRadarVisualization';
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

export default function AITrendRadar() {
  const { t } = useLanguage();
  const { data: radarData, isLoading, error } = trpc.radar.getCurrent.useQuery();
  const { data: latestNews, isLoading: isLoadingNews } = trpc.radar.getLatestNews.useQuery({ limit: 5 });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleTechnologyClick = (tech: any) => {
    // Scroll to detail panel (handled by RadarVisualization component)
    console.log('Selected technology:', tech);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-purple-950">
      <SEO
        title="AI Trend Radar 2025 | Tendances IA Canada | Nukleo Digital"
        description="Découvrez les tendances technologiques en intelligence artificielle pour 2025. Radar interactif des technologies IA émergentes et établies au Canada. Analysez la maturité et l'impact business de chaque technologie."
        keywords="AI trend radar, tendances IA 2025, technologies IA émergentes, AI trends Canada, radar technologique IA, maturité IA, impact business IA"
        ogImage="https://nukleo.digital/og-image.jpg"
      />
      <Header />
      
      <div className="container pt-32 pb-20">
        <Breadcrumb items={[
          { name: t('nav.resources') || 'Resources', url: '/resources' },
          { name: 'AI Trend Radar', url: '/ai-trend-radar' }
        ]} />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Radar Interactif
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">AI Trend</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Radar 2025
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Visualisez l'évolution des technologies IA selon leur maturité et leur impact business. 
            Mise à jour quotidienne avec analyse générée par IA.
          </p>
        </div>

        {/* Latest News Section */}
        {latestNews && latestNews.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Dernières nouvelles
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Mise à jour quotidienne
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  onClick={() => {
                    // Scroll to technology in radar
                    const element = document.querySelector(`[data-tech-slug="${news.technologySlug}"]`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-xs font-semibold">
                      {news.technology}
                    </span>
                    <span className="text-white/40 text-xs">
                      {new Date(news.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {news.summary}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-purple-300 text-xs font-semibold">
                    <span>En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoadingNews && (
          <div className="mb-16 flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            <span className="ml-3 text-white/70">Chargement des dernières nouvelles...</span>
          </div>
        )}

        {/* Radar Visualization */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            <span className="ml-3 text-white/70">Chargement du radar...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 text-center">
            <p className="text-red-300">Erreur lors du chargement du radar. Veuillez réessayer plus tard.</p>
          </div>
        )}

        {radarData && radarData.length > 0 && (
          <AITrendRadarVisualization data={radarData} onTechnologyClick={handleTechnologyClick} />
        )}

        {radarData && radarData.length === 0 && (
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-6 text-center">
            <p className="text-yellow-300">
              Aucune donnée disponible pour le moment. Le radar sera mis à jour quotidiennement.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Mise à jour quotidienne</h3>
            <p className="text-white/70 text-sm">
              Les positions des technologies sont analysées et mises à jour chaque jour à 2h UTC 
              grâce à l'intelligence artificielle.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Analyse approfondie</h3>
            <p className="text-white/70 text-sm">
              Chaque technologie inclut une analyse détaillée : cas d'usage, barrières à l'adoption, 
              et recommandations par niveau de maturité organisationnelle.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Focus Canada</h3>
            <p className="text-white/70 text-sm">
              Analyses adaptées au marché canadien francophone avec terminologie et exemples 
              pertinents pour les entreprises québécoises et canadiennes.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
