# Guide de Débogage : Internal Server Error

**Date:** Décembre 2024

## Problème

L'application retourne :
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Diagnostic

### 1. Vérifier les Logs Railway

Les logs Railway devraient maintenant afficher des détails complets sur l'erreur :

```
[ERROR HANDLER] ErrorName: Error message
{
  error: "Error message",
  name: "ErrorName",
  code: "ERROR_CODE",
  stack: "Stack trace...",
  url: "/api/...",
  method: "GET/POST",
  ...
}
```

**Actions:**
1. Aller dans Railway > Votre projet > Logs
2. Rechercher `[ERROR HANDLER]` dans les logs
3. Noter le message d'erreur, le code, et l'URL qui cause l'erreur

### 2. Erreurs Communes et Solutions

#### A. Erreur de Connexion Base de Données

**Symptômes:**
- `ECONNREFUSED` dans les logs
- `Database connection refused`

**Solution:**
1. Vérifier que `DATABASE_URL` est configuré dans Railway
2. Vérifier que le service PostgreSQL est démarré
3. Vérifier que le service PostgreSQL est dans le même réseau que l'application

#### B. Erreur de Module Non Trouvé

**Symptômes:**
- `Cannot find module '...'`
- `Module not found`

**Solution:**
1. Vérifier que toutes les dépendances sont installées : `pnpm install`
2. Vérifier que le build est à jour : `pnpm run build`
3. Vérifier que les imports sont corrects

#### C. Erreur de Validation

**Symptômes:**
- Erreurs Zod/validation dans les logs
- `Validation error`

**Solution:**
1. Vérifier les données envoyées dans la requête
2. Vérifier les schémas de validation
3. Vérifier les types TypeScript

#### D. Erreur de Permissions

**Symptômes:**
- `EACCES` ou `EPERM` dans les logs
- `Permission denied`

**Solution:**
1. Vérifier les permissions des fichiers/dossiers
2. Vérifier que Railway a les permissions nécessaires
3. Vérifier les variables d'environnement

### 3. Vérifier les Routes Spécifiques

Si l'erreur se produit sur une route spécifique :

#### Route API tRPC
- Vérifier les logs tRPC
- Vérifier les routers dans `server/routers/`
- Vérifier les procédures qui échouent

#### Route Statique
- Vérifier que les fichiers existent dans `dist/public`
- Vérifier les permissions de lecture
- Vérifier la configuration de `serveStatic`

#### Route d'Upload
- Vérifier les permissions d'écriture
- Vérifier la configuration de `multer`
- Vérifier la taille maximale des fichiers

### 4. Activer le Mode Debug Temporaire

Pour voir le message d'erreur réel même en production, modifier temporairement :

```typescript
// Dans server/_core/index.ts, ligne ~770
message: process.env.NODE_ENV === 'production' 
  ? errorMessage  // Afficher le message réel temporairement
  : errorMessage,
```

**⚠️ Attention:** Ne pas commiter cette modification, c'est juste pour le debug.

### 5. Vérifier les Variables d'Environnement

Vérifier que toutes les variables d'environnement requises sont configurées :

```bash
# Variables critiques
DATABASE_URL=...
NODE_ENV=production
PORT=8080

# Variables optionnelles mais importantes
SENTRY_DSN=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### 6. Vérifier le Build

Vérifier que le build est correct :

```bash
# Localement
pnpm run build

# Vérifier les erreurs de compilation
pnpm run check  # TypeScript check
```

### 7. Tester Localement

Reproduire l'erreur en local :

```bash
# Copier les variables d'environnement de Railway
# Tester avec les mêmes données
```

## Logs Améliorés

Les logs incluent maintenant :

- **Message d'erreur complet**
- **Nom de l'erreur** (Error, TypeError, etc.)
- **Code d'erreur** (ECONNREFUSED, ENOENT, etc.)
- **Stack trace complète**
- **URL de la requête**
- **Méthode HTTP**
- **Body de la requête** (premiers 500 caractères)
- **Query parameters**
- **Route parameters**
- **Headers** (user-agent, content-type)

## Prochaines Étapes

1. **Vérifier les logs Railway** avec les nouveaux détails
2. **Identifier le type d'erreur** (DB, module, validation, etc.)
3. **Appliquer la solution** correspondante
4. **Tester** que l'erreur est résolue

## Exemple de Log Attendu

```
[ERROR HANDLER] TypeError: Cannot read property 'x' of undefined
{
  error: "Cannot read property 'x' of undefined",
  name: "TypeError",
  code: null,
  stack: "TypeError: Cannot read property 'x' of undefined\n    at ...",
  url: "/api/trpc/someProcedure",
  method: "POST",
  path: "/api/trpc/someProcedure",
  body: "{...}",
  ...
}
```

Avec ces informations, vous pouvez identifier exactement où et pourquoi l'erreur se produit.

---

*Dernière mise à jour: Décembre 2024*

