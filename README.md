# Nukleo Digital

Site d'agence professionnelle avec espace client connecté et application de gestion de projets.

## Stack Technique

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Express + tRPC 11
- **Base de données**: MySQL/TiDB (Drizzle ORM)
- **Authentification**: Manus OAuth
- **Déploiement**: Vercel

## Déploiement sur Vercel

### Prérequis

- Compte Vercel connecté à GitHub
- Variables d'environnement configurées

### Variables d'environnement requises

Les variables suivantes doivent être configurées dans Vercel :

```
DATABASE_URL=<votre_url_mysql>
JWT_SECRET=<votre_secret_jwt>
VITE_APP_ID=<manus_app_id>
OAUTH_SERVER_URL=<manus_oauth_url>
VITE_OAUTH_PORTAL_URL=<manus_portal_url>
OWNER_OPEN_ID=<owner_id>
OWNER_NAME=<owner_name>
BUILT_IN_FORGE_API_URL=<forge_api_url>
BUILT_IN_FORGE_API_KEY=<forge_api_key>
VITE_FRONTEND_FORGE_API_KEY=<frontend_forge_key>
VITE_FRONTEND_FORGE_API_URL=<frontend_forge_url>
VITE_ANALYTICS_ENDPOINT=<analytics_endpoint>
VITE_ANALYTICS_WEBSITE_ID=<analytics_id>
VITE_APP_LOGO=<app_logo_url>
VITE_APP_TITLE=Nukleo Digital
```

### Étapes de déploiement

1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez le dépôt `clement893/nukleo.digital`
4. Configurez les variables d'environnement
5. Déployez !

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

## Fonctionnalités

- ✅ Site d'agence avec présentation complète
- ✅ Espace client avec authentification
- ✅ Dashboard personnalisé
- ✅ Gestion de projets
- ✅ Communication client-agence
- ✅ Upload de fichiers
