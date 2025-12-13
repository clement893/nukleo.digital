import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      category: "Services & Solutions",
      questions: [
        {
          question: "Quels services propose Nukleo Digital ?",
          answer: "Nukleo Digital offre une gamme complète de services incluant la stratégie marketing IA, le développement de plateformes digitales, les opérations intelligentes, le studio créatif, le laboratoire IA, et le bureau stratégique. Nous accompagnons les entreprises dans leur transformation digitale avec des solutions sur mesure."
        },
        {
          question: "Comment fonctionne votre évaluation de préparation à l'IA ?",
          answer: "Notre évaluation de préparation à l'IA (AI Readiness Assessment) analyse votre infrastructure technologique, vos processus métier, et votre culture organisationnelle pour déterminer votre niveau de maturité IA. Nous fournissons un rapport détaillé avec des recommandations personnalisées pour accélérer votre adoption de l'IA."
        },
        {
          question: "Proposez-vous des solutions sur mesure ?",
          answer: "Absolument. Chaque projet chez Nukleo Digital est conçu sur mesure pour répondre aux besoins spécifiques de nos clients. Nous commençons par une analyse approfondie de vos défis et objectifs, puis nous développons des solutions adaptées à votre contexte unique."
        }
      ]
    },
    {
      category: "Processus & Méthodologie",
      questions: [
        {
          question: "Comment se déroule un projet avec Nukleo Digital ?",
          answer: "Notre processus commence par une phase de découverte où nous analysons vos besoins et objectifs. Ensuite, nous développons une stratégie personnalisée, puis nous passons à l'implémentation avec des itérations régulières et des retours clients. Nous assurons également un suivi post-lancement pour garantir le succès à long terme."
        },
        {
          question: "Quel est le délai moyen pour un projet ?",
          answer: "Les délais varient selon la complexité et la portée du projet. Un projet de stratégie marketing IA peut prendre 4-8 semaines, tandis qu'une plateforme digitale complète peut nécessiter 3-6 mois. Nous fournissons des estimations détaillées lors de notre première consultation."
        },
        {
          question: "Travaillez-vous avec des entreprises de toutes tailles ?",
          answer: "Oui, nous travaillons avec des startups, des PME et des grandes entreprises. Notre approche s'adapte à chaque contexte, que vous soyez une jeune entreprise cherchant à intégrer l'IA ou une organisation établie visant une transformation digitale complète."
        }
      ]
    },
    {
      category: "Technologie & IA",
      questions: [
        {
          question: "Quelles technologies utilisez-vous ?",
          answer: "Nous utilisons les dernières technologies en IA, notamment les modèles de langage avancés, l'apprentissage automatique, et l'analyse de données. Nos solutions sont construites avec des frameworks modernes et des architectures cloud-native pour garantir performance, scalabilité et sécurité."
        },
        {
          question: "Comment garantissez-vous la sécurité des données ?",
          answer: "La sécurité est une priorité absolue. Nous implémentons des mesures de sécurité de niveau entreprise, incluant le chiffrement des données, l'authentification multi-facteurs, et la conformité aux réglementations comme le RGPD. Toutes nos solutions respectent les meilleures pratiques de sécurité."
        },
        {
          question: "Proposez-vous de la formation pour nos équipes ?",
          answer: "Oui, nous offrons des programmes de formation personnalisés pour aider vos équipes à maîtriser les outils et technologies que nous déployons. Nous croyons que le succès à long terme nécessite que vos équipes soient autonomes et compétentes."
        }
      ]
    },
    {
      category: "Tarification & Engagement",
      questions: [
        {
          question: "Comment fonctionne votre tarification ?",
          answer: "Notre tarification est adaptée à chaque projet. Nous proposons des modèles flexibles incluant des projets à forfait, des engagements mensuels, ou des contrats annuels selon vos besoins. Contactez-nous pour une consultation gratuite et un devis personnalisé."
        },
        {
          question: "Proposez-vous des consultations gratuites ?",
          answer: "Oui, nous offrons une consultation initiale gratuite pour discuter de vos besoins et explorer comment nous pouvons vous aider. C'est l'occasion idéale de poser vos questions et de comprendre notre approche."
        },
        {
          question: "Quel est votre processus de facturation ?",
          answer: "Nous facturons généralement en plusieurs étapes selon l'avancement du projet. Un acompte initial est requis pour démarrer, puis des paiements sont effectués à des jalons prédéfinis. Pour les contrats récurrents, la facturation est mensuelle ou annuelle selon l'accord."
        }
      ]
    },
    {
      category: "Support & Suivi",
      questions: [
        {
          question: "Quel support offrez-vous après la livraison ?",
          answer: "Nous offrons un support complet post-lancement incluant la maintenance, les mises à jour, le dépannage, et l'optimisation continue. Nos clients bénéficient d'un accès prioritaire à notre équipe de support et de mises à jour régulières de leurs solutions."
        },
        {
          question: "Comment puis-je suivre l'avancement de mon projet ?",
          answer: "Nous maintenons une communication transparente tout au long du projet avec des réunions régulières, des rapports d'avancement détaillés, et un accès à un portail client où vous pouvez suivre les progrès en temps réel."
        },
        {
          question: "Que faire si je ne suis pas satisfait du résultat ?",
          answer: "Votre satisfaction est notre priorité. Nous travaillons en étroite collaboration avec vous à chaque étape pour garantir que le résultat final répond à vos attentes. Si des ajustements sont nécessaires, nous les effectuons jusqu'à ce que vous soyez entièrement satisfait."
        }
      ]
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="FAQ | Questions Fréquentes | Nukleo Digital"
        description="Trouvez les réponses aux questions fréquentes sur les services, processus et solutions de Nukleo Digital. Tout ce que vous devez savoir sur notre agence de marketing IA."
        keywords="FAQ, questions fréquentes, support, aide, Nukleo Digital, marketing IA, services digitaux"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
        <div className="container mx-auto px-4 py-32 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Fréquentes</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Trouvez les réponses aux questions les plus courantes sur nos services, notre processus et nos solutions.
            </p>
          </div>

          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white border-b border-white/20 pb-4">
                  {category.category}
                </h2>
                
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`item-${categoryIndex}-${faqIndex}`}
                        className="border-white/10 px-6"
                      >
                        <AccordionTrigger className="text-left text-white hover:text-cyan-400 py-6 text-lg font-semibold">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/70 leading-relaxed pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-white/70 mb-6">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
