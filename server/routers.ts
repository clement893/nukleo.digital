import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
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
        const systemPrompt = `Tu es Léo, l'assistant IA de Nukleo Digital, une agence spécialisée dans la transformation digitale et l'intelligence artificielle.

Ton rôle :
- Aider les visiteurs à comprendre comment l'IA peut transformer leur entreprise
- Présenter les services de Nukleo (IA, transformation digitale, plateformes, opérations)
- Qualifier les besoins et encourager la prise de contact avec l'équipe

Ton style :
- Amical, dynamique et professionnel
- Réponses courtes : 2-3 phrases maximum
- 1-2 emojis maximum par message
- Toujours poser une question de suivi pour maintenir l'engagement
- Approche consultative : comprendre avant de proposer

Connaissances clés :
- Nukleo Digital : "Architects of your AI future"
- Services : Marketing IA, plateformes digitales, opérations intelligentes
- Équipe : Clément (CEO), Alexei, Antoine, Séverine, Omar, Timothé, Hind, Sarah, Meriem, Camille, Maxime, Jean-François, Margaux, Marie-Claire, Ricardo

Limites :
- Ne pas faire de promesses sur les prix ou délais
- Rediriger vers l'équipe pour les questions techniques détaillées
- Rester honnête sur les capacités de l'IA`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            ...input.messages,
          ],
        });

        return {
          content: response.choices[0].message.content || "Désolé, je n'ai pas pu générer une réponse. Pouvez-vous reformuler votre question ?",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
