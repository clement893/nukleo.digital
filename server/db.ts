import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, leoSessions, InsertLeoSession, LeoSession } from "../drizzle/schema";
import { eq, desc, and, gte, sql } from "drizzle-orm";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Media Assets queries
export async function getAllMediaAssets() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get media assets: database not available");
    return [];
  }

  try {
    const { mediaAssets } = await import("../drizzle/schema");
    const result = await db.select().from(mediaAssets);
    return result;
  } catch (error) {
    console.error("[Database] Error fetching media assets:", error);
    return [];
  }
}

// ============================================
// LEO Sessions Analytics Functions
// ============================================

/**
 * Create or update a LEO chat session
 */
export async function upsertLeoSession(data: {
  sessionId: string;
  page: string;
  messagesCount?: number;
  userEmail?: string;
  userName?: string;
  emailCaptured?: boolean;
  userAgent?: string;
  referrer?: string;
}): Promise<LeoSession | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const now = new Date();
    
    // Check if session exists
    const existing = await db
      .select()
      .from(leoSessions)
      .where(eq(leoSessions.sessionId, data.sessionId))
      .limit(1);

    if (existing.length > 0) {
      // Update existing session
      const session = existing[0];
      const durationSeconds = Math.floor((now.getTime() - new Date(session.startedAt).getTime()) / 1000);
      
      await db
        .update(leoSessions)
        .set({
          messagesCount: data.messagesCount ?? session.messagesCount,
          lastActivityAt: now,
          userEmail: data.userEmail ?? session.userEmail,
          userName: data.userName ?? session.userName,
          emailCaptured: data.emailCaptured ? 1 : session.emailCaptured,
          emailCapturedAt: data.emailCaptured && !session.emailCapturedAt ? now : session.emailCapturedAt,
          durationSeconds,
          updatedAt: now,
        })
        .where(eq(leoSessions.id, session.id));

      return {
        ...session,
        messagesCount: data.messagesCount ?? session.messagesCount,
        lastActivityAt: now,
        durationSeconds,
      };
    } else {
      // Create new session
      const insertData: InsertLeoSession = {
        sessionId: data.sessionId,
        page: data.page,
        messagesCount: data.messagesCount ?? 0,
        userEmail: data.userEmail,
        userName: data.userName,
        emailCaptured: data.emailCaptured ? 1 : 0,
        emailCapturedAt: data.emailCaptured ? now : undefined,
        userAgent: data.userAgent,
        referrer: data.referrer,
        startedAt: now,
        lastActivityAt: now,
      };

      await db.insert(leoSessions).values(insertData);

      const created = await db
        .select()
        .from(leoSessions)
        .where(eq(leoSessions.sessionId, data.sessionId))
        .limit(1);

      return created[0] || null;
    }
  } catch (error) {
    console.error("[Database] Error upserting LEO session:", error);
    return null;
  }
}

/**
 * Get LEO analytics summary
 */
export async function getLeoAnalytics(days: number = 30) {
  const db = await getDb();
  if (!db) return null;

  try {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const sessions = await db
      .select()
      .from(leoSessions)
      .where(gte(leoSessions.startedAt, since))
      .orderBy(desc(leoSessions.startedAt));

    const totalSessions = sessions.length;
    const totalMessages = sessions.reduce((sum, s) => sum + s.messagesCount, 0);
    const emailsCaptured = sessions.filter(s => s.emailCaptured === 1).length;
    const avgMessagesPerSession = totalSessions > 0 ? totalMessages / totalSessions : 0;
    const conversionRate = totalSessions > 0 ? (emailsCaptured / totalSessions) * 100 : 0;

    // Group by page
    const byPage = sessions.reduce((acc, s) => {
      if (!acc[s.page]) {
        acc[s.page] = { sessions: 0, messages: 0, emails: 0 };
      }
      acc[s.page].sessions++;
      acc[s.page].messages += s.messagesCount;
      if (s.emailCaptured === 1) acc[s.page].emails++;
      return acc;
    }, {} as Record<string, { sessions: number; messages: number; emails: number }>);

    return {
      totalSessions,
      totalMessages,
      emailsCaptured,
      avgMessagesPerSession: Math.round(avgMessagesPerSession * 10) / 10,
      conversionRate: Math.round(conversionRate * 10) / 10,
      byPage,
      recentSessions: sessions.slice(0, 10),
    };
  } catch (error) {
    console.error("[Database] Error getting LEO analytics:", error);
    return null;
  }
}

/**
 * Get all LEO sessions (for admin dashboard)
 */
export async function getAllLeoSessions(limit: number = 100): Promise<LeoSession[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(leoSessions)
      .orderBy(desc(leoSessions.startedAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error getting all LEO sessions:", error);
    return [];
  }
}
