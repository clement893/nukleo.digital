# Analyse PageSpeed Insights - Nukleo Digital

**Date:** 11 décembre 2025  
**URL:** https://nukleodigital-production.up.railway.app/

---

## 📊 Scores Globaux

| Métrique | Mobile | Statut |
|----------|--------|--------|
| **Performance** | 57/100 | 🔴 Critique |
| **Accessibility** | 83/100 | 🟢 Bon |
| **Best Practices** | 77/100 | 🟡 Moyen |
| **SEO** | 100/100 | 🟢 Excellent |

---

## 🚨 Core Web Vitals (Mobile)

| Métrique | Valeur | Cible | Statut |
|----------|--------|-------|--------|
| **FCP** (First Contentful Paint) | 4.7s | < 1.8s | 🔴 Échec |
| **LCP** (Largest Contentful Paint) | 21.5s | < 2.5s | 🔴 Échec |
| **TBT** (Total Blocking Time) | 50ms | < 200ms | 🟢 Bon |
| **CLS** (Cumulative Layout Shift) | 0.013 | < 0.1 | 🟢 Bon |
| **SI** (Speed Index) | 11.8s | < 3.4s | 🔴 Échec |

---

## 🔴 Problèmes Critiques

### 1. **Render Blocking Resources** (Économie: 1,930ms)
Les ressources CSS et fonts bloquent le rendu initial de la page.

**Ressources bloquantes:**
- `/assets/index-B0BrQJvR.css` (199 KB, 1,680ms)
- Google Fonts CSS (1.5 KB, 780ms)

**Impact:** FCP, LCP

### 2. **Image LEO Non Optimisée** (Économie: 952 KB)
L'avatar LEO (`/leo-avatar.png`) est le plus gros problème :
- **Taille:** 926 KB
- **Format:** PNG (devrait être WebP/AVIF)
- **Dimensions:** 1024x1024 affiché en 84x84 (11x trop grand!)
- **Impact:** LCP de 21.5s (l'image LEO est l'élément LCP)

**Autres images:**
- `/nukleo-logo.webp` (27 KB) : 2048x566 affiché en 203x56

### 3. **JavaScript Non Utilisé** (Économie: 1,391 KB)
- `/assets/index-BVzZn8yS.js` : 1,236 KB (896 KB inutilisé - 72%)
- `/assets/ui-vendor-BEQx5D6Q.js` : 387 KB (276 KB inutilisé - 71%)

### 4. **Temps de Réponse Serveur Lent**
- **TTFB observé:** 652ms (devrait être < 200ms)
- **Pas de compression** appliquée sur le document HTML

### 5. **LCP Breakdown**
- Resource load delay: 3,150ms (délai avant le chargement)
- Resource load duration: 1,160ms (temps de téléchargement)
- Element render delay: 130ms

---

## 🟡 Problèmes Moyens

### 6. **Main Thread Work** (2.7s)
- Other: 894ms
- Style & Layout: 828ms
- Script Evaluation: 608ms

### 7. **Network Payload** (3,841 KB)
Taille totale des ressources téléchargées trop élevée.

### 8. **DOM Size**
- Total elements: 523 (acceptable, < 1,500)
- DOM depth: 14 (bon, < 32)
- Most children: 24 (bon, < 60)

---

## ✅ Points Forts

1. **SEO:** 100/100 - Excellent travail sur les meta tags, sitemap, robots.txt
2. **CLS:** 0.013 - Très bon, pas de layout shifts
3. **TBT:** 50ms - Bon, peu de blocage JavaScript
4. **Accessibility:** 83/100 - Bon score d'accessibilité

---

## 🎯 Plan d'Optimisation Prioritaire

### Phase 1 - Critique (Impact: +30-40 points Performance)

#### 1.1 Optimiser l'image LEO (Impact: +15-20 points)
```bash
# Convertir en WebP et redimensionner
convert leo-avatar.png -resize 168x168 -quality 85 leo-avatar.webp
```
- Passer de 926 KB à ~15 KB
- Utiliser srcset pour responsive images
- Ajouter `fetchpriority="high"` car c'est l'élément LCP

#### 1.2 Defer/Inline CSS Critique (Impact: +10-15 points)
- Extraire le CSS critique inline dans `<head>`
- Defer le reste du CSS avec `media="print" onload="this.media='all'"`
- Preload les fonts Google avec `<link rel="preconnect">`

#### 1.3 Activer la Compression (Impact: +5 points)
- Activer gzip/brotli sur Railway pour le HTML
- Réduire TTFB de 652ms à < 200ms

#### 1.4 Code Splitting (Impact: +5-10 points)
- Split `index-BVzZn8yS.js` en chunks par route
- Lazy load les composants non-critiques (LEO widget, modals)

### Phase 2 - Important (Impact: +10-15 points)

#### 2.1 Optimiser les autres images
- Redimensionner `nukleo-logo.webp` aux dimensions réelles
- Ajouter `loading="lazy"` sur les images below-the-fold

#### 2.2 Preconnect aux origines critiques
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

#### 2.3 Tree Shaking
- Analyser le bundle avec `vite-plugin-bundle-analyzer`
- Supprimer les imports inutilisés

---

## 📈 Résultats Attendus

**Avant:**
- Performance: 57/100
- LCP: 21.5s
- FCP: 4.7s

**Après Phase 1:**
- Performance: 85-95/100
- LCP: < 2.5s
- FCP: < 1.8s

**Après Phase 2:**
- Performance: 95-100/100
- LCP: < 2.0s
- FCP: < 1.5s

---

## 🛠️ Commandes Utiles

```bash
# Analyser le bundle
pnpm add -D vite-plugin-bundle-analyzer
pnpm build

# Optimiser les images
pnpm add -D sharp
node scripts/optimize-images.js

# Tester en local
pnpm build && pnpm preview
```

---

## 📚 Ressources

- [Web.dev - Optimize LCP](https://web.dev/optimize-lcp/)
- [Web.dev - Reduce JavaScript](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [Vite - Code Splitting](https://vitejs.dev/guide/build.html#chunking-strategy)
