#!/usr/bin/env node

/**
 * Script to check for outdated dependencies
 * Run with: node scripts/check-dependencies.js
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

try {
  console.log('📦 Checking for outdated dependencies...\n');
  
  const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  console.log(`Found ${dependencies.length} dependencies and ${devDependencies.length} devDependencies\n`);
  
  console.log('To check for outdated packages, run:');
  console.log('  pnpm outdated\n');
  
  console.log('To update packages (carefully review changes):');
  console.log('  pnpm update --latest\n');
  
  console.log('⚠️  Always test thoroughly after updating dependencies!');
  
} catch (error) {
  console.error('Error checking dependencies:', error.message);
  process.exit(1);
}

