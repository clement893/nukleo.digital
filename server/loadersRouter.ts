import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "./_core/trpc";
import * as loadersDb from "./loaders";
import { validateLoaderHTML } from "./html-sanitizer";
import { migrateLoaders } from "./migrate-loaders";

export const loadersRouter = router({
  getAll: publicProcedure.query(async () => {
    try {
      const result = await loadersDb.getAllLoaders();
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.warn('[Loaders Router] Error in getAll:', error);
      return [];
    }
  }),

  getActive: publicProcedure.query(async () => {
    try {
      const result = await loadersDb.getActiveLoaders();
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.warn('[Loaders Router] Error in getActive:', error);
      return [];
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await loadersDb.getLoaderById(input.id);
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        cssCode: z.string().min(1),
        isActive: z.boolean().default(false),
        displayOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      return await loadersDb.createLoader(input);
    }),

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

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await loadersDb.deleteLoader(input.id);
      return { success: true };
    }),

  toggleActive: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await loadersDb.toggleLoaderActive(input.id);
    }),

  validate: publicProcedure
    .input(z.object({ cssCode: z.string() }))
    .query(async ({ input }) => {
      return validateLoaderHTML(input.cssCode);
    }),

  // Admin routes
  checkAll: adminProcedure.query(async () => {
    const allLoaders = await loadersDb.getAllLoaders();
    const safeLoaders = Array.isArray(allLoaders) ? allLoaders : [];
    const results = safeLoaders.map(loader => {
      const validation = validateLoaderHTML(loader.cssCode);
      return {
        id: loader.id,
        name: loader.name,
        isActive: loader.isActive,
        ...validation,
      };
    });
    
    const needsMigration = results.filter(r => !r.isValid || r.errors.length > 0 || r.warnings.length > 0);
    
    return {
      total: results.length,
      needsMigration: needsMigration.length,
      results,
      summary: {
        valid: results.filter(r => r.isValid && r.errors.length === 0 && r.warnings.length === 0).length,
        hasErrors: results.filter(r => r.errors.length > 0).length,
        hasWarnings: results.filter(r => r.warnings.length > 0).length,
      },
    };
  }),

  migrateAll: adminProcedure.mutation(async () => {
    // Execute migration
    await migrateLoaders();
    return { success: true, message: "Migration completed. Check server logs for details." };
  }),
});
