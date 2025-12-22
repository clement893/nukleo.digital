# 🔄 Guide de Migration depuis le Template

Guide complet pour transformer ce template en votre propre projet.

---

## 📋 Table des Matières

- [Préparation](#préparation)
- [Renommage du Projet](#renommage-du-projet)
- [Nettoyage de l'Historique Git](#nettoyage-de-lhistorique-git)
- [Personnalisation](#personnalisation)
- [Vérification](#vérification)

---

## 🚀 Préparation

### 1. Cloner le Template

```bash
git clone https://github.com/clement893/MODELE-NEXTJS-FULLSTACK.git votre-projet
cd votre-projet
```

### 2. Exécuter le Setup

```bash
pnpm setup
```

Ce script configure automatiquement :
- Les variables d'environnement
- Les secrets
- La base de données
- Le nom du projet

---

## 🔧 Renommage du Projet

### Option A : Script Automatique (Recommandé)

```bash
pnpm rename
```

Le script vous demande :
- Le nom actuel du projet
- Le nouveau nom du projet

Il remplace automatiquement :
- Les références dans le code
- Les noms de packages
- Les configurations

### Option B : Manuel

1. **Mettre à jour package.json**
   ```json
   {
     "name": "votre-nouveau-projet",
     "description": "Votre description"
   }
   ```

2. **Mettre à jour les variables d'environnement**
   ```env
   PROJECT_NAME=VotreNouveauProjet
   ```

3. **Remplacer dans le code**
   ```bash
   # Rechercher et remplacer "MODELE" par votre nom
   # Utiliser votre éditeur ou :
   find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" | xargs sed -i 's/MODELE/VotreNom/g'
   ```

---

## 🧹 Nettoyage de l'Historique Git

### Option A : Nouveau Dépôt (Recommandé)

```bash
# Supprimer le dossier .git
rm -rf .git

# Initialiser un nouveau dépôt
git init
git add .
git commit -m "Initial commit from template"

# Ajouter votre remote
git remote add origin https://github.com/votre-username/votre-projet.git
git push -u origin main
```

### Option B : Garder l'Historique

Si vous voulez garder l'historique du template :

```bash
# Ajouter votre remote
git remote add origin https://github.com/votre-username/votre-projet.git

# Créer une nouvelle branche
git checkout -b main

# Pousser
git push -u origin main
```

---

## 🎨 Personnalisation

### 1. Supprimer les Exemples

```bash
# Supprimer les pages d'exemples (optionnel)
rm -rf apps/web/src/app/examples

# Supprimer les données de test
rm -rf apps/web/src/test/example.test.tsx
```

### 2. Personnaliser le Thème

Voir [docs/COMPONENTS.md](./COMPONENTS.md) pour la personnalisation du thème.

### 3. Configurer les Services

- **SendGrid** : Voir [docs/SENDGRID_SETUP.md](./SENDGRID_SETUP.md)
- **Stripe** : Voir [docs/STRIPE_SETUP.md](./STRIPE_SETUP.md)
- **Autres services** : Configurer selon vos besoins

### 4. Ajouter vos Fonctionnalités

```bash
# Générer un composant
pnpm generate:component MonComposant

# Générer une page
pnpm generate:page ma-page

# Générer une route API
pnpm generate:api ma-route
```

---

## ✅ Vérification

### Checklist Post-Migration

- [ ] Nom du projet mis à jour partout
- [ ] Variables d'environnement configurées
- [ ] Secrets générés et sécurisés
- [ ] Base de données créée et migrée
- [ ] Tests passent (`pnpm test`)
- [ ] Build fonctionne (`pnpm build`)
- [ ] Application démarre (`pnpm dev:full`)
- [ ] Historique Git nettoyé (si souhaité)
- [ ] Remote GitHub configuré
- [ ] Documentation mise à jour

### Test de Santé

```bash
# Vérifier que tout fonctionne
pnpm validate:env
pnpm test
pnpm build
pnpm dev:full
```

---

## 🚨 Problèmes Courants

### Erreur : "Module not found"

```bash
# Réinstaller les dépendances
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### Erreur : "Database connection failed"

```bash
# Vérifier la configuration
cat backend/.env | grep DATABASE_URL

# Tester la connexion
psql $DATABASE_URL
```

### Erreur : "Secret key invalid"

```bash
# Régénérer les secrets
pnpm setup
```

---

## 📚 Ressources

- [Guide de Démarrage](../GETTING_STARTED.md)
- [Guide de Personnalisation](./CUSTOMIZATION.md)
- [Documentation API](./API.md)

---

**Migration terminée ! Bon développement ! 🚀**

