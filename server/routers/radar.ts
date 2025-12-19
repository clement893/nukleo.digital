import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { radarTechnologies, radarPositions, type InsertRadarTechnology, type InsertRadarPosition, type RadarPosition } from "../../drizzle/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";

// Initial technologies to seed
const INITIAL_TECHNOLOGIES = [
  { name: "Agentic AI", slug: "agentic-ai", description: "Systèmes d'agents autonomes capables de planifier et d'exécuter des tâches complexes multi-étapes sans supervision humaine constante" },
  { name: "Multimodal LLMs", slug: "multimodal-llms", description: "Modèles de langage capables de traiter simultanément texte, images, audio et vidéo pour des interactions plus riches" },
  { name: "AI Agents", slug: "ai-agents", description: "Assistants IA spécialisés intégrés dans des workflows métier spécifiques comme sales, customer support, ou data analysis" },
  { name: "RAG Systems", slug: "rag-systems", description: "Retrieval-Augmented Generation, combinant recherche sémantique et génération pour réduire les hallucinations et ancrer les réponses dans des données propriétaires" },
  { name: "AI Orchestration", slug: "ai-orchestration", description: "Plateformes de coordination de multiples modèles IA et agents pour des workflows complexes" },
  { name: "Edge AI", slug: "edge-ai", description: "Déploiement de modèles IA directement sur appareils edge pour latence réduite et confidentialité accrue" },
  { name: "Synthetic Data", slug: "synthetic-data", description: "Génération de données d'entraînement synthétiques pour contourner les limitations de données réelles" },
  { name: "AI Governance", slug: "ai-governance", description: "Frameworks, outils et processus pour assurer conformité, éthique et auditabilité des systèmes IA" },
];

