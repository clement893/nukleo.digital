# Réinitialisation des Loaders

## Fonctionnalité Ajoutée

Un système de réinitialisation des loaders a été ajouté pour vider tous les loaders existants et créer 2 nouveaux loaders créatifs utilisant le logo Nukleo.

## Comment Utiliser

### Option 1: Via l'Interface Admin (RECOMMANDÉ)

1. Connectez-vous à l'admin : `/admin/login`
2. Allez sur la page des loaders : `/admin/loaders`
3. Cliquez sur le bouton **"🔄 Réinitialiser les Loaders"** (bouton rouge en haut à droite)
4. Confirmez l'action dans la popup
5. Les 2 nouveaux loaders seront créés automatiquement

### Option 2: Via l'API tRPC

```typescript
const resetMutation = trpc.loaders.reset.useMutation();
resetMutation.mutate();
```

## Les 2 Nouveaux Loaders

### 1. **Nukleo Pulse**
- **Style:** Élégant et moderne
- **Animation:** Logo avec pulse doux et particules flottantes
- **Couleurs:** Dégradé violet/rose avec effets de lumière
- **Texte:** "Choose Intelligence"
- **Design:** Professionnel et raffiné

### 2. **Nukleo Glitch**
- **Style:** Cyberpunk et futuriste
- **Animation:** Effet de glitch avec gradient animé
- **Couleurs:** Noir avec accents violet/rose/cyan
- **Texte:** "NUKLEO DIGITAL"
- **Design:** Puissant et impactant

## Caractéristiques Techniques

- **Logo utilisé:** `/Nukleo_blanc_RVB.svg`
- **Z-index:** 9999 (au-dessus de tout)
- **Position:** Fixed, plein écran
- **Animations:** Optimisées avec `transform` et `opacity` (GPU-accelerated)
- **Responsive:** S'adapte à toutes les tailles d'écran

## Fichiers Modifiés

- `server/loaders.ts` - Ajout de `deleteAllLoaders()`
- `server/routers/loadersRouter.ts` - Ajout de la mutation `reset`
- `client/src/pages/AdminLoaders.tsx` - Ajout du bouton de réinitialisation

## Notes

- Les loaders sont créés avec `isActive: true` par défaut
- Ils s'afficheront en rotation aléatoire au chargement du site
- Vous pouvez les activer/désactiver individuellement depuis `/admin/loaders`
- Les loaders utilisent le logo blanc Nukleo (`/Nukleo_blanc_RVB.svg`)
