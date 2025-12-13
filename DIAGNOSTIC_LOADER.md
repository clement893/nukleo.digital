# Diagnostic - Image au Chargement du Site

## Problème Identifié

Une image s'affiche lors du chargement du site avant d'arriver sur la page principale.

## Causes Possibles

### 1. Système de Loaders Actifs
Le site dispose d'un système de loaders personnalisés qui peuvent être activés/désactivés depuis l'admin (`/admin/loaders`). Si un loader est actif dans la base de données, il peut s'afficher au chargement.

**Solution:** Vérifier et désactiver les loaders actifs dans l'admin.

### 2. Composant PageLoader non utilisé
Il existe un composant `PageLoader.tsx` qui affiche un écran de chargement avec le logo Nukleo, mais il n'est **pas utilisé** dans `App.tsx` ou `main.tsx`.

### 3. Images préchargées
Dans `index.html`, plusieurs images sont préchargées :
- `/nukleo-arrow.svg` (fetchpriority="high")
- `/leo-avatar.webp` (fetchpriority="high")

Ces images peuvent apparaître brièvement avant le rendu React.

### 4. SVG inline dans le HTML
Il y a un SVG inline dans `index.html` (ligne 60-65) qui peut être visible avant le chargement complet.

## Solutions Recommandées

### Solution 1: Vérifier les Loaders Actifs (RECOMMANDÉ)
1. Aller sur `/admin/loaders`
2. Vérifier s'il y a des loaders avec le statut "Actif"
3. Les désactiver si nécessaire

### Solution 2: Masquer le SVG inline pendant le chargement
Ajouter `display: none` au SVG inline jusqu'à ce que React soit monté.

### Solution 3: Retirer les preloads d'images non critiques
Les images préchargées peuvent causer un flash. Ne précharger que les images vraiment critiques pour le LCP.

## Code à Vérifier

### Fichiers à examiner:
- `client/index.html` - SVG inline et preloads
- `/admin/loaders` - Loaders actifs dans la DB
- `server/loaders.ts` - Fonction `getActiveLoaders()`

### Si un loader actif existe:
Le loader s'affiche probablement via un composant qui appelle `trpc.loaders.getActive.useQuery()` et affiche le CSS personnalisé du loader.
