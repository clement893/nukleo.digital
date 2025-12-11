import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, leoContacts, InsertLeoContact, leoSessions, InsertLeoSession, agencyLeads, InsertAgencyLead } from "../drizzle/schema";
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

// Agency Leads functions
export async function getAllAgencyLeads() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get agency leads: database not available");
    return [];
  }

  try {
    return await db.select().from(agencyLeads).orderBy(desc(agencyLeads.createdAt));
  } catch (error) {
    console.error("[Database] Error getting agency leads:", error);
    throw error;
  }
}

export async function saveAgencyLead(lead: InsertAgencyLead): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save agency lead: database not available");
    return;
  }

  try {
    await db.insert(agencyLeads).values(lead);
  } catch (error) {
    console.error("[Database] Error saving agency lead:", error);
    throw error;
  }
}

// LEO Contact functions
export async function saveLeoContact(contact: InsertLeoContact): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save LEO contact: database not available");
    return;
  }

  try {
    await db.insert(leoContacts).values(contact);
  } catch (error) {
    console.error("[Database] Error saving LEO contact:", error);
    throw error;
  }
}

// LEO Session functions for analytics
export async function createLeoSession(session: InsertLeoSession): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create LEO session: database not available");
    return;
  }

  try {
    await db.insert(leoSessions).values(session);
  } catch (error) {
    console.error("[Database] Error creating LEO session:", error);
    throw error;
  }
}

export async function updateLeoSession(sessionId: string, data: Partial<InsertLeoSession>): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update LEO session: database not available");
    return;
  }

  try {
    await db.update(leoSessions)
      .set(data)
      .where(eq(leoSessions.sessionId, sessionId));
  } catch (error) {
    console.error("[Database] Error updating LEO session:", error);
    throw error;
  }
}

export async function getLeoAnalytics() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get LEO analytics: database not available");
    return [];
  }

  try {
    return await db.select().from(leoSessions).orderBy(desc(leoSessions.startedAt));
  } catch (error) {
    console.error("[Database] Error getting LEO analytics:", error);
    return [];
  }
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


