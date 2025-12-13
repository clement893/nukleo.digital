import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { loaders, type InsertLoader, type Loader } from "../drizzle/schema";

export async function getAllLoaders(): Promise<Loader[]> {
  const database = await getDb();
  if (!database) return [];
  return await database.select().from(loaders).orderBy(desc(loaders.createdAt));
}

export async function getActiveLoaders(): Promise<Loader[]> {
  const database = await getDb();
  if (!database) return [];
  return await database
    .select()
    .from(loaders)
    .where(eq(loaders.isActive, true))
    .orderBy(loaders.displayOrder);
}

export async function getLoaderById(id: number): Promise<Loader | null> {
  const database = await getDb();
  if (!database) return null;
  const result = await database
    .select()
    .from(loaders)
    .where(eq(loaders.id, id))
    .limit(1);
  return result[0] || null;
}

export async function createLoader(data: InsertLoader): Promise<Loader> {
  const database = await getDb();
  if (!database) throw new Error("Database not available");
  const result = await database
    .insert(loaders)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();
  return result[0];
}

export async function updateLoader(
  id: number,
  data: Partial<InsertLoader>
): Promise<Loader> {
  const database = await getDb();
  if (!database) throw new Error("Database not available");
  const result = await database
    .update(loaders)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(loaders.id, id))
    .returning();
  return result[0];
}

export async function deleteLoader(id: number): Promise<void> {
  const database = await getDb();
  if (!database) throw new Error("Database not available");
  await database.delete(loaders).where(eq(loaders.id, id));
}

export async function toggleLoaderActive(id: number): Promise<Loader> {
  const database = await getDb();
  if (!database) throw new Error("Database not available");
  const loader = await getLoaderById(id);
  if (!loader) throw new Error("Loader not found");
  const result = await database
    .update(loaders)
    .set({
      isActive: !loader.isActive,
      updatedAt: new Date(),
    })
    .where(eq(loaders.id, id))
    .returning();
  return result[0];
}
