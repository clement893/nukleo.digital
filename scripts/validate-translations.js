#!/usr/bin/env node

/**
 * Translation Validation Script
 * 
 * Validates that all translation keys exist in both French and English.
 * Ensures consistency across locales.
 * 
 * Usage: node scripts/validate-translations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to translation files
const enPath = path.join(__dirname, '../client/src/locales/en.json');
const frPath = path.join(__dirname, '../client/src/locales/fr.json');

/**
 * Recursively get all keys from a nested object
 * @param {object} obj - The object to extract keys from
 * @param {string} prefix - The prefix for nested keys
 * @returns {Set<string>} Set of all keys
 */
function getAllKeys(obj, prefix = '') {
  const keys = new Set();
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively get keys from nested objects
      const nestedKeys = getAllKeys(value, fullKey);
      nestedKeys.forEach(k => keys.add(k));
    } else {
      keys.add(fullKey);
    }
  }
  
  return keys;
}

/**
 * Main validation function
 */
function validateTranslations() {
  console.log('🔍 Validating translations...\n');
  
  // Read translation files
  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const frContent = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  
  // Get all keys from both files
  const enKeys = getAllKeys(enContent);
  const frKeys = getAllKeys(frContent);
  
  // Find missing keys
  const missingInFr = [...enKeys].filter(key => !frKeys.has(key));
  const missingInEn = [...frKeys].filter(key => !enKeys.has(key));
  
  // Report results
  let hasErrors = false;
  
  if (missingInFr.length > 0) {
    console.error('❌ Missing keys in French (fr.json):');
    missingInFr.forEach(key => console.error(`   - ${key}`));
    console.error('');
    hasErrors = true;
  }
  
  if (missingInEn.length > 0) {
    console.error('❌ Missing keys in English (en.json):');
    missingInEn.forEach(key => console.error(`   - ${key}`));
    console.error('');
    hasErrors = true;
  }
  
  if (!hasErrors) {
    console.log('✅ All translation keys are present in both languages!');
    console.log(`   Total keys: ${enKeys.size}`);
  } else {
    console.error(`\n⚠️  Found ${missingInFr.length + missingInEn.length} missing translation(s)`);
    process.exit(1);
  }
}

// Run validation
try {
  validateTranslations();
} catch (error) {
  console.error('❌ Error validating translations:', error);
  process.exit(1);
}

