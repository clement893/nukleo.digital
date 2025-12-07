import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // IA Agentique
  {
    question: "Qu'est-ce que l'IA agentique et en quoi diffère-t-elle de l'IA générative ?",
    answer: "L'IA agentique désigne des systèmes autonomes capables de raisonner, planifier et exécuter des actions complexes pour atteindre des objectifs spécifiques. Contrairement à l'IA générative (comme ChatGPT) qui se contente de générer du contenu en réponse à des prompts, les agents IA peuvent prendre des décisions, utiliser des outils, accéder à des données en temps réel et orchestrer des workflows multi-étapes. Par exemple, un agent de support client peut non seulement répondre à une question, mais aussi consulter l'historique du client, vérifier l'état d'une commande dans le système ERP, proposer une solution personnalisée et créer automatiquement un ticket de suivi si nécessaire.",
    category: "IA Agentique"
  },
  {
    question: "Comment fonctionnent les systèmes multi-agents ?",
    answer: "Les systèmes multi-agents sont composés de plusieurs agents IA spécialisés qui collaborent pour accomplir des tâches complexes. Chaque agent possède une expertise spécifique (recherche, analyse, rédaction, validation) et communique avec les autres via un orchestrateur central. Par exemple, dans un système de génération de rapports marketing, un agent collecte les données analytics, un deuxième les analyse pour identifier les tendances, un troisième rédige le rapport, et un quatrième vérifie la cohérence et la qualité. Cette approche modulaire permet de gérer des workflows sophistiqués tout en maintenant la transparence et le contrôle sur chaque étape du processus.",
    category: "IA Agentique"
  },
  {
    question: "Quelle est la différence entre un chatbot et un agent IA ?",
    answer: "Un chatbot traditionnel suit un script prédéfini avec des arbres de décision fixes : si l'utilisateur dit X, répondre Y. Il ne peut pas sortir de son script ni s'adapter à des situations imprévues. Un agent IA, en revanche, possède des capacités de raisonnement, de planification et d'utilisation d'outils. Il peut comprendre l'intention derrière une demande complexe, décomposer le problème en sous-tâches, accéder à plusieurs sources de données, prendre des décisions contextuelles et adapter son approche en fonction des résultats intermédiaires. Par exemple, face à une demande de remboursement complexe, un chatbot redirigera vers un humain, tandis qu'un agent IA analysera la politique de remboursement, vérifiera l'éligibilité, calculera le montant, initiera le processus et informera le client du délai — le tout de manière autonome.",
    category: "IA Agentique"
  },
  
  // Transformation & Implémentation
  {
    question: "Combien de temps faut-il pour implémenter l'IA agentique ?",
    answer: "Notre méthodologie accélérée permet de déployer un premier agent opérationnel en 90 jours avec notre roadmap en 3 phases : Phase 1 (30 jours) - Discovery et architecture, Phase 2 (30 jours) - Développement et intégration, Phase 3 (30 jours) - Tests et déploiement. Pour une transformation complète de l'organisation avec plusieurs agents interconnectés, comptez 6 à 12 mois. Cette approche itérative permet de générer de la valeur rapidement (quick wins dès le premier agent) tout en construisant progressivement un écosystème d'agents robuste et scalable. Nous évitons le piège du 'pilote perpétuel' en visant dès le départ une architecture production-ready.",
    category: "Transformation & Implémentation"
  },
  {
    question: "Quels sont les défis les plus courants lors de l'implémentation ?",
    answer: "Les trois défis majeurs sont : 1) La qualité des données (67% des échecs d'IA sont dus à des données incomplètes, non structurées ou biaisées), 2) La résistance au changement organisationnel (les équipes doivent comprendre que l'IA augmente leurs capacités plutôt que de les remplacer), et 3) L'intégration avec les systèmes existants (ERP, CRM, bases de données legacy). Chez Nukleo, nous adressons ces défis dès la phase de discovery avec un audit de maturité des données, un programme de change management intégré, et une architecture d'intégration modulaire qui minimise les disruptions opérationnelles.",
    category: "Transformation & Implémentation"
  },
  {
    question: "Comment passer d'un pilote à l'échelle (scale) ?",
    answer: "95% des entreprises restent bloquées en mode 'pilote perpétuel' sans jamais atteindre l'échelle. Pour réussir le scaling, suivez ces 5 étapes : 1) Définir dès le pilote une architecture scalable (pas de solutions 'quick and dirty'), 2) Mesurer rigoureusement les KPI business (pas seulement techniques), 3) Documenter les processus et créer des playbooks réutilisables, 4) Former les équipes à l'adoption (change management continu), 5) Industrialiser le déploiement avec CI/CD et monitoring automatisé. Avec cette approche, vous passez de pilote à production en 6 mois au lieu de rester bloqué 2+ ans sans résultats tangibles.",
    category: "Transformation & Implémentation"
  },
  {
    question: "Mon entreprise est-elle prête pour l'IA agentique ?",
    answer: "Trois indicateurs clés de préparation : 1) Vos données sont-elles accessibles et de qualité raisonnable ? (pas besoin de perfection, mais un minimum de structure), 2) Avez-vous des processus répétitifs qui consomment beaucoup de temps ? (support client, traitement de documents, qualification de leads), 3) Votre leadership est-il aligné sur une vision de transformation ? (pas juste un projet IT, mais une initiative stratégique). Si vous répondez oui à 2 sur 3, vous êtes prêt à démarrer. Nous proposons un assessment de maturité IA gratuit de 30 minutes pour évaluer votre situation spécifique et identifier les quick wins potentiels.",
    category: "Transformation & Implémentation"
  },
  
  // ROI & Business Case
  {
    question: "Quel est le ROI typique de l'IA agentique ?",
    answer: "Les organisations qui implémentent l'IA agentique observent en moyenne : 10-15% d'augmentation de productivité (équipes concentrées sur tâches à haute valeur), 30-50% de réduction des coûts opérationnels (automatisation de processus manuels), et 20-35% d'augmentation des revenus (meilleure qualification des leads, personnalisation à grande échelle). Le ROI devient positif entre 6 et 18 mois selon la complexité du cas d'usage. Par exemple, un agent de support client peut traiter 60-80% des demandes de niveau 1-2, libérant les agents humains pour les cas complexes, tout en améliorant le temps de réponse de 24h à quelques minutes.",
    category: "ROI & Business Case"
  },
  {
    question: "Combien coûte l'implémentation de l'IA agentique ?",
    answer: "Les coûts varient selon la taille de l'organisation et la complexité du cas d'usage : PME (50-200 employés) : 50K$ - 150K$ pour un premier agent, Mid-market (200-1000 employés) : 150K$ - 500K$ pour un système multi-agents, Enterprise (1000+ employés) : 500K$ - 2M$+ pour une transformation complète. Ces montants incluent la discovery, le développement, l'intégration, la formation et 6 mois de support post-déploiement. Important : ces investissements sont amortis rapidement grâce aux gains de productivité et réduction de coûts. Nous proposons également des modèles de pricing basés sur la valeur générée (success-based) pour aligner nos intérêts avec vos résultats business.",
    category: "ROI & Business Case"
  },
  {
    question: "Quels KPI utiliser pour mesurer le succès ?",
    answer: "Nous recommandons de suivre 10 KPI essentiels répartis en 3 catégories : Efficacité opérationnelle (temps de traitement réduit, volume automatisé, taux d'erreur), Impact business (coût par transaction, revenus incrémentaux, satisfaction client NPS), et Adoption (taux d'utilisation, feedback utilisateurs, tickets d'escalade). Par exemple, pour un agent de qualification de leads : mesurez le nombre de leads qualifiés par jour, le taux de conversion leads→opportunités, le temps moyen de qualification, et le coût par lead qualifié. L'important est de lier chaque KPI technique à un impact business mesurable pour démontrer la valeur créée.",
    category: "ROI & Business Case"
  },
  
  // Technique & Sécurité
  {
    question: "Comment garantir la sécurité et la confidentialité des données ?",
    answer: "Notre approche de sécurité repose sur 5 piliers : 1) Chiffrement end-to-end des données en transit et au repos, 2) Isolation des environnements (données clients jamais mélangées), 3) Contrôle d'accès granulaire basé sur les rôles (RBAC), 4) Audit trail complet de toutes les actions des agents, 5) Conformité aux régulations (RGPD, Loi 25 québécoise, HIPAA pour santé, PCI-DSS pour paiements). Nous pouvons déployer les agents dans votre infrastructure (on-premise ou cloud privé) pour un contrôle total, ou utiliser notre infrastructure certifiée SOC 2 Type II. Tous nos modèles peuvent fonctionner sans envoyer de données à des tiers (self-hosted LLMs).",
    category: "Technique & Sécurité"
  },
  {
    question: "Qu'est-ce que le RAG (Retrieval-Augmented Generation) ?",
    answer: "Le RAG est une technique qui permet aux agents IA d'accéder à vos données propriétaires en temps réel pour générer des réponses précises et à jour. Au lieu de s'appuyer uniquement sur les connaissances pré-entraînées du modèle (qui peuvent être obsolètes), le RAG récupère d'abord les informations pertinentes dans vos bases de données, documents ou systèmes, puis utilise ces données comme contexte pour générer la réponse. Cela réduit drastiquement les hallucinations (réponses inventées), permet de citer les sources, et garantit que les agents travaillent avec vos données les plus récentes. Par exemple, un agent de support peut accéder à la documentation produit mise à jour ce matin pour répondre avec précision à une question technique.",
    category: "Technique & Sécurité"
  },
  {
    question: "Comment gérer les hallucinations de l'IA ?",
    answer: "Les hallucinations (réponses inventées ou incorrectes) sont un risque réel, mais gérable avec 5 stratégies : 1) Utiliser le RAG pour ancrer les réponses dans des données vérifiables, 2) Implémenter des guardrails (règles de validation automatique des outputs), 3) Ajouter des scores de confiance (l'agent indique son niveau de certitude), 4) Mettre en place un human-in-the-loop pour les décisions critiques (validation humaine avant action), 5) Logger et analyser tous les outputs pour détecter les anomalies. Dans nos implémentations, nous visons un taux de validation humaine de 10-20% pour les cas critiques, tout en automatisant complètement les cas à faible risque. L'objectif n'est pas la perfection (impossible), mais un niveau de fiabilité supérieur aux processus manuels actuels.",
    category: "Technique & Sécurité"
  },
  
  // Cas d'Usage
  {
    question: "Quels sont les cas d'usage les plus impactants ?",
    answer: "Les 5 cas d'usage avec le meilleur ROI : 1) Support client intelligent (60-80% des demandes automatisées, résolution 24/7, réduction temps de réponse de 24h à 2 minutes), 2) Qualification et nurturing de leads (scoring automatique, personnalisation à grande échelle, +40% taux de conversion), 3) Traitement de documents (extraction de données de factures/contrats/formulaires, réduction de 90% du temps de traitement), 4) Génération de contenu marketing (articles de blog, posts sociaux, emails personnalisés, 3x plus de volume sans augmenter l'équipe), 5) Assistant interne pour employés (réponses RH, IT support, recherche de documents, +15% productivité). Ces cas d'usage combinent impact business élevé et complexité technique maîtrisable.",
    category: "Cas d'Usage"
  },
  {
    question: "L'IA agentique peut-elle remplacer complètement mon support client ?",
    answer: "Non, et ce n'est pas l'objectif. L'approche optimale est la collaboration IA-humain : les agents IA traitent 60-80% du volume (questions fréquentes, demandes simples, tâches répétitives) 24/7 avec un temps de réponse quasi-instantané, tandis que les agents humains se concentrent sur les 20-40% de cas complexes, émotionnellement sensibles ou nécessitant créativité et empathie. Résultat : meilleure expérience client (réponses rapides pour cas simples, expertise humaine pour cas complexes), équipes plus satisfaites (moins de répétition, plus de résolution de problèmes intéressants), et coûts optimisés. Le rôle des humains évolue de 'répondeur' à 'expert-superviseur' — une transformation positive, pas un remplacement.",
    category: "Cas d'Usage"
  },
  {
    question: "Comment l'IA agentique peut-elle améliorer mon marketing ?",
    answer: "L'IA agentique transforme le marketing sur 4 axes : 1) Génération de contenu à grande échelle (articles de blog, posts sociaux, emails, landing pages — 3x plus de volume avec qualité constante), 2) Personnalisation dynamique (adaptation du contenu en temps réel selon le profil, comportement et contexte de chaque visiteur), 3) Optimisation publicitaire continue (agents qui testent automatiquement des variantes de créatifs, audiences et enchères pour maximiser le ROI — amélioration de 40-60%), 4) Analyse prédictive (identification des leads à fort potentiel, prévision des tendances, recommandations stratégiques). Le résultat : des campagnes plus efficaces, un ROI marketing amélioré, et des équipes qui se concentrent sur la stratégie créative plutôt que l'exécution répétitive.",
    category: "Cas d'Usage"
  },
  
  // About Nukleo
  {
    question: "Qu'est-ce qui différencie Nukleo des autres agences IA ?",
    answer: "Trois différenciateurs clés : 1) Expertise technique approfondie — notre équipe combine des ingénieurs ML/AI seniors, des architectes cloud et des spécialistes produit qui ont construit des systèmes d'IA à l'échelle (pas juste des intégrateurs de APIs), 2) Focus exclusif sur l'IA agentique — nous ne faisons pas de 'transformation digitale générique', nous sommes spécialisés dans les agents autonomes et systèmes multi-agents, 3) Approche IA-native end-to-end — nous ne nous contentons pas de brancher ChatGPT sur votre site, nous re-architecturons vos processus, données et interfaces pour être nativement IA-first. Résultat : déploiement en 90 jours au lieu de 12-24 mois, et des systèmes qui évoluent avec vos besoins plutôt que de devenir obsolètes.",
    category: "About Nukleo"
  },
  {
    question: "Travaillez-vous avec des entreprises de ma taille ?",
    answer: "Oui. Nous travaillons avec des organisations de toutes tailles, de la startup en croissance à la grande entreprise établie. Notre approche modulaire nous permet d'adapter l'envergure et la complexité de la solution à vos besoins et budget : une startup peut démarrer avec un agent unique ciblé (ex: qualification de leads), une mid-market peut déployer un système multi-agents pour plusieurs départements, et une enterprise peut lancer une transformation complète avec des dizaines d'agents interconnectés. Ce qui compte n'est pas votre taille, mais votre volonté de transformer vos opérations avec l'IA et votre alignement sur une approche itérative et mesurable.",
    category: "About Nukleo"
  },
  {
    question: "Où êtes-vous situés et travaillez-vous à distance ?",
    answer: "Nous sommes basés à Montréal (Québec) et Halifax (Nouvelle-Écosse), avec des clients à travers le Canada et internationalement. Nous opérons en modèle hybride : rencontres stratégiques en personne pour la discovery et les jalons clés (si géographie le permet), et collaboration à distance pour le développement et le support quotidien. Cette approche nous permet de servir efficacement des clients partout en Amérique du Nord et en Europe tout en maintenant une relation de proximité. Nous nous adaptons à votre fuseau horaire et préférences de communication (français ou anglais).",
    category: "About Nukleo"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  // Extract unique categories
  const categories = Array.from(new Set(faqs.map(f => f.category)));

  // Filter FAQs based on selected category
  const filteredFaqs = selectedCategory === "Tous" 
    ? faqs 
    : faqs.filter(f => f.category === selectedCategory);

  return (
    <div className="relative min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-accent text-sm mb-4 block uppercase">
              QUESTIONS FRÉQUENTES
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              Tout ce que vous devez savoir sur l'IA Agentique
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Réponses détaillées aux questions les plus fréquentes sur la transformation IA, 
              les agents autonomes, l'implémentation et le ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-t border-white/5">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("Tous")}
              className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
                selectedCategory === "Tous"
                  ? "bg-accent text-white"
                  : "bg-white/5 text-white/80 hover:bg-white/10"
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent/50"
              >
                {/* Question Button */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-start justify-between text-left group"
                >
                  <div className="flex-1 pr-6">
                    <span className="font-mono text-xs text-accent mb-2 block">
                      {faq.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-accent flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer (Collapsible) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-6">
                    <p className="text-white/70 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-deep-purple text-white">
        <div className="container text-center">
          <h2 className="text-5xl font-heading font-bold mb-6">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Notre équipe d'experts est là pour répondre à toutes vos questions 
            sur la transformation IA et les agents autonomes.
          </p>
          <Link href="/contact">
            <button className="px-12 py-4 bg-black text-white hover:bg-accent transition-all duration-300 font-bold text-lg uppercase tracking-wider">
              Discuter avec un Expert
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
