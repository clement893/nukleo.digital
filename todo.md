# Nukleo Digital - Liste des fonctionnalités

## Site d'agence
- [x] Page d'accueil avec présentation de l'agence
- [x] Section services offerts
- [ ] Section portfolio/projets
- [x] Section à propos de l'équipe
- [ ] Section contact avec formulaire
- [x] Design moderne et responsive

## Espace client connecté
- [ ] Authentification utilisateur (login/logout)
- [ ] Dashboard client personnalisé
- [ ] Profil utilisateur éditable
- [ ] Vue des projets du client
- [ ] Système de notifications

## Application
- [ ] Gestion de projets pour les clients
- [ ] Suivi de l'avancement des projets
- [ ] Espace de communication client-agence
- [ ] Upload de fichiers/documents
- [ ] Historique des interactions

## Infrastructure
- [x] Configuration Git et GitHub
- [ ] Déploiement sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Pipeline CI/CD opérationnel

## Corrections techniques
- [x] Corriger la configuration vercel.json pour le déploiement

## Problèmes à corriger
- [x] Corriger le build Vercel qui affiche le code source au lieu du site

## Améliorations design
- [x] Ajouter le logo Nukleo officiel
- [x] Recréer le menu de navigation comme sur nukleo.digital

## Menu plein écran
- [x] Créer un menu overlay plein écran avec animations fluides

## Effets visuels
- [x] Ajouter un effet de flou backdrop sur le contenu derrière le menu

## Simplification header
- [x] Mettre le menu burger visible en tout temps (desktop et mobile)
- [x] Retirer le badge "SYSTEM ONLINE" du Hero

## Design header
- [x] Retirer la bordure noire en bas du header

## Effet glassmorphisme
- [x] Ajouter un effet glass au header lors du scroll (bordure + fond opaque)

## Correction header
- [x] Rendre le header transparent au départ (sans fond noir)
- [x] Ajouter des coins arrondis au header au scroll

## Logo
- [x] Changer le logo en blanc pour meilleure visibilité

## Animations
- [x] Retirer les animations de mouvement sur les cartes

## Création des pages
- [x] Créer la page Projects avec galerie de projets
- [x] Créer la page About avec présentation de l'équipe
- [x] Créer la page Expertise avec domaines d'expertise
- [x] Créer la page Resources avec ressources et articles
- [x] Créer la page FAQ avec questions fréquentes
- [x] Créer la page Contact avec formulaire de contact

## Texture de grain
- [x] Ajouter l'overlay de grain fractal à 15% d'opacité sur tout le site

## Navigation
- [x] Corriger les liens du menu pour connecter toutes les pages

## Header sur toutes les pages
- [x] Ajouter le Header sur toutes les sous-pages (Projects, About, Expertise, Resources, FAQ, Contact)

## Équipe
- [x] Ajouter les photos et informations de l'équipe sur la page About

## Chatbot Léo
- [x] Analyser le brief de Léo
- [x] Créer la page Léo avec interface de chat intégrée harmonieusement
- [x] Ajouter Léo au menu de navigation
- [x] Connecter Léo à l'API LLM pour des réponses intelligentes
- [x] Implémenter l'historique de conversation
- [x] Tester le chatbot avec des questions réelles

## Correction routing Vercel
- [x] Corriger le problème 404 sur /leo en production
- [x] Vérifier la configuration vercel.json pour le routing SPA
- [ ] Tester toutes les routes en production

## Page Manifesto
- [x] Créer la page Manifesto avec contenu inspirant
- [x] Ajouter la route /manifesto dans App.tsx
- [x] Mettre à jour le lien dans le menu

## Amélioration intégration Léo
- [x] Analyser le style de la page contact nukleo.digital
- [x] Refondre la page Léo avec meilleure intégration visuelle
- [x] Tester la nouvelle version

## Intégration police Aktiv Grotesk
- [x] Copier les fichiers de police dans le projet
- [x] Configurer les @font-face dans le CSS
- [x] Mettre à jour la configuration Tailwind
- [x] Tester sur toutes les pages

## Intégration base de connaissances IA pour Léo
- [x] Lire et analyser la base de connaissances
- [x] Intégrer dans le prompt système de Léo
- [x] Tester avec des questions techniques

## Effet curseur personnalisé (Custom Cursor)
- [x] Créer le composant CustomCursor.tsx
- [x] Ajouter les styles CSS pour le halo lumineux
- [x] Intégrer dans App.tsx
- [x] Tester l'effet sur desktop

## Correction curseur et effets menu/header
- [x] Corriger l'effet de curseur qui n'apparaît pas
- [x] Augmenter l'opacité du halo à 5-6%
- [x] Implémenter le header avec glassmorphisme et transition scroll
- [x] Ajouter les blobs animés dans le menu fullscreen
- [x] Implémenter les animations échelonnées des items de menu
- [x] Tester tous les effets

## Modification système typographique
- [x] Ajouter les fichiers WOFF2 manquants (Light, Regular, Medium, Bold)
- [x] Mettre à jour les @font-face avec tous les poids et font-display: swap
- [x] Configurer JetBrains Mono via Google Fonts CDN
- [x] Mettre à jour les variables CSS (--font-sans, --font-heading, --font-mono)
- [x] Appliquer la hiérarchie typographique (300 Light, 400 Regular, 500 Medium, 700 Bold)
- [x] Tester sur toutes les pages

## Conversion polices en WOFF2
- [x] Installer fonttools pour conversion OTF → WOFF2
- [x] Convertir Light, Regular, Medium, Bold (+ italiques) en WOFF2
- [x] Mettre à jour les @font-face pour utiliser WOFF2 en priorité
- [x] Tester le chargement et vérifier les performances
