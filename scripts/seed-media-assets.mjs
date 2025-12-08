import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { mediaAssets } from '../drizzle/schema.js';

// Database connection
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Media assets data
const assets = [
  {
    name: 'Company Logo (PNG)',
    fileKey: 'media-kit/nukleo-logo.png',
    url: '/logo-nukleo.png', // Using existing logo
    size: 245760, // 240 KB
    mimeType: 'image/png',
    category: 'logo',
  },
  {
    name: 'Company Logo (SVG)',
    fileKey: 'media-kit/nukleo-logo.svg',
    url: '/logo-nukleo.png', // Placeholder - replace with SVG
    size: 15600, // 15 KB
    mimeType: 'image/svg+xml',
    category: 'logo',
  },
  {
    name: 'Brand Guidelines',
    fileKey: 'media-kit/nukleo-brand-guidelines.pdf',
    url: 'https://via.placeholder.com/1920x1080/6B46C1/FFFFFF?text=Brand+Guidelines+PDF', // Placeholder
    size: 8200000, // 8.2 MB
    mimeType: 'application/pdf',
    category: 'brand',
  },
  {
    name: 'Executive Photos',
    fileKey: 'media-kit/nukleo-executive-photos.zip',
    url: 'https://via.placeholder.com/1920x1080/6B46C1/FFFFFF?text=Executive+Photos+ZIP', // Placeholder
    size: 15600000, // 15.6 MB
    mimeType: 'application/zip',
    category: 'photo',
  },
  {
    name: 'Product Screenshots',
    fileKey: 'media-kit/nukleo-product-screenshots.zip',
    url: 'https://via.placeholder.com/1920x1080/6B46C1/FFFFFF?text=Product+Screenshots+ZIP', // Placeholder
    size: 22100000, // 22.1 MB
    mimeType: 'application/zip',
    category: 'screenshot',
  },
];

async function seed() {
  try {
    console.log('🌱 Seeding media assets...');
    
    // Insert assets
    for (const asset of assets) {
      await db.insert(mediaAssets).values(asset);
      console.log(`✅ Inserted: ${asset.name}`);
    }
    
    console.log('🎉 Media assets seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding media assets:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seed();
