export type Dimension = 
  | 'strategy'
  | 'data'
  | 'technology'
  | 'talent'
  | 'governance'
  | 'culture';

export interface QuestionOption {
  label: string;
  points: number;
}

export interface Question {
  id: number;
  dimension: Dimension;
  question: string;
  options: QuestionOption[];
}

// Type for translation function
type TFunction = (key: string) => string;

// Helper function to get translated questions
export function getTranslatedQuestions(t: TFunction): Question[] {
  return QUESTIONS.map(q => ({
    ...q,
    question: t(`assessment.questions.${q.id}.question`) || q.question,
    options: q.options.map(opt => ({
      ...opt,
      label: t(`assessment.questions.${q.id}.options.${opt.points}`) || opt.label,
    })),
  }));
}

// Helper function to get translated dimension labels
export function getTranslatedDimensionLabels(t: TFunction): Record<Dimension, string> {
  return {
    strategy: t('assessment.dimensions.strategy') || DIMENSION_LABELS.strategy,
    data: t('assessment.dimensions.data') || DIMENSION_LABELS.data,
    technology: t('assessment.dimensions.technology') || DIMENSION_LABELS.technology,
    talent: t('assessment.dimensions.talent') || DIMENSION_LABELS.talent,
    governance: t('assessment.dimensions.governance') || DIMENSION_LABELS.governance,
    culture: t('assessment.dimensions.culture') || DIMENSION_LABELS.culture,
  };
}

