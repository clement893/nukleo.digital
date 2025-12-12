# Analyse PageSpeed Mobile - Score 78/100

**Date:** 12 décembre 2025, 11:17 PM  
**URL:** https://nukleodigital-production.up.railway.app/  
**Objectif:** Passer de 78 à 90+

---

## Métriques Core Web Vitals (Mobile)

| Métrique | Valeur Actuelle | Statut | Objectif | Écart |
|----------|----------------|--------|----------|-------|
| **FCP** (First Contentful Paint) | 1.7s | ⚠️ Moyen | < 1.8s | -0.1s |
| **LCP** (Largest Contentful Paint) | **4.6s** | ❌ Mauvais | < 2.5s | **-2.1s** |
| **TBT** (Total Blocking Time) | 100ms | ⚠️ Moyen | < 200ms | OK |
| **CLS** (Cumulative Layout Shift) | 0 | ✅ Excellent | < 0.1 | ✅ |
| **Speed Index** | Non spécifié | - | < 3.4s | - |

---

## Problème Critique #1: LCP Mobile (4.6s) ❌

**Élément LCP détecté:**
```html
<img data-loc="client/src/components/ArrowBackground.tsx:33" 
     alt="" 
     class="absolute" 
     src="/nukleo-arrow.svg" 
     style="top: 15%; left: 5%; size: 250px; opacity: 0.025; width: 250px;">
```

**Breakdown du LCP:**
- Time to first byte: **0ms** ✅
- **Resource load delay: 1650ms** ❌ (PROBLÈME MAJEUR)
- Resource load duration: 190ms ✅
- Element render delay: 70ms ✅

**Cause:** L'image `nukleo-arrow.svg` n'est pas découvrable immédiatement dans le HTML initial. Elle est probablement chargée après le JS React.

---

## Solutions pour LCP Mobile

### 1. **Ajouter `fetchpriority="high"` sur l'image LCP** → +8 points
```tsx
<img 
  src="/nukleo-arrow.svg" 
  fetchPriority="high"  // ← AJOUTER
  alt=""
  className="absolute"
  style={{ top: '15%', left: '5%', width: '250px', opacity: 0.025 }}
/>
```

### 2. **Précharger l'image dans index.html** → +5 points
```html
<link rel="preload" href="/nukleo-arrow.svg" as="image" fetchpriority="high" />
```

### 3. **Inline le SVG dans le HTML** → +10 points (MEILLEURE SOLUTION)
Au lieu de charger `/nukleo-arrow.svg`, inline le SVG directement dans `index.html` pour éliminer complètement le délai de chargement.

---

## Problème #2: Render Blocking CSS (740ms)

**Fichier bloquant:**
- `/assets/index-DSZViKuy.css` (28.2 KiB, 740ms)

**Solution:** Inline le CSS critique dans `<head>` et defer le reste.

---

## Problème #3: JavaScript Inutilisé (173 KiB)

**Fichiers concernés:**
1. `/assets/vendor-CmecXjEb.js` - Code inutilisé
2. `/assets/react-dom-BcDqJSl5.js` - Code inutilisé

**Solution:** Tree-shaking déjà activé, mais peut être amélioré avec dynamic imports plus agressifs.

---

## Problème #4: Long Main-Thread Tasks (4 tâches)

**Fichiers responsables:**
1. `/assets/react-scheduler.js`
2. `/assets/react-dom-BcDqJSl5.js` (2 tâches)

**Solution:** Code splitting plus granulaire + defer non-critical JS.

---

## Plan d'Action Mobile (Par Ordre de Priorité)

### Phase 1: Optimiser le LCP (4.6s → 2.5s) → +12 points
1. ✅ **Inline le SVG nukleo-arrow** dans index.html (éliminer 1650ms de délai)
2. ✅ **Ajouter fetchpriority="high"** sur toutes les images above-the-fold
3. ✅ **Précharger les fonts critiques** avec preload

### Phase 2: Réduire le Render Blocking (740ms → 0ms) → +5 points
1. ✅ **Inline le CSS critique** (< 14KB) dans `<head>`
2. ✅ **Defer le CSS non-critique** avec media="print" onload

### Phase 3: Optimiser le TBT (100ms → 50ms) → +3 points
1. ✅ **Code splitting plus agressif** sur react-dom
2. ✅ **Defer les scripts non-critiques** avec async/defer

---

## Gains Estimés (Mobile)

| Optimisation | Gain Estimé |
|--------------|-------------|
| Inline SVG LCP | +10 points |
| fetchpriority="high" | +2 points |
| Inline CSS critique | +3 points |
| Code splitting | +2 points |
| **TOTAL** | **+17 points → Score 95** |

---

## Quick Wins Mobile (30 min → +12 points = Score 90)

1. ✅ **Inline le SVG nukleo-arrow** (10 min) → +10 points
2. ✅ **Ajouter fetchpriority="high"** (5 min) → +2 points

**Total Quick Wins:** +12 points → **Score 90**
