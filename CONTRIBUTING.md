# Guide de Contribution

Merci de votre intérêt pour contribuer à Nukleo Digital ! Ce document fournit des lignes directrices pour contribuer au projet.

> **Note**: Ce guide est en constante évolution. N'hésitez pas à proposer des améliorations via une issue ou une pull request.

## 🚀 Démarrage Rapide

1. **Fork** le dépôt
2. **Clone** votre fork : `git clone https://github.com/votre-username/nukleo.digital.git`
3. **Créez une branche** : `git checkout -b feature/ma-nouvelle-fonctionnalite`
4. **Installez les dépendances** : `pnpm install`
5. **Créez un fichier .env** : `cp .env.example .env`

## 📝 Standards de Code

### TypeScript
- Utilisez TypeScript strict
- Évitez `any` autant que possible
- Ajoutez des types explicites pour les fonctions publiques

### Formatage
- Utilisez Prettier pour le formatage : `pnpm format`
- Les fichiers sont formatés automatiquement avant le commit

### Nommage
- **Composants** : PascalCase (`Header.tsx`)
- **Hooks** : camelCase avec préfixe `use` (`useIsMobile.ts`)
- **Fichiers utilitaires** : camelCase (`formatDate.ts`)
- **Constantes** : UPPER_SNAKE_CASE (`MAX_RETRIES`)

## 🧪 Tests

### Écrire des Tests
- Créez des tests pour les nouvelles fonctionnalités
- Placez les tests à côté des fichiers : `Component.test.tsx`
- Utilisez Vitest et React Testing Library
- **Objectif de couverture**: Viser au moins 70% pour le code critique

### Exécuter les Tests
```bash
# Tous les tests
pnpm test

# Tests en mode watch
pnpm test --watch

# Couverture de code
pnpm test --coverage

# Tests spécifiques
pnpm test ComponentName
```

### Structure des Tests
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup commun pour tous les tests
  });

  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);
    
    await user.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Clicked')).toBeInTheDocument();
    });
  });
});
```

### Tests d'Intégration
Pour les routes tRPC, créez des tests d'intégration dans `server/__tests__/`:

```typescript
import { describe, it, expect } from 'vitest';
import { appRouter } from '../routers';
import { createContext } from '../_core/context';

describe('tRPC Router', () => {
  it('should handle valid requests', async () => {
    const ctx = await createContext({ req: {} as any, res: {} as any });
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.example.hello({ text: 'world' });
    expect(result).toEqual({ greeting: 'Hello world' });
  });
});
```

## 🔀 Workflow Git

### Branches
- `main` : Production stable
- `staging` : Pré-production
- `feature/*` : Nouvelles fonctionnalités
- `fix/*` : Corrections de bugs
- `docs/*` : Documentation

### Commits
Utilisez des messages de commit clairs et descriptifs :

```
feat: add user authentication
fix: resolve header scroll issue
docs: update README for Railway deployment
refactor: optimize image loading
test: add tests for Header component
```

### Pull Requests
1. Assurez-vous que tous les tests passent
2. Vérifiez que le code est formaté (`pnpm format`)
3. Vérifiez les types TypeScript (`pnpm check`)
4. Ajoutez une description claire de vos changements
5. Référencez les issues liées (ex: `Fixes #123`)

## 📚 Structure du Projet

```
client/src/
├── components/     # Composants réutilisables
├── pages/         # Pages de l'application
├── hooks/         # Hooks personnalisés
├── contexts/      # Contextes React
├── locales/       # Traductions
└── test/          # Configuration de test

server/
├── _core/         # Code core du serveur
├── routers/       # Routes tRPC
└── db/           # Configuration DB
```

## 🐛 Signaler un Bug

1. Vérifiez que le bug n'a pas déjà été signalé
2. Créez une issue avec :
   - Description claire du problème
   - Steps pour reproduire
   - Comportement attendu vs réel
   - Environnement (OS, navigateur, version Node)

## 💡 Proposer une Fonctionnalité

1. Vérifiez que la fonctionnalité n'existe pas déjà
2. Créez une issue pour discuter de la fonctionnalité
3. Attendez l'approbation avant de commencer le développement
4. Créez une branche et développez la fonctionnalité

## 🔒 Sécurité

### Bonnes Pratiques
- Ne jamais commiter de secrets ou clés API
- Utiliser les variables d'environnement pour les configurations sensibles
- Valider et sanitizer toutes les entrées utilisateur
- Utiliser les types Zod pour la validation
- Vérifier les permissions avant les opérations sensibles

### Signaler une Vulnérabilité
Si vous découvrez une vulnérabilité de sécurité, **ne créez pas d'issue publique**. Contactez directement l'équipe via email ou message privé.

## 🎨 Styles et Composants

### Utilisation des Composants
- Utilisez les composants Radix UI pour l'accessibilité
- Respectez le design system existant
- Utilisez Tailwind CSS pour le styling
- Les breakpoints sont centralisés dans `client/src/lib/constants.ts`

### Accessibilité
- Ajoutez des labels ARIA appropriés
- Assurez-vous que les composants sont navigables au clavier
- Testez avec un lecteur d'écran si possible
- Respectez les contrastes de couleurs (WCAG AA minimum)

## ✅ Checklist avant de Soumettre

- [ ] Code formaté avec Prettier (`pnpm format`)
- [ ] Types TypeScript vérifiés (`pnpm check`)
- [ ] Tests ajoutés et passants (`pnpm test`)
- [ ] Documentation mise à jour si nécessaire
- [ ] Pas de console.log ou debug code
- [ ] Variables d'environnement documentées si ajoutées
- [ ] Accessibilité vérifiée (labels ARIA, navigation clavier)
- [ ] Responsive design testé (mobile, tablette, desktop)
- [ ] Performance vérifiée (pas de re-renders inutiles)

## 📞 Questions ?

N'hésitez pas à créer une issue pour toute question ou clarification nécessaire.

Merci de contribuer à Nukleo Digital ! 🎉

