import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import postgres from "postgres";

/**
 * Router temporaire pour exécuter la migration de la table page_visibility
 * À supprimer après avoir exécuté la migration
 */
export const migrateRouter = router({
  createPageVisibilityTable: publicProcedure.mutation(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL not set");
      }

      // Utiliser directement postgres pour exécuter du SQL brut
      const client = postgres(process.env.DATABASE_URL);

      const migrationSQL = `
        CREATE TABLE IF NOT EXISTS page_visibility (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          path VARCHAR(255) NOT NULL UNIQUE,
          "isVisible" BOOLEAN NOT NULL DEFAULT true,
          description TEXT,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_page_visibility_path ON page_visibility(path);

        COMMENT ON TABLE page_visibility IS 'Stores visibility status for pages on the site';
        COMMENT ON COLUMN page_visibility.path IS 'The URL path of the page (e.g., /manifesto, /fr/manifesto)';
        COMMENT ON COLUMN page_visibility."isVisible" IS 'Whether the page is visible (true) or hidden (false)';
      `;

      // Exécuter la migration
      await client.unsafe(migrationSQL);

      // Vérifier que la table existe
      const result = await client`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'page_visibility'
        );
      `;

      await client.end();

      return {
        success: true,
        message: "Table page_visibility créée avec succès",
        tableExists: result[0]?.exists || false,
      };
    } catch (error: any) {
      console.error("[Migration] Error:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de la création de la table",
        error: error.code || "UNKNOWN_ERROR",
      };
    }
  }),

  createAnalyticsTable: publicProcedure.mutation(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL not set");
      }

      // Utiliser directement postgres pour exécuter du SQL brut
      const client = postgres(process.env.DATABASE_URL);

      const migrationSQL = `
        CREATE TABLE IF NOT EXISTS analytics (
          id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          provider VARCHAR(50) NOT NULL UNIQUE,
          "isEnabled" BOOLEAN NOT NULL DEFAULT false,
          "trackingId" VARCHAR(255),
          "additionalConfig" TEXT,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_analytics_provider ON analytics(provider);
        CREATE INDEX IF NOT EXISTS idx_analytics_enabled ON analytics("isEnabled");

        COMMENT ON TABLE analytics IS 'Stores analytics and tracking configuration';
        COMMENT ON COLUMN analytics.provider IS 'Analytics provider: google-analytics, facebook-pixel, linkedin-insight';
        COMMENT ON COLUMN analytics."isEnabled" IS 'Whether this analytics provider is active';
        COMMENT ON COLUMN analytics."trackingId" IS 'Tracking ID for the provider (GA4 Measurement ID, Pixel ID, Partner ID)';
      `;

      // Exécuter la migration
      await client.unsafe(migrationSQL);

      // Vérifier que la table existe
      const result = await client`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'analytics'
        );
      `;

      await client.end();

      return {
        success: true,
        message: "Table analytics créée avec succès",
        tableExists: result[0]?.exists || false,
      };
    } catch (error: any) {
      console.error("[Migration] Error:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de la création de la table",
        error: error.code || "UNKNOWN_ERROR",
      };
    }
  }),
});
