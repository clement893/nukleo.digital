import { z } from 'zod';

export const emailCaptureSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'You must consent to receive the report'),
});

export type EmailCaptureInput = z.infer<typeof emailCaptureSchema>;

export interface SaveAssessmentInput extends EmailCaptureInput {
  answers: Record<number, number>;
  globalScore: number;
  strategyScore: number;
  dataScore: number;
  technologyScore: number;
  talentScore: number;
  governanceScore: number;
  cultureScore: number;
  maturityLevel: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
