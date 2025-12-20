import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { analytics } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const analyticsRouter = router({
  // Get all analytics configurations (admin only)
  getAll: adminProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      const configs = await db
        .select()
        .from(analytics);

      return Array.isArray(configs) ? configs : [];
    } catch (error) {
      // Silently handle database connection errors - return empty array
      if (error instanceof Error && 'code' in error && error.code === 'ECONNREFUSED') {
        return [];
      }
      console.error("[Analytics] Error fetching configurations:", error);
      return [];
    }
  }),

  // Get active analytics configurations only (public for frontend to load scripts)
  // This is safe because it only returns enabled configs, not sensitive data
  getActive: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      const configs = await db
        .select()
        .from(analytics)
        .where(eq(analytics.isEnabled, true));

      return Array.isArray(configs) ? configs : [];
    } catch (error) {
      // Silently handle database connection errors - return empty array
      if (error instanceof Error && 'code' in error && error.code === 'ECONNREFUSED') {
        return [];
      }
      console.error("[Analytics] Error fetching active configurations:", error);
      return [];
    }
  }),

  // Get configuration for a specific provider (admin only)
  getByProvider: adminProcedure
    .input(z.object({ provider: z.string() }))
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        
        const config = await db
          .select()
          .from(analytics)
          .where(eq(analytics.provider, input.provider))
          .limit(1);

        return config[0] || null;
      } catch (error) {
        console.error("[Analytics] Error fetching configuration:", error);
        return null;
      }
    }),

  // Update or create analytics configuration
  upsert: publicProcedure
    .input(
      z.object({
        provider: z.enum(["google-analytics", "facebook-pixel", "linkedin-insight"]),
        isEnabled: z.boolean(),
        trackingId: z.string().optional(),
        additionalConfig: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        // Check if configuration exists
        const existing = await db
          .select()
          .from(analytics)
          .where(eq(analytics.provider, input.provider))
          .limit(1);

        if (existing.length > 0) {
          // Update existing
          await db
            .update(analytics)
            .set({
              isEnabled: input.isEnabled,
              trackingId: input.trackingId,
              additionalConfig: input.additionalConfig,
              updatedAt: new Date(),
            })
            .where(eq(analytics.provider, input.provider));
        } else {
          // Create new
          await db.insert(analytics).values({
            provider: input.provider,
            isEnabled: input.isEnabled,
            trackingId: input.trackingId,
            additionalConfig: input.additionalConfig,
          });
        }

        return { success: true };
      } catch (error) {
        console.error("[Analytics] Error upserting configuration:", error);
        throw new Error("Failed to update analytics configuration");
      }
    }),

  // Delete analytics configuration (admin only)
  delete: adminProcedure
    .input(z.object({ provider: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        await db
          .delete(analytics)
          .where(eq(analytics.provider, input.provider));

        return { success: true };
      } catch (error) {
        console.error("[Analytics] Error deleting configuration:", error);
        throw new Error("Failed to delete analytics configuration");
      }
    }),
});
