# Guide de Contribution

Merci de votre intérêt pour contribuer à Nukleo Digital ! Ce document fournit des lignes directrices pour contribuer au projet.

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

### Exécuter les Tests
```bash
# Tous les tests
pnpm test

# Tests en mode watch
pnpm test --watch

# Couverture de code
pnpm test --coverage
```

### Structure des Tests
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Hello')).toBeTruthy();
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

## ✅ Checklist avant de Soumettre

- [ ] Code formaté avec Prettier
- [ ] Types TypeScript vérifiés (`pnpm check`)
- [ ] Tests ajoutés et passants
- [ ] Documentation mise à jour si nécessaire
- [ ] Pas de console.log ou debug code
- [ ] Variables d'environnement documentées si ajoutées

## 📞 Questions ?

N'hésitez pas à créer une issue pour toute question ou clarification nécessaire.

Merci de contribuer à Nukleo Digital ! 🎉

