import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { 
  agencyLeads, 
  leoSessions, 
  aiAssessments, 
  leoContacts, 
  mediaAssets, 
  users 
} from "../../drizzle/schema";
import { count, desc } from "drizzle-orm";

export const adminRouter = router({
  getStats: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      // Get counts for all tables
      const [
        agencyLeadsCount,
        leoSessionsCount,
        aiAssessmentsCount,
        leoContactsCount,
        mediaAssetsCount,
        usersCount,
      ] = await Promise.all([
        db.select({ count: count() }).from(agencyLeads),
        db.select({ count: count() }).from(leoSessions),
        db.select({ count: count() }).from(aiAssessments),
        db.select({ count: count() }).from(leoContacts),
        db.select({ count: count() }).from(mediaAssets),
        db.select({ count: count() }).from(users),
      ]);

      return {
        agencyLeads: agencyLeadsCount[0]?.count || 0,
        leoSessions: leoSessionsCount[0]?.count || 0,
        aiAssessments: aiAssessmentsCount[0]?.count || 0,
        leoContacts: leoContactsCount[0]?.count || 0,
        mediaAssets: mediaAssetsCount[0]?.count || 0,
        totalUsers: usersCount[0]?.count || 0,
      };
    } catch (error) {
      console.error("[Admin] Error fetching stats:", error);
      return {
        agencyLeads: 0,
        leoSessions: 0,
        aiAssessments: 0,
        leoContacts: 0,
        mediaAssets: 0,
        totalUsers: 0,
      };
    }
  }),

  getLeoContacts: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      // Get all LEO contacts ordered by creation date (newest first)
      const contacts = await db
        .select()
        .from(leoContacts)
        .orderBy(desc(leoContacts.createdAt));

      return contacts;
    } catch (error) {
      console.error("[Admin] Error fetching LEO contacts:", error);
      return [];
    }
  }),
});
