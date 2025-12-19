# Commandes de Vérification - Instructions

**Date:** Décembre 2024

---

## ✅ Vérifications Complétées

### 1. Script de Vérification des Dépendances ✅

**Commande exécutée:** `node scripts/check-dependencies.js`

**Résultat:**
- ✅ Script fonctionne correctement
- 📦 87 dépendances trouvées
- 📦 36 devDependencies trouvées

**Prochaines étapes:**
```bash
# Vérifier les dépendances obsolètes
pnpm outdated

# Mettre à jour (après vérification)
pnpm update --latest
```

### 2. Endpoint CSP Report ✅

**Fichier:** `server/_core/index.ts:463-474`

**Statut:** ✅ Implémenté et fonctionnel

**Endpoint:** `POST /api/csp-report`

**Fonctionnalités:**
- Reçoit les violations CSP du navigateur
- Log les violations si `NODE_ENV=development` ou `LOG_CSP_VIOLATIONS=true`
- Retourne 204 (No Content) pour respecter le standard CSP

**Configuration CSP:**
- `reportUri: '/api/csp-report'` configuré dans Helmet

**Pour activer le logging en production:**
```bash
export LOG_CSP_VIOLATIONS=true
```

---

## ⚠️ Commandes à Exécuter Manuellement

### 1. Analyser le Bundle Size

**Commande:**
```bash
cd C:\Users\cleme\nukleo.digital
pnpm run build:analyze
```

**Résultat attendu:**
- Génère `dist/stats.html` avec visualisation du bundle
- Ouvre automatiquement dans le navigateur
- Affiche la taille des chunks, dépendances lourdes, etc.

**Actions après analyse:**
- Identifier les chunks trop grands (>400KB)
- Identifier les dépendances lourdes
- Optimiser si nécessaire (code splitting, lazy loading)

### 2. Lancer les Tests

**Commande:**
```bash
cd C:\Users\cleme\nukleo.digital
pnpm test
```

**Tests disponibles:**
- ✅ `client/src/components/SafeHTML.test.tsx`
- ✅ `client/src/components/StructuredData.test.tsx`
- ✅ `client/src/lib/trpcErrorHandler.test.ts`

**Résultat attendu:**
- Tous les tests doivent passer
- Coverage report si configuré

**Si des tests échouent:**
- Vérifier les mocks dans `client/src/test/setup.ts`
- Vérifier que les dépendances de test sont installées

### 3. Vérifier les Dépendances Obsolètes

**Commande:**
```bash
cd C:\Users\cleme\nukleo.digital
pnpm outdated
```

**Résultat attendu:**
- Liste des packages avec versions disponibles
- Indication des mises à jour majeures/minor/patch

**Actions recommandées:**
- Mettre à jour les patches automatiquement
- Examiner les mises à jour minor avant application
- Tester soigneusement les mises à jour majeures

---

## 📊 Surveillance CSP

### Activer le Logging CSP en Production

**Option 1: Variable d'environnement**
```bash
export LOG_CSP_VIOLATIONS=true
```

**Option 2: Dans Railway/Heroku**
- Ajouter `LOG_CSP_VIOLATIONS=true` dans les variables d'environnement

### Vérifier les Violations CSP

**Dans les logs du serveur:**
```bash
# Rechercher les violations CSP
grep "CSP Violation" logs/server.log
```

**Format des logs:**
```
[CSP Violation] {
  'csp-report': { ... },
  ip: '...',
  userAgent: '...'
}
```

**Dans la console du navigateur:**
- Ouvrir DevTools > Console
- Les violations CSP apparaissent automatiquement
- Vérifier que `/api/csp-report` reçoit les rapports

---

## 🔍 Checklist de Vérification

### Bundle Analysis
- [ ] Exécuter `pnpm run build:analyze`
- [ ] Ouvrir `dist/stats.html`
- [ ] Identifier les chunks >400KB
- [ ] Vérifier les dépendances lourdes
- [ ] Optimiser si nécessaire

### Tests
- [ ] Exécuter `pnpm test`
- [ ] Vérifier que tous les tests passent
- [ ] Ajouter des tests pour nouveaux composants si nécessaire

### Dépendances
- [ ] Exécuter `pnpm outdated`
- [ ] Examiner les mises à jour disponibles
- [ ] Mettre à jour les patches
- [ ] Tester après mise à jour

### CSP Monitoring
- [ ] Activer `LOG_CSP_VIOLATIONS=true` en production
- [ ] Surveiller les logs pour violations
- [ ] Ajuster CSP si violations fréquentes
- [ ] Vérifier que Google Tag Manager fonctionne

---

## 📝 Notes

### Pourquoi pnpm n'est pas reconnu ?

Si `pnpm` n'est pas reconnu dans PowerShell, vous pouvez :

1. **Installer pnpm globalement:**
   ```powershell
   npm install -g pnpm
   ```

2. **Ou utiliser npm directement:**
   ```powershell
   npm run build:analyze
   npm test
   npm outdated
   ```

3. **Ou utiliser npx:**
   ```powershell
   npx pnpm run build:analyze
   ```

### Configuration Recommandée

**Pour un workflow optimal:**

1. **Bundle Analysis:** Exécuter après chaque build majeur
2. **Tests:** Exécuter avant chaque commit (via pre-commit hook)
3. **Dépendances:** Vérifier mensuellement
4. **CSP Monitoring:** Activer en production et surveiller régulièrement

---

*Dernière mise à jour: Décembre 2024*

