import { seedCrazyLoaders } from "./server/seed-crazy-loaders.ts";

try {
  const result = await seedCrazyLoaders();
  console.log(`✅ ${result.created} loaders créés avec succès !`);
  process.exit(0);
} catch (error) {
  console.error("❌ Erreur:", error);
  process.exit(1);
}
