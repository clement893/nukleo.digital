import { useState } from 'react';
import type { Technology } from '@/lib/radar/technologies';

interface RadarVisualizationProps {
  technologies: Technology[];
  onTechClick?: (techId: string) => void;
}

export function RadarVisualization({ technologies, onTechClick }: RadarVisualizationProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Radar dimensions
  const width = 800;
  const height = 800;
  const centerX = width / 2;
  const centerY = height / 2;

  // Convert radar position (0-100) to SVG coordinates
  const positionToCoords = (pos: { x: number; y: number }) => {
    // x: 0-100 (left to right), y: 0-100 (bottom to top)
    const x = (pos.x / 100) * width;
    const y = height - (pos.y / 100) * height;
    return { x: Math.max(20, Math.min(width - 20, x)), y: Math.max(20, Math.min(height - 20, y)) };
  };

  const getMaturityColor = (color: string) => {
    switch (color) {
      case 'green': return '#10b981';
      case 'yellow': return '#f59e0b';
      case 'blue': return '#3b82f6';
      case 'red': return '#ef4444';
      default: return '#8b5cf6';
    }
  };

  return (
    <div className="relative w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
      >
        {/* Grid */}
        <defs>
          <pattern id="grid-radar" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid-radar)" />
        
        {/* Axes */}
        <line x1={centerX} y1={0} x2={centerX} y2={height} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line x1={0} y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        
        {/* Technology dots */}
        {technologies.map((tech) => {
          const { x, y } = positionToCoords(tech.radarPosition);
          const isHovered = hoveredTech === tech.id;
          
          return (
            <g key={tech.id}>
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 12 : 8}
                fill={getMaturityColor(tech.maturityColor)}
                stroke="white"
                strokeWidth={isHovered ? 3 : 2}
                opacity={isHovered ? 1 : 0.8}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredTech(tech.id)}
                onMouseLeave={() => setHoveredTech(null)}
                onClick={() => onTechClick?.(tech.id)}
              />
              {isHovered && (
                <text
                  x={x}
                  y={y - 20}
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {tech.title}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
