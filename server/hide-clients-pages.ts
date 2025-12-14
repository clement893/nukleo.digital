import { getDb } from "./db";
import { pageVisibility } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function hideClientsPages() {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const pathsToHide = ['/clients', '/fr/clients'];

    for (const path of pathsToHide) {
      // Check if page exists
      const existing = await db
        .select()
        .from(pageVisibility)
        .where(eq(pageVisibility.path, path))
        .limit(1);

      if (existing.length > 0) {
        // Update existing
        await db
          .update(pageVisibility)
          .set({
            isVisible: false,
            updatedAt: new Date(),
          })
          .where(eq(pageVisibility.path, path));
        console.log(`✓ Updated visibility for ${path} to hidden`);
      } else {
        // Create new with hidden status
        await db.insert(pageVisibility).values({
          path: path,
          isVisible: false,
          description: path.includes('/fr/') ? 'Page clients en français' : 'Page clients',
        });
        console.log(`✓ Created hidden entry for ${path}`);
      }
    }

    console.log('\n✅ Successfully hid clients pages!');
  } catch (error) {
    console.error('❌ Error hiding clients pages:', error);
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  hideClientsPages()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { hideClientsPages };
