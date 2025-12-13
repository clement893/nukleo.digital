import { createLoader } from "./loaders";

// Test loader with simple animation and logo
const testLoaderCSS = `<div class="nukleo-loader-test">
  <style>
    .nukleo-loader-test {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-test .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-float 3s ease-in-out infinite;
    }
    
    @keyframes logo-float {
      0%, 100% { 
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      50% { 
        transform: translateY(-20px) scale(1.05);
        opacity: 0.9;
      }
    }
    
    .nukleo-loader-test .logo-container img {
      width: 200px;
      height: auto;
      filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6));
    }
    
    .nukleo-loader-test .text {
      color: rgba(255, 255, 255, 0.9);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 14px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }
  </style>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="nukleo-loader-test-text" style="position: fixed; bottom: 30%; left: 50%; transform: translateX(-50%); z-index: 10000; pointer-events: none; height: 1.5em; overflow: hidden;">
    <span class="text-item" style="position: absolute; left: 50%; transform: translateX(-50%); opacity: 0; animation: text-cycle 6s ease-in-out infinite; white-space: nowrap; color: rgba(255, 255, 255, 0.9); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.3em; text-transform: uppercase;" data-text="Choose Intelligence">Choose Intelligence</span>
    <span class="text-item" style="position: absolute; left: 50%; transform: translateX(-50%); opacity: 0; animation: text-cycle 6s ease-in-out infinite; animation-delay: 2s; white-space: nowrap; color: rgba(255, 255, 255, 0.9); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.3em; text-transform: uppercase;" data-text="Choose Creativity">Choose Creativity</span>
    <span class="text-item" style="position: absolute; left: 50%; transform: translateX(-50%); opacity: 0; animation: text-cycle 6s ease-in-out infinite; animation-delay: 4s; white-space: nowrap; color: rgba(255, 255, 255, 0.9); font-family: 'Aktiv Grotesk', sans-serif; font-size: 14px; letter-spacing: 0.3em; text-transform: uppercase;" data-text="Choose The Future">Choose The Future</span>
  </div>
  <style>
    @keyframes text-cycle {
      0%, 30% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      5%, 25% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      35%, 100% {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
    }
  </style>
</div>`;

export async function seedLoaders() {
  try {
    // Check if test loader already exists
    const existingLoaders = await import("./loaders").then((m) =>
      m.getAllLoaders()
    );
    const testLoaderExists = existingLoaders.some(
      (loader) => loader.name === "Test Loader"
    );

    if (!testLoaderExists) {
      await createLoader({
        name: "Test Loader",
        description: "Loader de test avec mouvement simple et logo Nukleo",
        cssCode: testLoaderCSS,
        isActive: false, // Not activated by default
        displayOrder: 0,
      });
      console.log("✅ Test loader créé avec succès");
    } else {
      console.log("ℹ️ Test loader existe déjà");
    }
  } catch (error) {
    console.error("❌ Erreur lors de la création du loader de test:", error);
    throw error;
  }
}
