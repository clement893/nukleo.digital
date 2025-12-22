# Guide des Tests Unitaires

Ce document décrit le système de tests unitaires obligatoires mis en place dans le projet.

## 📋 Vue d'ensemble

Tous les tests unitaires sont **obligatoires** et doivent passer avant chaque déploiement. Le système CI/CD bloque automatiquement le déploiement si les tests échouent.

## 🎯 Objectifs

- **Couverture minimale** : 70% pour le backend
- **Tests obligatoires** : Tous les tests doivent passer avant le déploiement
- **Blocage automatique** : Le déploiement est bloqué si les tests échouent
- **Rapports de couverture** : Génération automatique de rapports HTML et XML

## 🧪 Tests Backend (FastAPI)

### Structure

Les tests backend sont situés dans `backend/tests/` :

```
backend/tests/
├── conftest.py              # Configuration et fixtures
├── test_auth.py             # Tests d'authentification
├── test_users.py            # Tests des endpoints utilisateurs
├── test_resources.py        # Tests des ressources
├── test_upload.py           # Tests d'upload de fichiers
├── test_organizations.py    # Tests des organisations
└── test_donateurs.py        # Tests des donateurs
```

### Exécution

```bash
# Tous les tests
cd backend
pytest

# Avec couverture
pytest --cov=app --cov-report=html --cov-fail-under=70

# Tests spécifiques
pytest tests/test_auth.py

# Mode verbose
pytest -v
```

### Configuration

La configuration pytest se trouve dans `backend/pytest.ini` :

- **Couverture minimale** : 70%
- **Rapports** : HTML, XML, terminal
- **Mode asyncio** : Auto

## 🧪 Tests Frontend (Next.js)

### Structure

Les tests frontend utilisent Vitest et sont situés dans `apps/web/src/test/` :

```
apps/web/src/test/
├── setup.ts                 # Configuration des tests
└── example.test.tsx         # Exemple de test
```

### Exécution

```bash
# Tous les tests
cd apps/web
npm run test

# Mode watch
npm run test:watch

# Avec couverture
npm run test:coverage

# Interface UI
npm run test:ui
```

### Configuration

La configuration Vitest se trouve dans `apps/web/vitest.config.ts` :

- **Couverture minimale** : 60%
- **Environnement** : jsdom
- **Rapports** : text, json, html, lcov

## 🚀 CI/CD

### Workflow GitHub Actions

Le workflow CI/CD (`.github/workflows/ci.yml`) exécute automatiquement :

1. **Installation des dépendances**
2. **Linting** (frontend)
3. **Type checking** (frontend)
4. **Tests backend** (avec couverture)
5. **Tests frontend** (avec couverture)
6. **Build** (frontend)
7. **Déploiement** (uniquement si tous les tests passent)

### Blocage du déploiement

Le déploiement est **automatiquement bloqué** si :

- ❌ Les tests backend échouent
- ❌ Les tests frontend échouent
- ❌ La couverture de code est insuffisante (< 70% backend, < 60% frontend)
- ❌ Le linting échoue
- ❌ Le type checking échoue
- ❌ Le build échoue

### Notification d'échec

En cas d'échec, un job de notification informe l'équipe que le déploiement a été bloqué.

## 📝 Scripts de vérification pré-déploiement

### Script Bash (Linux/Mac)

```bash
./scripts/pre-deploy-check.sh
```

### Script PowerShell (Windows)

```powershell
.\scripts\pre-deploy-check.ps1
```

Ces scripts vérifient localement que tous les tests passent avant de pousser le code.

## 📊 Rapports de couverture

### Backend

Les rapports de couverture backend sont générés dans :
- `backend/htmlcov/` (rapport HTML)
- `backend/coverage.xml` (rapport XML)

### Frontend

Les rapports de couverture frontend sont générés dans :
- `apps/web/coverage/` (rapport HTML)
- `apps/web/coverage/lcov.info` (rapport LCOV)

## ✅ Checklist avant déploiement

Avant de pousser votre code, assurez-vous que :

- [ ] Tous les tests backend passent (`pytest`)
- [ ] Tous les tests frontend passent (`npm run test`)
- [ ] La couverture de code est suffisante (≥ 70% backend, ≥ 60% frontend)
- [ ] Le linting passe (`npm run lint`)
- [ ] Le type checking passe (`npm run type-check`)
- [ ] Le build passe (`npm run build`)

## 🔧 Ajout de nouveaux tests

### Backend

1. Créer un fichier `test_*.py` dans `backend/tests/`
2. Utiliser les fixtures de `conftest.py`
3. Suivre le pattern existant

Exemple :

```python
@pytest.mark.asyncio
async def test_my_endpoint(client: AsyncClient, auth_headers: dict):
    response = await client.get("/api/my-endpoint", headers=auth_headers)
    assert response.status_code == 200
```

### Frontend

1. Créer un fichier `*.test.tsx` dans `apps/web/src/test/` ou à côté du composant
2. Utiliser Vitest et React Testing Library
3. Suivre le pattern existant

Exemple :

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 🐛 Dépannage

### Tests backend qui échouent

1. Vérifier que la base de données de test est accessible
2. Vérifier les variables d'environnement
3. Vérifier que les fixtures sont correctes

### Tests frontend qui échouent

1. Vérifier que les dépendances sont installées
2. Vérifier la configuration Vitest
3. Vérifier que les mocks sont corrects

### Couverture insuffisante

1. Identifier les fichiers non couverts
2. Ajouter des tests pour ces fichiers
3. Vérifier les seuils dans la configuration

## 📚 Ressources

- [Documentation Pytest](https://docs.pytest.org/)
- [Documentation Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)

## 🎯 Objectifs futurs

- [ ] Augmenter la couverture à 80% (backend) et 70% (frontend)
- [ ] Ajouter des tests d'intégration
- [ ] Ajouter des tests E2E
- [ ] Automatiser les tests de performance