export const QUESTIONS: Question[] = [
  // DIMENSION 1: Strategy & Vision (3 questions)
  {
    id: 1,
    dimension: 'strategy',
    question: 'What is your organization\'s vision regarding AI?',
    options: [
      { label: 'No formalized vision', points: 0 },
      { label: 'Vision being defined', points: 25 },
      { label: 'Documented vision but not communicated', points: 50 },
      { label: 'Clear vision communicated to leadership team', points: 75 },
      { label: 'AI vision integrated into enterprise strategy and communicated to all', points: 100 },
    ],
  },
  {
    id: 2,
    dimension: 'strategy',
    question: 'Have you identified priority AI use cases?',
    options: [
      { label: 'No, no identification', points: 0 },
      { label: 'Some informal ideas', points: 25 },
      { label: 'List of potential use cases', points: 50 },
      { label: 'Prioritized use cases with estimated ROI', points: 75 },
      { label: 'Detailed roadmap with validated and budgeted use cases', points: 100 },
    ],
  },
  {
    id: 3,
    dimension: 'strategy',
    question: 'What is the level of leadership engagement towards AI?',
    options: [
      { label: 'No interest or skepticism', points: 0 },
      { label: 'Passive curiosity', points: 25 },
      { label: 'Active interest but no allocated budget', points: 50 },
      { label: 'Executive sponsor identified with exploratory budget', points: 75 },
      { label: 'C-level champion with strategic budget and KPIs', points: 100 },
    ],
  },

  // DIMENSION 2: Data Infrastructure (3 questions)
  {
    id: 4,
    dimension: 'data',
    question: 'What is the quality of your data?',
    options: [
      { label: 'Fragmented, unstructured data, unknown quality', points: 0 },
      { label: 'Partially structured data, variable quality', points: 25 },
      { label: 'Structured data but departmental silos', points: 50 },
      { label: 'Centralized data with basic governance', points: 75 },
      { label: 'Unified data lake/warehouse with data quality monitoring', points: 100 },
    ],
  },
  {
    id: 5,
    dimension: 'data',
    question: 'Do you have a modern data infrastructure?',
    options: [
      { label: 'Legacy systems, no cloud', points: 0 },
      { label: 'Cloud migration in progress, hybrid infrastructure', points: 25 },
      { label: 'Cloud infrastructure but not optimized for AI', points: 50 },
      { label: 'Cloud infrastructure with ML capabilities', points: 75 },
      { label: 'Modern data platform (Snowflake, Databricks, etc.) + MLOps', points: 100 },
    ],
  },
  {
    id: 6,
    dimension: 'data',
    question: 'Do you collect and store real-time data?',
    options: [
      { label: 'No, batch data only', points: 0 },
      { label: 'Some ad hoc real-time flows', points: 25 },
      { label: 'Streaming data for certain use cases', points: 50 },
      { label: 'Robust streaming infrastructure (Kafka, etc.)', points: 75 },
      { label: 'Real-time data platform with event-driven architecture', points: 100 },
    ],
  },

  // DIMENSION 3: Technology Capabilities (4 questions)
  {
    id: 7,
    dimension: 'technology',
    question: 'Have you already deployed AI/ML solutions in production?',
    options: [
      { label: 'No, no experience', points: 0 },
      { label: 'Pilot projects or POCs only', points: 25 },
      { label: '1-2 models in production', points: 50 },
      { label: '3-5 models in production with monitoring', points: 75 },
      { label: '5+ models in production with mature MLOps', points: 100 },
    ],
  },
  {
    id: 8,
    dimension: 'technology',
    question: 'What is your technological integration capacity?',
    options: [
      { label: 'Monolithic systems difficult to integrate', points: 0 },
      { label: 'Limited APIs, manual integrations', points: 25 },
      { label: 'SOA architecture with documented APIs', points: 50 },
      { label: 'Microservices with API management', points: 75 },
      { label: 'Cloud-native architecture with event-driven patterns', points: 100 },
    ],
  },
  {
    id: 9,
    dimension: 'technology',
    question: 'Do you use generative AI tools (GPT, Claude, etc.)?',
    options: [
      { label: 'No, no usage', points: 0 },
      { label: 'Unstructured individual usage', points: 25 },
      { label: 'Departmental pilots with guidelines', points: 50 },
      { label: 'Organizational deployment with governance', points: 75 },
      { label: 'Enterprise GenAI platform with fine-tuning and RAG', points: 100 },
    ],
  },
  {
    id: 10,
    dimension: 'technology',
    question: 'What is your cloud infrastructure maturity?',
    options: [
      { label: 'On-premise only, no cloud strategy', points: 0 },
      { label: 'Basic cloud adoption (IaaS)', points: 25 },
      { label: 'Cloud-first with PaaS services', points: 50 },
      { label: 'Multi-cloud with orchestration', points: 75 },
      { label: 'Cloud-native with serverless and containers', points: 100 },
    ],
  },

  // DIMENSION 4: Talent & Skills (3 questions)
  {
    id: 11,
    dimension: 'talent',
    question: 'Do you have AI/ML skills in-house?',
    options: [
      { label: 'No AI skills', points: 0 },
      { label: '1-2 people with basic knowledge', points: 25 },
      { label: 'Small data science team (3-5 people)', points: 50 },
      { label: 'Structured AI team (data scientists, ML engineers)', points: 75 },
      { label: 'AI center of excellence with multidisciplinary specialists', points: 100 },
    ],
  },
  {
    id: 12,
    dimension: 'talent',
    question: 'Do you invest in AI training?',
    options: [
      { label: 'No training', points: 0 },
      { label: 'Ad hoc training for a few people', points: 25 },
      { label: 'Training program for technical team', points: 50 },
      { label: 'Extended training program (business + tech)', points: 75 },
      { label: 'Internal AI academy with certifications and continuous upskilling', points: 100 },
    ],
  },
  {
    id: 13,
    dimension: 'talent',
    question: 'Do you collaborate with external AI partners?',
    options: [
      { label: 'No, no partnership', points: 0 },
      { label: 'Occasional consultations', points: 25 },
      { label: 'Partnership with 1 provider', points: 50 },
      { label: 'Ecosystem of partners (consultants, vendors, universities)', points: 75 },
      { label: 'Strategic partnerships with co-innovation', points: 100 },
    ],
  },

  // DIMENSION 5: Processes & Governance (3 questions)
  {
    id: 14,
    dimension: 'governance',
    question: 'Do you have AI governance processes?',
    options: [
      { label: 'No governance', points: 0 },
      { label: 'Informal guidelines', points: 25 },
      { label: 'Documented policies but not applied', points: 50 },
      { label: 'Governance framework with AI committee', points: 75 },
      { label: 'Mature governance with regular audits and compliance', points: 100 },
    ],
  },
  {
    id: 15,
    dimension: 'governance',
    question: 'How do you manage AI ethics and bias?',
    options: [
      { label: 'No ethical consideration', points: 0 },
      { label: 'Basic awareness', points: 25 },
      { label: 'Documented ethical principles', points: 50 },
      { label: 'Ethical review process for AI projects', points: 75 },
      { label: 'Complete ethical framework with bias testing and audits', points: 100 },
    ],
  },
  {
    id: 16,
    dimension: 'governance',
    question: 'Do you have MLOps processes?',
    options: [
      { label: 'Ad hoc manual deployments', points: 0 },
      { label: 'Basic deployment scripts', points: 25 },
      { label: 'CI/CD for ML models', points: 50 },
      { label: 'MLOps with monitoring and retraining', points: 75 },
      { label: 'Mature MLOps platform (Kubeflow, MLflow, etc.)', points: 100 },
    ],
  },

  // DIMENSION 6: Culture & Change Management (4 questions)
  {
    id: 17,
    dimension: 'culture',
    question: 'What is your employees\' attitude towards AI?',
    options: [
      { label: 'Resistance or widespread fear', points: 0 },
      { label: 'Skepticism or indifference', points: 25 },
      { label: 'Curiosity but wait-and-see', points: 50 },
      { label: 'Active interest and willingness to experiment', points: 75 },
      { label: 'Enthusiasm and AI innovation culture', points: 100 },
    ],
  },
  {
    id: 18,
    dimension: 'culture',
    question: 'Do you encourage AI experimentation?',
    options: [
      { label: 'No, risk-averse culture', points: 0 },
      { label: 'Experimentation tolerated but not encouraged', points: 25 },
      { label: 'Limited innovation budget', points: 50 },
      { label: 'Innovation program with dedicated time', points: 75 },
      { label: '"Fail fast" culture with hackathons and AI sandbox', points: 100 },
    ],
  },
  {
    id: 19,
    dimension: 'culture',
    question: 'Do you communicate about your AI initiatives?',
    options: [
      { label: 'No communication', points: 0 },
      { label: 'Ad hoc communication', points: 25 },
      { label: 'Regular updates to leadership team', points: 50 },
      { label: 'Regular internal communication (newsletters, townhalls)', points: 75 },
      { label: 'Internal + external communication (blog, conferences, case studies)', points: 100 },
    ],
  },
  {
    id: 20,
    dimension: 'culture',
    question: 'Do you have a change management strategy for AI adoption?',
    options: [
      { label: 'No change management', points: 0 },
      { label: 'Basic communication plan', points: 25 },
      { label: 'Structured change management for key projects', points: 50 },
      { label: 'Comprehensive change management with training and support', points: 75 },
      { label: 'Proactive change management with champions network and continuous feedback', points: 100 },
    ],
  },
];

