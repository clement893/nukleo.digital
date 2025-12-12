# Analyse PageSpeed - Score 77/100

**Date:** 12 décembre 2025, 10:48 PM  
**URL:** https://nukleodigital-production.up.railway.app/  
**Objectif:** Passer de 77 à 90+

---

## Métriques Core Web Vitals

| Métrique | Valeur Actuelle | Statut | Objectif |
|----------|----------------|--------|----------|
| **FCP** (First Contentful Paint) | 0.4s | ✅ Bon | < 1.8s |
| **LCP** (Largest Contentful Paint) | 0.9s | ✅ Bon | < 2.5s |
| **TBT** (Total Blocking Time) | 50ms | ✅ Bon | < 200ms |
| **CLS** (Cumulative Layout Shift) | 0.459 | ⚠️ Moyen | < 0.1 |
| **Speed Index** | 1.6s | ✅ Bon | < 3.4s |

---

## Problèmes Critiques (Impact sur le score)

### 1. **CLS élevé (0.459)** - PRIORITÉ #1
- **Impact:** -5 points de score
- **Cause:** Layout shifts pendant le chargement
- **Solution:** Réserver l'espace pour les éléments dynamiques (images, fonts)

### 2. **Element Render Delay (2100ms)** - PRIORITÉ #2
- **Impact:** Bloque le rendu du LCP
- **Cause:** JavaScript bloquant le rendu initial
- **Solution:** Defer non-critical JS, inline critical CSS

### 3. **Render Blocking CSS** - PRIORITÉ #3
- **Impact:** Retarde le FCP
- **Fichier:** `/assets/index-DSZViKuy.css`
- **Solution:** Inline critical CSS, defer non-critical

---

## Opportunités d'Optimisation

### JavaScript (175 KiB à économiser)
1. **vendor-Dna_GXiH.js** - Code inutilisé
2. **react-dom-Cvv0FrsG.js** - Code inutilisé
3. **react-core.js** - Minification manquante (4 KiB)

### Performance
- **3 long main-thread tasks** détectées
- **2 animations non-composited** (utiliser `transform` et `opacity`)

### Fonts
- **JetBrains Mono** chargée depuis Google Fonts (3rd party)
- **Solution:** Self-host ou utiliser `font-display: swap`

---

## Plan d'Action (Par Ordre de Priorité)

### Phase 1: Corriger le CLS (0.459 → 0.1)
1. Ajouter `width` et `height` explicites sur toutes les images
2. Réserver l'espace pour les fonts avec `font-display: swap`
3. Éviter les injections de contenu dynamique qui causent des shifts

### Phase 2: Réduire l'Element Render Delay (2100ms → 500ms)
1. Inline le CSS critique dans `<head>`
2. Defer le JavaScript non-critique
3. Utiliser `async` pour les scripts tiers

### Phase 3: Optimiser les Bundles JS (-175 KiB)
1. Tree-shaking plus agressif
2. Dynamic imports pour les composants lourds
3. Minification optimale

### Phase 4: Optimiser les Animations
1. Utiliser `transform` au lieu de `left/top/width/height`
2. Utiliser `opacity` au lieu de `visibility`
3. Ajouter `will-change` pour les animations critiques

---

## Gains Estimés

| Optimisation | Gain Estimé |
|--------------|-------------|
| Corriger CLS | +8 points |
| Réduire Render Delay | +5 points |
| Optimiser JS | +3 points |
| Optimiser Animations | +2 points |
| **TOTAL** | **+18 points → Score 95** |

---

## Quick Wins (Gains Rapides)

1. ✅ **Inline critical CSS** (5 min) → +3 points
2. ✅ **Ajouter width/height sur images** (10 min) → +5 points
3. ✅ **Defer JetBrains Mono** (2 min) → +2 points
4. ✅ **Minify react-core** (1 min) → +1 point

**Total Quick Wins:** +11 points → **Score 88**
