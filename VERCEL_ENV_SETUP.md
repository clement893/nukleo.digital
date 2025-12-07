# Configuration des variables d'environnement pour Vercel

## Export depuis Manus

Toutes les variables d'environnement sont déjà configurées dans votre projet Manus. Pour les exporter et les importer dans Vercel :

### Option 1 : Export automatique (recommandé)

1. Dans l'interface Manus, allez dans **Settings → Secrets**
2. Cliquez sur **Export** pour télécharger un fichier `.env`
3. Dans Vercel, lors de la configuration du projet :
   - Allez dans **Environment Variables**
   - Cliquez sur **Import .env**
   - Sélectionnez le fichier téléchargé

### Option 2 : Copie manuelle

Les variables suivantes sont déjà configurées dans Manus :

```
DATABASE_URL
JWT_SECRET
VITE_APP_ID
OAUTH_SERVER_URL
VITE_OAUTH_PORTAL_URL
OWNER_OPEN_ID
OWNER_NAME
BUILT_IN_FORGE_API_URL
BUILT_IN_FORGE_API_KEY
VITE_FRONTEND_FORGE_API_KEY
VITE_FRONTEND_FORGE_API_URL
VITE_ANALYTICS_ENDPOINT
VITE_ANALYTICS_WEBSITE_ID
VITE_APP_LOGO
VITE_APP_TITLE
```

Copiez les valeurs depuis **Manus Settings → Secrets** et collez-les dans Vercel.

## Important

⚠️ Assurez-vous que **toutes** les variables sont configurées dans Vercel avant le premier déploiement, sinon l'application ne fonctionnera pas correctement.

## Vérification

Après l'import, vérifiez que vous avez bien **15 variables d'environnement** configurées dans Vercel.