// Get current radar data (latest positions for all technologies)
export const radarRouter = router({
  getCurrent: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      console.warn('[Radar] Database connection failed');
      return [];
    }
    
    try {
      // Get latest position for each technology
      const technologies = await db.select().from(radarTechnologies).orderBy(radarTechnologies.name);
      
      if (!technologies || technologies.length === 0) {
        return [];
      }
    
      const positions = await Promise.all(
        technologies.map(async (tech) => {
          const latestPosition = await db
            .select()
            .from(radarPositions)
            .where(eq(radarPositions.technologyId, tech.id))
            .orderBy(desc(radarPositions.date))
            .limit(1);
          
          return {
            technology: tech,
            position: latestPosition[0] || null,
          };
        })
      );

      return positions.filter(p => p.position !== null);
    } catch (error: any) {
      // If table doesn't exist, return empty array
      const errorMessage = error?.message || '';
      const errorCode = error?.code || '';
      
      if (
        errorMessage.includes('does not exist') || 
        errorMessage.includes('relation') ||
        errorCode === '42P01' ||
        errorMessage.includes('radar_technologies')
      ) {
        console.warn('[Radar] Tables not initialized yet, returning empty array. Error:', errorMessage);
        return [];
      }
      
      console.error('[Radar] Error fetching radar data:', error);
      throw error;
    }
  }),

  getHistory: publicProcedure
    .input(z.object({
      technologyId: z.number().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      try {
        let query = db.select().from(radarPositions);
      
      if (input.technologyId) {
        query = query.where(eq(radarPositions.technologyId, input.technologyId));
      }
      
      if (input.startDate) {
        query = query.where(gte(radarPositions.date, input.startDate));
      }
      
      if (input.endDate) {
        query = query.where(lte(radarPositions.date, input.endDate));
      }
      
        return query.orderBy(desc(radarPositions.date));
      } catch (error: any) {
        const errorMessage = error?.message || '';
        if (errorMessage.includes('does not exist') || errorMessage.includes('relation') || error?.code === '42P01') {
          console.warn('[Radar] Tables not initialized yet, returning empty array');
          return [];
        }
        throw error;
      }
    }),

  getTechnology: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      
      try {
        const tech = await db
          .select()
          .from(radarTechnologies)
          .where(eq(radarTechnologies.slug, input.slug))
          .limit(1);
        
        if (!tech[0]) return null;
        
        const latestPosition = await db
          .select()
          .from(radarPositions)
          .where(eq(radarPositions.technologyId, tech[0].id))
          .orderBy(desc(radarPositions.date))
          .limit(1);
        
        return {
          technology: tech[0],
          position: latestPosition[0] || null,
        };
      } catch (error: any) {
        const errorMessage = error?.message || '';
        if (errorMessage.includes('does not exist') || errorMessage.includes('relation') || error?.code === '42P01') {
          console.warn('[Radar] Tables not initialized yet, returning null');
          return null;
        }
        throw error;
      }
    }),

  // Get latest AI news related to radar technologies
  getLatestNews: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(5) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      
      try {
        const technologies = await db.select().from(radarTechnologies).orderBy(radarTechnologies.name);
        
        if (technologies.length === 0) {
          return [];
        }
        
        // Generate news using AI for the latest technologies
        const limit = input?.limit || 5;
        const selectedTechs = technologies.slice(0, limit);
        
        const newsItems = await Promise.all(
          selectedTechs.map(async (tech) => {
            try {
              const latestPosition = await db
                .select()
                .from(radarPositions)
                .where(eq(radarPositions.technologyId, tech.id))
                .orderBy(desc(radarPositions.date))
                .limit(1);
              
              const news = await generateNewsForTechnology(tech, latestPosition[0] || null);
              return news;
            } catch (error) {
              console.error(`Error generating news for ${tech.name}:`, error);
              return null;
            }
          })
        );
        
        return newsItems.filter((item): item is NonNullable<typeof item> => item !== null);
      } catch (error: any) {
        const errorMessage = error?.message || '';
        if (errorMessage.includes('does not exist') || errorMessage.includes('relation') || error?.code === '42P01') {
          console.warn('[Radar] Tables not initialized yet, returning empty array');
          return [];
        }
        console.error('[Radar] Error fetching news:', error);
        return [];
      }
    }),

  // Generate daily refresh - should be called by cron job
  refreshDaily: publicProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database connection failed");
    const technologies = await db.select().from(radarTechnologies);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const results = [];
    
    for (const tech of technologies) {
      // Check if we already have a position for today
      const existingToday = await db
        .select()
        .from(radarPositions)
        .where(
          and(
            eq(radarPositions.technologyId, tech.id),
            gte(radarPositions.date, today)
          )
        )
        .limit(1);
      
      if (existingToday.length > 0) {
        results.push({ technology: tech.name, status: "skipped", reason: "Already updated today" });
        continue;
      }
      
      // Get previous position for context
      const previousPosition = await db
        .select()
        .from(radarPositions)
        .where(eq(radarPositions.technologyId, tech.id))
        .orderBy(desc(radarPositions.date))
        .limit(1);
      
      // Generate new position using AI
      try {
        const newPosition = await generateRadarPosition(tech, previousPosition[0] || null);
        
        await db.insert(radarPositions).values({
          technologyId: tech.id,
          date: today,
          ...newPosition,
        });
        
        results.push({ technology: tech.name, status: "success" });
      } catch (error) {
        console.error(`Error generating position for ${tech.name}:`, error);
        results.push({ technology: tech.name, status: "error", error: String(error) });
      }
    }
    
    return { results, date: today };
  }),
});

