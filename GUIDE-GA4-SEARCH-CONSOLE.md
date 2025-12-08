# Guide de Configuration Google Analytics 4 et Search Console

## Google Analytics 4 (GA4)

### Étape 1 : Créer une propriété GA4

1. Accédez à [Google Analytics](https://analytics.google.com/)
2. Cliquez sur "Admin" (icône d'engrenage en bas à gauche)
3. Dans la colonne "Compte", sélectionnez votre compte ou créez-en un nouveau
4. Dans la colonne "Propriété", cliquez sur "Créer une propriété"
5. Entrez les informations :
   - **Nom de la propriété** : Nukleo Digital
   - **Fuseau horaire** : (GMT-05:00) Eastern Time (US & Canada)
   - **Devise** : Dollar canadien (CAD)
6. Cliquez sur "Suivant"
7. Remplissez les détails de l'entreprise :
   - **Secteur d'activité** : Informatique et technologie
   - **Taille de l'entreprise** : Petite (1-10 employés)
8. Sélectionnez les objectifs commerciaux (cochez toutes les cases pertinentes)
9. Cliquez sur "Créer"

### Étape 2 : Configurer le flux de données Web

1. Sélectionnez "Web" comme plateforme
2. Entrez les informations :
   - **URL du site Web** : https://nukleo.digital
   - **Nom du flux** : Nukleo Digital - Production
3. Cliquez sur "Créer un flux"
4. **Copiez l'ID de mesure** (format : G-XXXXXXXXXX) - vous en aurez besoin pour l'intégration

### Étape 3 : Activer les mesures améliorées

1. Dans les paramètres du flux de données, cliquez sur "Mesure améliorée"
2. Activez toutes les options :
   - ✅ Consultations de pages
   - ✅ Défilements
   - ✅ Clics sortants
   - ✅ Recherche sur le site
   - ✅ Engagement vidéo
   - ✅ Téléchargements de fichiers
3. Cliquez sur "Enregistrer"

### Étape 4 : Configurer les conversions (Objectifs)

1. Dans le menu de gauche, allez dans "Événements"
2. Cliquez sur "Créer un événement"
3. Créez les événements de conversion suivants :

#### Conversion 1 : Soumission de formulaire de contact
- **Nom de l'événement** : `form_submit_contact`
- **Paramètres** :
  - `event_category` = "engagement"
  - `event_label` = "contact_form"

#### Conversion 2 : Téléchargement de ressource
- **Nom de l'événement** : `download_resource`
- **Paramètres** :
  - `event_category` = "engagement"
  - `event_label` = "resource_download"

#### Conversion 3 : Clic sur CTA principal
- **Nom de l'événement** : `cta_click`
- **Paramètres** :
  - `event_category` = "engagement"
  - `event_label` = "start_project"

4. Marquez chaque événement comme "Conversion" en activant le bouton

### Étape 5 : Intégrer GA4 au site (DÉJÀ FAIT)

**Note** : Le site utilise déjà Umami Analytics via les variables d'environnement `VITE_ANALYTICS_ENDPOINT` et `VITE_ANALYTICS_WEBSITE_ID`. Pour ajouter GA4 en parallèle :

1. Ouvrez `client/index.html`
2. Ajoutez le script GA4 juste avant la balise `</head>` :

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': true,
    'anonymize_ip': true
  });
</script>
```

3. Remplacez `G-XXXXXXXXXX` par votre véritable ID de mesure

### Étape 6 : Créer des rapports personnalisés

1. Allez dans "Rapports" > "Bibliothèque"
2. Créez les rapports suivants :

#### Rapport 1 : Trafic organique par page
- **Dimensions** : Page de destination, Source/Support
- **Métriques** : Utilisateurs, Sessions, Taux de rebond, Durée moyenne de session
- **Filtre** : Source = "google" ET Support = "organic"

#### Rapport 2 : Conversions par canal
- **Dimensions** : Canal par défaut
- **Métriques** : Conversions, Taux de conversion, Valeur de conversion
- **Segment** : Tous les utilisateurs

#### Rapport 3 : Performance des mots-clés (via Search Console)
- Nécessite l'intégration avec Google Search Console (voir section suivante)

---

## Google Search Console

### Étape 1 : Ajouter et vérifier la propriété

1. Accédez à [Google Search Console](https://search.google.com/search-console)
2. Cliquez sur "Ajouter une propriété"
3. Choisissez le type de propriété :
   - **Domaine** : nukleo.digital (recommandé - couvre http, https, www, sous-domaines)
   - **Préfixe d'URL** : https://nukleo.digital (plus simple mais limité)

#### Option A : Vérification par domaine (DNS)
1. Copiez l'enregistrement TXT fourni
2. Connectez-vous à votre fournisseur DNS (ex: Cloudflare, GoDaddy)
3. Ajoutez un enregistrement TXT avec la valeur fournie
4. Attendez quelques minutes (propagation DNS)
5. Retournez dans Search Console et cliquez sur "Vérifier"

#### Option B : Vérification par balise HTML (plus simple)
1. Copiez la balise meta fournie (format : `<meta name="google-site-verification" content="XXXXXXXXXX" />`)
2. Ouvrez `client/index.html`
3. Ajoutez la balise dans la section `<head>` :

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
  <meta name="google-site-verification" content="XXXXXXXXXX" />
  <title>Nukleo Digital</title>
  ...
</head>
```

