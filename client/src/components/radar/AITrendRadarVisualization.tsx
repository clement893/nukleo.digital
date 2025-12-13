import { useState, useRef } from 'react';

interface Technology {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Position {
  id: number;
  technologyId: number;
  date: string;
  maturityScore: number;
  impactScore: number;
  definition: string;
  useCases: string;
  maturityLevel: string;
  maturityJustification: string;
  impactBusiness: string;
  adoptionBarriers: string;
  recommendations: string;
}

interface RadarData {
  technology: Technology;
  position: Position;
}

interface AITrendRadarVisualizationProps {
  data: RadarData[];
  onTechnologyClick?: (tech: RadarData) => void;
}

export function AITrendRadarVisualization({ data, onTechnologyClick }: AITrendRadarVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedTech, setSelectedTech] = useState<RadarData | null>(null);
  const [hoveredTech, setHoveredTech] = useState<RadarData | null>(null);

  // Radar dimensions
  const width = 800;
  const height = 800;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 350;

  // Convert scores to coordinates
  // Maturity: 0-100 -> X: left to right (0 = left, 100 = right)
  // Impact: 0-100 -> Y: bottom to top (0 = bottom, 100 = top)
  const scoreToCoords = (maturity: number, impact: number) => {
    const x = centerX + ((maturity - 50) / 50) * radius;
    const y = centerY - ((impact - 50) / 50) * radius;
    return { x: Math.max(50, Math.min(width - 50, x)), y: Math.max(50, Math.min(height - 50, y)) };
  };

  const getQuadrant = (maturity: number, impact: number): string => {
    if (maturity < 50 && impact < 50) return 'Explorateurs';
    if (maturity < 50 && impact >= 50) return 'Pionniers';
    if (maturity >= 50 && impact < 50) return 'Consolidateurs';
    return 'Leaders';
  };

  const getQuadrantColor = (quadrant: string): string => {
    switch (quadrant) {
      case 'Explorateurs': return 'bg-purple-500/20 border-purple-500/50';
      case 'Pionniers': return 'bg-cyan-500/20 border-cyan-500/50';
      case 'Consolidateurs': return 'bg-yellow-500/20 border-yellow-500/50';
      case 'Leaders': return 'bg-green-500/20 border-green-500/50';
      default: return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="relative w-full">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid-trend" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid-trend)" />
          
          {/* Axes */}
          <line x1={centerX} y1={0} x2={centerX} y2={height} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1={0} y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          
          {/* Quadrant labels */}
          <text x={centerX - 100} y={centerY - 20} fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="bold">
            Impact Élevé
          </text>
          <text x={centerX + 100} y={centerY - 20} fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="bold">
            Impact Élevé
          </text>
          <text x={centerX - 100} y={centerY + 20} fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="bold">
            Impact Faible
          </text>
          <text x={centerX + 100} y={centerY + 20} fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="bold">
            Impact Faible
          </text>
          
          <text x={20} y={centerY - 10} fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="bold">
            Émergent
          </text>
          <text x={width - 100} y={centerY - 10} fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="bold">
            Établi
          </text>
          
          {/* Quadrant backgrounds */}
          <rect x={0} y={0} width={centerX} height={centerY} fill="rgba(139,92,246,0.05)" />
          <rect x={centerX} y={0} width={centerX} height={centerY} fill="rgba(34,211,238,0.05)" />
          <rect x={0} y={centerY} width={centerX} height={centerY} fill="rgba(234,179,8,0.05)" />
          <rect x={centerX} y={centerY} width={centerX} height={centerY} fill="rgba(34,197,94,0.05)" />
          
          {/* Technology bubbles */}
          {data.map((item) => {
            const { x, y } = scoreToCoords(item.position.maturityScore, item.position.impactScore);
            const quadrant = getQuadrant(item.position.maturityScore, item.position.impactScore);
            const isHovered = hoveredTech?.technology.id === item.technology.id;
            const isSelected = selectedTech?.technology.id === item.technology.id;
            
            return (
              <g key={item.technology.id}>
                <circle
                  data-tech-slug={item.technology.slug}
                  cx={x}
                  cy={y}
                  r={isSelected ? 25 : isHovered ? 20 : 15}
                  fill={isSelected ? '#8b5cf6' : isHovered ? '#a78bfa' : '#c4b5fd'}
                  stroke="white"
                  strokeWidth={isSelected ? 3 : 2}
                  opacity={isSelected ? 1 : isHovered ? 0.9 : 0.7}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredTech(item)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => {
                    setSelectedTech(item);
                    onTechnologyClick?.(item);
                  }}
                />
                {(isHovered || isSelected) && (
                  <text
                    x={x}
                    y={y - 30}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {item.technology.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Explorateurs', 'Pionniers', 'Consolidateurs', 'Leaders'].map((quadrant) => (
            <div
              key={quadrant}
              className={`p-4 rounded-lg border ${getQuadrantColor(quadrant)}`}
            >
              <h4 className="text-white font-bold mb-2">{quadrant}</h4>
              <p className="text-white/70 text-sm">
                {quadrant === 'Explorateurs' && 'Émergent + Faible Impact'}
                {quadrant === 'Pionniers' && 'Émergent + Fort Impact'}
                {quadrant === 'Consolidateurs' && 'Établi + Faible Impact'}
                {quadrant === 'Leaders' && 'Établi + Fort Impact'}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Technology Detail Panel */}
      {selectedTech && (
        <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{selectedTech.technology.name}</h3>
              <p className="text-white/70">{selectedTech.technology.description}</p>
            </div>
            <button
              onClick={() => setSelectedTech(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-white font-bold mb-2">Maturité</h4>
              <p className="text-white/70 text-sm mb-2">{selectedTech.position.maturityLevel}</p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${selectedTech.position.maturityScore}%` }}
                />
              </div>
              <p className="text-white/60 text-xs mt-2">{selectedTech.position.maturityJustification}</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-2">Impact Business</h4>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{ width: `${selectedTech.position.impactScore}%` }}
                />
              </div>
              <p className="text-white/70 text-sm mt-2">{selectedTech.position.impactBusiness}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-bold mb-3">Définition</h4>
            <p className="text-white/80 leading-relaxed">{selectedTech.position.definition}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-bold mb-3">Cas d'usage</h4>
            <div className="space-y-3">
              {JSON.parse(selectedTech.position.useCases).map((useCase: any, idx: number) => (
                <div key={idx} className="bg-white/5 p-4 rounded-lg">
                  <h5 className="text-white font-semibold mb-1">{useCase.title}</h5>
                  <p className="text-white/70 text-sm mb-2">{useCase.description}</p>
                  {useCase.examples && (
                    <div className="flex flex-wrap gap-2">
                      {useCase.examples.map((ex: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">
                          {ex}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-bold mb-3">Barrières à l'adoption</h4>
            <div className="space-y-2">
              {JSON.parse(selectedTech.position.adoptionBarriers).map((barrier: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-white/60">•</span>
                  <div>
                    <span className="text-white/80 font-semibold">{barrier.type}: </span>
                    <span className="text-white/70">{barrier.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-3">Recommandations par niveau</h4>
            <div className="space-y-3">
              {Object.entries(JSON.parse(selectedTech.position.recommendations)).map(([level, rec]: [string, any]) => (
                <div key={level} className="bg-white/5 p-4 rounded-lg">
                  <h5 className="text-white font-semibold mb-1">{level}</h5>
                  <p className="text-white/70 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
