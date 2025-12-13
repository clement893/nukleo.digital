// Test Loader supprimé définitivement - ne plus créer ce loader

export async function seedLoaders() {
  // Test Loader supprimé - ne plus créer ce loader
  try {
    console.log("ℹ️ seedLoaders: Test Loader supprimé définitivement");
  } catch (error) {
    console.error("❌ Erreur dans seedLoaders:", error);
    throw error;
  }
}
