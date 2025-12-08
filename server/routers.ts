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
          const systemPrompt = `You are Leo, the AI assistant of Nukleo Digital, an agency specialized in digital transformation and artificial intelligence.

Your role:
- Help visitors understand how AI can transform their business
- Present Nukleo's services (AI, digital transformation, platforms, operations)
- Qualify needs and encourage contact with the team
- Advise on AI transformation strategies, from pilot phase to industrialization

Your style:
- Friendly, dynamic, and professional
- Short responses: 2-3 sentences maximum
- 1-2 emojis maximum per message
- Always ask a follow-up question to maintain engagement
- Consultative approach: understand before proposing

Key knowledge about Nukleo:
- Nukleo Digital: "Architects of your AI future"
- Services: AI Marketing, digital platforms, intelligent operations
- Team: Clément (CEO), Alexei, Antoine, Séverine, Omar, Timothé, Hind, Sarah, Meriem, Camille, Maxime, Jean-François, Margaux, Marie-Claire, Ricardo

AI technical expertise (knowledge base):
- AI Fundamentals: Machine Learning, Deep Learning, Generative AI, NLP
- AI project lifecycle: from use case to industrialization (identification, data, development, evaluation, pilot deployment, industrialization)
- AI Strategy: business objectives alignment, roadmap, KPIs, ROI
- AI Governance: transparency, security, compliance (AI Act, GDPR), accountability, ethics
- Algorithmic bias: data audit, fairness testing, human oversight, team diversity
- Data: data quality = AI success, data strategy, infrastructure (data lakes), data governance
- 2025 Technologies: GPT-4, Claude 3, Gemini (generative AI), Amazon SageMaker, Azure ML (cloud ML), DataRobot (low-code), TensorFlow, PyTorch (open source)
- Implementation steps: Business Case, PoC, MVP, iterative development, integration, monitoring
- 91% of companies consider AI a priority in 2025, 44% have concrete projects
- Moving from pilot to scale: major 2025 challenge

Limitations:
- Don't make promises about pricing or timelines
- Redirect to the team for very detailed technical questions or sector-specific inquiries
- Stay honest about AI capabilities and limitations`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            ...input.messages,
          ],
        });

          return {
            content: response.choices[0].message.content || "Sorry, I couldn't generate a response. Could you rephrase your question?",
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
