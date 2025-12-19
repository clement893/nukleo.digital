#!/usr/bin/env node

/**
 * Script to verify that Google Analytics tag is present in the built HTML
 * Usage: node scripts/verify-ga-tag.js
 */

const fs = require('fs');
const path = require('path');

const GA_MEASUREMENT_ID = 'G-C2X5JWEL5S';
const distIndexPath = path.join(__dirname, '../dist/index.html');

console.log('🔍 Verifying Google Analytics tag in built HTML...\n');

// Check if dist/index.html exists
if (!fs.existsSync(distIndexPath)) {
  console.error('❌ Error: dist/index.html not found!');
  console.log('💡 Run "pnpm run build" first to generate the build.');
  process.exit(1);
}

// Read the built HTML file
const htmlContent = fs.readFileSync(distIndexPath, 'utf8');

// Check for GA Measurement ID
const hasGAId = htmlContent.includes(GA_MEASUREMENT_ID);
const hasGtagScript = htmlContent.includes('googletagmanager.com/gtag/js');
const hasDataLayer = htmlContent.includes('dataLayer');
const hasGtagFunction = htmlContent.includes('function gtag');
const hasGtagConfig = htmlContent.includes("gtag('config'");

console.log('📋 Verification Results:');
console.log('─'.repeat(50));
console.log(`✅ GA Measurement ID (${GA_MEASUREMENT_ID}): ${hasGAId ? '✅ Found' : '❌ Not found'}`);
console.log(`✅ Gtag script URL: ${hasGtagScript ? '✅ Found' : '❌ Not found'}`);
console.log(`✅ dataLayer initialization: ${hasDataLayer ? '✅ Found' : '❌ Not found'}`);
console.log(`✅ gtag function: ${hasGtagFunction ? '✅ Found' : '❌ Not found'}`);
console.log(`✅ gtag config call: ${hasGtagConfig ? '✅ Found' : '❌ Not found'}`);
console.log('─'.repeat(50));

// Check if tag is in <head>
const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
const isInHead = headMatch && headMatch[1].includes(GA_MEASUREMENT_ID);
console.log(`✅ Tag in <head> section: ${isInHead ? '✅ Yes' : '❌ No'}`);

// Extract the GA tag section for verification
const gaTagMatch = htmlContent.match(/<!--[\s\S]*?Google tag[\s\S]*?<\/script>/i);
if (gaTagMatch) {
  console.log('\n📝 GA Tag Code Found:');
  console.log('─'.repeat(50));
  console.log(gaTagMatch[0].substring(0, 500));
  console.log('─'.repeat(50));
} else {
  console.log('\n⚠️  Could not extract GA tag code section');
}

// Final verdict
const allChecksPassed = hasGAId && hasGtagScript && hasDataLayer && hasGtagFunction && hasGtagConfig && isInHead;

if (allChecksPassed) {
  console.log('\n✅ SUCCESS: Google Analytics tag is properly configured in the build!');
  console.log('💡 If Tag Assistant still doesn\'t detect it:');
  console.log('   1. Clear browser cache and test in incognito mode');
  console.log('   2. Wait a few minutes after deployment');
  console.log('   3. Check that the production site serves the latest build');
  process.exit(0);
} else {
  console.log('\n❌ FAILURE: Google Analytics tag is missing or incomplete in the build!');
  console.log('💡 Check client/index.html and rebuild.');
  process.exit(1);
}

