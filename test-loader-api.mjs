import { getDb } from './server/db.js';
import { loaders } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

const db = await getDb();
console.log('DB:', db ? 'Connected' : 'Not connected');

if (db) {
  try {
    const result = await db.select().from(loaders).where(eq(loaders.isActive, true));
    console.log('Active loaders found:', result.length);
    if (result.length > 0) {
      console.log('First loader:', {
        id: result[0].id,
        name: result[0].name,
        codeLength: result[0].cssCode?.length || 0
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
