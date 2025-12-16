import { getDb } from "./db";
import { pageVisibility } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function enableProjectsPage() {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const paths = ['/projects', '/fr/projects'];
    
    for (const path of paths) {
      // Check if page exists
      const existing = await db
        .select()
        .from(pageVisibility)
        .where(eq(pageVisibility.path, path))
        .limit(1);

      if (existing.length > 0) {
        // Update existing page to visible
        await db
          .update(pageVisibility)
          .set({
            isVisible: true,
            updatedAt: new Date(),
          })
          .where(eq(pageVisibility.path, path));
        console.log(`✅ Updated ${path} to visible`);
      } else {
        // Insert new page as visible
        await db.insert(pageVisibility).values({
          path,
          isVisible: true,
          description: path === '/projects' 
            ? 'Page des projets' 
            : 'Page des projets en français',
        });
        console.log(`✅ Created ${path} as visible`);
      }
    }

    console.log('\n✅ Projects pages enabled successfully!');
  } catch (error) {
    console.error('❌ Error enabling projects pages:', error);
    throw error;
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  enableProjectsPage()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { enableProjectsPage };

