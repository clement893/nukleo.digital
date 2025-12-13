// FAQ data - simple structure
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  categoryKey: string;
}

// FAQ data in English
const faqDataEn: FAQItem[] = [
  {
    question: "What is agentic AI and how does it differ from generative AI?",
    answer: "Agentic AI refers to autonomous systems capable of reasoning, planning, and executing complex actions to achieve specific goals. Unlike generative AI (like ChatGPT) which simply generates content in response to prompts, AI agents can make decisions, use tools, access real-time data, and orchestrate multi-step workflows.",
    category: "Agentic AI",
    categoryKey: "agenticAI"
  },
  {
    question: "How do multi-agent systems work?",
    answer: "Multi-agent systems consist of multiple specialized AI agents that collaborate to accomplish complex tasks. Each agent has specific expertise (research, analysis, writing, validation) and communicates with others via a central orchestrator.",
    category: "Agentic AI",
    categoryKey: "agenticAI"
  },
  {
    question: "What's the difference between a chatbot and an AI agent?",
    answer: "A traditional chatbot follows a predefined script with fixed decision trees. An AI agent, on the other hand, has reasoning, planning, and tool-using capabilities. It can understand intent behind complex requests, break down problems into sub-tasks, and adapt its approach based on intermediate results.",
    category: "Agentic AI",
    categoryKey: "agenticAI"
  },
  {
    question: "How long does it take to implement agentic AI?",
    answer: "Our accelerated methodology deploys a first operational agent in 90 days with our 3-phase roadmap: Phase 1 (30 days) - Discovery and architecture, Phase 2 (30 days) - Development and integration, Phase 3 (30 days) - Testing and deployment.",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "What are the most common implementation challenges?",
    answer: "The three major challenges are: 1) Data quality (67% of AI failures are due to incomplete, unstructured, or biased data), 2) Organizational change resistance, and 3) Integration with existing systems (ERP, CRM, legacy databases).",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "How do you move from pilot to scale?",
    answer: "95% of companies remain stuck in 'perpetual pilot' mode. To successfully scale, follow these 5 steps: 1) Define scalable architecture from the pilot, 2) Rigorously measure business KPIs, 3) Document processes and create reusable playbooks, 4) Train teams on adoption, 5) Industrialize deployment with CI/CD.",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "Is my company ready for agentic AI?",
    answer: "Three key readiness indicators: 1) Are your data accessible and of reasonable quality? 2) Do you have repetitive processes that consume a lot of time? 3) Is your leadership aligned on a transformation vision? If you answer yes to 2 out of 3, you're ready to start.",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "What is the typical ROI of agentic AI?",
    answer: "Organizations implementing agentic AI observe on average: 10-15% productivity increase, 30-50% reduction in operational costs, and 20-35% revenue increase. ROI becomes positive between 6 and 18 months depending on use case complexity.",
    category: "ROI",
    categoryKey: "roi"
  },
  {
    question: "How do you measure the success of an AI agent?",
    answer: "We measure success on 3 dimensions: 1) Business metrics (cost reduction, revenue increase, customer satisfaction), 2) Technical metrics (accuracy, response time, error rate), 3) Adoption metrics (usage rate, user satisfaction, escalation to humans).",
    category: "ROI",
    categoryKey: "roi"
  },
  {
    question: "What investment is required to get started?",
    answer: "Investment varies by scope: Simple agent (single use case, basic integration): $50K-$100K, Complex agent (multi-step workflows, multiple integrations): $100K-$250K, Multi-agent system: $250K-$500K+. We also offer a 'Proof of Value' approach starting with a $25K-$50K pilot.",
    category: "ROI",
    categoryKey: "roi"
  },
  {
    question: "What technologies do you use?",
    answer: "Our tech stack combines the best tools: LLMs (OpenAI GPT-4, Anthropic Claude, Google Gemini), Agent frameworks (LangChain, LangGraph, AutoGen, CrewAI), Vector databases (Pinecone, Weaviate, Qdrant), Cloud infrastructure (AWS, Azure, GCP), and Integration tools (APIs, webhooks, ETL).",
    category: "Technical",
    categoryKey: "technical"
  },
  {
    question: "How do you ensure data security and privacy?",
    answer: "Security is built into every layer: 1) Data encryption (at rest and in transit with AES-256 and TLS 1.3), 2) Access control (role-based authentication), 3) Data isolation (your data never mixes with other clients), 4) Compliance (GDPR, CCPA, SOC 2, HIPAA), 5) Audit and monitoring.",
    category: "Technical",
    categoryKey: "technical"
  },
  {
    question: "Can AI agents make mistakes? How do you control them?",
    answer: "Yes, AI agents can make mistakes, which is why we implement multiple control layers: 1) Confidence thresholds (agent escalates to human if confidence < 85%), 2) Validation rules, 3) Human-in-the-loop for sensitive decisions, 4) Continuous monitoring, 5) Feedback loops.",
    category: "Technical",
    categoryKey: "technical"
  },
  {
    question: "What are the most impactful use cases?",
    answer: "The 5 use cases with the best ROI: 1) Intelligent customer support (60-80% of requests automated), 2) Lead qualification and nurturing (+40% conversion rate), 3) Document processing (90% time reduction), 4) Marketing content generation (3x volume), 5) Internal employee assistant (+15% productivity).",
    category: "Use Cases",
    categoryKey: "useCases"
  },
  {
    question: "Can agentic AI completely replace my customer support?",
    answer: "No, and that's not the goal. The optimal approach is AI-human collaboration: AI agents handle 60-80% of volume (frequent questions, simple requests, repetitive tasks) 24/7, while human agents focus on the 20-40% of complex cases that are emotionally sensitive or require creativity and empathy.",
    category: "Use Cases",
    categoryKey: "useCases"
  },
  {
    question: "How can agentic AI improve my marketing?",
    answer: "Agentic AI transforms marketing on 4 axes: 1) Large-scale content generation (3x volume with consistent quality), 2) Dynamic personalization (real-time content adaptation), 3) Continuous ad optimization (40-60% improvement), 4) Predictive analytics (identify high-potential leads, forecast trends).",
    category: "Use Cases",
    categoryKey: "useCases"
  },
  {
    question: "What differentiates Nukleo from other AI agencies?",
    answer: "Three key differentiators: 1) Deep technical expertise (senior ML/AI engineers, cloud architects, product specialists), 2) Exclusive focus on agentic AI (we specialize in autonomous agents and multi-agent systems), 3) End-to-end AI-native approach (we don't just plug ChatGPT into your site, we rearchitect your processes).",
    category: "About Nukleo",
    categoryKey: "aboutNukleo"
  },
  {
    question: "Do you offer training for our teams?",
    answer: "Yes, training is an integral part of every project. We offer: 1) Executive workshops (4h for leadership), 2) Technical training (2 days for dev/data teams), 3) End-user training (1 day for operational teams), 4) Train-the-trainer program (to create internal champions).",
    category: "About Nukleo",
    categoryKey: "aboutNukleo"
  },
  {
    question: "Where are you located and do you work remotely?",
    answer: "We are based in Montreal (Quebec) and Halifax (Nova Scotia), with clients across Canada and internationally. We operate in hybrid mode: in-person strategic meetings for discovery and key milestones, and remote collaboration for daily development and support.",
    category: "About Nukleo",
    categoryKey: "aboutNukleo"
  }
];

