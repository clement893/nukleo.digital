# Correction du problème de chunks manquants

## Problème identifié

Le site rencontrait des erreurs `TypeError: Failed to fetch dynamically imported module` pour des chunks JavaScript qui n'existaient pas sur le serveur (ex: `Services-BrP0HZp7.js`).

### Causes possibles

1. **Désynchronisation HTML/Chunks**: Le HTML fait référence à des chunks qui n'existent pas dans le répertoire de build
2. **Cache obsolète**: Le Service Worker ou le navigateur cache un HTML ancien qui référence des chunks supprimés
3. **Build incomplet**: Le build ne génère pas tous les chunks référencés dans le HTML

## Solutions implémentées

### 1. Gestion d'erreur agressive côté client

**Fichiers modifiés:**
- `client/src/main.tsx`
- `client/src/lib/lazyWithRetry.ts`
- `client/src/components/EnhancedErrorBoundary.tsx`

**Améliorations:**
- Détection spécifique des erreurs de chargement de chunks
- Désactivation complète du Service Worker en cas d'erreur
- Nettoyage de tous les caches (Cache API, Service Worker)
- Rechargement forcé avec paramètres de cache bypass (`_reload` et `_nocache`)
- Utilisation de `location.replace()` pour éviter d'ajouter à l'historique

### 2. Vérification post-build

**Fichier:** `scripts/verify-build-chunks.js`

**Améliorations:**
- Extraction améliorée des références de chunks (script tags, imports dynamiques, preloads)
- Détection des chunks manquants avant le déploiement
- Suggestions de chunks similaires pour faciliter le débogage
- Liste complète des chunks disponibles
- Intégration dans le processus de build (`pnpm verify:build`)

### 3. Headers HTTP améliorés

**Fichier:** `server/_core/index.ts`

**Améliorations:**
- Headers de cache plus stricts pour le HTML (`no-cache, no-store, must-revalidate, max-age=0`)
- Vérification de l'existence de `index.html` avant de le servir
- Ajout de `X-Content-Type-Options: nosniff` pour la sécurité

## Stratégie de récupération

En cas d'erreur de chargement de chunk:

1. **Détection automatique**: L'erreur est détectée par le gestionnaire global d'erreurs
2. **Nettoyage complet**: Tous les caches sont supprimés (Cache API, Service Worker)
3. **Désinscription du Service Worker**: Le Service Worker est désinscrit pour éviter de servir du contenu obsolète
4. **Rechargement forcé**: La page est rechargée avec des paramètres de cache bypass (`_reload` et `_nocache`)
5. **Récupération**: Le navigateur récupère un HTML frais qui correspond aux chunks disponibles

## Prévention

### Vérification avant déploiement

Le script `verify-build-chunks.js` est exécuté automatiquement après chaque build:

```bash
pnpm build  # Exécute automatiquement verify:build
```

Si des chunks manquants sont détectés, le build échoue avec un message d'erreur détaillé.

### Recommandations

1. **Toujours vérifier le build**: Le script de vérification doit passer avant chaque déploiement
2. **Nettoyer le cache**: En cas de problème, supprimer le dossier `dist/` et reconstruire
3. **Surveiller les logs**: Les erreurs de chunks manquants sont maintenant mieux détectées et loggées

## Tests

Pour tester la récupération automatique:

1. Déployer un build avec des chunks manquants (simulation)
2. Accéder au site - l'erreur devrait être détectée
3. Le site devrait automatiquement recharger avec cache bypass
4. Vérifier que le nouveau HTML correspond aux chunks disponibles

## Notes techniques

- Les chunks avec hash dans le nom (ex: `Services-BrP0HZp7.js`) sont générés par Vite avec un hash basé sur le contenu
- Si le contenu change, le hash change, et l'ancien chunk devient obsolète
- Le HTML doit toujours correspondre aux chunks disponibles dans `dist/public/assets/js/`
- Le Service Worker peut servir un HTML obsolète si non désinscrit correctement
