# Améliorations de Sécurité - Page Admin

## Problèmes Identifiés et Corrigés

### ✅ 1. Routes Admin Non Protégées (CRITIQUE)
**Problème**: Toutes les routes admin utilisaient `publicProcedure` au lieu de `adminProcedure`, permettant à n'importe qui d'accéder aux données sensibles.

**Solution**: 
- Modifié le contexte tRPC (`server/_core/context.ts`) pour vérifier le cookie admin JWT et créer un objet `User` avec `role: 'admin'`
- Remplacé `publicProcedure` par `adminProcedure` dans :
  - `server/routers/admin.ts` (toutes les routes)
  - `server/routers/analytics.ts` (sauf `getActive` qui reste publique pour charger les scripts)
  - `server/routers/pageVisibility.ts` (sauf `getByPath` qui reste publique pour le routing frontend)

### ✅ 2. Contexte tRPC Ne Vérifiait Pas l'Authentification Admin
**Problème**: Le contexte tRPC vérifiait uniquement l'authentification OAuth normale, pas le cookie admin JWT.

**Solution**: 
- Ajouté la vérification du cookie `admin_session` dans `createContext()`
- Si le cookie est valide, création d'un objet `User` avec `role: 'admin'`
- Le `adminProcedure` peut maintenant correctement vérifier `ctx.user.role === 'admin'`

### ✅ 3. Logs de Debug Exposant des Informations Sensibles
**Problème**: Des `console.log` exposaient des cookies et tokens dans les logs.

**Solution**: 
- Retiré tous les logs de debug sensibles dans `server/routers/adminAuth.ts`
- Les logs de production restent pour les erreurs uniquement

### ✅ 4. Route `createFirstAdmin` Publique (CRITIQUE)
**Problème**: La route permettant de créer un admin était publique, permettant à n'importe qui de créer un compte admin.

**Solution**: 
- Ajouté une protection via variable d'environnement `ENABLE_CREATE_FIRST_ADMIN`
- Ajouté une protection supplémentaire optionnelle via `CREATE_ADMIN_SECRET`
- La route est maintenant désactivée par défaut

### ✅ 5. Rate Limiting
**Statut**: Déjà en place
- Rate limiting général sur toutes les routes tRPC : 100 req/15min
- Rate limiting spécifique pour l'authentification : 20 req/15min
- Les routes admin bénéficient du rate limiting général

## Sécurité des Cookies

Les cookies admin sont correctement sécurisés :
- ✅ `httpOnly: true` - Empêche l'accès JavaScript
- ✅ `secure: true` en production - HTTPS uniquement
- ✅ `sameSite: "lax"` - Protection CSRF
- ✅ Expiration : 7 jours
- ✅ Secret JWT séparé : `ENV.cookieSecret + "-admin"`

## Routes Publiques Restantes (Intentionnelles)

Certaines routes restent publiques pour des raisons fonctionnelles :

1. **`analytics.getActive`** : Nécessaire pour charger les scripts analytics sur le site public
   - ✅ Sécurisé : Ne retourne que les configs activées, pas de données sensibles

2. **`pageVisibility.getByPath`** : Nécessaire pour le routing frontend
   - ✅ Sécurisé : Ne retourne que l'état de visibilité d'une page

3. **`adminAuth.login`**, **`adminAuth.logout`**, **`adminAuth.checkAuth`** : Nécessaires pour l'authentification
   - ✅ Sécurisé : Rate limiting en place, validation des credentials côté serveur

## Recommandations Supplémentaires

### Variables d'Environnement Requises

```env
# Obligatoire pour la sécurité
JWT_SECRET=<secret-fort-et-unique>
ENABLE_CREATE_FIRST_ADMIN=false  # Garder à false après création du premier admin

# Optionnel (protection supplémentaire)
CREATE_ADMIN_SECRET=<secret-optionnel-pour-createFirstAdmin>
```

### Bonnes Pratiques

1. **Après création du premier admin** :
   - Définir `ENABLE_CREATE_FIRST_ADMIN=false`
   - Ou supprimer complètement la route `createFirstAdmin`

2. **Rotation des secrets** :
   - Changer `JWT_SECRET` périodiquement (nécessitera une nouvelle connexion pour tous les admins)

3. **Monitoring** :
   - Surveiller les tentatives d'accès aux routes admin
   - Logger les échecs d'authentification

4. **Audit** :
   - Considérer l'ajout d'un système d'audit pour tracer les actions admin

## Tests de Sécurité Recommandés

1. ✅ Tester qu'un utilisateur non authentifié ne peut pas accéder aux routes admin
2. ✅ Tester qu'un utilisateur authentifié sans rôle admin ne peut pas accéder aux routes admin
3. ✅ Tester que les cookies admin sont bien sécurisés (httpOnly, secure, sameSite)
4. ✅ Tester le rate limiting sur les routes admin
5. ✅ Tester que `createFirstAdmin` est bien désactivée par défaut

## Résumé

Toutes les vulnérabilités critiques identifiées ont été corrigées :
- ✅ Routes admin maintenant protégées par `adminProcedure`
- ✅ Contexte tRPC vérifie correctement l'authentification admin
- ✅ Logs sensibles retirés
- ✅ Route `createFirstAdmin` sécurisée
- ✅ Rate limiting en place
- ✅ Cookies sécurisés

La page admin est maintenant sécurisée et prête pour la production.
