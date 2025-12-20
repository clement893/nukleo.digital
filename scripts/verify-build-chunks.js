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
  
  // Extract from script tags with src (including type="module")
  const scriptSrcRegex = /<script[^>]+src=["']([^"']+\.js[^"']*)["']/gi;
  let match;
  while ((match = scriptSrcRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    // Remove query parameters and hash
    const cleanSrc = src.split('?')[0].split('#')[0];
    // Normalize path
    let normalizedPath = cleanSrc;
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath;
    }
    // Only add JS files from assets/js
    if (normalizedPath.includes('/assets/js/')) {
      chunks.add(normalizedPath);
    }
  }
  
  // Extract from dynamic imports in inline scripts (preload, etc.)
  const importRegex = /(?:import|preload)\(["']([^"']+\.js[^"']*)["']\)/gi;
  while ((match = importRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    const cleanSrc = src.split('?')[0].split('#')[0];
    let normalizedPath = cleanSrc;
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath;
    }
    if (normalizedPath.includes('/assets/js/')) {
      chunks.add(normalizedPath);
    }
  }
  
  // Extract from link rel="modulepreload" or "preload"
  const linkRegex = /<link[^>]+(?:href|as)=["']([^"']+\.js[^"']*)["']/gi;
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const src = match[1];
    const cleanSrc = src.split('?')[0].split('#')[0];
    let normalizedPath = cleanSrc;
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath;
    }
    if (normalizedPath.includes('/assets/js/')) {
      chunks.add(normalizedPath);
    }
  }
  
  return Array.from(chunks);
}

function checkChunkExists(chunkPath) {
  // Normalize the path - remove leading slash if present for join
  const normalizedPath = chunkPath.startsWith('/') ? chunkPath.substring(1) : chunkPath;
  const fullPath = path.join(DIST_PUBLIC, normalizedPath);
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
    console.error(`\n❌ ERREUR CRITIQUE: ${missingChunks.length} chunks manquants détectés!\n`);
    missingChunks.forEach(chunk => {
      console.error(`   ❌ ${chunk}`);
    });
    console.error('\n⚠️  Le build est INCOMPLET. Certains chunks référencés dans index.html n\'existent pas.');
    console.error('   Cela causera des erreurs "Failed to fetch dynamically imported module" en production.\n');
    
    // List available chunks for debugging
    if (fs.existsSync(ASSETS_JS)) {
      const availableChunks = fs.readdirSync(ASSETS_JS).filter(f => f.endsWith('.js'));
      console.log(`📋 Chunks disponibles dans assets/js (${availableChunks.length}):`);
      
      // Try to find similar chunks (for debugging)
      missingChunks.forEach(missing => {
        const missingName = path.basename(missing);
        const baseMatch = missingName.match(/^(.+?)-[^-]+\.js$/);
        if (baseMatch) {
          const baseName = baseMatch[1];
          const similar = availableChunks.filter(chunk => chunk.startsWith(baseName + '-'));
          if (similar.length > 0) {
            console.log(`\n   💡 Chunks similaires trouvés pour "${missingName}":`);
            similar.forEach(chunk => {
              console.log(`      - ${chunk}`);
            });
          }
        }
      });
      
      console.log(`\n   📦 Tous les chunks disponibles:`);
      availableChunks.slice(0, 20).forEach(chunk => {
        console.log(`      - ${chunk}`);
      });
      if (availableChunks.length > 20) {
        console.log(`      ... et ${availableChunks.length - 20} autres`);
      }
    }
    
    console.error('\n🔧 SOLUTION:');
    console.error('   1. Vérifiez que le build s\'est terminé correctement');
    console.error('   2. Supprimez le dossier dist/ et reconstruisez: pnpm build');
    console.error('   3. Vérifiez que tous les fichiers sont copiés correctement\n');
    
    process.exit(1);
  } else {
    console.log(`✅ Tous les chunks référencés existent (${existingChunks.length} chunks)\n`);
    console.log('✅ Le build est complet et prêt pour le déploiement.\n');
    process.exit(0);
  }
}

main();

