import { QUESTIONS, Dimension, DIMENSION_LABELS } from './questions';

export interface DimensionScore {
  dimension: Dimension;
  label: string;
  score: number;
  fullMark: number;
}

export interface AssessmentResults {
  dimensionScores: DimensionScore[];
  globalScore: number;
  maturityLevel: MaturityLevel;
  maturityDescription: string;
}

export type MaturityLevel = 'Explorer' | 'Experimenter' | 'Adopter' | 'Integrator' | 'AI Leader';

export const MATURITY_LEVELS: Record<MaturityLevel, { min: number; max: number; description: string; color: string }> = {
  'Explorer': {
    min: 0,
    max: 20,
    description: 'No formal AI initiative. Fragmented data. No AI skills. Traditional culture.',
    color: '#ef4444', // red
  },
  'Experimenter': {
    min: 20,
    max: 40,
    description: 'Pilot projects underway. Partially structured data. 1-2 people with AI skills. Growing interest.',
    color: '#f59e0b', // orange
  },
  'Adopter': {
    min: 40,
    max: 60,
    description: '1-2 AI solutions in production. Established cloud infrastructure. Data science team in place.',
    color: '#eab308', // yellow
  },
  'Integrator': {
    min: 60,
    max: 80,
    description: '3-5 AI solutions in production. Mature data platform. Multidisciplinary AI team. Established governance.',
    color: '#84cc16', // lime
  },
  'AI Leader': {
    min: 80,
    max: 100,
    description: '5+ AI solutions in production. AI-native architecture. Mature center of excellence. Innovation culture.',
    color: '#22c55e', // green
  },
};

export function calculateScores(answers: Record<number, number>): AssessmentResults {
  // Group questions by dimension
  const dimensionQuestions = QUESTIONS.reduce((acc, question) => {
    if (!acc[question.dimension]) {
      acc[question.dimension] = [];
    }
    acc[question.dimension].push(question);
    return acc;
  }, {} as Record<Dimension, typeof QUESTIONS>);

  // Calculate score for each dimension
  const dimensionScores: DimensionScore[] = Object.entries(dimensionQuestions).map(([dimension, questions]) => {
    const totalPoints = questions.reduce((sum, q) => {
      const answer = answers[q.id];
      return sum + (answer ?? 0);
    }, 0);

    const maxPoints = questions.length * 100;
    const score = Math.round((totalPoints / maxPoints) * 100);

    return {
      dimension: dimension as Dimension,
      label: DIMENSION_LABELS[dimension as Dimension],
      score,
      fullMark: 100,
    };
  });

  // Calculate global score (average of all dimensions)
  const globalScore = Math.round(
    dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length
  );

  // Determine maturity level
  const maturityLevel = getMaturityLevel(globalScore);
  const maturityDescription = MATURITY_LEVELS[maturityLevel].description;

  return {
    dimensionScores,
    globalScore,
    maturityLevel,
    maturityDescription,
  };
}

export function getMaturityLevel(score: number): MaturityLevel {
  if (score < 20) return 'Explorer';
  if (score < 40) return 'Experimenter';
  if (score < 60) return 'Adopter';
  if (score < 80) return 'Integrator';
  return 'AI Leader';
}

export function getMaturityColor(level: MaturityLevel): string {
  return MATURITY_LEVELS[level].color;
}

export function getScoreColor(score: number): string {
  if (score < 40) return '#ef4444'; // red
  if (score < 70) return '#eab308'; // yellow
  return '#22c55e'; // green
}
