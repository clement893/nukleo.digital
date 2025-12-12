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
});
