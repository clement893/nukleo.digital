# Configuration des Alertes Sentry

## Alertes Recommandées

### 1. Erreurs Critiques
- **Condition**: Nouvelle erreur avec niveau "error" ou "fatal"
- **Action**: Envoyer une notification immédiate (email, Slack, etc.)
- **Fréquence**: Immédiatement

### 2. Taux d'Erreur Élevé
- **Condition**: Plus de 5% de taux d'erreur sur 5 minutes
- **Action**: Notification d'alerte
- **Fréquence**: Toutes les 5 minutes

### 3. Performance Dégradée
- **Condition**: Temps de réponse moyen > 3 secondes
- **Action**: Notification d'avertissement
- **Fréquence**: Toutes les 10 minutes

### 4. Erreurs Récurrentes
- **Condition**: Même erreur > 10 fois en 1 heure
- **Action**: Notification avec contexte
- **Fréquence**: Toutes les heures

### 5. Disponibilité
- **Condition**: Disponibilité < 99% sur 5 minutes
- **Action**: Notification critique
- **Fréquence**: Immédiatement

## Configuration dans Sentry Dashboard

1. Aller dans **Settings** > **Alerts**
2. Créer une nouvelle règle d'alerte
3. Configurer les conditions ci-dessus
4. Ajouter les canaux de notification (email, Slack, PagerDuty, etc.)

## Métriques de Stabilité

Les métriques suivantes sont automatiquement trackées :

- **Error Rate**: Taux d'erreur par environnement
- **Transaction Duration**: Durée des transactions critiques
- **Page Load Time**: Temps de chargement des pages
- **API Response Time**: Temps de réponse des API
- **User Sessions**: Nombre de sessions utilisateur

## Dashboard de Monitoring

Créer un dashboard dans Sentry avec :

1. **Vue d'ensemble**
   - Taux d'erreur global
   - Nombre d'erreurs par type
   - Temps de réponse moyen

2. **Performance**
   - Temps de chargement des pages
   - Temps de réponse des API
   - Transactions lentes

3. **Utilisateurs**
   - Sessions actives
   - Erreurs par utilisateur
   - Replays d'erreurs

4. **Releases**
   - Erreurs par release
   - Performance par release
   - Comparaison des releases

## Variables d'Environnement Requises

```env
# Client
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
VITE_SENTRY_RELEASE=1.0.0

# Serveur
SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ENVIRONMENT=production
SENTRY_RELEASE=1.0.0
```

## Intégration avec CI/CD

Ajouter dans votre pipeline CI/CD :

```yaml
# Exemple GitHub Actions
- name: Create Sentry release
  uses: getsentry/action-release@v1
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
    SENTRY_ORG: your-org
    SENTRY_PROJECT: nukleo-digital
  with:
    environment: production
    version: ${{ github.sha }}
```

