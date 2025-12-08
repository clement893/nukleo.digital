import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import { X } from 'lucide-react';

interface Technology {
  id: string;
  name: string;
  category: string;
  position: {
    maturity: number;
    impact: number;
  };
  quadrant: string;
  summary: string;
  description: string;
  useCases: Array<{
    title: string;
    description: string;
    example: string;
  }>;
  maturityLevel: {
    score: number;
    label: string;
    rationale: string;
  };
  businessImpact: {
    score: number;
    label: string;
    rationale: string;
    quantified: string;
  };
  adoptionBarriers: Array<{
    type: string;
    description: string;
    severity: string;
  }>;
  recommendations: {
    explorateur: string;
    experimentateur: string;
    adopteur: string;
    integrateur: string;
    leader: string;
  };
}

interface RadarData {
  version: string;
  publishedDate: string;
  technologies: Technology[];
  insights: {
    monthlyHighlights: string[];
    trendAnalysis: string;
  };
}

const QUADRANT_COLORS = {
  explorateurs: '#64748B',
  pionniers: '#7C3AED',
  consolidateurs: '#14B8A6',
  leaders: '#EC4899'
};

const QUADRANT_LABELS = {
  explorateurs: 'Explorateurs',
  pionniers: 'Pionniers',
  consolidateurs: 'Consolidateurs',
  leaders: 'Leaders'
};

export default function TrendRadar() {
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/radar-2024-12.json')
      .then(res => res.json())
      .then(data => {
        setRadarData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load radar data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-white/60">Chargement du radar...</div>
      </div>
    );
  }

  if (!radarData) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-white/60">Erreur de chargement du radar</div>
      </div>
    );
  }

  const chartData = radarData.technologies.map(tech => ({
    ...tech,
    x: tech.position.maturity,
    y: tech.position.impact,
    z: 400 // Taille des bulles
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const tech = payload[0].payload;
      return (
        <div className="glass p-4 rounded-lg max-w-xs">
          <p className="font-bold text-white mb-1">{tech.name}</p>
          <p className="text-sm text-white/70">{tech.summary}</p>
          <p className="text-xs text-white/50 mt-2">Cliquez pour plus de détails</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-20 relative">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI TREND RADAR
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Cartographie interactive des technologies IA émergentes et établies. 
            Mise à jour mensuelle pour guider vos décisions d'investissement technologique.
          </p>
        </div>

        {/* Radar Chart */}
        <div className="glass p-8 rounded-2xl mb-8">
          <ResponsiveContainer width="100%" height={600}>
            <ScatterChart margin={{ top: 40, right: 40, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              
              {/* Axes */}
              <XAxis 
                type="number" 
                dataKey="x" 
                domain={[0, 100]} 
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              >
                <Label 
                  value="Maturité Technologique →" 
                  position="bottom" 
                  offset={20}
                  style={{ fill: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600 }}
                />
              </XAxis>
              
              <YAxis 
                type="number" 
                dataKey="y" 
                domain={[0, 100]} 
                stroke="rgba(255,255,255,0.3)"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              >
                <Label 
                  value="Impact Business →" 
                  angle={-90} 
                  position="left" 
                  offset={20}
                  style={{ fill: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600 }}
                />
              </YAxis>
              
              <ZAxis type="number" dataKey="z" range={[400, 400]} />
              
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              
              {/* Technology Bubbles */}
              <Scatter 
                data={chartData} 
                onClick={(data) => setSelectedTech(data)}
                style={{ cursor: 'pointer' }}
              >
                {chartData.map((tech, index) => (
                  <Cell 
                    key={tech.id} 
                    fill={QUADRANT_COLORS[tech.quadrant as keyof typeof QUADRANT_COLORS]}
                    opacity={0.8}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>

          {/* Quadrant Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {Object.entries(QUADRANT_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: QUADRANT_COLORS[key as keyof typeof QUADRANT_COLORS] }}
                />
                <span className="text-sm text-white/80">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Insights */}
        <div className="glass p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">Tendances du Mois</h3>
          <ul className="space-y-2">
            {radarData.insights.monthlyHighlights.map((highlight, index) => (
              <li key={index} className="text-white/70 flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technology Detail Panel */}
      {selectedTech && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: QUADRANT_COLORS[selectedTech.quadrant as keyof typeof QUADRANT_COLORS] }}
                    />
                    <span className="text-sm text-white/60 uppercase tracking-wider">{selectedTech.category}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedTech.name}</h2>
                  <p className="text-lg text-white/70">{selectedTech.summary}</p>
                </div>
                <button 
                  onClick={() => setSelectedTech(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                <p className="text-white/70 leading-relaxed">{selectedTech.description}</p>
              </div>

              {/* Use Cases */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Cas d'Usage</h3>
                <div className="space-y-4">
                  {selectedTech.useCases.map((useCase, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">{useCase.title}</h4>
                      <p className="text-sm text-white/70 mb-2">{useCase.description}</p>
                      <p className="text-xs text-accent italic">{useCase.example}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maturity & Impact */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Niveau de Maturité</h3>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Score</span>
                      <span className="font-bold text-white">{selectedTech.maturityLevel.score}/100</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${selectedTech.maturityLevel.score}%` }}
                      />
                    </div>
                    <p className="text-sm text-white/70">{selectedTech.maturityLevel.rationale}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Impact Business</h3>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Score</span>
                      <span className="font-bold text-white">{selectedTech.businessImpact.score}/100</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${selectedTech.businessImpact.score}%` }}
                      />
                    </div>
                    <p className="text-sm text-white/70 mb-2">{selectedTech.businessImpact.rationale}</p>
                    <p className="text-xs text-accent font-semibold">{selectedTech.businessImpact.quantified}</p>
                  </div>
                </div>
              </div>

              {/* Adoption Barriers */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Barrières à l'Adoption</h3>
                <div className="space-y-2">
                  {selectedTech.adoptionBarriers.map((barrier, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                      <span className={`text-xs px-2 py-1 rounded uppercase font-semibold ${
                        barrier.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        barrier.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {barrier.severity}
                      </span>
                      <div>
                        <span className="text-sm font-semibold text-white capitalize">{barrier.type}</span>
                        <p className="text-sm text-white/70">{barrier.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Recommandations par Niveau de Maturité</h3>
                <div className="space-y-3">
                  {Object.entries(selectedTech.recommendations).map(([level, recommendation]) => (
                    <div key={level} className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-accent capitalize mb-2">{level}</h4>
                      <p className="text-sm text-white/70">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
