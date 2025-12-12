import { getDb } from "./db";
import { loaders } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Seed default loaders into the database
 * This runs automatically on server startup if no loaders exist
 */
export async function seedLoaders() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("[Seed Loaders] Database connection failed");
      return;
    }

    // Check if loaders already exist
    const existingLoaders = await db.select().from(loaders).limit(1);
    if (existingLoaders.length > 0) {
      console.log("[Seed Loaders] Loaders already exist, skipping seed");
      return;
    }

    // Insert default loader
    await db.insert(loaders).values({
      name: "Psychedelic Crazy Arts",
      description: "Loader psychédélique avec effets visuels avancés, particules flottantes, hexagones rotatifs et ondes d'énergie",
      cssCode: "psychedelic-crazy-arts",
      isActive: true,
      displayOrder: 1,
    });

    console.log("[Seed Loaders] ✅ Default loader seeded successfully");
  } catch (error) {
    console.error("[Seed Loaders] Error:", error);
  }
}
