#!/usr/bin/env node
/**
 * Script simple pour réinitialiser les loaders via fetch API
 * Usage: node scripts/reset-loaders-now.mjs
 */

const API_URL = process.env.API_URL || 'https://nukleodigital-production.up.railway.app';

async function resetLoaders() {
  try {
    console.log('🔄 Appel de l\'API reset...');
    
    const response = await fetch(`${API_URL}/api/trpc/loaders.reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Erreur HTTP:', response.status, text);
      return;
    }

    const data = await response.json();
    console.log('✅ Réinitialisation réussie!', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

resetLoaders();
