import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { getDb } from '../db';
import { testimonials } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';

export const testimonialsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        language: z.enum(['fr', 'en']).default('en'),
      }).optional()
    )
    .query(async ({ input }) => {
      const language = input?.language || 'en';
      const db = await getDb();
      
      if (!db) {
        console.warn('[Database] Cannot get testimonials: database not available');
        return [];
      }
      
      try {
        const allTestimonials = await db
          .select()
          .from(testimonials)
          .where(eq(testimonials.isActive, true))
          .orderBy(desc(testimonials.displayOrder), desc(testimonials.createdAt));

        // Ensure allTestimonials is always an array
        const safeTestimonials = Array.isArray(allTestimonials) ? allTestimonials : [];

        // Map testimonials to include the correct language text
        return safeTestimonials.map((testimonial) => ({
          id: testimonial.id,
          client: testimonial.client,
          contact: testimonial.contact,
          title: testimonial.title,
          company: testimonial.company,
          text: language === 'fr' ? testimonial.textFr : testimonial.textEn,
          displayOrder: testimonial.displayOrder,
        }));
      } catch (error) {
        console.error('Error fetching testimonials from database:', error);
        return [];
      }
    }),
});
