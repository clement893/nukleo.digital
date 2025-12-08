import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { DimensionScore } from '@/lib/assessment/scoring';

interface ResultsRadarProps {
  dimensionScores: DimensionScore[];
}

export default function ResultsRadar({ dimensionScores }: ResultsRadarProps) {
  // Transform data for Recharts
  const chartData = dimensionScores.map(d => ({
    dimension: d.label,
    score: d.score,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[500px] p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth={1}
          />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}
            stroke="rgba(255, 255, 255, 0.2)"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
            stroke="rgba(255, 255, 255, 0.2)"
          />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="url(#gradientStroke)"
            fill="url(#gradientFill)"
            fillOpacity={0.6}
            strokeWidth={3}
          />
          <defs>
            <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
