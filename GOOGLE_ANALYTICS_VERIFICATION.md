# Guide de Vérification Google Analytics

**Date:** Décembre 2024

## Problème

Google Tag Assistant ne détecte pas le tag Google Analytics sur le site.

## Vérifications Effectuées

### ✅ Configuration Actuelle

Le tag est configuré dans `client/index.html` :

```html
<!-- Preconnect pour Google Tag Manager -->
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
<link rel="preconnect" href="https://www.google-analytics.com" crossorigin />

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C2X5JWEL5S"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-C2X5JWEL5S', {
    'send_page_view': true
  });
</script>
```

### ✅ Content Security Policy

Le CSP permet bien le chargement :
- `scriptSrc` inclut `https://www.googletagmanager.com` et `https://*.googletagmanager.com`
- `connectSrc` inclut `https://www.googletagmanager.com` et `https://*.googletagmanager.com`

## Vérifications à Effectuer

### 1. Vérifier le Code Source HTML

**Dans le navigateur :**
1. Ouvrir le site en production
2. Clic droit > "Afficher le code source"
3. Rechercher `G-C2X5JWEL5S`
4. Vérifier que le tag est présent dans le `<head>`

**Si le tag n'est pas présent :**
- Le build n'a pas été déployé
- Vérifier que le build inclut `index.html`

### 2. Vérifier la Console du Navigateur

**Ouvrir DevTools > Console :**
1. Rechercher les erreurs CSP
2. Rechercher les erreurs de chargement de script
3. Vérifier que `dataLayer` existe : `console.log(window.dataLayer)`
4. Vérifier que `gtag` existe : `console.log(typeof window.gtag)`

**Erreurs possibles :**
- `Refused to load the script` → Problème CSP
- `Failed to fetch` → Problème réseau/CORS
- `gtag is not defined` → Script non chargé

### 3. Vérifier le Réseau

**Ouvrir DevTools > Network :**
1. Filtrer par "gtag" ou "googletagmanager"
2. Vérifier que la requête vers `gtag/js?id=G-C2X5JWEL5S` est présente
3. Vérifier le statut (doit être 200)
4. Vérifier le temps de chargement

**Si la requête n'apparaît pas :**
- Le script n'est pas chargé
- Vérifier les erreurs dans la console

### 4. Vérifier avec Google Tag Assistant

**Extension Chrome :**
1. Installer "Google Tag Assistant" depuis le Chrome Web Store
2. Ouvrir le site en production
3. Cliquer sur l'icône Tag Assistant
4. Cliquer sur "Enable"
5. Recharger la page
6. Vérifier les tags détectés

**Si le tag n'est pas détecté :**
- Vérifier que le script est bien chargé (étape 3)
- Vérifier qu'il n'y a pas d'erreurs JavaScript qui bloquent l'exécution

### 5. Vérifier avec Google Analytics DebugView

**Dans Google Analytics :**
1. Aller dans Admin > DebugView
2. Activer le mode debug dans le navigateur :
   - Installer l'extension "Google Analytics Debugger"
   - Ou ajouter `?debug_mode=true` à l'URL
3. Naviguer sur le site
4. Vérifier que les événements apparaissent

### 6. Vérifier le Build

**Localement :**
```bash
pnpm run build
# Vérifier que dist/index.html contient le tag
cat dist/index.html | grep "G-C2X5JWEL5S"
```

**Si le tag n'est pas dans le build :**
- Vérifier que `client/index.html` contient le tag
- Vérifier que le build ne modifie pas le fichier

### 7. Vérifier le Déploiement

**Sur Railway/Production :**
1. Vérifier que le dernier commit est déployé
2. Vérifier les logs de build
3. Vérifier que le fichier `index.html` est bien servi

## Solutions Possibles

### Solution 1: Vérifier le Cache

**Problème:** Le navigateur cache une ancienne version

**Solution:**
- Vider le cache du navigateur (Ctrl+Shift+Delete)
- Ou tester en navigation privée
- Ou ajouter un paramètre de cache-busting temporairement

### Solution 2: Vérifier le Timing

**Problème:** Le tag est chargé trop tard

**Solution actuelle:** Le tag est déjà dans le `<head>` et chargé de manière synchrone avec `async`

**Si nécessaire, essayer sans `async`:**
```html
<script src="https://www.googletagmanager.com/gtag/js?id=G-C2X5JWEL5S"></script>
```
⚠️ Cela peut bloquer le rendu de la page

### Solution 3: Vérifier le CSP

**Problème:** Le CSP bloque le chargement

**Vérification:**
- Ouvrir la console
- Rechercher les erreurs CSP
- Vérifier que `scriptSrc` et `connectSrc` incluent bien Google Tag Manager

### Solution 4: Vérifier le Format du Tag

**Problème:** Format incorrect

**Format actuel (correct):**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C2X5JWEL5S"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-C2X5JWEL5S');
</script>
```

**Format alternatif (si nécessaire):**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C2X5JWEL5S"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-C2X5JWEL5S');
</script>
```

## Test Rapide

**Dans la console du navigateur :**
```javascript
// Vérifier que dataLayer existe
console.log('dataLayer:', window.dataLayer);

// Vérifier que gtag existe
console.log('gtag:', typeof window.gtag);

// Tester manuellement
if (window.gtag) {
  window.gtag('event', 'test_event', {
    'event_category': 'test',
    'event_label': 'manual_test'
  });
  console.log('✅ gtag fonctionne');
} else {
  console.error('❌ gtag n\'existe pas');
}
```

## Checklist de Vérification

- [ ] Le tag est présent dans le code source HTML
- [ ] Le script `gtag/js?id=G-C2X5JWEL5S` est chargé (Network tab)
- [ ] Aucune erreur CSP dans la console
- [ ] `window.dataLayer` existe
- [ ] `window.gtag` existe
- [ ] Google Tag Assistant détecte le tag
- [ ] Les événements apparaissent dans Google Analytics DebugView
- [ ] Le build contient le tag
- [ ] Le déploiement est à jour

## Prochaines Étapes

1. **Effectuer toutes les vérifications ci-dessus**
2. **Noter les résultats** de chaque vérification
3. **Identifier le problème** spécifique
4. **Appliquer la solution** correspondante

---

*Dernière mise à jour: Décembre 2024*

