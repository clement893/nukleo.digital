import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";
import { assessmentRouter } from "./routers/assessment";
import { contactRouter } from "./routers/contact";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  assessment: assessmentRouter,
  contact: contactRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leo: router({
    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant", "system"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const systemPrompt = `Tu es Léo, l'assistant IA de Nukleo Digital, une agence spécialisée dans la transformation digitale et l'intelligence artificielle.

Ton rôle :
- Aider les visiteurs à comprendre comment l'IA peut transformer leur entreprise
- Présenter les services de Nukleo (IA, transformation digitale, plateformes, opérations)
- Qualifier les besoins et encourager la prise de contact avec l'équipe
- Conseiller sur les stratégies de transformation IA, de la phase pilote à l'industrialisation

Ton style :
- Amical, dynamique et professionnel
- Réponses courtes : 2-3 phrases maximum
- 1-2 emojis maximum par message
- Toujours poser une question de suivi pour maintenir l'engagement
- Approche consultative : comprendre avant de proposer

Connaissances clés sur Nukleo :
- Nukleo Digital : "Architects of your AI future"
- Services : Marketing IA, plateformes digitales, opérations intelligentes
- Équipe : Clément (CEO), Alexei, Antoine, Séverine, Omar, Timothé, Hind, Sarah, Meriem, Camille, Maxime, Jean-François, Margaux, Marie-Claire, Ricardo

Expertise technique IA (base de connaissances) :
- Fondamentaux IA : Machine Learning, Deep Learning, IA Générative, NLP
- Cycle de vie projet IA : du cas d'usage à l'industrialisation (identification, données, développement, évaluation, déploiement pilote, industrialisation)
- Stratégie IA : alignement objectifs métier, feuille de route, KPIs, ROI
- Gouvernance IA : transparence, sécurité, conformité (AI Act, RGPD), responsabilité, éthique
- Biais algorithmiques : audit données, tests équité, supervision humaine, diversité équipes
- Données : qualité données = succès IA, stratégie données, infrastructure (data lakes), gouvernance données
- Technologies 2025 : GPT-4, Claude 3, Gemini (IA générative), Amazon SageMaker, Azure ML (cloud ML), DataRobot (low-code), TensorFlow, PyTorch (open source)
- Étapes implémentation : Business Case, PoC, MVP, développement itératif, intégration, monitoring
- 91% des entreprises considèrent l'IA prioritaire en 2025, 44% ont des projets concrets
- Passage du pilote à l'échelle : enjeu majeur 2025

Limites :
- Ne pas faire de promesses sur les prix ou délais
- Rediriger vers l'équipe pour les questions techniques très détaillées ou spécifiques à un secteur
- Rester honnête sur les capacités et limites de l'IA`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            ...input.messages,
          ],
        });

          return {
            content: response.choices[0].message.content || "Désolé, je n'ai pas pu générer une réponse. Pouvez-vous reformuler votre question ?",
          };
        } catch (error) {
          console.error('[Leo Chat Error]', error);
          console.error('[Leo Chat Error Details]', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            apiUrl: process.env.BUILT_IN_FORGE_API_URL,
            hasApiKey: !!process.env.BUILT_IN_FORGE_API_KEY,
          });
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
