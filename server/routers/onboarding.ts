import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  getOnboardingProgress,
  createOnboardingProgress,
  updateOnboardingProgress,
} from "../db";

export const onboardingRouter = router({
  // Get current onboarding progress
  getProgress: protectedProcedure.query(async ({ ctx }) => {
    let progress = await getOnboardingProgress(ctx.user.id);
    
    // Create progress if it doesn't exist
    if (!progress) {
      progress = await createOnboardingProgress(ctx.user.id);
    }
    
    return {
      ...progress,
      completedSteps: progress?.completedSteps ? JSON.parse(progress.completedSteps) : [],
      isCompleted: Boolean(progress?.isCompleted),
      skipped: Boolean(progress?.skipped),
    };
  }),

  // Update onboarding progress
  updateProgress: protectedProcedure
    .input(
      z.object({
        currentStep: z.number().optional(),
        completedSteps: z.array(z.number()).optional(),
        isCompleted: z.boolean().optional(),
        skipped: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const progress = await updateOnboardingProgress(ctx.user.id, input);
      
      return {
        ...progress,
        completedSteps: progress?.completedSteps ? JSON.parse(progress.completedSteps) : [],
        isCompleted: Boolean(progress?.isCompleted),
        skipped: Boolean(progress?.skipped),
      };
    }),

  // Complete onboarding
  complete: protectedProcedure.mutation(async ({ ctx }) => {
    const progress = await updateOnboardingProgress(ctx.user.id, {
      isCompleted: true,
    });
    
    return {
      ...progress,
      completedSteps: progress?.completedSteps ? JSON.parse(progress.completedSteps) : [],
      isCompleted: Boolean(progress?.isCompleted),
      skipped: Boolean(progress?.skipped),
    };
  }),

  // Skip onboarding
  skip: protectedProcedure.mutation(async ({ ctx }) => {
    const progress = await updateOnboardingProgress(ctx.user.id, {
      skipped: true,
      isCompleted: true,
    });
    
    return {
      ...progress,
      completedSteps: progress?.completedSteps ? JSON.parse(progress.completedSteps) : [],
      isCompleted: Boolean(progress?.isCompleted),
      skipped: Boolean(progress?.skipped),
    };
  }),
});
