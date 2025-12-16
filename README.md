# Nukleo Digital

> Site d'agence professionnelle avec espace client connecté et application de gestion de projets.
> Dernière mise à jour: Décembre 2024

## Stack Technique

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Express + tRPC 11
- **Base de données**: PostgreSQL (Drizzle ORM)
- **Authentification**: Manus OAuth + Google OAuth (admin)
- **Déploiement**: Railway (production) / Vercel (config disponible)

## 🚀 Déploiement sur Railway

### Prérequis

- Compte [Railway](https://railway.app) connecté à GitHub
- Base de données PostgreSQL (Railway propose une option intégrée)
- Variables d'environnement configurées

### Étapes de déploiement

1. Connectez-vous à [Railway](https://railway.app)
2. Créez un nouveau projet depuis GitHub
3. Importez le dépôt `clement893/nukleo.digital`
4. Ajoutez un service PostgreSQL (Railway le fait automatiquement)
5. Configurez les variables d'environnement (voir `.env.example`)
6. Railway détecte automatiquement le build et déploie !

### Variables d'environnement requises

Consultez le fichier `.env.example` pour la liste complète des variables d'environnement.

**Variables essentielles** :
- `DATABASE_URL` : URL de connexion PostgreSQL (générée automatiquement par Railway)
- `JWT_SECRET` : Secret JWT pour les sessions (générez une chaîne aléatoire sécurisée)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` : Pour l'authentification admin
- Variables Manus OAuth pour l'espace client
- Variables Forge API si utilisées

## 📝 Développement local

### Prérequis

- Node.js 18+ et pnpm installés
- PostgreSQL en cours d'exécution
- Variables d'environnement configurées (copiez `.env.example` vers `.env`)

### Installation

```bash
# Installation des dépendances
pnpm install

# Copiez le fichier d'exemple des variables d'environnement
cp .env.example .env

# Éditez .env et remplissez les valeurs nécessaires
```

### Commandes disponibles

```bash
# Lancer le serveur de développement
pnpm dev

# Build de production
pnpm build

# Démarrer le serveur de production
pnpm start

# Vérifier les types TypeScript
pnpm check

# Formater le code
pnpm format

# Migrations de base de données
pnpm db:push

# Tests (à venir)
pnpm test
```

### Structure du projet

```
nukleo.digital/
├── client/          # Frontend React
│   └── src/
│       ├── components/  # Composants réutilisables
│       ├── pages/      # Pages de l'application
│       ├── hooks/      # Hooks personnalisés
│       ├── contexts/   # Contextes React
│       └── locales/   # Traductions (FR/EN)
├── server/          # Backend Express + tRPC
│   ├── _core/       # Code core du serveur
│   ├── routers/     # Routes tRPC
│   └── db/          # Configuration base de données
├── shared/          # Code partagé entre client et server
├── drizzle/         # Schémas et migrations de base de données
└── dist/            # Build de production
```

## Développement local

```bash
# Installation des dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Build de production
pnpm build

# Migrations de base de données
pnpm db:push
```

## ✨ Fonctionnalités

- ✅ Site d'agence avec présentation complète
- ✅ Espace client avec authentification Manus OAuth
- ✅ Dashboard admin avec authentification Google OAuth
- ✅ Gestion de visibilité des pages (admin)
- ✅ Communication client-agence
- ✅ Upload de fichiers (S3)
- ✅ Internationalisation (FR/EN)
- ✅ SEO optimisé avec structured data
- ✅ Analytics intégrés

## 🔧 Configuration

### Variables d'environnement

Toutes les variables d'environnement sont documentées dans `.env.example`. Copiez ce fichier vers `.env` et remplissez les valeurs nécessaires.

### Base de données

Le projet utilise Drizzle ORM avec PostgreSQL. Les migrations sont gérées via :

```bash
pnpm db:push
```

## 📚 Documentation

- [Analyse du code](./CODE_ANALYSIS.md) - Analyse détaillée de l'architecture et du code
- [Guide de contribution](./CONTRIBUTING.md) - Comment contribuer au projet (à venir)

## 🛠️ Technologies principales

- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Framework CSS
- **tRPC 11** - API type-safe
- **Drizzle ORM** - ORM moderne
- **Wouter** - Router léger
- **Vite** - Build tool
- **Express** - Serveur Node.js

## 📄 Licence

MIT