// Helper function to generate news for a technology
async function generateNewsForTechnology(
  technology: { name: string; description: string; slug: string },
  latestPosition: RadarPosition | null
): Promise<{
  id: string;
  title: string;
  summary: string;
  technology: string;
  technologySlug: string;
  date: Date;
  source: string;
  url?: string;
}> {
  const prompt = `Tu es un expert en intelligence artificielle et tendances technologiques mondiales.

Génère une nouvelle brève et pertinente (style article de blog/news) sur la technologie suivante :

Technologie: ${technology.name}
Description: ${technology.description}

${latestPosition ? `
Contexte actuel:
- Maturité: ${latestPosition.maturityScore}/100 (${latestPosition.maturityLevel})
- Impact: ${latestPosition.impactScore}/100
` : ''}

Génère une nouvelle basée sur des développements RÉCENTS MONDIAUX réels avec:
1. Un titre accrocheur basé sur des tendances réelles (max 80 caractères)
2. Un résumé de 2-3 phrases décrivant les développements récents (max 200 caractères)
3. Un ton professionnel mais accessible
4. Focus sur les développements RÉCENTS MONDIAUX, cas d'usage concrets, ou implications business
5. Le nom d'une source crédible (TechCrunch, The Verge, MIT Technology Review, etc.) - mais NE PAS inventer d'URL

CRITIQUE: 
- NE JAMAIS inventer ou générer d'URLs fictives
- Si tu ne connais pas une URL réelle et vérifiable, laisse le champ "url" vide ou null
- Les nouvelles doivent être basées sur des tendances réelles, mais sans prétendre avoir une URL spécifique si tu n'en connais pas une

Réponds en JSON avec cette structure exacte:
{
  "title": "titre accrocheur basé sur tendances réelles",
  "summary": "résumé de 2-3 phrases décrivant les développements récents mondiaux",
  "source": "nom de la source crédible (ex: TechCrunch, The Verge, MIT Technology Review)",
  "url": null
}

Si tu connais une URL réelle et vérifiable, tu peux l'inclure. Sinon, utilise null pour le champ url.`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "Tu es un journaliste spécialisé en IA et tendances technologiques. Tu génères des nouvelles brèves et pertinentes en JSON. IMPORTANT: Ne JAMAIS inventer d'URLs. Si tu ne connais pas une URL réelle et vérifiable, utilise null pour le champ url.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      responseFormat: {
        type: "json_object",
      },
      maxTokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content || typeof content !== "string") {
      throw new Error("Invalid AI response");
    }

    const parsed = JSON.parse(content);
    
    // Validate and sanitize URL if provided
    // Only keep URL if it's a valid string and not null/undefined
    let url = parsed.url;
    if (url && typeof url === 'string' && url.trim() !== '' && url !== 'null') {
      // Ensure URL is valid and starts with http/https
      try {
        const urlObj = new URL(url);
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          url = undefined; // Invalid protocol, remove URL
        }
        // Additional validation: check if URL looks suspicious (contains placeholder text)
        if (url.includes('exemple.com') || url.includes('example.com') || url.includes('placeholder')) {
          url = undefined; // Remove placeholder URLs
        }
      } catch {
        url = undefined; // Invalid URL format, remove URL
      }
    } else {
      url = undefined; // No URL or null/empty, remove it
    }
    
    return {
      id: `news-${technology.slug}-${Date.now()}`,
      title: parsed.title,
      summary: parsed.summary,
      technology: technology.name,
      technologySlug: technology.slug,
      date: new Date(),
      source: parsed.source || "Nukleo Digital AI Radar",
      url: url, // URL vers l'article réel si disponible
    };
  } catch (error) {
    // Fallback news if AI generation fails
    return {
      id: `news-${technology.slug}-${Date.now()}`,
      title: `${technology.name}: Tendances et développements récents mondiaux`,
      summary: `Découvrez les dernières évolutions et cas d'usage de ${technology.name} à travers le monde.`,
      technology: technology.name,
      technologySlug: technology.slug,
      date: new Date(),
      source: "Nukleo Digital AI Radar",
      url: undefined, // Pas d'URL pour les fallbacks
    };
  }
}

