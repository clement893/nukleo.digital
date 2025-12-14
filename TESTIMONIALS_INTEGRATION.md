# Intégration des Témoignages depuis la Plateforme Interne

## Vue d'ensemble

Le système permet de synchroniser manuellement les témoignages depuis votre plateforme interne déployée sur Railway vers la base de données locale. La synchronisation se fait via un bouton dans l'espace admin, et le site utilise ensuite uniquement la base de données locale pour afficher les témoignages.

## Configuration

### Variables d'Environnement

Ajoutez ces variables d'environnement dans Railway :

```env
# URL de votre plateforme interne (ex: https://votre-plateforme.up.railway.app)
INTERNAL_PLATFORM_URL=https://votre-plateforme.up.railway.app

# Optionnel : Clé API pour l'authentification si votre API le requiert
INTERNAL_PLATFORM_API_KEY=votre-cle-api-secrete
```

### Format de l'API Externe

Votre plateforme interne doit exposer un endpoint qui retourne les témoignages au format suivant :

**Endpoint :** `GET /api/testimonials?language={fr|en}`

**Réponse attendue (format 1 - Tableau direct) :**
```json
[
  {
    "id": 1,
    "client": "Nom du Client",
    "contact": "Nom du Contact",
    "title": "Titre du Contact",
    "company": "Nom de l'Entreprise",
    "textEn": "English testimonial text",
    "textFr": "Texte du témoignage en français",
    "displayOrder": 0,
    "isActive": true
  }
]
```

**Réponse attendue (format 2 - Objet avec propriété testimonials) :**
```json
{
  "testimonials": [
    {
      "id": 1,
      "client": "Nom du Client",
      "contact": "Nom du Contact",
      "title": "Titre du Contact",
      "company": "Nom de l'Entreprise",
      "textEn": "English testimonial text",
      "textFr": "Texte du témoignage en français",
      "displayOrder": 0,
      "isActive": true
    }
  ]
}
```

**Format simplifié (si pas de séparation FR/EN) :**
```json
[
  {
    "id": 1,
    "client": "Nom du Client",
    "contact": "Nom du Contact",
    "title": "Titre du Contact",
    "company": "Nom de l'Entreprise",
    "text": "Texte du témoignage (sera utilisé pour FR et EN)",
    "displayOrder": 0,
    "isActive": true
  }
]
```

## Comportement

1. **Synchronisation Manuelle**
   - La synchronisation se fait uniquement via le bouton dans `/admin/testimonials`
   - Récupère les témoignages FR et EN depuis la plateforme interne
   - Met à jour la base de données locale (crée les nouveaux, met à jour les existants)
   - Timeout de 10 secondes pour la synchronisation
   - Si une clé API est configurée, elle est envoyée dans le header `Authorization: Bearer {API_KEY}`

2. **Affichage sur le Site**
   - Le site utilise **uniquement** la base de données locale pour afficher les témoignages
   - Aucun appel API externe lors du chargement des pages
   - Performance optimale car les données sont déjà en local

## Sécurité

- Les erreurs de timeout ou de réseau ne sont pas loggées pour éviter le bruit dans les logs
- La clé API est optionnelle mais recommandée si votre API interne nécessite une authentification
- Le système gère gracieusement les erreurs sans exposer d'informations sensibles

## Exemple d'Implémentation côté Plateforme Interne

Si vous utilisez Express/Node.js sur votre plateforme interne :

```javascript
// Exemple d'endpoint pour votre plateforme interne
app.get('/api/testimonials', async (req, res) => {
  const { language } = req.query; // 'fr' ou 'en'
  
  // Vérifier l'authentification si nécessaire
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  if (process.env.REQUIRE_API_KEY && apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Récupérer les témoignages depuis votre base de données
  const testimonials = await db.testimonials.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'desc' }
  });
  
  // Formater selon le format attendu
  res.json(testimonials.map(t => ({
    id: t.id,
    client: t.client,
    contact: t.contact,
    title: t.title,
    company: t.company,
    textEn: t.textEn,
    textFr: t.textFr,
    displayOrder: t.displayOrder,
    isActive: t.isActive
  })));
});
```

## Utilisation

### Synchroniser les Témoignages

1. Connectez-vous à l'espace admin (`/admin`)
2. Allez dans "Gestion des Contacts & Leads" > "Témoignages"
3. Cliquez sur le bouton "Synchroniser depuis la plateforme interne"
4. Attendez la confirmation de synchronisation
5. Les témoignages sont maintenant à jour dans la base de données locale

### Affichage sur le Site

Les témoignages synchronisés sont automatiquement affichés sur :
- La page `/testimonials`
- Le carrousel de témoignages sur la page d'accueil
- Toute autre page utilisant les témoignages

## Test

Pour tester l'intégration :

1. Configurez `INTERNAL_PLATFORM_URL` avec l'URL de votre plateforme
2. Vérifiez que l'endpoint `/api/testimonials?language=fr` retourne les données au bon format
3. Allez dans `/admin/testimonials` et cliquez sur "Synchroniser"
4. Vérifiez le message de confirmation
5. Visitez `/testimonials` sur le site principal pour voir les témoignages synchronisés
