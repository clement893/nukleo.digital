import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { getDb } from '../db';
import { aiAssessments } from '../../drizzle/schema';
import { emailCaptureSchema } from '../../shared/assessment.types';
import { sendEmail, generateAssessmentEmail } from '../_core/sendgrid';

export const assessmentRouter = router({
  save: publicProcedure
    .input(
      z.object({
        // User info
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        company: z.string(),
        jobTitle: z.string().optional(),
        phone: z.string().optional(),
        companySize: z.string().optional(),
        industry: z.string().optional(),
        
        // Scores
        globalScore: z.number(),
        strategyScore: z.number(),
        dataScore: z.number(),
        technologyScore: z.number(),
        talentScore: z.number(),
        governanceScore: z.number(),
        cultureScore: z.number(),
        maturityLevel: z.string(),
        
        // Responses
        answers: z.record(z.string(), z.number()),
        
        // Marketing
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }

      await db.insert(aiAssessments).values({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        company: input.company,
        jobTitle: input.jobTitle,
        phone: input.phone,
        companySize: input.companySize,
        industry: input.industry,
        globalScore: input.globalScore,
        strategyScore: input.strategyScore,
        dataScore: input.dataScore,
        technologyScore: input.technologyScore,
        talentScore: input.talentScore,
        governanceScore: input.governanceScore,
        cultureScore: input.cultureScore,
        maturityLevel: input.maturityLevel,
        responses: JSON.stringify(input.answers),
        utmSource: input.utmSource,
        utmMedium: input.utmMedium,
        utmCampaign: input.utmCampaign,
      });

      // Send email with results
      const dimensionScores = [
        { label: 'Strategy', score: input.strategyScore },
        { label: 'Data', score: input.dataScore },
        { label: 'Technology', score: input.technologyScore },
        { label: 'Talent', score: input.talentScore },
        { label: 'Governance', score: input.governanceScore },
        { label: 'Culture', score: input.cultureScore },
      ];

      const emailHtml = generateAssessmentEmail({
        firstName: input.firstName,
        lastName: input.lastName,
        globalScore: input.globalScore,
        maturityLevel: input.maturityLevel,
        dimensionScores,
      });

      const emailSent = await sendEmail({
        to: input.email,
        subject: `Your AI Readiness Report - Score: ${input.globalScore}/100`,
        html: emailHtml,
      });

      return {
        success: true,
        emailSent,
      };
    }),

  validateEmail: publicProcedure
    .input(emailCaptureSchema)
    .mutation(async ({ input }) => {
      // Just validate the schema, actual save happens in save procedure
      return { valid: true };
    }),
});
