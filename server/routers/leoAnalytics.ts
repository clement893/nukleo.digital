import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { upsertLeoSession, getLeoAnalytics, getAllLeoSessions } from "../db";

export const leoAnalyticsRouter = router({
  /**
   * Track a LEO chat session
   */
  trackSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        page: z.string(),
        messagesCount: z.number().optional(),
        userEmail: z.string().optional(),
        userName: z.string().optional(),
        emailCaptured: z.boolean().optional(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await upsertLeoSession(input);
      return { success: !!session, session };
    }),

  /**
   * Get LEO analytics summary
   */
  getAnalytics: publicProcedure
    .input(
      z.object({
        days: z.number().default(30),
      })
    )
    .query(async ({ input }) => {
      const analytics = await getLeoAnalytics(input.days);
      return analytics;
    }),

  /**
   * Get all LEO sessions (admin only)
   */
  getAllSessions: publicProcedure
    .input(
      z.object({
        limit: z.number().default(100),
      })
    )
    .query(async ({ input }) => {
      const sessions = await getAllLeoSessions(input.limit);
      return sessions;
    }),
});
