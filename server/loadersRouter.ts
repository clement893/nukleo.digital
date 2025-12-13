import { z } from "zod";
import { router, publicProcedure } from "./_core/trpc";
import * as loadersDb from "./loaders";

export const loadersRouter = router({
  // Get all loaders (admin only)
  getAll: publicProcedure.query(async () => {
    return await loadersDb.getAllLoaders();
  }),

  // Get active loaders (public - for rotation)
  getActive: publicProcedure.query(async () => {
    return await loadersDb.getActiveLoaders();
  }),

  // Create a new loader
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        cssCode: z.string().min(1),
        isActive: z.boolean().default(true),
        displayOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      return await loadersDb.createLoader(input);
    }),

  // Update a loader
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        cssCode: z.string().min(1).optional(),
        isActive: z.boolean().optional(),
        displayOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await loadersDb.updateLoader(id, data);
    }),

  // Toggle active status
  toggleActive: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await loadersDb.toggleLoaderActive(input.id);
    }),

  // Delete a loader
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await loadersDb.deleteLoader(input.id);
    }),

  // Reset all loaders and create new ones
  reset: publicProcedure.mutation(async () => {
    // Delete all existing loaders
    const deletedCount = await loadersDb.deleteAllLoaders();

    // Loader 1: Logo avec animation de pulse et particules
    const loader1CSS = `
<div class="nukleo-loader-1">
  <style>
    .nukleo-loader-1 {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-1::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: 
        radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.12) 0%, transparent 50%);
      animation: mesh-float 20s ease-in-out infinite;
    }
    
    @keyframes mesh-float {
      0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
      33% { transform: translate(5%, 5%) rotate(5deg); opacity: 0.8; }
      66% { transform: translate(-5%, 3%) rotate(-3deg); opacity: 0.6; }
    }
    
    .nukleo-loader-1 .logo-container {
      position: relative;
      z-index: 10;
      animation: logo-pulse 2s ease-in-out infinite;
    }
    
    @keyframes logo-pulse {
      0%, 100% { 
        transform: scale(1);
        filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
      }
      50% { 
        transform: scale(1.05);
        filter: drop-shadow(0 0 40px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.6));
      }
    }
    
    .nukleo-loader-1 .logo-container img {
      width: 200px;
      height: auto;
      animation: logo-rotate 3s ease-in-out infinite;
    }
    
    @keyframes logo-rotate {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-5deg); }
      75% { transform: rotate(5deg); }
    }
    
    .nukleo-loader-1 .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .nukleo-loader-1 .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent);
      border-radius: 50%;
      animation: particle-float 4s ease-in-out infinite;
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.6);
    }
    
    @keyframes particle-float {
      0%, 100% { 
        transform: translateY(0) translateX(0);
        opacity: 0.3;
      }
      50% { 
        transform: translateY(-30px) translateX(20px);
        opacity: 1;
      }
    }
    
    .nukleo-loader-1 .text {
      position: absolute;
      bottom: 30%;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.9);
      font-family: 'Aktiv Grotesk', sans-serif;
      font-size: 14px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      animation: text-fade 2s ease-in-out infinite;
    }
    
    @keyframes text-fade {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  </style>
  
  <div class="particles">
    ${(() => {
      const positions = [
        [15, 20], [45, 30], [75, 15], [25, 50], [60, 65], [85, 45],
        [30, 80], [70, 25], [10, 60], [90, 70], [40, 10], [55, 85],
        [20, 40], [65, 55], [5, 75], [95, 35], [35, 90], [80, 5],
        [12, 45], [88, 60]
      ];
      const delays = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 0.1, 0.3, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7, 1.9];
      const durations = [3, 3.5, 4, 4.5, 5, 3.2, 3.7, 4.2, 4.7, 5.2, 3.1, 3.6, 4.1, 4.6, 5.1, 3.3, 3.8, 4.3, 4.8, 5.3];
      return Array.from({ length: 20 }, (_, i) => {
        const [left, top] = positions[i] || [50, 50];
        return `
      <div class="particle" style="
        left: ${left}%;
        top: ${top}%;
        animation-delay: ${delays[i]}s;
        animation-duration: ${durations[i]}s;
      "></div>
    `;
      }).join('');
    })()}
  </div>
  
  <div class="logo-container">
    <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
  </div>
  
  <div class="text">Choose Intelligence</div>
</div>
`;

    // Loader 2: Logo avec effet de glitch et gradient animé
    const loader2CSS = `
<div class="nukleo-loader-2">
  <style>
    .nukleo-loader-2 {
      position: fixed;
      inset: 0;
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
    }
    
    .nukleo-loader-2::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        45deg,
        rgba(139, 92, 246, 0.1) 0%,
        rgba(236, 72, 153, 0.1) 25%,
        rgba(34, 211, 238, 0.1) 50%,
        rgba(139, 92, 246, 0.1) 75%,
        rgba(236, 72, 153, 0.1) 100%
      );
      background-size: 400% 400%;
      animation: gradient-shift 8s ease infinite;
    }
    
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .nukleo-loader-2 .logo-wrapper {
      position: relative;
      z-index: 10;
    }
    
    .nukleo-loader-2 .logo-wrapper::before,
    .nukleo-loader-2 .logo-wrapper::after {
      content: '';
      position: absolute;
      inset: -20px;
      border: 2px solid;
      border-radius: 50%;
      animation: ring-pulse 2s ease-in-out infinite;
    }
    
    .nukleo-loader-2 .logo-wrapper::before {
      border-color: rgba(139, 92, 246, 0.5);
      animation-delay: 0s;
    }
    
    .nukleo-loader-2 .logo-wrapper::after {
      border-color: rgba(236, 72, 153, 0.5);
      animation-delay: 0.5s;
    }
    
    @keyframes ring-pulse {
      0%, 100% { 
        transform: scale(0.8);
        opacity: 0.5;
      }
      50% { 
        transform: scale(1.2);
        opacity: 0;
      }
    }
    
    .nukleo-loader-2 .logo {
      position: relative;
      width: 250px;
      height: auto;
      filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.4));
      animation: logo-glitch 3s ease-in-out infinite;
    }
    
    @keyframes logo-glitch {
      0%, 90%, 100% { 
        transform: translate(0, 0) scale(1);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.4));
      }
      91% { 
        transform: translate(-2px, 2px) scale(1.02);
        filter: drop-shadow(0 0 40px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 80px rgba(139, 92, 246, 0.6));
      }
      92% { 
        transform: translate(2px, -2px) scale(0.98);
        filter: drop-shadow(0 0 50px rgba(236, 72, 153, 0.9)) drop-shadow(0 0 100px rgba(34, 211, 238, 0.7));
      }
      93% { 
        transform: translate(0, 0) scale(1);
        filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.4));
      }
    }
    
    .nukleo-loader-2 .logo img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .nukleo-loader-2 .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(139, 92, 246, 0.8),
        rgba(236, 72, 153, 0.8),
        rgba(34, 211, 238, 0.8),
        transparent
      );
      animation: scan 2s linear infinite;
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
    }
    
    @keyframes scan {
      0% { top: 0; opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    
    .nukleo-loader-2 .grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.3;
      animation: grid-pulse 4s ease-in-out infinite;
    }
    
    @keyframes grid-pulse {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.5; }
    }
    
    .nukleo-loader-2 .text {
      position: absolute;
      bottom: 25%;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.95);
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      font-weight: 600;
      text-shadow: 
        0 0 10px rgba(139, 92, 246, 0.8),
        0 0 20px rgba(236, 72, 153, 0.6);
      animation: text-glow 2s ease-in-out infinite;
    }
    
    @keyframes text-glow {
      0%, 100% { 
        opacity: 0.7;
        text-shadow: 
          0 0 10px rgba(139, 92, 246, 0.8),
          0 0 20px rgba(236, 72, 153, 0.6);
      }
      50% { 
        opacity: 1;
        text-shadow: 
          0 0 20px rgba(139, 92, 246, 1),
          0 0 40px rgba(236, 72, 153, 0.8),
          0 0 60px rgba(34, 211, 238, 0.6);
      }
    }
  </style>
  
  <div class="grid"></div>
  <div class="scan-line"></div>
  
  <div class="logo-wrapper">
    <div class="logo">
      <img src="/Nukleo_blanc_RVB.svg" alt="Nukleo Digital" />
    </div>
  </div>
  
  <div class="text">NUKLEO DIGITAL</div>
</div>
`;

    // Create the two new loaders
    const loader1 = await loadersDb.createLoader({
      name: "Nukleo Pulse",
      description: "Logo avec animation de pulse élégante et particules flottantes. Design moderne et professionnel.",
      cssCode: loader1CSS,
      isActive: true,
      displayOrder: 1,
    });

    const loader2 = await loadersDb.createLoader({
      name: "Nukleo Glitch",
      description: "Logo avec effet de glitch cyberpunk et gradient animé. Design puissant et futuriste.",
      cssCode: loader2CSS,
      isActive: true,
      displayOrder: 2,
    });

    return {
      success: true,
      deleted: deletedCount,
      created: [loader1, loader2],
    };
  }),
});
