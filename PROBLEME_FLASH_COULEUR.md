# Problème : Flash de couleur entre les pages

## Problème identifié

Un flash de couleur (fond du site) apparaît entre les chargements de pages, ce qui est désagréable visuellement.

## Causes identifiées

1. **Body caché puis révélé** (`index.html` lignes 69-73)
   - Le body a `visibility: hidden` par défaut
   - Il devient visible seulement avec la classe `.loaded`
   - Pendant les transitions de page, le body peut redevenir invisible brièvement

2. **Fond noir du PageLoader** (`PageLoader.tsx` ligne 192)
   - Le loader affiche un fond noir `#000000` pendant le chargement
   - Ce fond noir contraste avec le fond gradient du body

3. **Transition d'opacité du loader** (`PageLoader.tsx` ligne 210)
   - Transition de 0.5s sur l'opacité du loader
   - Pendant cette transition, le fond gradient du body peut apparaître

4. **Lazy loading des composants** (`App.tsx`)
   - Les pages sont chargées en lazy loading
   - Il y a un délai entre le changement de route et le chargement du composant
   - Pendant ce délai, seul le fond du body est visible

5. **Fond gradient du body toujours visible** (`index.css` lignes 217-228)
   - Le body a un fond gradient fixe qui est toujours présent
   - Ce fond peut apparaître brièvement entre les pages

## Solutions proposées

### Solution 1 : Overlay de transition (Recommandée)
- Ajouter un overlay de transition qui couvre l'écran pendant les changements de page
- Utiliser le même fond gradient que le body pour éviter le flash
- Faire disparaître l'overlay une fois la nouvelle page chargée

### Solution 2 : Préchargement des pages
- Précharger les composants de page avant le changement de route
- Réduire le délai entre le changement de route et l'affichage du contenu

### Solution 3 : Fond du loader cohérent
- Changer le fond noir du loader pour utiliser le même gradient que le body
- Éviter le contraste visuel entre le loader et le contenu

### Solution 4 : Transition fluide
- Garder le body visible pendant les transitions
- Utiliser une transition CSS pour masquer/afficher le contenu au lieu de `visibility`

## Solution implémentée

Combinaison de plusieurs solutions :
1. ✅ Overlay de transition avec fond gradient cohérent
2. ✅ Garder le body visible pendant les transitions
3. ✅ Fond du loader aligné avec le fond du body
4. ✅ Transition plus fluide entre les pages