// FAQ data in French
const faqDataFr: FAQItem[] = [
  {
    question: "Qu'est-ce que l'IA agentique et en quoi diffère-t-elle de l'IA générative ?",
    answer: "L'IA agentique fait référence à des systèmes autonomes capables de raisonner, planifier et exécuter des actions complexes pour atteindre des objectifs spécifiques. Contrairement à l'IA générative (comme ChatGPT) qui génère simplement du contenu en réponse à des invites, les agents IA peuvent prendre des décisions, utiliser des outils, accéder à des données en temps réel et orchestrer des flux de travail multi-étapes.",
    category: "IA agentique",
    categoryKey: "agenticAI"
  },
  {
    question: "Comment fonctionnent les systèmes multi-agents ?",
    answer: "Les systèmes multi-agents consistent en plusieurs agents IA spécialisés qui collaborent pour accomplir des tâches complexes. Chaque agent a une expertise spécifique (recherche, analyse, rédaction, validation) et communique avec les autres via un orchestrateur central.",
    category: "IA agentique",
    categoryKey: "agenticAI"
  },
  {
    question: "Quelle est la différence entre un chatbot et un agent IA ?",
    answer: "Un chatbot traditionnel suit un script prédéfini avec des arbres de décision fixes. Un agent IA, en revanche, possède des capacités de raisonnement, de planification et d'utilisation d'outils. Il peut comprendre l'intention derrière une demande complexe, décomposer le problème en sous-tâches et adapter son approche en fonction des résultats intermédiaires.",
    category: "IA agentique",
    categoryKey: "agenticAI"
  },
  {
    question: "Combien de temps faut-il pour implémenter l'IA agentique ?",
    answer: "Notre méthodologie accélérée déploie un premier agent opérationnel en 90 jours avec notre feuille de route en 3 phases : Phase 1 (30 jours) - Découverte et architecture, Phase 2 (30 jours) - Développement et intégration, Phase 3 (30 jours) - Tests et déploiement.",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "Quels sont les défis d'implémentation les plus courants ?",
    answer: "Les trois défis majeurs sont : 1) La qualité des données (67% des échecs de l'IA sont dus à des données incomplètes, non structurées ou biaisées), 2) La résistance au changement organisationnel, et 3) L'intégration avec les systèmes existants (ERP, CRM, bases de données legacy).",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "Comment passer du pilote à l'échelle ?",
    answer: "95% des entreprises restent bloquées en mode 'pilote perpétuel'. Pour réussir la mise à l'échelle, suivez ces 5 étapes : 1) Définir une architecture évolutive dès le pilote, 2) Mesurer rigoureusement les KPI commerciaux, 3) Documenter les processus et créer des playbooks réutilisables, 4) Former les équipes à l'adoption, 5) Industrialiser le déploiement avec CI/CD.",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "Mon entreprise est-elle prête pour l'IA agentique ?",
    answer: "Trois indicateurs clés de préparation : 1) Vos données sont-elles accessibles et de qualité raisonnable ? 2) Avez-vous des processus répétitifs qui consomment beaucoup de temps ? 3) Votre direction est-elle alignée sur une vision de transformation ? Si vous répondez oui à 2 sur 3, vous êtes prêt à commencer.",
    category: "Transformation",
    categoryKey: "transformation"
  },
  {
    question: "Quel est le ROI typique de l'IA agentique ?",
    answer: "Les organisations qui implémentent l'IA agentique observent en moyenne : augmentation de productivité de 10-15%, réduction des coûts opérationnels de 30-50%, et augmentation des revenus de 20-35%. Le ROI devient positif entre 6 et 18 mois selon la complexité du cas d'usage.",
    category: "ROI",
    categoryKey: "roi"
  },
  {
    question: "Comment mesurez-vous le succès d'un agent IA ?",
    answer: "Nous mesurons le succès sur 3 dimensions : 1) Métriques commerciales (réduction des coûts, augmentation des revenus, satisfaction client), 2) Métriques techniques (précision, temps de réponse, taux d'erreur), 3) Métriques d'adoption (taux d'utilisation, satisfaction utilisateur, escalade vers les humains).",
    category: "ROI",
    categoryKey: "roi"
  },
  {
    question: "Quel est l'investissement requis pour commencer ?",
    answer: "L'investissement varie selon la portée : Agent simple (cas d'usage unique, intégration de base) : 50K$-100K$, Agent complexe (flux de travail multi-étapes, intégrations multiples) : 100K$-250K$, Système multi-agents : 250K$-500K$+. Nous offrons également une approche 'Preuve de Valeur' commençant avec un pilote de 25K$-50K$.",
    category: "ROI",
    categoryKey: "roi"
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer: "Notre stack technologique combine les meilleurs outils : LLMs (OpenAI GPT-4, Anthropic Claude, Google Gemini), Frameworks d'agents (LangChain, LangGraph, AutoGen, CrewAI), Bases de données vectorielles (Pinecone, Weaviate, Qdrant), Infrastructure cloud (AWS, Azure, GCP), et Outils d'intégration (APIs, webhooks, ETL).",
    category: "Technique",
    categoryKey: "technical"
  },
  {
    question: "Comment assurez-vous la sécurité et la confidentialité des données ?",
    answer: "La sécurité est intégrée à chaque couche : 1) Chiffrement des données (au repos et en transit avec AES-256 et TLS 1.3), 2) Contrôle d'accès (authentification basée sur les rôles), 3) Isolation des données (vos données ne se mélangent jamais avec d'autres clients), 4) Conformité (GDPR, CCPA, SOC 2, HIPAA), 5) Audit et surveillance.",
    category: "Technique",
    categoryKey: "technical"
  },
  {
    question: "Les agents IA peuvent-ils faire des erreurs ? Comment les contrôlez-vous ?",
    answer: "Oui, les agents IA peuvent faire des erreurs, c'est pourquoi nous implémentons plusieurs couches de contrôle : 1) Seuils de confiance (l'agent escalade vers un humain si la confiance < 85%), 2) Règles de validation, 3) Humain-dans-la-boucle pour les décisions sensibles, 4) Surveillance continue, 5) Boucles de rétroaction.",
    category: "Technique",
    categoryKey: "technical"
  },
  {
    question: "Quels sont les cas d'usage les plus impactants ?",
    answer: "Les 5 cas d'usage avec le meilleur ROI : 1) Support client intelligent (60-80% des demandes automatisées), 2) Qualification et nurturing de leads (+40% de taux de conversion), 3) Traitement de documents (réduction de 90% du temps), 4) Génération de contenu marketing (volume x3), 5) Assistant interne employé (+15% de productivité).",
    category: "Cas d'usage",
    categoryKey: "useCases"
  },
  {
    question: "L'IA agentique peut-elle complètement remplacer mon support client ?",
    answer: "Non, et ce n'est pas l'objectif. L'approche optimale est la collaboration IA-humain : les agents IA gèrent 60-80% du volume (questions fréquentes, demandes simples, tâches répétitives) 24/7, tandis que les agents humains se concentrent sur les 20-40% de cas complexes qui sont émotionnellement sensibles ou nécessitent créativité et empathie.",
    category: "Cas d'usage",
    categoryKey: "useCases"
  },
  {
    question: "Comment l'IA agentique peut-elle améliorer mon marketing ?",
    answer: "L'IA agentique transforme le marketing sur 4 axes : 1) Génération de contenu à grande échelle (volume x3 avec qualité constante), 2) Personnalisation dynamique (adaptation du contenu en temps réel), 3) Optimisation publicitaire continue (amélioration de 40-60%), 4) Analytique prédictive (identification des leads à fort potentiel, prévision de tendances).",
    category: "Cas d'usage",
    categoryKey: "useCases"
  },
  {
    question: "Qu'est-ce qui différencie Nukleo des autres agences IA ?",
    answer: "Trois différenciateurs clés : 1) Expertise technique approfondie (ingénieurs ML/IA seniors, architectes cloud, spécialistes produits), 2) Focus exclusif sur l'IA agentique (nous nous spécialisons dans les agents autonomes et systèmes multi-agents), 3) Approche IA-native de bout en bout (nous réarchitecturons vos processus, données et interfaces).",
    category: "À propos de Nukleo",
    categoryKey: "aboutNukleo"
  },
  {
    question: "Offrez-vous de la formation pour nos équipes ?",
    answer: "Oui, la formation fait partie intégrante de chaque projet. Nous offrons : 1) Ateliers exécutifs (4h pour le leadership), 2) Formation technique (2 jours pour les équipes dev/data), 3) Formation utilisateurs finaux (1 jour pour les équipes opérationnelles), 4) Programme train-the-trainer (pour créer des champions internes).",
    category: "À propos de Nukleo",
    categoryKey: "aboutNukleo"
  },
  {
    question: "Où êtes-vous situés et travaillez-vous à distance ?",
    answer: "Nous sommes basés à Montréal (Québec) et Halifax (Nouvelle-Écosse), avec des clients à travers le Canada et internationalement. Nous opérons en mode hybride : réunions stratégiques en personne pour la découverte et les jalons clés, et collaboration à distance pour le développement et le support quotidien.",
    category: "À propos de Nukleo",
    categoryKey: "aboutNukleo"
  }
];

export const getFAQs = (language: 'fr' | 'en' = 'en'): FAQItem[] => {
  return language === 'fr' ? faqDataFr : faqDataEn;
};
