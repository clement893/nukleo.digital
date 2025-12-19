import { AssessmentResults, getMaturityColor, getScoreColor, getTranslatedMaturityLevel } from '@/lib/assessment/scoring';
import { Trophy, TrendingUp, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResultsSummaryProps {
  results: AssessmentResults;
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  const { t } = useLanguage();
  const maturityColor = getMaturityColor(results.maturityLevel);
  const translatedMaturity = getTranslatedMaturityLevel(results.maturityLevel, t);

  return (
    <div className="space-y-6">
      {/* Global Score */}
      <div className="text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
          <Trophy className="w-8 h-8 text-accent" />
        </div>
        
        <h3 className="text-white/60 text-sm font-mono uppercase tracking-wider mb-2">
          {t('assessment.resultsSummary.yourScore') || 'Your AI Readiness Score'}
        </h3>
        
        <div className="text-7xl font-bold mb-4" style={{ color: getScoreColor(results.globalScore) }}>
          {results.globalScore}
          <span className="text-3xl text-white/40">/100</span>
        </div>

        <div 
          className="inline-block px-6 py-3 rounded-full font-bold text-lg"
          style={{ 
            backgroundColor: `${maturityColor}20`,
            color: maturityColor,
            border: `2px solid ${maturityColor}40`
          }}
        >
          {translatedMaturity.label}
        </div>
      </div>

      {/* Maturity Description */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">{t('assessment.resultsSummary.whatThisMeans') || 'What This Means'}</h4>
            <p className="text-white/70 leading-relaxed">
              {results.maturityDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <h4 className="text-white font-bold">{t('assessment.resultsSummary.dimensionScores') || 'Dimension Scores'}</h4>
        </div>

        <div className="space-y-4">
          {results.dimensionScores.map((dim) => (
            <div key={dim.dimension}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 font-medium">{dim.label}</span>
                <span 
                  className="font-bold font-mono"
                  style={{ color: getScoreColor(dim.score) }}
                >
                  {dim.score}/100
                </span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${dim.score}%`,
                    backgroundColor: getScoreColor(dim.score),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
