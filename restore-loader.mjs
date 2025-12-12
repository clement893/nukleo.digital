import postgres from 'postgres';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const RAILWAY_DB_URL = 'postgresql://postgres:hqPgUeEGphHQWGOsDBbHuPJlBQuQdPrA@mainline.proxy.rlwy.net:36397/railway';

// Extract loader code from git history
console.log('📦 Extracting loader code from git history...');
execSync('git show a864f57:client/index.html | sed -n "36,383p" > /tmp/loader-full.txt', { cwd: '/home/ubuntu/nukleo-digital' });

const loaderCode = readFileSync('/tmp/loader-full.txt', 'utf-8');
console.log(`✅ Extracted ${loaderCode.length} characters`);

async function restoreLoader() {
  console.log('\n🔗 Connecting to Railway PostgreSQL...');
  const sql = postgres(RAILWAY_DB_URL);

  try {
    console.log('📝 Updating loader in database...');
    
    const result = await sql`
      UPDATE loaders 
      SET 
        css_code = ${loaderCode},
        description = 'Loader psychédélique complet : grain animé, 40 particules flottantes, 3 hexagones rotatifs, 5 ondes d''énergie, logo avec effets (float, pulse, glitch), texte LOADING avec glitch, barre de progression. Délai minimum 3 secondes. Désactivé sur /admin/*.',
        updated_at = NOW()
      WHERE id = 1
      RETURNING id, name, LENGTH(css_code) as code_length
    `;
    
    if (result.length > 0) {
      console.log('✅ Loader restored successfully!');
      console.table(result);
    } else {
      console.log('⚠️  No loader found with ID 1');
    }

    await sql.end();
    console.log('\n✅ Restore completed!');
  } catch (error) {
    console.error('❌ Restore failed:', error);
    await sql.end();
    process.exit(1);
  }
}

restoreLoader();
