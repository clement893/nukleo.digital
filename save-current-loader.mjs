import postgres from 'postgres';
import fs from 'fs';

const DATABASE_URL = 'postgresql://postgres:hqPgUeEGphHQWGOsDBbHuPJlBQuQdPrA@mainline.proxy.rlwy.net:36397/railway';

// Lire le code du loader depuis index.html
const indexHtml = fs.readFileSync('/home/ubuntu/nukleo-digital/client/index.html', 'utf-8');

// Extraire le CSS (lignes 36-291)
const cssMatch = indexHtml.match(/<style>([\s\S]*?)<\/style>/);
const cssCode = cssMatch ? cssMatch[1].trim() : '';

// Extraire le HTML du loader (lignes 295-350)
const loaderMatch = indexHtml.match(/<!-- Loader Crazy Arts & Culture -->([\s\S]*?)<\/div>\s*<div id="root">/);
const htmlCode = loaderMatch ? loaderMatch[1].trim() : '';

// Code complet du loader
const fullLoaderCode = `<!-- CSS -->
<style>
${cssCode}
</style>

<!-- HTML -->
${htmlCode}`;

console.log('📦 Loader code extracted from index.html');
console.log(`   CSS: ${cssCode.length} characters`);
console.log(`   HTML: ${htmlCode.length} characters`);
console.log(`   Total: ${fullLoaderCode.length} characters`);

async function saveLoader() {
  console.log('\n🔗 Connecting to Railway PostgreSQL...');
  const sql = postgres(DATABASE_URL);

  try {
    // Mettre à jour le loader "Psychedelic Crazy Arts" avec le code complet
    console.log('📝 Updating "Psychedelic Crazy Arts" with full loader code...');
    
    const result = await sql`
      UPDATE loaders 
      SET 
        css_code = ${fullLoaderCode},
        description = 'Loader psychédélique complet extrait de index.html : grain animé, 30 particules flottantes, 3 hexagones rotatifs, 5 ondes d''énergie, logo avec effets (float, pulse, glitch), texte LOADING avec glitch, barre de progression. Délai minimum 3 secondes.',
        updated_at = NOW()
      WHERE name = 'Psychedelic Crazy Arts'
      RETURNING id, name
    `;
    
    if (result.length > 0) {
      console.log('✅ Loader updated successfully!');
      console.log(`   ID: ${result[0].id}`);
      console.log(`   Name: ${result[0].name}`);
    } else {
      console.log('⚠️  No loader found with name "Psychedelic Crazy Arts"');
    }

    // Vérifier le contenu sauvegardé
    console.log('\n🔍 Verifying saved loader...');
    const saved = await sql`
      SELECT id, name, LENGTH(css_code) as code_length, is_active
      FROM loaders 
      WHERE name = 'Psychedelic Crazy Arts'
    `;
    
    if (saved.length > 0) {
      console.log('✅ Verification successful:');
      console.table(saved);
    }

    await sql.end();
    console.log('\n✅ Save completed successfully!');
  } catch (error) {
    console.error('❌ Save failed:', error);
    await sql.end();
    process.exit(1);
  }
}

saveLoader();
