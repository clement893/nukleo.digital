import { adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { 
  agencyLeads, 
  leoSessions, 
  aiAssessments, 
  leoContacts, 
  mediaAssets, 
  users,
  aiNewsSubscribers,
  startProjectSubmissions,
  contactMessages
} from "../../drizzle/schema";
import { count, desc, sql } from "drizzle-orm";

export const adminRouter = router({
  getStats: adminProcedure.query(async () => {
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

  getLeoContacts: adminProcedure.query(async () => {
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

  getAINewsSubscribers: adminProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      // Get all AI News subscribers ordered by creation date (newest first)
      const subscribers = await db
        .select()
        .from(aiNewsSubscribers)
        .orderBy(desc(aiNewsSubscribers.createdAt));

      return subscribers;
    } catch (error) {
      console.error("[Admin] Error fetching AI News subscribers:", error);
      return [];
    }
  }),

  getStartProjectSubmissions: adminProcedure.query(async () => {
    try {
      console.log("[Admin] Starting to fetch start project submissions...");
      const db = await getDb();
      if (!db) {
        console.error("[Admin] Database connection not available");
        throw new Error("Database not available");
      }
      
      console.log("[Admin] Database connection OK, querying start_project_submissions table...");
      
      // Get all start project submissions ordered by creation date (newest first)
      const submissions = await db
        .select()
        .from(startProjectSubmissions)
        .orderBy(desc(startProjectSubmissions.createdAt));

      console.log(`[Admin] Successfully fetched ${submissions.length} start project submissions`);
      if (submissions.length > 0) {
        console.log("[Admin] First submission:", JSON.stringify(submissions[0], null, 2));
      } else {
        console.log("[Admin] No submissions found in database (table exists but is empty)");
      }
      return submissions;
    } catch (error: any) {
      console.error("[Admin] Error fetching start project submissions:", error);
      console.error("[Admin] Error message:", error?.message);
      console.error("[Admin] Error code:", error?.code);
      console.error("[Admin] Error stack:", error?.stack);
      console.error("[Admin] Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      
      // Check if it's a table doesn't exist error
      if (error?.message?.includes("does not exist") || error?.code === "42P01") {
        console.error("[Admin] ⚠️ Table 'start_project_submissions' does not exist. Please run migrations.");
      }
      
      return [];
    }
  }),

  getContactMessages: adminProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      // Get all contact messages ordered by creation date (newest first)
      const messages = await db
        .select()
        .from(contactMessages)
        .orderBy(desc(contactMessages.createdAt));

      return messages;
    } catch (error) {
      console.error("[Admin] Error fetching contact messages:", error);
      return [];
    }
  }),
});
