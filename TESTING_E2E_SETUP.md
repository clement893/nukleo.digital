# Configuration Tests E2E avec Playwright

## Installation

Les dépendances ont été ajoutées au `package.json`. Pour installer :

```bash
pnpm install
```

## Configuration

Le fichier `playwright.config.ts` est configuré avec :
- Tests sur Chromium, Firefox, WebKit
- Tests sur mobile (Chrome Mobile, Safari Mobile)
- Serveur de développement automatique
- Screenshots et traces sur échec

## Scripts Disponibles

```bash
# Exécuter tous les tests E2E
pnpm test:e2e

# Exécuter avec interface UI
pnpm test:e2e:ui

# Exécuter en mode headed (voir le navigateur)
pnpm test:e2e:headed
```

## Tests Créés

### 1. Formulaire de Contact (`e2e/contact-form.spec.ts`)
- Affichage du formulaire
- Validation des champs requis
- Soumission avec données valides
- Validation du format email

### 2. Navigation (`e2e/navigation.spec.ts`)
- Navigation vers les pages principales
- Menu mobile
- Préférences de langue

### 3. Connexion (`e2e/login.spec.ts`)
- Affichage du formulaire de connexion
- Validation des credentials
- Gestion des erreurs

## Personnalisation

Les tests utilisent des sélecteurs flexibles qui s'adaptent à votre structure HTML. Vous pouvez les ajuster selon vos besoins :

```typescript
// Exemple de sélecteur flexible
const submitButton = page.locator('button[type="submit"]');
const emailField = page.locator('input[type="email"], input[name="email"]').first();
```

## Variables d'Environnement

Pour les tests de connexion avec credentials réels (optionnel) :

```env
TEST_EMAIL=test@example.com
TEST_PASSWORD=testpassword
PLAYWRIGHT_BASE_URL=http://localhost:3000
```

## CI/CD

Pour exécuter dans CI/CD :

```bash
# Installer les navigateurs
npx playwright install --with-deps

# Exécuter les tests
pnpm test:e2e
```

## Prochaines Étapes

1. Ajuster les sélecteurs selon votre structure HTML
2. Ajouter plus de tests pour les workflows critiques
3. Configurer les tests dans votre pipeline CI/CD
4. Ajouter des tests de performance si nécessaire