4. Déployez le site
5. Retournez dans Search Console et cliquez sur "Vérifier"

### Étape 2 : Soumettre le sitemap

1. Une fois la propriété vérifiée, allez dans "Sitemaps" (menu de gauche)
2. Dans le champ "Ajouter un sitemap", entrez : `sitemap.xml`
3. Cliquez sur "Envoyer"
4. Vérifiez que le statut passe à "Réussite" après quelques minutes

**Note** : Le sitemap a déjà été créé et se trouve à `/client/public/sitemap.xml` avec 20 URLs.

### Étape 3 : Configurer les paramètres

1. **Ciblage international** :
   - Allez dans "Paramètres" > "Ciblage international"
   - Sélectionnez "Canada" comme pays cible
   - Langue : Anglais (en) et Français (fr)

2. **Vitesse du site** :
   - Allez dans "Expérience" > "Signaux Web essentiels"
   - Surveillez les Core Web Vitals (LCP, FID, CLS)
   - Objectif : 90%+ des URLs dans la zone "Bon"

3. **Couverture** :
   - Allez dans "Couverture"
   - Vérifiez qu'il n'y a pas d'erreurs d'indexation
   - Toutes les 20 pages du sitemap devraient être indexées sous 1-2 semaines

### Étape 4 : Lier Search Console à GA4

1. Dans Google Analytics 4, allez dans "Admin"
2. Dans la colonne "Propriété", cliquez sur "Liens Search Console"
3. Cliquez sur "Associer"
4. Sélectionnez la propriété Search Console correspondante
5. Cliquez sur "Confirmer"

**Avantages** : Vous pourrez voir les données de requêtes de recherche directement dans GA4.

### Étape 5 : Surveiller les métriques clés

#### Métriques à suivre hebdomadairement :
- **Impressions** : Nombre de fois où le site apparaît dans les résultats
- **Clics** : Nombre de clics depuis les résultats de recherche
- **CTR moyen** : Taux de clic (objectif : 3-5% pour positions 5-10)
- **Position moyenne** : Classement moyen dans les résultats (objectif : top 10 pour 50+ mots-clés)

#### Métriques à suivre mensuellement :
- **Pages indexées** : Nombre de pages dans l'index Google (objectif : 20/20)
- **Erreurs de couverture** : Pages avec erreurs 404, redirections, etc. (objectif : 0)
- **Core Web Vitals** : LCP, FID, CLS (objectif : 90%+ "Bon")
- **Backlinks** : Nombre de liens entrants (objectif : +20-25 sur 6 mois)

---

## Checklist de Vérification

### Immédiatement après configuration :

- [ ] GA4 tracking code ajouté à `client/index.html`
- [ ] Événements de conversion configurés dans GA4
- [ ] Propriété Search Console vérifiée (DNS ou balise HTML)
- [ ] Sitemap soumis à Search Console (`sitemap.xml`)
- [ ] Search Console lié à GA4
- [ ] Rapports personnalisés créés dans GA4

### Dans les 7 jours :

- [ ] Vérifier que GA4 collecte des données (Rapports > Temps réel)
- [ ] Vérifier que le sitemap est traité sans erreurs
- [ ] Vérifier les premières pages indexées (Couverture)
- [ ] Configurer les alertes pour erreurs critiques

### Dans les 30 jours :

- [ ] Analyser les 10 premières requêtes de recherche
- [ ] Identifier les pages avec le meilleur CTR
- [ ] Corriger les erreurs de couverture éventuelles
- [ ] Vérifier les Core Web Vitals et optimiser si nécessaire

---

## Ressources Supplémentaires

- [Documentation officielle GA4](https://support.google.com/analytics/answer/10089681)
- [Guide Search Console](https://support.google.com/webmasters/answer/9128668)
- [Core Web Vitals](https://web.dev/vitals/)
- [Structured Data Testing Tool](https://search.google.com/test/rich-results)

---

**Préparé pour Nukleo Digital**  
**Date : 8 décembre 2024**
