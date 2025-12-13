import { getDb } from "./db";
import { loaders, type Loader, type InsertLoader } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all loaders
export async function getAllLoaders(): Promise<Loader[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(loaders).orderBy(loaders.displayOrder);
}

// Get active loaders only
export async function getActiveLoaders(): Promise<Loader[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(loaders).where(eq(loaders.isActive, true)).orderBy(loaders.displayOrder);
}

// Get a single loader by ID
export async function getLoaderById(id: number): Promise<Loader | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(loaders).where(eq(loaders.id, id)).limit(1);
  return result[0];
}

// Create a new loader
export async function createLoader(data: InsertLoader): Promise<Loader | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(loaders).values(data).returning();
  return result[0];
}

// Update a loader
export async function updateLoader(id: number, data: Partial<InsertLoader>): Promise<Loader | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.update(loaders).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(loaders.id, id)).returning();
  return result[0];
}

// Delete a loader
export async function deleteLoader(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(loaders).where(eq(loaders.id, id));
  return true;
}

// Toggle loader active status
export async function toggleLoaderActive(id: number): Promise<Loader | undefined> {
  const loader = await getLoaderById(id);
  if (!loader) return undefined;
  
  return await updateLoader(id, { isActive: !loader.isActive });
}

// Delete all loaders
export async function deleteAllLoaders(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const existing = await getAllLoaders();
  const count = existing.length;
  if (count > 0) {
    for (const loader of existing) {
      await db.delete(loaders).where(eq(loaders.id, loader.id));
    }
  }
  return count;
}
