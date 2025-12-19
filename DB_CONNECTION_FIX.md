# Correction : Gestion d'Erreur Base de Données

**Date:** Décembre 2024

## Problème Identifié

Le serveur en production sur Railway générait des erreurs critiques :

1. **ECONNREFUSED** - La base de données PostgreSQL n'était pas accessible
2. **Rate Limiting Railway** - 241 messages de logs dropés à cause de logs excessifs
3. **Erreurs répétées** - Chaque opération DB échouait et générait des logs complets avec tout le HTML des loaders

## Corrections Apportées

### 1. Vérification de Connexion DB Avant Initialisation

**Fichier:** `server/_core/index.ts`

- Ajout d'une fonction `checkDatabaseConnection()` qui vérifie la connexion DB avant toute initialisation
- Si la DB n'est pas disponible, le serveur démarre en **mode dégradé** (fichiers statiques uniquement)
- Réduction drastique des logs d'erreur

**Code ajouté:**
```typescript
async function checkDatabaseConnection(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    return false;
  }
  
  try {
    const { getDb } = await import("../db");
    const db = await getDb();
    if (!db) {
      return false;
    }
    
    // Try a simple query to verify connection
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    // Don't log full error details to avoid rate limiting
    const errorCode = error instanceof Error && 'code' in error ? (error as any).code : 'UNKNOWN';
    if (errorCode === 'ECONNREFUSED') {
      logger.warn("Database connection refused. Check DATABASE_URL and ensure database is running.");
    }
    return false;
  }
}
```

### 2. Réduction des Logs d'Erreur

**Fichiers modifiés:**
- `server/_core/index.ts`
- `server/init-db.ts`
- `server/seed-creative-loaders.ts`
- `server/loaders.ts`

**Changements:**
- Ne plus logger le contenu complet des erreurs (surtout le HTML des loaders)
- Logger uniquement le message d'erreur concis
- Détecter `ECONNREFUSED` et logger un message spécifique

**Avant:**
```typescript
console.error("❌ Erreur lors de la création des loaders créatifs:", error);
// Logs tout le HTML du loader (des milliers de lignes)
```

**Après:**
```typescript
const errorMsg = error instanceof Error ? error.message : "Unknown error";
const errorCode = error instanceof Error && 'code' in error ? (error as any).code : null;

if (errorCode === 'ECONNREFUSED') {
  console.error("❌ Erreur lors de la création des loaders créatifs: Database connection refused");
} else {
  console.error(`❌ Erreur lors de la création des loaders créatifs: ${errorMsg}`);
}
```

### 3. Mode Dégradé

Le serveur peut maintenant démarrer même si la DB n'est pas disponible :

- ✅ Fichiers statiques servis normalement
- ✅ Routes API qui ne nécessitent pas la DB fonctionnent
- ⚠️ Routes API qui nécessitent la DB retournent des erreurs appropriées
- ⚠️ Initialisation DB et seeding sont ignorés si la DB n'est pas disponible

## Actions Requises

### 1. Vérifier la Variable d'Environnement DATABASE_URL

**Sur Railway:**
1. Aller dans les paramètres du projet
2. Vérifier que `DATABASE_URL` est bien configuré
3. Vérifier que la valeur est correcte (format: `postgresql://user:password@host:port/database`)

### 2. Vérifier que la Base de Données est Accessible

**Sur Railway:**
1. Vérifier que le service PostgreSQL est démarré
2. Vérifier que le service PostgreSQL est dans le même réseau que l'application
3. Vérifier les logs du service PostgreSQL pour des erreurs

### 3. Tester la Connexion

**Option 1: Via Railway CLI**
```bash
railway connect postgres
```

**Option 2: Via psql**
```bash
psql $DATABASE_URL
```

**Option 3: Via l'endpoint d'initialisation**
```bash
curl -X POST https://your-app.railway.app/api/init-db
```

## Résultat Attendu

### Si la DB est Disponible:
```
[inf] Server running on http://localhost:8080/
[inf] [Server] Initializing database tables...
[inf] [Server] ✅ Database tables initialized successfully
[inf] ✅ Loaders créés avec succès
```

### Si la DB n'est PAS Disponible:
```
[inf] Server running on http://localhost:8080/
[warn] ⚠️ Database not available. Server running in degraded mode (static files only).
[warn] ⚠️ Database features will be unavailable until connection is restored.
```

**Pas de logs d'erreur excessifs, pas de rate limiting Railway.**

## Monitoring

### Vérifier les Logs Railway

1. Aller dans les logs du projet Railway
2. Rechercher `ECONNREFUSED` pour identifier les problèmes de connexion
3. Vérifier que les logs ne sont plus excessifs

### Vérifier le Statut de la DB

1. Vérifier les métriques du service PostgreSQL sur Railway
2. Vérifier la consommation de ressources
3. Vérifier les connexions actives

## Notes Techniques

### Pourquoi ECONNREFUSED?

`ECONNREFUSED` signifie que :
- La base de données n'est pas démarrée
- La base de données n'est pas accessible depuis le conteneur
- La variable `DATABASE_URL` est incorrecte
- Le firewall bloque la connexion

### Mode Dégradé

Le mode dégradé permet au serveur de continuer à fonctionner pour :
- Servir les fichiers statiques (HTML, CSS, JS)
- Servir les routes qui ne nécessitent pas la DB
- Afficher des messages d'erreur appropriés pour les routes qui nécessitent la DB

### Rate Limiting Railway

Railway limite les logs à **500 logs/seconde**. Avec les erreurs DB précédentes, chaque erreur générait des milliers de lignes (HTML des loaders), causant le rate limiting.

Les corrections réduisent drastiquement le volume de logs, évitant le rate limiting.

---

*Dernière mise à jour: Décembre 2024*

