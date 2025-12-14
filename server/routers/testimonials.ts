import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { getDb } from '../db';
import { testimonials } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';
import { ENV } from '../_core/env';

// Interface pour les témoignages de l'API externe
interface ExternalTestimonial {
  id?: number;
  client: string;
  contact: string;
  title: string;
  company: string;
  textEn?: string;
  textFr?: string;
  text?: string; // Si pas de séparation FR/EN
  displayOrder?: number;
  isActive?: boolean;
}

// Fonction pour récupérer les témoignages depuis la plateforme interne
async function fetchTestimonialsFromExternalPlatform(language: 'fr' | 'en'): Promise<ExternalTestimonial[]> {
  if (!ENV.internalPlatformUrl) {
    return []; // Pas d'URL configurée, retourner vide pour utiliser le fallback
  }

  try {
    const url = `${ENV.internalPlatformUrl}/api/testimonials?language=${language}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Ajouter la clé API si configurée
    if (ENV.internalPlatformApiKey) {
      headers['Authorization'] = `Bearer ${ENV.internalPlatformApiKey}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
      // Timeout de 5 secondes
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`[Testimonials] External API returned ${response.status}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    
    // Normaliser les données selon le format attendu
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        id: item.id,
        client: item.client || item.company || '',
        contact: item.contact || item.name || '',
        title: item.title || '',
        company: item.company || item.client || '',
        textEn: item.textEn || item.text || '',
        textFr: item.textFr || item.text || '',
        displayOrder: item.displayOrder || item.order || 0,
        isActive: item.isActive !== false, // Par défaut actif
      }));
    }

    // Si la réponse est un objet avec une propriété testimonials
    if (data.testimonials && Array.isArray(data.testimonials)) {
      return data.testimonials.map((item: any) => ({
        id: item.id,
        client: item.client || item.company || '',
        contact: item.contact || item.name || '',
        title: item.title || '',
        company: item.company || item.client || '',
        textEn: item.textEn || item.text || '',
        textFr: item.textFr || item.text || '',
        displayOrder: item.displayOrder || item.order || 0,
        isActive: item.isActive !== false,
      }));
    }

    return [];
  } catch (error: any) {
    // Ne pas logger les erreurs de timeout ou de réseau pour éviter le bruit
    if (error.name !== 'AbortError' && error.name !== 'TypeError') {
      console.warn('[Testimonials] Error fetching from external platform:', error.message);
    }
    return [];
  }
}

export const testimonialsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        language: z.enum(['fr', 'en']).default('en'),
      }).optional()
    )
    .query(async ({ input }) => {
      const language = input?.language || 'en';
      
      // Essayer d'abord de récupérer depuis la plateforme interne
      const externalTestimonials = await fetchTestimonialsFromExternalPlatform(language);
      
      if (externalTestimonials.length > 0) {
        // Retourner les témoignages de l'API externe
        return externalTestimonials
          .filter(t => t.isActive !== false)
          .map((testimonial) => ({
            id: testimonial.id || 0,
            client: testimonial.client,
            contact: testimonial.contact,
            title: testimonial.title,
            company: testimonial.company,
            text: language === 'fr' 
              ? (testimonial.textFr || testimonial.text || '') 
              : (testimonial.textEn || testimonial.text || ''),
            displayOrder: testimonial.displayOrder || 0,
          }))
          .sort((a, b) => b.displayOrder - a.displayOrder);
      }

      // Fallback sur la base de données locale
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

        // Map testimonials to include the correct language text
        return allTestimonials.map((testimonial) => ({
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
