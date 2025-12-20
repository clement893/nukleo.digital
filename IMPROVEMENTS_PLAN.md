# Plan d'Amélioration - Nukleo Digital

## ✅ Priorité Critique 🔴 (1-2 semaines) - EN COURS

### 1. Vulnérabilités npm élevées ✅ COMPLÉTÉ
- ✅ **jsPDF**: Déjà à la version `^3.0.2` (requis: 3.0.2+)
- ✅ **esbuild**: Déjà à la version `^0.25.0` (requis: 0.25.0+)
- ✅ **dompurify**: Déjà à la version `^3.2.4` (requis: 3.2.4+)

**Statut**: Toutes les vulnérabilités critiques sont déjà corrigées.

### 2. Augmenter la couverture de tests 🟡 EN COURS
- ✅ Configuré `@vitest/coverage-v8` pour la couverture de tests
- ✅ Ajouté les dépendances manquantes:
  - `@testing-library/react`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
  - `jsdom`
- ✅ Configuré les seuils de couverture à 50% pour:
  - Lines (lignes)
  - Functions (fonctions)
  - Branches (branches)
  - Statements (statements)
- ✅ Ajouté les scripts de test:
  - `pnpm test` - Exécuter les tests
  - `pnpm test:coverage` - Exécuter avec rapport de couverture
  - `pnpm test:watch` - Mode watch

**Prochaines étapes**:
- [ ] Exécuter `pnpm test:coverage` pour voir la couverture actuelle
- [ ] Identifier les modules critiques avec faible couverture
- [ ] Ajouter des tests pour les modules critiques:
  - Composants de sécurité (SafeHTML, etc.)
  - Hooks personnalisés
  - Utilitaires critiques
  - Routes API importantes

---

## 🟡 Priorité Haute (2-4 semaines)

### 1. Tests E2E complets
**À faire**:
- [ ] Installer Playwright ou Cypress
- [ ] Configurer l'environnement de test E2E
- [ ] Tests pour le formulaire de contact
- [ ] Tests pour le processus de connexion
- [ ] Tests pour la navigation principale

### 2. Monitoring avancé
**À faire**:
- [ ] Configurer les alertes Sentry
- [ ] Ajouter les métriques de stabilité
- [ ] Créer un dashboard de monitoring

---

## 🟢 Priorité Moyenne (1-2 mois)

### 1. Optimisations supplémentaires
**À faire**:
- [ ] Analyser le bundle avec visualizer (`pnpm build:analyze`)
- [ ] Implémenter srcset responsive pour les images
- [ ] Ajouter prefetch pour les routes fréquentes

---

## 📊 État Actuel

### Tests Existants
- ✅ 15 fichiers de test identifiés
- ✅ Tests pour composants (Header, Footer, SEO, SafeHTML, etc.)
- ✅ Tests pour hooks (useIsMobile, useLocalizedPath, usePageTransition, useParallax)
- ✅ Tests pour pages (About, Contact, Services)
- ✅ Tests pour serveur (auth, contact, leo, sendgrid)

### Configuration
- ✅ Vitest configuré avec jsdom
- ✅ Coverage configuré avec seuils à 50%
- ✅ Scripts de test ajoutés

---

## 🚀 Commandes Utiles

```bash
# Exécuter les tests
pnpm test

# Exécuter avec couverture
pnpm test:coverage

# Mode watch
pnpm test:watch

# Analyser le bundle
pnpm build:analyze
```

---

## 📝 Notes

- Les vulnérabilités npm critiques sont déjà corrigées
- La configuration de couverture de tests est en place
- Les dépendances de test manquantes ont été ajoutées
- Prochaine étape: Exécuter la couverture et identifier les modules à améliorer

