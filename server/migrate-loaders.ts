/**
 * Migration script to sanitize all existing loaders in the database
 * 
 * This script:
 * 1. Fetches all loaders from the database
 * 2. Sanitizes their HTML content
 * 3. Updates them in the database
 * 
 * Run this script once to fix existing loaders:
 * npx tsx server/migrate-loaders.ts
 */

import { getAllLoaders, updateLoader } from "./loaders";
import { sanitizeLoaderHTML, validateLoaderHTML } from "./html-sanitizer";

async function migrateLoaders() {
  console.log("🔄 Starting loader migration...\n");

  try {
    const allLoaders = await getAllLoaders();
    console.log(`📊 Found ${allLoaders.length} loaders to check\n`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const loader of allLoaders) {
      console.log(`\n📝 Processing loader: "${loader.name}" (ID: ${loader.id})`);
      
      // Validate current HTML
      const validation = validateLoaderHTML(loader.cssCode);
      
      if (validation.isValid && validation.warnings.length === 0) {
        console.log("  ✅ Already valid, skipping...");
        skipped++;
        continue;
      }

      // Show validation issues
      if (validation.errors.length > 0) {
        console.log("  ⚠️  Issues found:");
        validation.errors.forEach(error => console.log(`     - ${error}`));
      }
      if (validation.warnings.length > 0) {
        console.log("  ⚠️  Warnings:");
        validation.warnings.forEach(warning => console.log(`     - ${warning}`));
      }

      // Sanitize HTML
      const sanitized = sanitizeLoaderHTML(loader.cssCode);
      
      // Check if sanitization changed anything
      if (sanitized === loader.cssCode) {
        console.log("  ℹ️  No changes needed");
        skipped++;
        continue;
      }

      // Update loader in database
      try {
        await updateLoader(loader.id, { cssCode: sanitized });
        console.log("  ✅ Updated successfully");
        updated++;
      } catch (error) {
        console.error(`  ❌ Error updating loader: ${error}`);
        errors++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 Migration Summary:");
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log("=".repeat(50) + "\n");

    if (errors === 0) {
      console.log("✅ Migration completed successfully!");
    } else {
      console.log("⚠️  Migration completed with errors. Please review the output above.");
    }
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error; // Throw instead of exit since this is called from API
  }
}

// Note: This file is only imported, never executed directly in production
// To run as a script, use: npx tsx server/migrate-loaders.ts
// The check for direct execution is removed to avoid ES module errors

export { migrateLoaders };