// Helper function to generate radar position using AI
async function generateRadarPosition(
  technology: { name: string; description: string },
  previousPosition: RadarPosition | null
): Promise<Omit<InsertRadarPosition, "technologyId" | "date">> {
  const previousDate = previousPosition 
    ? (typeof previousPosition.date === 'string' 
        ? new Date(previousPosition.date) 
        : previousPosition.date instanceof Date 
          ? previousPosition.date 
          : new Date(previousPosition.date))
    : null;
  
  const prompt = `Tu es un expert en intelligence artificielle et tendances technologiques pour le marché canadien francophone. 

Analyse la technologie suivante et génère une position pour le radar des tendances IA :

Technologie: ${technology.name}
Description: ${technology.description}

${previousPosition && previousDate ? `
Position précédente (${previousDate.toISOString().split('T')[0]}):
- Maturité: ${previousPosition.maturityScore}/100 (${previousPosition.maturityLevel})
- Impact: ${previousPosition.impactScore}/100
` : 'C\'est la première analyse de cette technologie.'}

Génère une analyse complète avec:
1. Maturité technologique (0-100): 0 = Émergent, 100 = Établi
2. Impact business (0-100): 0 = Faible, 100 = Élevé
3. Définition détaillée (2-3 paragraphes en français)
4. Cas d'usage concrets avec exemples d'entreprises
5. Justification du niveau de maturité
6. Impact business quantifié
7. Barrières à l'adoption (coût, compétences, infrastructure)
8. Recommandations d'adoption par niveau de maturité organisationnelle

Réponds en JSON avec cette structure exacte:
{
  "maturityScore": nombre 0-100,
  "impactScore": nombre 0-100,
  "definition": "texte de 2-3 paragraphes",
  "useCases": [{"title": "titre", "description": "description", "examples": ["exemple1", "exemple2"]}],
  "maturityLevel": "Émergent" | "Maturité Moyenne" | "Établi",
  "maturityJustification": "justification détaillée",
  "impactBusiness": "impact quantifié avec métriques",
  "adoptionBarriers": [{"type": "Coût" | "Compétences" | "Infrastructure", "description": "description"}],
  "recommendations": {
    "Explorateur": "recommandation pour explorateurs",
    "Expérimentateur": "recommandation pour expérimentateurs",
    "Adopteur": "recommandation pour adopteurs",
    "Intégrateur": "recommandation pour intégrateurs",
    "Leader IA": "recommandation pour leaders IA"
  }
}`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "Tu es un expert en IA et tendances technologiques. Tu génères des analyses structurées en JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    responseFormat: {
      type: "json_object",
    },
    maxTokens: 4000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("Invalid AI response");
  }

  const parsed = JSON.parse(content);
  
  return {
    maturityScore: parsed.maturityScore,
    impactScore: parsed.impactScore,
    definition: parsed.definition,
    useCases: JSON.stringify(parsed.useCases),
    maturityLevel: parsed.maturityLevel,
    maturityJustification: parsed.maturityJustification,
    impactBusiness: parsed.impactBusiness,
    adoptionBarriers: JSON.stringify(parsed.adoptionBarriers),
    recommendations: JSON.stringify(parsed.recommendations),
  };
}

// Seed initial technologies
export async function seedRadarTechnologies() {
  const db = await getDb();
  if (!db) {
    console.error("Database connection failed, skipping radar seed");
    return;
  }
  const existing = await db.select().from(radarTechnologies);
  if (existing.length > 0) {
    // Check if we need to generate initial positions
    const techs = await db.select().from(radarTechnologies);
    for (const tech of techs) {
      const hasPosition = await db
        .select()
        .from(radarPositions)
        .where(eq(radarPositions.technologyId, tech.id))
        .limit(1);
      
      if (hasPosition.length === 0) {
        // Generate initial position
        try {
          const initialPosition = await generateRadarPosition(
            { name: tech.name, description: tech.description },
            null
          );
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          await db.insert(radarPositions).values({
            technologyId: tech.id,
            date: today,
            ...initialPosition,
          });
        } catch (error) {
          console.error(`Failed to generate initial position for ${tech.name}:`, error);
        }
      }
    }
    return; // Already seeded
  }
  
  // db is already defined above (line 250), continue with seeding
  for (const tech of INITIAL_TECHNOLOGIES) {
    const [inserted] = await db.insert(radarTechnologies).values(tech).returning();
    
    // Generate initial position for each technology
    try {
      const initialPosition = await generateRadarPosition(
        { name: tech.name, description: tech.description },
        null
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await db.insert(radarPositions).values({
        technologyId: inserted.id,
        date: today,
        ...initialPosition,
      });
    } catch (error) {
      console.error(`Failed to generate initial position for ${tech.name}:`, error);
    }
  }
}
