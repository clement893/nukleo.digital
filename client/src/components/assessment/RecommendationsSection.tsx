import { AssessmentResults } from '@/lib/assessment/scoring';
import { getRecommendationsForLevel, type Recommendation } from '@/lib/assessment/recommendations';
import { CheckCircle, Clock, TrendingUp, Target } from 'lucide-react';

interface RecommendationsSectionProps {
  results: AssessmentResults;
}

export default function RecommendationsSection({ results }: RecommendationsSectionProps) {
  const recommendations = getRecommendationsForLevel(results.maturityLevel);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-blue-400';
      default: return 'text-white/60';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="space-y-8">
      {/* Characteristics */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-white font-bold text-xl">Caractéristiques de votre niveau</h3>
        </div>
        <ul className="space-y-2">
          {recommendations.characteristics.map((char, idx) => (
            <li key={idx} className="flex items-start gap-3 text-white/80">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span>{char}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Recommendations */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-white font-bold text-xl">Recommandations prioritaires</h3>
        </div>
        <div className="space-y-6">
          {recommendations.topRecommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-white font-semibold text-lg flex-1">{rec.title}</h4>
                <div className="flex gap-2 ml-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(rec.impact)} bg-white/5`}>
                    Impact: {rec.impact}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getEffortColor(rec.effort)} bg-white/5`}>
                    Effort: {rec.effort}
                  </span>
                </div>
              </div>
              <p className="text-white/70 mb-3 leading-relaxed">{rec.description}</p>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Clock className="w-4 h-4" />
                <span>Timeline: {rec.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="p-6 bg-gradient-to-r from-violet-500/10 to-rose-500/10 backdrop-blur-xl border border-white/10 rounded-2xl">
        <h3 className="text-white font-bold text-xl mb-4">Prochaines étapes</h3>
        <div className="space-y-3">
          {recommendations.nextSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-sm">
                {idx + 1}
              </div>
              <div className="flex-1">
                <span className="text-white font-medium">{step.title}</span>
                <span className="text-white/60 text-sm ml-2">({step.duration})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
