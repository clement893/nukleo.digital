import { z } from "zod";
import { router, publicProcedure } from "./_core/trpc";
import * as loadersDb from "./loaders";

export const loadersRouter = router({
  getAll: publicProcedure.query(async () => {
    return await loadersDb.getAllLoaders();
  }),

  getActive: publicProcedure.query(async () => {
    return await loadersDb.getActiveLoaders();
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
});
