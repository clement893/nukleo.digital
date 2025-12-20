#!/usr/bin/env node

/**
 * Script de vérification post-build pour s'assurer que tous les chunks référencés existent
 * 
 * Ce script vérifie que tous les chunks JavaScript référencés dans le HTML généré
 * existent réellement dans le répertoire de build.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_PUBLIC = path.resolve(__dirname, '..', 'dist', 'public');
const INDEX_HTML = path.join(DIST_PUBLIC, 'index.html');
const ASSETS_JS = path.join(DIST_PUBLIC, 'assets', 'js');

function extractChunkReferences(htmlContent) {
  const chunks = new Set();
  
  // Extract from script tags with src
  const scriptSrcRegex = /<script[^>]+src=["']([^"']+\.js[^"']*)["']/gi;
  let match;
  while ((match = scriptSrcRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    // Remove query parameters and hash
    const cleanSrc = src.split('?')[0].split('#')[0];
    if (cleanSrc.startsWith('/')) {
      chunks.add(cleanSrc);
    } else if (cleanSrc.startsWith('./')) {
      chunks.add(cleanSrc.substring(1));
    } else {
      chunks.add('/' + cleanSrc);
    }
  }
  
  // Extract from dynamic imports in inline scripts
  const importRegex = /import\(["']([^"']+\.js[^"']*)["']\)/gi;
  while ((match = importRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    const cleanSrc = src.split('?')[0].split('#')[0];
    if (cleanSrc.startsWith('/')) {
      chunks.add(cleanSrc);
    } else if (cleanSrc.startsWith('./')) {
      chunks.add(cleanSrc.substring(1));
    } else {
      chunks.add('/' + cleanSrc);
    }
  }
  
  return Array.from(chunks);
}

function checkChunkExists(chunkPath) {
  const fullPath = path.join(DIST_PUBLIC, chunkPath);
  return fs.existsSync(fullPath);
}

function main() {
  console.log('🔍 Vérification des chunks référencés dans le build...\n');
  
  // Check if dist/public exists
  if (!fs.existsSync(DIST_PUBLIC)) {
    console.error(`❌ Répertoire de build non trouvé: ${DIST_PUBLIC}`);
    console.error('   Assurez-vous d\'avoir exécuté "pnpm build" avant ce script.');
    process.exit(1);
  }
  
  // Check if index.html exists
  if (!fs.existsSync(INDEX_HTML)) {
    console.error(`❌ index.html non trouvé: ${INDEX_HTML}`);
    process.exit(1);
  }
  
  // Read index.html
  const htmlContent = fs.readFileSync(INDEX_HTML, 'utf-8');
  
  // Extract chunk references
  const chunks = extractChunkReferences(htmlContent);
  
  console.log(`📦 ${chunks.length} chunks référencés trouvés dans index.html\n`);
  
  // Check each chunk
  const missingChunks = [];
  const existingChunks = [];
  
  for (const chunk of chunks) {
    if (checkChunkExists(chunk)) {
      existingChunks.push(chunk);
    } else {
      missingChunks.push(chunk);
    }
  }
  
  // Report results
  if (missingChunks.length > 0) {
    console.error(`❌ ${missingChunks.length} chunks manquants:\n`);
    missingChunks.forEach(chunk => {
      console.error(`   - ${chunk}`);
    });
    console.error('\n⚠️  Le build est incomplet. Certains chunks référencés n\'existent pas.');
    console.error('   Cela peut causer des erreurs "Failed to fetch dynamically imported module".\n');
    
    // List available chunks
    if (fs.existsSync(ASSETS_JS)) {
      const availableChunks = fs.readdirSync(ASSETS_JS).filter(f => f.endsWith('.js'));
      console.log(`📋 Chunks disponibles dans assets/js (${availableChunks.length}):`);
      availableChunks.slice(0, 10).forEach(chunk => {
        console.log(`   - ${chunk}`);
      });
      if (availableChunks.length > 10) {
        console.log(`   ... et ${availableChunks.length - 10} autres`);
      }
    }
    
    process.exit(1);
  } else {
    console.log(`✅ Tous les chunks référencés existent (${existingChunks.length} chunks)\n`);
    console.log('✅ Le build est complet et prêt pour le déploiement.\n');
    process.exit(0);
  }
}

main();

