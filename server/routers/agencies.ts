import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { saveAgencyLead, getAllAgencyLeads } from "../db";

export const agenciesRouter = router({
  getAllLeads: protectedProcedure.query(async ({ ctx }) => {
    // Only admins can view leads
    if (ctx.user?.role !== 'admin') {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
    }
    
    return await getAllAgencyLeads();
  }),

  saveLead: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        companyName: z.string().optional(),
        agencySize: z.string().optional(),
        techNeeds: z.array(z.string()).optional(),
        budget: z.string().optional(),
        urgency: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Calculate qualification score based on answers
      let qualificationScore = 0;
      
      // Score based on agency size (bigger = higher score)
      if (input.agencySize === '50+') qualificationScore += 30;
      else if (input.agencySize === '21-50') qualificationScore += 25;
      else if (input.agencySize === '6-20') qualificationScore += 20;
      else if (input.agencySize === '1-5') qualificationScore += 10;
      
      // Score based on budget (higher budget = higher score)
      if (input.budget === '100k+') qualificationScore += 40;
      else if (input.budget === '50-100k') qualificationScore += 30;
      else if (input.budget === '10-50k') qualificationScore += 20;
      else if (input.budget === '<10k') qualificationScore += 10;
      
      // Score based on urgency (more urgent = higher score)
      if (input.urgency === 'immediate') qualificationScore += 30;
      else if (input.urgency === '1-3 months') qualificationScore += 20;
      else if (input.urgency === '3-6 months') qualificationScore += 10;
      else if (input.urgency === 'exploring') qualificationScore += 5;
      
      await saveAgencyLead({
        email: input.email,
        companyName: input.companyName,
        agencySize: input.agencySize,
        techNeeds: input.techNeeds ? JSON.stringify(input.techNeeds) : null,
        budget: input.budget,
        urgency: input.urgency,
        qualificationScore,
      });

      return { success: true, qualificationScore };
    }),
});