export const DIMENSION_LABELS: Record<Dimension, string> = {
  strategy: 'Strategy & Vision',
  data: 'Data Infrastructure',
  technology: 'Technology Capabilities',
  talent: 'Talent & Skills',
  governance: 'Processes & Governance',
  culture: 'Culture & Change',
};

// Contextual questions (asked before main assessment)
export interface ContextualQuestion {
  id: string;
  question: string;
  type: 'select' | 'radio';
  options: { label: string; value: string }[];
}

export const CONTEXTUAL_QUESTIONS: ContextualQuestion[] = [
  {
    id: 'companySize',
    question: 'Quelle est la taille de votre organisation?',
    type: 'radio',
    options: [
      { label: '1-10 employés', value: '1-10' },
      { label: '11-50 employés', value: '11-50' },
      { label: '51-200 employés', value: '51-200' },
      { label: '201-1000 employés', value: '201-1000' },
      { label: '+1000 employés', value: '1000+' },
    ],
  },
  {
    id: 'industry',
    question: 'Dans quel secteur opérez-vous?',
    type: 'select',
    options: [
      { label: 'E-commerce & Retail', value: 'ecommerce-retail' },
      { label: 'Services financiers', value: 'financial-services' },
      { label: 'Santé & Pharma', value: 'healthcare-pharma' },
      { label: 'Manufacturing', value: 'manufacturing' },
      { label: 'Services professionnels', value: 'professional-services' },
      { label: 'Technologie SaaS', value: 'saas-tech' },
      { label: 'Autre', value: 'other' },
    ],
  },
];
