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

## Section Trinity (Page d'accueil)
- [x] Créer les styles CSS (gradients, animations breathe, mesh-float, depth-layer)
- [x] Implémenter la structure JSX avec grille 3 colonnes
- [x] Ajouter les 3 cartes services (AI Lab, Strategic Bureau, Creative Studio)
- [x] Implémenter les effets hover (bordures, icônes, translations)
- [x] Tester tous les effets et animations

## Page FAQ
- [x] Extraire les 19 questions/réponses de la documentation
- [x] Créer la structure de la page (Hero, Filtres, Accordéons, CTA)
- [x] Implémenter la logique de filtrage par catégorie
- [x] Implémenter les accordéons interactifs (collapse/expand)
- [x] Ajouter le SEO et structured data
- [x] Tester tous les filtres et interactions

## Système de Sons Interactifs (Web Audio API)
- [x] Créer le hook useSound avec playHover et playClick
- [x] Ajouter sons sur Header (bouton Start Project)
- [x] Ajouter sons sur Menu fullscreen (items navigation)
- [x] Ajouter sons sur Home (bouton Watch Reel, capability cards)
- [x] Ajouter sons sur Projects (filtres, project cards)
- [x] Ajouter sons sur Contact/Leo (avatar, quick replies, envoi message)
- [x] Ajouter sons sur FAQ (filtres, accordéons)
- [x] Tester tous les sons sur toutes les pages

## Animation Titre Hero "ARCHITECTS OF YOUR AI FUTURE"
- [x] Restructurer le titre en 3 spans avec classes hover-distort
- [x] Ajouter les animations d'entrée (fade-in + slide-in 1s)
- [x] Implémenter l'effet hover distortion (skew -10deg + translate 10px)
- [x] Ajouter le glow violet-rose sur "AI FUTURE"
- [x] Tester les animations sur desktop et mobile

## AI Trend Radar (Page Resources)
- [x] Lire et analyser le brief complet (19 pages)
- [x] Créer la structure de données JSON (8 technologies initiales)
- [x] Implémenter le composant RadarChart avec Recharts
- [x] Créer TechnologyBubble, TechnologyDetailPanel, QuadrantLegend
- [x] Ajouter les interactions (hover, click, filtres)
- [x] Intégrer dans la page Resources au-dessus des filtres d'articles
- [x] Tester toutes les interactions

## Déplacement AI Trend Radar vers page dédiée
- [x] Créer la page Radar.tsx avec TrendRadar
- [x] Ajouter la route /radar dans App.tsx
- [x] Remplacer le radar dans Resources par un CTA vers /radar
- [x] Tester la navigation et déployer

## Traduction complète du site en anglais
- [ ] Identifier toutes les pages avec contenu français
- [x] Traduire Leo.tsx (chatbot en anglais) - Déjà en anglais
- [x] Traduire FAQ.tsx (19 questions/réponses)
- [x] Traduire Manifesto.tsx
- [x] Traduire Radar.tsx et TrendRadar.tsx
- [x] Traduire Resources.tsx
- [x] Traduire FullScreenMenu.tsx (items de navigation)
- [x] Traduire les données JSON (radar-2024-12.json)
- [ ] Tester toutes les pages et vérifier la cohérence

## AI Readiness Assessment Tool
- [x] Phase 1: Quiz interactif avec 20 questions
  - [x] Créer la structure de données des questions (6 dimensions)
  - [x] Créer la page AIReadinessAssessment.tsx
  - [x] Créer le composant AssessmentIntro.tsx
  - [x] Créer le composant QuestionCard.tsx
  - [x] Créer le composant ProgressBar.tsx
  - [x] Implémenter la navigation entre questions
  - [x] Ajouter la route /ai-readiness dans App.tsx
- [x] Phase 2: Algorithme de scoring et radar chart
  - [x] Créer l'algorithme de scoring par dimension
  - [x] Calculer le score global et niveau de maturité
  - [x] Créer le composant ResultsRadar.tsx avec Recharts
  - [x] Créer le composant ResultsSummary.tsx
- [x] Phase 3: Capture email et base de données
  - [x] Créer le composant EmailCaptureModal.tsx
  - [x] Créer le schéma database ai_assessments
  - [x] Créer les endpoints tRPC pour sauvegarder
  - [x] Intégrer le modal dans AIReadinessAssessment.tsx
- [ ] Phase 4: Génération PDF
  - [ ] Installer jsPDF et html2canvas
  - [ ] Créer le générateur PDF avec 7 pages
  - [ ] Capturer le radar chart en image
  - [ ] Générer les recommandations personnalisées
- [ ] Phase 5: Automation SendGrid
  - [ ] Configurer SendGrid API
  - [ ] Créer les templates d'emails (3 emails)
  - [ ] Implémenter l'envoi automatique du rapport
  - [ ] Configurer les emails de follow-up (J+3, J+7)
- [ ] Phase 6: Tests et déploiement
  - [ ] Tester le flow complet
  - [ ] Vérifier la génération PDF
  - [ ] Tester l'envoi d'emails
  - [ ] Push to GitHub et déploiement Vercel

## SendGrid Email Integration
- [x] Installer @sendgrid/mail
- [x] Configurer les secrets SendGrid (API key, from email, from name)
- [x] Créer le helper sendEmail dans server/_core/sendgrid.ts
- [x] Créer le template HTML d'email avec scores et dimensions
- [x] Intégrer l'envoi d'email dans assessment.save
- [x] Tester l'envoi d'email avec vitest

## Navigation & UX Improvements
- [x] Ajouter AI Readiness Assessment dans la page Resources

## Site Review Fixes
- [x] Traduire la page About en anglais (titre et bureaux)
- [x] Créer le backend du formulaire Contact (tRPC + SendGrid)
- [x] Rendre la newsletter fonctionnelle (tRPC + SendGrid)
- [x] Retirer Leo AI du menu (404)
- [x] Ajouter AI Readiness Assessment dans le menu principal
- [x] Tester tous les formulaires

## Chatbot Fix
- [x] Investiguer l'erreur frontend avec console navigateur
- [x] Vérifier les logs réseau tRPC
- [x] Ajouter les variables d'environnement sur Vercel
- [x] Ajouter des logs détaillés pour le débogage
- [ ] Corriger le problème de connexion
- [ ] Tester le chatbot en production

## Menu Update
- [x] Remettre Leo AI dans le menu (remplacer AI Readiness)

## Vercel Timeout Fix
- [x] Créer vercel.json avec configuration timeout 60s
- [ ] Tester Leo après redéploiement

## AI Readiness Page Fix
- [x] Ajouter le header avec logo et menu sur la page AI Readiness
- [ ] Tester la navigation

## Translation Fix
- [x] Traduire la page Manifesto en anglais

## Leo AI English Prompt
- [x] Traduire le système prompt de Leo en anglais
- [x] Tester les réponses de Leo

## Radar Page Rebuild
- [x] Créer la structure de données des 10 technologies
- [x] Créer le hero section avec badge et légende maturité
- [x] Créer la section filtres sticky (catégorie + maturité)
- [x] Créer la visualisation radar interactive avec dots positionnés
- [x] Créer les cartes technologies avec métriques ROI
- [x] Implémenter la logique de filtrage dynamique
- [x] Ajouter les interactions (hover, click, scroll)
- [x] Ajouter la section CTA finale
- [x] Tester le responsive

## AI Readiness Assessment Fixes
- [x] Corriger la couleur du header (noir → transparent) sur la page AI Readiness
- [x] Implémenter l'auto-avancement à la question suivante au clic sur une réponse
- [x] Tester les corrections

## AI Readiness Assessment - Email Capture Fix
- [x] Augmenter le délai d'auto-avancement (300ms → 1500ms)
- [x] Déboguer le modal email capture qui n'apparaît pas
- [ ] Vérifier l'envoi d'email après soumission
- [ ] Tester le flow complet

## Trinity Department Pages
- [x] Créer la page AI Strategy & Marketing (/services/ai-strategy-marketing)
- [x] Créer la page Digital Platforms (/services/digital-platforms)
- [x] Créer la page Intelligent Operations (/services/intelligent-operations)
- [x] Ajouter les liens depuis la homepage (TrinitySection)
- [x] Ajouter les liens dans le menu FullScreenMenu
- [ ] Tester toutes les pages

## Remove Trinity from Menu
- [x] Retirer les 3 pages Trinity du menu FullScreenMenu
- [x] Garder seulement les liens depuis la homepage

## Footer Component Fixes
- [x] Réduire l'intensité du gradient rose en bas à droite
- [x] Retirer tout texte rose (remplacer par blanc/violet)
- [x] Tester l'apparence du footer

## Global Positioning Updates
- [x] Modifier le titre du Radar (SMB → Global AI Technology Radar)
- [x] Ajouter sous-titre global dans le hero
- [x] Créer section "Who We Serve" avec 4 segments (Startups, SMBs, Enterprises, Governments)
- [x] Tester tous les changements

## Hero Section Simplification
- [x] Retirer le texte superflu du hero (simplifier la description)
- [x] Améliorer le gradient sur "AI FUTURE" pour le rendre plus distinctif
- [x] Tester l'apparence du hero simplifié

## Resources Page Refonte
- [x] Analyser la page Resources actuelle
- [x] Créer le Hero Section avec titre massif "RESOURCES" et badge animé
- [x] Créer la section Interactive Tools avec 4 cartes glassmorphisme (AI Readiness, Radar, Glossary, ROI Calculator)
- [x] Créer la section Filter sur fond blanc avec boutons pilules
- [x] Créer la grille Resources avec articles sur fond blanc
- [x] Créer la section CTA Newsletter sur gradient
- [x] Tester toutes les sections et transitions

## AI Glossary Implementation
- [x] Créer la structure de données JSON pour les termes
- [x] Écrire les 24 termes prioritaires avec contenu complet (définitions, exemples, FAQ)
- [x] Créer la page principale /glossary avec hero, recherche, filtres
- [x] Implémenter la grille de cartes de termes
- [x] Créer le composant de page de détail /glossary/[term-slug]
- [x] Ajouter les sections : définition, exemples business, FAQ, ressources, termes connexes
- [x] Implémenter le système de bookmarks (localStorage)
- [x] Tester la recherche, les filtres, et la navigation

## Navigation Scroll Fix
- [x] Ajouter un composant ScrollToTop pour scroller vers le haut lors des changements de route
- [x] Tester la navigation entre pages

## SEO Optimization
- [x] Créer un composant SEO avec meta tags dynamiques (title, description, OG, Twitter)
- [x] Implémenter Schema.org JSON-LD pour Organization et WebSite
- [x] Ajouter structured data pour les pages de glossaire (Article, FAQPage, Breadcrumb)
- [x] Créer sitemap.xml dynamique (38 URLs)
- [x] Créer robots.txt optimisé
- [x] Ajouter canonical URLs
- [x] Tester le SEO (meta tags, structured data, sitemap)

## Site Audit & Bug Fixes
- [x] Auditer tous les liens de navigation (header, footer, pages)
- [x] Vérifier les erreurs console JavaScript
- [x] Identifier les bugs visuels et problèmes de responsive
- [x] Corriger les 12 liens vides de la homepage
- [x] Corriger l'email footer (nukleo.com → nukleo.digital)
- [x] Fixer les liens footer (ancres → URLs)
- [x] Ajouter SEO sur la page Resources
- [x] Créer les pages manquantes (privacy, terms, cookies)
- [x] Router toutes les pages dans App.tsx
- [ ] Connecter les 4 boutons CTA des outils interactifs (AI Readiness, Radar, Glossary, ROI Calculator)

## Hero Section Enhancement
- [x] Rendre le hero beaucoup plus impactant et dramatique
- [x] Ajouter des animations spectaculaires (texte, background, effets)
- [x] Augmenter la présence visuelle pour "crier fort"
- [x] Tester l'impact visuel final

## Accent Color Change
- [x] Remplacer la couleur d'accent rose par blanc pur dans index.css
- [x] Tester tous les éléments utilisant la couleur accent

## Homepage Fond Unifié & Orbe Rouge
- [x] Analyser nukleo.com pour identifier la teinte de rouge exacte (rgb(107,23,22))
- [x] Unifier les fonds Hero, Manifesto, Who We Serve sur même gradient violet
- [x] Remplacer l'orbe rose par un orbe rouge bordeaux
- [x] Tester le rendu final

## Remove Global Badge
- [x] Retirer le badge "Global AI Transformation Partner" du hero

## Extend Hero Background
- [x] Étendre le fond du hero aux sections Manifesto et Who We Serve
- [x] Créer une continuité visuelle forte sur les 3 premiers blocs
- [x] Tester le rendu final

## Extend Background to Capabilities
- [x] Étendre le fond unifié pour inclure la section Capabilities
- [x] Retirer le fond propre de Capabilities (déjà sans fond)
- [x] Tester le rendu final

## Gradient Sandwich
- [x] Créer un gradient qui évolue : rouge haut gauche → bleu milieu → rouge bas droite
- [x] Tester le rendu du gradient progressif

## Adjust Gradient Colors
- [x] Analyser nukleo.com/en pour extraire les couleurs exactes
- [x] Ajuster le gradient sandwich avec les couleurs de nukleo.com
- [ ] Tester le rendu final

## Separate Hero & Sections Gradients
- [x] Séparer le Hero avec son propre gradient rouge→violet bleué
- [x] Créer un gradient miroir violet bleué→rouge pour les sections suivantes
- [x] S'assurer que le violet tend vers le bleu (pas le rose)
- [ ] Tester les deux gradients

## Separate Hero & Sections Gradients
- [x] Séparer le Hero avec son propre gradient rouge→violet bleué
- [x] Créer un gradient miroir violet bleué→rouge pour les sections suivantes
- [x] S'assurer que le violet tend vers le bleu (pas le rose)
- [x] Tester les deux gradients

## Fix Capabilities Section Pink Colors
- [x] Analyser la section Capabilities et identifier les couleurs roses
- [x] Ajuster le gradient pour éliminer les tons roses et rester dans rouge bordeaux → violet bleué
- [ ] Tester le rendu final

## Restore Sandwich Gradient
- [x] Remettre le gradient sandwich unifié sur les 4 sections (Hero, Manifesto, Who We Serve, Capabilities)
- [x] Gradient : rouge bordeaux (haut-gauche) → violet bleué (milieu) → rouge bordeaux (bas-droite)
- [x] Tester le rendu final

## Reduce Blue Intensity in Gradient
- [x] Réduire l'intensité du bleu au centre du gradient sandwich
- [x] Rendre le bleu plus sombre et discret
- [x] Tester le rendu final

## Restore Hero Title Hover Animation
- [x] Restaurer l'animation hover-distort sur le titre Hero (skew à droite)
- [x] Tester l'animation au hover

## Apply Hover-Distort to Entire Title
- [x] Appliquer hover-distort sur tout le titre h1 en une seule fois
- [x] Retirer hover-distort des spans individuels
- [x] Tester l'animation

## Remove ROI Calculator
- [x] Identifier la section ROI Calculator
- [x] Supprimer le composant et ses imports
- [x] Tester le site

## Replace Pink Gradients Site-Wide
- [x] Identifier tous les gradients qui tirent vers le rose
- [x] Remplacer par rouge bordeaux → violet bleué (comme homepage)
- [x] Tester toutes les pages

## Fix Hero Stats Overlap
- [x] Corriger le chevauchement des statistiques sur le titre Hero
- [x] Ajuster le layout pour éviter l'empiètement
- [x] Tester le rendu

## Add "Choose Nukleo, Choose Intelligence" Slogan
- [x] Ajouter le slogan dans le Hero
- [x] Ajouter le slogan dans la navigation
- [x] Tester le rendu

## Create Loading Screen Animation
- [x] Créer le composant LoadingScreen avec logo et slogan
- [x] Intégrer l'animation dans App.tsx
- [x] Tester l'animation de chargement

## Remove Hero Stats Card
- [x] Supprimer la carte de droite avec description et statistiques
- [x] Ajuster le layout du Hero
- [x] Tester le rendu

## Rework Gradients with Grain Texture
- [x] Analyser les références de gradients fournis
- [x] Créer le nouveau système de gradients diagonaux
- [x] Appliquer les gradients sur toutes les sections
- [x] Ajouter la texture grain CSS
- [x] Tester le rendu sur toutes les pages

## Fix LoadingScreen to Show Only Once
- [x] Modifier LoadingScreen pour utiliser sessionStorage
- [x] L'animation ne doit s'afficher qu'une fois par session
- [x] Tester le comportement

## Remove Pink Colors from /expertise
- [x] Identifier toutes les couleurs roses dans Expertise.tsx
- [x] Remplacer par rouge bordeaux et violet bleué
- [x] Tester le rendu de la page

## Integrate Double Arrow Brand Asset
- [x] Copier l'asset flèche dans client/public
- [x] Intégrer dans la navigation avec hover background léger
- [x] Ajouter à la fin des boutons CTA (Start Project, Get in Touch)
- [x] Tester le rendu

## Update Who We Serve Section
- [x] Remplacer les catégories actuelles par Startups & Scale-ups, SMBs, Non-profits
- [x] Mettre l'accent sur "champion des petites organisations"
- [x] Ajouter le message "We help EVERYONE transform"
- [x] Tester le rendu

## Create Testimonials Page
- [x] Extraire les témoignages de nukleo.com/en
- [x] Créer la page Testimonials.tsx avec design professionnel
- [x] Ajouter la route /testimonials dans App.tsx
- [x] Ajouter le lien dans la navigation
- [x] Tester le rendu

## Increase Grain Texture Intensity
- [x] Augmenter l'opacité de la texture grain dans index.css
- [x] Tester le rendu

## Repositionner Testimonials
- [x] Retirer "Testimonials" du FullScreenMenu
- [x] Mettre à jour la page Testimonials avec les vrais témoignages du CSV (12 clients)
- [x] Créer le composant TestimonialsCarousel.tsx
- [x] Intégrer le carrousel en bas de Home.tsx (avant le footer)
- [x] Ajouter lien stratégique "See all testimonials" dans le carrousel
- [x] Ajouter liens stratégiques vers /testimonials dans d'autres sections
- [x] Tester le carrousel et la navigation

## Retirer les titres ALL CAPS
- [x] Identifier tous les badges et titres en majuscules
- [x] Remplacer par Title Case ou Sentence case
- [x] Tester le rendu sur toutes les pages

## Retirer ALL CAPS des grands titres H1/H2
- [x] Identifier tous les H1/H2 en majuscules
- [x] Remplacer par Title Case
- [x] Tester le rendu

## Corriger "THE TRINITY" en ALL CAPS
- [x] Localiser "THE TRINITY"
- [x] Remplacer par "The Trinity"

## Modifier le titre Hero "AI Future"
- [x] Mettre "AI Future" sur la même ligne (retirer le <br />)
- [x] Retirer les majuscules : "AI Future" au lieu de "AI FUTURE"
- [x] Appliquer le dégradé sur les deux mots "AI Future"

## Retirer la couleur rose dans "Ready to Scale" (page Manifesto)
- [x] Localiser la couleur rose dans la page Manifesto
- [x] Remplacer par une couleur cohérente avec le design
- [x] Corriger les ALL CAPS restants (MANIFESTO, MOVE FROM, PILOT TO, SCALE)

## Retirer l'animation de zoom sur "AI Future"
- [x] Retirer hover:scale-110 du titre Hero

## Créer une page Services complète
- [x] Créer la page Services.tsx avec tous les services
- [x] Ajouter un lien "View All Services" dans la page Expertise
- [x] Ajouter la route /services dans App.tsx

## Augmenter grain et retirer flèches
- [x] Augmenter l'opacité de la texture grain (0.35 → 0.45)
- [x] Retirer les flèches (ArrowRight, arrow-brand.png) de tous les boutons

## Optimiser les images du site
- [x] Identifier toutes les images utilisées dans le site (15 images)
- [x] Convertir les images PNG/JPG en format WebP (15 fichiers .webp créés)
- [x] Ajouter lazy-loading sur toutes les balises <img> (sauf LoadingScreen)
- [x] Ajouter attributs width/height pour éviter layout shift

## Créer section Featured Clients
- [x] Créer le composant ClientLogos.tsx
- [x] Intégrer la section sur la homepage après le Hero
- [x] Ajouter effet grayscale → couleur au survol (effet hover avec gradient)

## Optimisation SEO
- [ ] Analyser l'état actuel du SEO (meta tags, structure, contenu)
- [ ] Ajouter meta descriptions personnalisées pour chaque page
- [ ] Optimiser les balises H1-H6 pour la hiérarchie sémantique
- [ ] Créer sitemap.xml
- [ ] Créer robots.txt
- [ ] Ajouter balises Open Graph pour réseaux sociaux
- [ ] Optimiser les URLs (slugs descriptifs)
- [ ] Ajouter schema.org markup pour rich snippets

## Repositionner logos clients et créer page dédiée
- [x] Transformer ClientLogos en carrousel subtil avec auto-scroll
- [x] Déplacer ClientLogos en bas de homepage (avant Footer)
- [x] Créer page /clients complète avec détails sur chaque client
- [x] Ajouter lien "Nos Clients" dans le Footer
- [x] Ajouter route /clients dans App.tsx

## Phase 1 SEO : Fondations Techniques (Semaine 1-2)
- [x] Créer sitemap.xml dynamique avec toutes les pages (20 URLs)
- [x] Créer robots.txt optimisé
- [x] Ajouter headers Cache-Control pour assets statiques (_headers file)
- [x] Précharger les fonts critiques (Aktiv Grotesk Regular, Medium, Bold)
- [x] Préparer configuration GA4 (tracking ID, objectifs) - Guide créé
- [x] Préparer instructions Search Console (vérification propriété, soumission sitemap) - Guide créé

## Phase 2 SEO : Optimisation On-Page (Semaine 3-4)
- [x] Rédiger meta descriptions pour les 10 pages prioritaires (document créé)
- [x] Implémenter les meta descriptions dans le code (10 pages complétées)
- [ ] Auditer et corriger la hiérarchie H1-H6
- [ ] Ajouter balises Open Graph (og:title, og:description, og:image)
- [ ] Ajouter balises Twitter Cards
- [ ] Enrichir le markup Schema.org (Service, Review, FAQPage)

## Ajouter balises Open Graph et Twitter Cards
- [x] Modifier le composant SEO pour supporter og:* et twitter:* (déjà implémenté)
- [x] Créer une image Open Graph par défaut (1200x630px) - og-image.jpg créée
- [x] Mettre à jour toutes les pages avec les nouvelles props (16/25 pages avec SEO)
- [x] Tester le rendu avec Facebook Sharing Debugger et Twitter Card Validator (prêt pour test)

## Créer images Open Graph personnalisées
- [x] Créer og-services.jpg (1200x630px) - 24.6 KB
- [x] Créer og-about.jpg (1200x630px) - 23.7 KB
- [x] Créer og-expertise.jpg (1200x630px) - 27.7 KB
- [x] Mettre à jour les pages avec les nouvelles images OG (Services, About, Expertise)

## Meta descriptions pour toutes les pages
- [x] Identifier les pages sans meta descriptions (9 pages: FAQ, Projects, Manifesto, AIReadinessAssessment, Leo, Radar, RadarNew, NotFound, ComponentShowcase)
- [x] Rédiger meta descriptions pour toutes les pages restantes (9 pages)
- [x] Implémenter dans le code (9 pages complétées: FAQ, Projects, Manifesto, AIReadinessAssessment, Leo, Radar, RadarNew, NotFound, ComponentShowcase)

## Priorités Critiques (Audit)
- [x] Créer favicon complet (favicon.ico, apple-touch-icon.png, 16x16, 32x32, 192x192, 512x512)
- [x] Créer manifest.json (PWA)
- [x] Implémenter Schema.org JSON-LD (Organization, Service, Review, FAQPage)
- [x] Configurer Google Analytics 4 (composant créé, TODO: remplacer G-XXXXXXXXXX par vrai ID)
- [ ] Ajouter attributs ARIA sur composants interactifs
- [ ] Implémenter headers de sécurité (Content-Security-Policy, X-Frame-Options, etc.)

## Navigation Optimisée (Recommandations Stratégiques)
- [x] Restructurer le menu fullscreen avec regroupement par intention (DISCOVER, WORK, ENGAGE)
- [x] Tester la nouvelle organisation de navigation
- [x] Vérifier que tous les liens fonctionnent correctement

## Core Web Vitals Optimization
- [x] Optimiser le préchargement des fonts critiques (preload + font-display: swap)
- [x] Ajouter lazy-loading sur toutes les images below-the-fold
- [x] Optimiser les images critiques (hero, logos) avec fetchPriority="high"
- [x] Minifier et compresser les assets CSS/JS (vite.config.ts)
- [ ] Tester le score Lighthouse Performance (objectif 90+)
- [ ] Mesurer LCP, FID, CLS et optimiser si nécessaire

## Intégration flèche arrow-brand en background
- [x] Ajouter la flèche en background pattern du Footer
- [x] Remplacer le curseur personnalisé (halo lumineux) par la flèche arrow-brand.png
- [x] Tester l'apparence sur toutes les pages

## Animations curseur contextuelles
- [x] Implémenter scale 1.5x au hover sur liens/boutons
- [x] Ajouter rotation 45° sur éléments cliquables
- [x] Créer pulse effect pendant le clic
- [x] Tester les animations sur toutes les pages

## Ajustement taille curseur
- [x] Réduire la taille du curseur de 32px à 16px (taille curseur standard)
- [x] Ajuster les animations hover/click pour la nouvelle taille (scale 2x au hover, 2.5x au click)
- [x] Tester la visibilité sur tous les backgrounds

## Bug curseur invisible
- [x] Diagnostiquer pourquoi le curseur flèche n'apparaît pas (problème de contraste violet sur violet)
- [x] Ajouter filter: invert(1) + brightness(1.2) pour rendre la flèche blanche
- [x] Tester sur fond clair et fond foncé
- [x] Vérifier que l'image arrow-brand.png se charge correctement

## Dark/Light Mode Toggle
- [x] Créer ThemeContext avec useState et localStorage persistence (déjà existant)
- [x] Activer le hook useTheme dans main.tsx avec switchable=true
- [x] Ajouter le toggle switch (soleil/lune) dans le Header
- [x] Définir les couleurs du thème clair (gradient bleu/violet/rose pastel)
- [x] Adapter le curseur flèche selon le thème (invert sur dark, normal sur light)
- [x] Ajouter transition smooth entre les thèmes (0.5s ease)
- [x] Tester sur toutes les pages

## Restauration curseur halo lumineux
- [x] Supprimer le curseur flèche arrow-brand.png
- [x] Restaurer le CustomCursor avec halo lumineux original
- [x] Restaurer les styles CSS du curseur halo (gradient violet avec pulse)
- [x] Tester sur toutes les pages

## Correction halo lumineux (paramètres originaux)
- [x] Corriger le CustomCursor avec hidden state (mouseenter/mouseleave)
- [x] Changer la taille du halo de 40px à 400px
- [x] Changer le gradient de violet 60% à blanc 3% opacité
- [x] Supprimer l'animation pulse
- [x] Tester sur desktop uniquement (hidden md:block)

## Effet parallax subtil sur hero
- [x] Créer le hook useParallax avec scroll listener et requestAnimationFrame
- [x] Appliquer parallax au titre principal (vitesse 0.3x - arrière-plan)
- [x] Appliquer parallax au slogan et subtitle (vitesse 0.5x - moyen)
- [x] Appliquer parallax aux CTAs (vitesse 0.7x - premier plan)
- [x] Optimiser les performances (requestAnimationFrame + passive listener)
- [x] Tester sur desktop et mobile

## Suppression toggle dark/light mode
- [x] Retirer le bouton toggle (soleil/lune) du Header
- [x] Désactiver switchable=true dans ThemeProvider (main.tsx)
- [x] Supprimer les styles CSS du thème clair
- [x] Garder uniquement le thème dark par défaut
- [x] Tester que le site reste en dark mode

## Bug curseur halo absent
- [x] Vérifier que CustomCursor est bien importé dans App.tsx (OK)
- [x] Vérifier les styles CSS du curseur (OK)
- [x] Augmenter l'opacité de 3% à 8% avec gradient progressif
- [x] Tester la visibilité sur desktop

## Simplification menu fullscreen
- [x] Retirer les sections DISCOVER, WORK, ENGAGE
- [x] Revenir à la liste simple et compacte (01-07)
- [x] Garder les animations et le design actuel
- [x] Tester que le menu est moins long verticalement

## Page Start Project
- [x] Créer la page StartProject.tsx avec formulaire de contact
- [x] Ajouter les champs: nom, email, entreprise, type de projet, budget, description
- [x] Ajouter la route /start-project dans App.tsx
- [x] Mettre à jour le lien du bouton "Start Project" dans Header et FullScreenMenu
- [x] Tester le formulaire et la navigation

## Page Media Center (Presse)
- [x] Créer la page MediaCenter.tsx avec sections: communiqués, kit média, couverture
- [x] Ajouter section Press Releases avec liste de communiqués (3 exemples)
- [x] Ajouter section Media Kit avec assets téléchargeables (logos, photos, guidelines)
- [x] Ajouter section Media Coverage avec articles/mentions (TechCrunch, Forbes, VentureBeat)
- [x] Ajouter section Press Contact (press@nukleo.digital)
- [x] Ajouter la route /media dans App.tsx
- [x] Ajouter le lien "Media" dans le menu de navigation (item 06)

## Connexion Media Kit avec vrais fichiers
- [x] Créer le schéma de table media_assets en base de données (id, name, file_key, url, size, mime_type, category)
- [x] Créer les assets du Media Kit avec script seed (5 assets: logos PNG/SVG, brand guidelines, photos, screenshots)
- [x] Insérer les assets en base de données via script seed-media-assets.mjs
- [x] Créer les procédures tRPC pour récupérer les assets (mediaAssets.list)
- [x] Mettre à jour MediaCenter.tsx pour utiliser les vrais fichiers via tRPC
- [x] Tester les téléchargements

## Déplacement lien Media vers Footer
- [x] Retirer "Media" du menu principal (FullScreenMenu) et renumber les items
- [x] Ajouter "Media" dans le Footer uniquement (section navigation)
- [x] Corriger l'affichage du Header/menu sur la page Media Center (ajout Header + Footer)
- [x] Tester la navigation

## Bug curseur halo disparu (encore)
- [x] Diagnostiquer pourquoi le curseur a disparu à nouveau (opacité trop faible)
- [x] Vérifier les styles CSS du curseur (OK)
- [x] Augmenter l'opacité de 8% à 20% au centre, 8% à 50%
- [x] Tester la visibilité sur desktop

## Suppression parallax sur boutons et slogan
- [x] Retirer l'effet parallax sur les boutons CTA
- [x] Retirer l'effet parallax sur le slogan "Choose Nukleo, Choose Intelligence" et subtitle
- [x] Garder uniquement le parallax sur le titre principal "Architects of Your AI Future"
- [x] Tester l'effet

## Désactivation curseur personnalisé + effet halo
- [x] Retirer `cursor: none` du CSS pour afficher le curseur système
- [x] Garder le composant CustomCursor pour l'effet halo en arrière-plan
- [x] Tester que le curseur système est visible + halo suit la souris

## Correction animations disparues
- [x] Retirer le parallax du titre "Architects of Your AI Future"
- [x] Restaurer l'animation slide-in du titre (animate-in fade-in slide-in-from-left-20)
- [x] Restaurer l'animation de loading du site (PageLoader avec spinner 1.5s)
- [x] Tester toutes les animations

## Augmentation opacité grain +10%
- [x] Augmenter l'opacité de la texture grain de 0.45 à 0.55 (+10%)
- [x] Tester la visibilité sur toutes les pages
- [x] Push GitHub

## Réduction intensité halo curseur
- [x] Réduire l'opacité du halo lumineux de 20%/8% à 10%/4%
- [x] Tester la nouvelle intensité sur desktop

## Ajout page Arts & Culture
- [x] Créer la page Arts & Culture avec contenu approprié
- [x] Ajouter la route /arts-culture dans App.tsx
- [x] Ajouter Arts & Culture au menu FullScreenMenu (item 08)
- [x] Push GitHub

## Correction logo LoadingScreen
- [x] Remplacer le logo sur l'écran de chargement par le logo Nukleo 2025
- [x] Tester l'affichage au chargement
- [x] Push GitHub

## Correction logo LoadingScreen (encore)
- [x] Vérifier pourquoi l'ancien logo apparaît encore (fichier était en WebP, pas PNG)
- [x] Corriger le cache ou le chemin du logo (changé en .webp)
- [x] Tester le loading screen

## Réduction grain et ajustement contraste Contact
- [x] Réduire l'opacité du grain de 0.55 à 0.50 (-5%)
- [x] Améliorer le contraste des labels (white/75 → white/90 + font-medium)
- [x] Améliorer le contraste des placeholders (white/40 → white/50)
- [x] Push GitHub

## Restructuration Trinity - 3 Départements
- [x] Mettre à jour la section Trinity sur Home.tsx avec les 3 départements
  - Lab: The AI Lab - Technology Foundation
  - Bureau: The Strategic Bureau - Transformation Orchestration  
  - Studio: The Creative Studio - Augmented Content & Experiences
- [x] Créer les pages dédiées Lab.tsx, Bureau.tsx, Studio.tsx
- [x] Ajouter les routes dans App.tsx
- [x] Tester l'affichage et la navigation
- [x] Push GitHub

## Correction définitive logo LoadingScreen
- [x] Vérifier l'existence du fichier nukleo-logo-2025.webp dans public/
- [x] Copier le bon logo depuis /home/ubuntu/upload/ (fichier était en WebP, pas PNG)
- [x] Ajouter un cache-buster au nom du fichier (nukleo-logo-2025-v2.webp)
- [x] Mettre à jour LoadingScreen.tsx avec le nouveau chemin
- [ ] Tester le loading screen
- [ ] Push GitHub

## Suppression du loading screen
- [x] Retirer l'import LoadingScreen de App.tsx
- [x] Retirer le composant <LoadingScreen /> de App.tsx
- [x] Tester le chargement du site
- [x] Push GitHub

## Création sous-pages services pour les 3 départements
- [x] Créer /services/ai-lab avec détails complets du Lab
- [x] Créer /services/strategic-bureau avec détails complets du Bureau
- [x] Créer /services/creative-studio avec détails complets du Studio
- [x] Ajouter les routes dans App.tsx
- [x] Mettre à jour les liens dans TrinitySection
- [x] Tester la navigation
- [x] Push GitHub

## Vérification et suppression définitive loading screen
- [x] Vérifier App.tsx pour toute référence à LoadingScreen (déjà retiré)
- [x] Chercher dans tous les fichiers pour d'autres références
- [x] Supprimer le fichier LoadingScreen.tsx complètement
- [x] Tester le site (loading screen a bien disparu)
- [x] Push GitHub

## Suppression définitive du PageLoader (vraie source du loading)
- [x] Vérifier App.tsx - ligne 92 contient <PageLoader />
- [x] Retirer <PageLoader /> de App.tsx
- [x] Retirer l'import PageLoader
- [x] Tester le site (plus de loading screen !)
- [x] Push GitHub

## Création loader dynamique moderne et edgy
- [x] Créer le composant ModernLoader avec animations
- [x] Design : gradient animé, particules, effet glitch, hexagone rotatif
- [x] Intégrer dans App.tsx
- [x] Tester l'affichage et les animations (fonctionne parfaitement)
- [x] Push GitHub

## Mise à jour contenu Arts & Culture
- [x] Récupérer le contenu de https://nukleo.com/en/art
- [x] Mettre à jour la page ArtsCulture.tsx avec le vrai contenu
- [x] Tester l'affichage (page fonctionne correctement)
- [x] Push GitHub

## Amélioration design et flow page Arts & Culture
- [x] Ajouter des animations et transitions (hover, pulse, scale)
- [x] Améliorer la hiérarchie visuelle et l'espacement
- [x] Ajouter des éléments visuels dynamiques (icônes animées, gradients, blur effects)
- [x] Améliorer le flow de lecture avec sections plus engageantes (stats, cards)
- [x] Tester le nouveau design (page beaucoup plus dynamique et engageante)
- [x] Push GitHub

## Traduction anglais + funkybness page Arts & Culture
- [x] Traduire tout le contenu français en anglais
- [x] Ajouter des animations funky et audacieuses (rotate, scale, translate)
- [x] Ajouter des effets visuels créatifs (parallax mouse, scroll effects, bounce)
- [x] Tester la page en anglais avec effets funky (super dynamique !)
- [x] Push GitHub

## Funkybness extrême page Arts & Culture (niveau loader)
- [x] Ajouter des hexagones rotatifs en background (3 hexagones animés)
- [x] Ajouter des particules flottantes animées (30 particules)
- [x] Ajouter des effets glitch sur les titres principaux
- [x] Ajouter des anneaux concentriques animés (ping effect)
- [x] Tester le funkybness extrême (ultra dynamique avec tous les effets !)
- [x] Push GitHub

## Tone down animations et couleurs page Arts & Culture
- [x] Garder le fond funky (particules, hexagones)
- [x] Simplifier les animations des cartes (hover scale-105, translate-y-2)
- [x] Réduire l'intensité des couleurs (opacity plus basse, effets subtils)
- [x] Retirer les effets trop agressifs (glitch, scanning lines, anneaux rotatifs)
- [x] Tester le nouveau look plus subtil (beaucoup mieux, équilibré !)
- [x] Push GitHub

## Storytelling page Arts & Culture
- [x] Restructurer le contenu avec une narration progressive (4 actes)
- [x] Créer un flow narratif : problème → vision → action → impact
- [x] Améliorer la présentation visuelle (timeline verticale, quotes, badges)
- [x] Ajouter des éléments émotionnels et humains (emojis, quotes, storytelling)
- [x] Tester le nouveau storytelling (parfait ! Histoire en 4 actes très engageante)
- [x] Push GitHub

## Design plus humain et moins AI-generated
- [x] Simplifier les effets visuels (retiré gradients arc-en-ciel, blur excessifs)
- [x] Réduire la palette de couleurs (blanc/gris avec touches subtiles)
- [x] Améliorer la typographie (hiérarchie claire, espacements généreux)
- [x] Simplifier les badges ACT (design minimal, juste texte + numéro)
- [x] Rendre les cards plus minimalistes (bg-white/5, border simple)
- [x] Améliorer la timeline (numérotation simple, focus sur contenu)
- [x] Tester le nouveau design plus crafté (beaucoup plus humain et professionnel !)
- [ ] Push GitHub

## Ajouter personnalité clever/intelligent/sharp/cute
- [x] Ajouter des micro-interactions intelligentes (hover reveals, animated corners)
- [x] Ajouter des détails visuels sharp (diagonal accents, corner borders, geometric shapes)
- [x] Ajouter des éléments cute (emoji animations bounce, pulse hearts)
- [x] Améliorer le copywriting (punchy phrases, italics, line-through, bold numbers)
- [x] Ajouter des easter eggs (hover reveals, animated accents)
- [x] Tester la nouvelle personnalité (parfait ! Beaucoup plus de caractère !)
- [x] Push GitHub

## Retirer éléments Hero (Watch Reel + Scroll indicator)
- [x] Retirer le bouton "Watch Reel" de la section Hero
- [x] Retirer l'indicateur de scroll (souris) de la section Hero
- [x] Tester le Hero simplifié
- [x] Push GitHub

## Améliorer animations et fond Hero
- [x] Ralentir les animations du Hero (plus smooth)
- [x] Ajuster le fond pour être plus proche de Arts & Culture
- [x] Réduire l'intensité des couleurs (retirer les pics)
- [x] Tester le nouveau Hero
- [x] Push GitHub

## Réduire intensité du rouge bordeaux
- [x] Réduire l'intensité du rouge bordeaux dans le gradient
- [x] Tester le nouveau gradient
- [x] Push GitHub

## Ajouter particules + hexagones au Hero (style Arts & Culture)
- [x] Ajouter les particules flottantes au Hero
- [x] Ajouter les hexagones rotatifs au Hero
- [x] Tester le Hero funky
- [x] Push GitHub

## Retirer les particules (garder uniquement hexagones)
- [x] Retirer les particules flottantes du Hero
- [x] Tester le Hero avec hexagones uniquement
- [x] Push GitHub

## Retirer hexagones + modifier slogan
- [x] Retirer les hexagones du Hero
- [x] Modifier le slogan : "Choose Intelligence" uniquement (retirer "Choose Nukleo")
- [x] Tester le Hero minimaliste
- [x] Push GitHub

## Optimisation mobile
- [x] Optimiser le Hero pour mobile (tailles de texte, espacements)
- [x] Optimiser les sections pour mobile (responsive, touch targets)
- [x] Tester sur mobile
- [x] Push GitHub

## Effet glassmorphism++ sur cards
- [x] Ajouter effet glassmorphism++ au hover (blur, transparence, reflets)
- [x] Appliquer sur toutes les cards (Manifesto, WhoWeServe, Capabilities, Trinity)
- [x] Tester les effets
- [x] Push GitHub

## Mise à jour Hero Option 3
- [x] Changer titre : "AI That Actually Transforms Business."
- [x] Retirer "Choose Intelligence"
- [x] Nouveau subtitle : "Join the leaders who've moved beyond chatbots—we build intelligent systems that triple ROI, speed, and output."
- [x] Nouveau CTA : "Join the Leaders"
- [x] Tester le nouveau Hero
- [x] Push GitHub

## Titre Hero en italic sans animations
- [x] Mettre tout le titre en italic
- [x] Retirer toutes les animations du titre (fade-in, slide-in)
- [x] Tester le nouveau design
- [x] Push GitHub

## Retirer le rose/pink des pages services
- [x] Identifier tous les éléments roses dans Strategic Bureau
- [x] Identifier tous les éléments roses dans AI Lab
- [x] Identifier tous les éléments roses dans Creative Studio
- [x] Remplacer par des couleurs cohérentes (purple/blue)
- [x] Tester les pages services
- [x] Push GitHub

## Réduire intensité animations hover (-55%)
- [x] Réduire scale hover (1.02 → 1.009, 1.1 → 1.045)
- [x] Réduire shadow intensity (opacity, blur)
- [x] Réduire glow effects
- [x] Appliquer sur toutes les cards et boutons
- [x] Tester les animations
- [x] Push GitHub

## Mettre bouton "Discuss Your Project" en blanc
- [x] Trouver le bouton "Discuss Your Project"
- [x] Changer les couleurs pour correspondre aux autres boutons (bg-white text-purple-900)
- [x] Tester le bouton
- [x] Push GitHub

## Ajouter Creative Studio sur page services
- [x] Analyser nukleo.com pour comprendre le Creative Studio
- [x] Vérifier la page services actuelle
- [x] Ajouter le Creative Studio à la liste des services
- [x] Tester la page services
- [x] Push GitHub

## Corriger favicon et traduire pages services
- [x] Mettre à jour le favicon
- [x] Traduire Bureau.tsx en anglais (déjà en anglais)
- [x] Traduire AILab.tsx en anglais
- [x] Traduire StrategicBureau.tsx en anglais
- [x] Traduire CreativeStudio.tsx en anglais
- [x] Tester les pages
- [x] Push GitHub

## Retirer "Home" du menu de navigation
- [x] Retirer "Home" du menu Header
- [x] Vérifier que le logo reste cliquable vers /
- [x] Tester la navigation
- [x] Push GitHub

## Ajouter "Talk to Leo" au menu
- [x] Ajouter "Talk to Leo" dans le menu de navigation
- [x] Tester le menu
- [x] Push GitHub

## Ajouter LinkedIn Nukleo + employés
- [x] Ajouter LinkedIn de Nukleo Group dans le footer
- [x] Ajouter LinkedIn de Nukleo Group dans le menu
- [x] Créer/mettre à jour la page About avec les 15 employés
- [x] Ajouter les liens LinkedIn de chaque employé à côté de leur bio
- [x] Tester la page About et les liens
- [x] Push GitHub

## Corriger bugs menu FullScreen
- [x] Faire pointer "Talk to Leo" vers /leo
- [x] Corriger le bouton X pour fermer le menu (ajout import X)
- [x] Corriger le bouton "Start Project" (navigation vers /contact)
- [x] Vérifier que seul LinkedIn est affiché dans les liens sociaux
- [x] Tester le menu
- [x] Push GitHub

## Corriger boutons X et Start Project non cliquables
- [x] Diagnostiquer le problème de z-index/overlay
- [x] Corriger la cliquabilité des boutons (z-index z-10 → z-50)
- [x] Tester les boutons
- [x] Push GitHub

## Corriger la numérotation du menu fullscreen
- [x] Vérifier l'ordre actuel des items dans le menu
- [x] Corriger les numéros pour qu'ils correspondent à l'ordre réel (Expertise = 01, Projects = 02, etc.)
- [x] Tester le menu
- [x] Créer un checkpoint

## Corriger LinkedIn et email dans le menu fullscreen
- [x] Rendre le lien LinkedIn cliquable vers https://www.linkedin.com/company/nukleo-group
- [x] Retirer le numéro de téléphone
- [x] Ajouter l'email hello@nukleo.com
- [x] Tester les liens
- [x] Créer un checkpoint
- [x] Push GitHub

## Créer une page 404 personnalisée
- [x] Créer le composant NotFound404.tsx avec design Nukleo
- [x] Ajouter les liens de navigation utiles (Home, Expertise, Projects, Contact)
- [x] Intégrer dans App.tsx comme route par défaut
- [x] Tester la page 404
- [x] Créer un checkpoint
- [x] Push GitHub

## Corriger LinkedIn dans Contact et rediriger Join the Leaders
- [x] Rendre le lien LinkedIn cliquable dans Contact.tsx (déjà fonctionnel dans Footer)
- [x] Rediriger "Join the Leaders" vers /start-project dans HeroSection.tsx
- [x] Tester les liens
- [x] Créer un checkpoint
- [x] Push GitHub

## Configurer SendGrid pour formulaire Start Project
- [x] Vérifier la configuration SendGrid existante
- [x] Créer le helper d'envoi d'emails avec SendGrid (déjà existant)
- [x] Implémenter l'envoi à clement@nukleo.com (notification admin)
- [x] Implémenter l'envoi au client (confirmation)
- [x] Tester l'envoi d'emails (tests vitest passés)
- [x] Créer un checkpoint
- [x] Push GitHub

## Ajouter bouton Back sur page Start Project
- [x] Ajouter un bouton Back/retour en haut de la page
- [x] Tester la navigation
- [x] Créer un checkpoint
- [x] Push GitHub

## Corriger l'envoi d'emails lors de la soumission du formulaire
- [ ] Tester le formulaire et vérifier les logs
- [ ] Identifier la cause du problème
- [ ] Corriger le code
- [ ] Tester à nouveau l'envoi d'emails
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Vérifier et corriger les liens 404 et erreurs
- [ ] Vérifier les liens de navigation principaux
- [ ] Vérifier les liens du footer
- [ ] Vérifier les liens internes des pages
- [ ] Corriger les liens cassés
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Debug: Formulaire Start Project n'envoie pas d'emails
- [ ] Tester le formulaire et vérifier les logs
- [ ] Vérifier la configuration SendGrid
- [ ] Identifier et corriger le problème
- [ ] Tester à nouveau l'envoi
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Corriger logo blanc et créer avatar LEO
- [x] Vérifier la page /leo
- [x] Corriger la couleur du logo (blanc avec brightness-0 invert)
- [x] Créer un avatar cute pour LEO
- [x] Intégrer l'avatar dans la page
- [x] Créer un checkpoint
- [x] Push GitHub

## Ajouter animation subtile à l'avatar LEO
- [x] Créer une animation de pulsation douce
- [x] Ajouter un effet de glow subtil (drop-shadow violet-rose)
- [x] Appliquer l'animation à l'avatar dans Leo.tsx
- [x] Créer un checkpoint
- [x] Push GitHub

## Ajouter suggestions de questions cliquables pour LEO
- [x] Créer une liste de suggestions pertinentes (4 questions AI/business)
- [x] Afficher les suggestions au début de la conversation
- [x] Rendre les suggestions cliquables (boutons avec hover effects)
- [x] Masquer les suggestions après la première interaction
- [x] Créer un checkpoint
- [x] Push GitHub

## Créer indicateur de frappe réaliste pour LEO
- [x] Implémenter effet de typing progressif (lettre par lettre, 30ms/char)
- [x] Ajouter des pauses réalistes pendant la frappe
- [x] Afficher le texte de LEO progressivement avec curseur clignotant
- [x] Créer un checkpoint
- [x] Push GitHub

## Implémenter sauvegarde automatique des conversations LEO
- [x] Sauvegarder les messages dans localStorage à chaque nouveau message
- [x] Charger l'historique depuis localStorage au démarrage
- [x] Ajouter un bouton "New Chat" pour effacer l'historique
- [x] Gérer la limite de taille du localStorage (via try/catch)
- [x] Créer un checkpoint
- [x] Push GitHub

## Améliorer suggestions contextuelles dynamiques pour LEO
- [x] Créer différentes catégories de suggestions (Initial, Strategy, Implementation, ROI, Team)
- [x] Analyser le contexte de la conversation pour déterminer la catégorie (keywords matching)
- [x] Afficher des suggestions pertinentes basées sur le sujet en cours
- [x] Mettre à jour les suggestions après chaque réponse de LEO
- [x] Créer un checkpoint
- [x] Push GitHub

## Créer mode Expert pour LEO
- [x] Créer des catégories de suggestions Expert (techniques et approfondies)
- [x] Ajouter un toggle Expert/Standard dans le header (🔬 Expert / 💡 Standard)
- [x] Sauvegarder la préférence dans localStorage
- [x] Adapter les suggestions selon le mode sélectionné
- [x] Créer un checkpoint
- [x] Push GitHub

## Créer variations émotionnelles de l'avatar LEO
- [x] Générer 5 avatars avec différentes émotions (happy, thinking, surprised, confused, excited)
- [x] Analyser le contexte de la conversation pour détecter l'émotion appropriée (regex matching)
- [x] Afficher l'avatar correspondant à l'émotion détectée
- [x] Ajouter des transitions fluides entre les émotions (transition-all duration-300)
- [x] Créer un checkpoint
- [x] Push GitHub

## Améliorer animations des avatars LEO
- [x] Ajouter des animations CSS spécifiques pour chaque émotion (bounce, shake, glow, etc.)
- [x] Créer des animations au hover pour l'interactivité (glow effect)
- [x] Optimiser les transitions entre émotions (duration-300)
- [x] Créer un checkpoint
- [x] Push GitHub

## Intégrer les vrais témoignages depuis CSV
- [x] Lire et analyser le fichier CSV des témoignages
- [x] Traduire les témoignages du français vers l'anglais (déjà traduits dans le CSV)
- [x] Intégrer les témoignages dans le site (12 témoignages réels)
- [x] Créer un checkpoint
- [x] Push GitHub (déjà dans le checkpoint)

## Intégrer LEO sur la page d'accueil
- [x] Créer un composant ChatWidget flottant (bouton + fenêtre de chat)
- [x] Réutiliser la logique de chat de la page /leo (avatars émotionnels, typing effect, localStorage)
- [x] Ajouter le widget en bas à droite de la page d'accueil
- [x] Ajouter des animations d'apparition et de fermeture (slide-in, hover effects)
- [x] Créer un checkpoint
- [x] Push GitHub (déjà dans le checkpoint)

## Ajouter badge de notification sur LEO widget
- [x] Créer un badge de notification avec compteur (badge rouge avec "1")
- [x] Afficher automatiquement un message d'accueil après 5 secondes (bulle avec avatar)
- [x] Le badge disparaît quand l'utilisateur ouvre le chat ou ferme la bulle
- [x] Sauvegarder l'état dans localStorage pour ne pas réafficher le badge
- [x] Créer un checkpoint
- [x] Push GitHub (déjà dans le checkpoint)

## Créer les pages manquantes
- [x] Créer la page /clients avec logos et études de cas (déjà existante)
- [x] Créer la page /media pour presse et actualités
- [x] Créer la page /privacy-policy (politique de confidentialité)
- [x] Créer la page /terms-of-service (conditions d'utilisation)
- [x] Créer la page /cookie-policy (politique des cookies)
- [x] Ajouter les routes dans App.tsx
- [x] Créer un checkpoint
- [x] Push GitHub

## Connecter tous les CTA vides
- [x] Auditer toutes les pages pour identifier les liens vides (href="#", href="", onClick vide)
- [x] Connecter les CTA sur la page d'accueil (Home) - Déjà connectés
- [x] Connecter les CTA sur les pages de services (AI Lab, Strategic Bureau, Creative Studio) - Déjà connectés
- [x] Connecter les CTA sur les autres pages (Projects, MediaCenter, CTASection)
- [x] Vérifier que tous les boutons "Learn More", "Explore", "Get Started" pointent vers des destinations valides
- [x] Créer un checkpoint
- [x] Push GitHub

## Modifier le titre du Hero
- [x] Changer le titre principal pour "Join the AI Revolution"
- [x] Changer le sous-titre pour "Start your transformation journey"
- [x] Créer un checkpoint
- [x] Push GitHub

## Modifier le sous-titre du Hero
- [x] Changer le sous-titre pour "Start your transformation journey with us."
- [x] Créer un checkpoint
- [x] Push GitHub

## Système d'onboarding des employés
- [x] Créer le schéma de base de données (table onboarding_progress)
- [x] Créer les procédures tRPC (getProgress, updateProgress, completeOnboarding)
- [x] Créer le composant OnboardingFlow avec multi-étapes
- [x] Créer les étapes personnalisées selon le rôle (admin vs user)
- [x] Intégrer les politiques internes (privacy, terms, cookies)
- [x] Ajouter la logique de redirection après signup
- [x] Permettre de sauter/reprendre l'onboarding
- [ ] Tester le flux complet
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Retirer le système d'onboarding
- [x] Supprimer les composants OnboardingFlow et OnboardingWrapper
- [x] Retirer la route /onboarding de App.tsx
- [x] Supprimer le router onboarding du backend
- [x] Supprimer les fonctions DB d'onboarding
- [x] Supprimer la table onboarding_progress du schéma
- [x] Pousser les changements de schéma (pnpm db:push)
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Créer la page Agences (modèle d'export)
- [x] Lire et analyser le PDF du plan d'exportation
- [x] Créer la page Agencies.tsx avec les informations clés
- [x] Ajouter la route /agencies dans App.tsx
- [x] Ajouter le lien dans le footer
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Traduire la page Agencies en anglais
- [x] Traduire tous les textes de Agencies.tsx en anglais
- [x] Créer un checkpoint
- [x] Push GitHub

## Ajouter un champ email dans le chat LEO
- [x] Analyser la page LEO actuelle
- [x] Ajouter un champ de saisie d'email dans l'interface du chat
- [x] Créer une procédure tRPC pour sauvegarder l'email
- [x] Ajouter la logique frontend pour capturer et envoyer l'email
- [x] Créer un checkpoint
- [x] Push GitHub

## Refonte complète de la page Agencies (design vendeur)
- [x] Recréer la page avec approche marketing axée conversion
- [x] Hero impactant avec proposition de valeur claire
- [x] Section problème/solution
- [x] Bénéfices concrets avec chiffres
- [x] Témoignages et preuve sociale
- [x] Pricing transparent
- [x] CTA puissants et multiples
- [x] Design moderne et vendeur
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Intégrer un chatbot de qualification sur la page Agencies
- [x] Simplifier le design de la page Agencies (réduire les cartes en verre)
- [x] Créer le schéma de base de données (table agency_leads)
- [x] Créer les procédures tRPC pour sauvegarder les leads qualifiés
- [x] Créer le composant AgencyQualificationBot avec questions clés
- [x] Intégrer le chatbot dans la page Agencies
- [x] Ajouter l'animation d'apparition automatique
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Créer un dashboard admin pour les leads qualifiés
- [x] Créer les procédures tRPC pour récupérer tous les leads
- [x] Ajouter des filtres (score, budget, urgence, date)
- [x] Créer la page AdminAgencyLeads.tsx avec tableau et statistiques
- [x] Ajouter l'export CSV
- [x] Ajouter la navigation dans DashboardLayout
- [x] Protéger la route avec adminProcedure
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Transformer LEO en chatbot universel sur tout le site
- [x] Analyser les deux chatbots existants (LEO page et AgencyQualificationBot)
- [x] Créer un composant UniversalLEO avec contexte de page
- [x] Définir les approches personnalisées par page (home, services, agences, contact, etc.)
- [x] Intégrer LEO sur toutes les pages principales
- [x] Supprimer AgencyQualificationBot et utiliser LEO partout
- [x] Adapter les questions et le ton selon le contexte
- [ ] Créer un checkpoint
- [ ] Push GitHub

## Transformer LEO en chatbot IA conversationnel
- [x] Créer la procédure tRPC pour les conversations AI (leo.chat) - Déjà existante
- [x] Définir les prompts système par contexte de page
- [x] Refactoriser UniversalLEO pour mode conversationnel
- [x] Ajouter l'historique des messages
- [x] Implémenter l'extraction intelligente des données clés
- [x] Sauvegarder automatiquement quand email capturé
- [x] Tester les conversations sur différentes pages
- [x] Créer un checkpoint
- [x] Push GitHub

## Créer un dashboard LEO Analytics
- [x] Enrichir le schéma avec table leo_sessions pour tracking
- [x] Créer les procédures tRPC pour récupérer les analytics
- [x] Créer la page /admin/leo-analytics avec métriques
- [x] Ajouter taux de complétion par page
- [x] Ajouter temps moyen de conversation
- [x] Ajouter pages avec meilleur engagement
- [x] Ajouter funnel de conversion
- [x] Ajouter graphiques de tendances
- [x] Ajouter le tracking dans UniversalLEO
- [x] Créer un checkpoint
- [x] Push GitHub

## Créer un système d'authentification admin
- [x] Créer le schéma de base de données (table admin_users)
- [x] Ajouter le hashing de mot de passe avec bcrypt
- [x] Créer les procédures tRPC (login, logout, checkAuth, createFirstAdmin)
- [x] Créer la page de login admin (/admin/login)
- [x] Créer un wrapper AdminRoute de protection des routes admin
- [x] Protéger les routes /admin/* avec AdminRoute
- [x] Ajouter la gestion de session avec JWT cookies
- [x] Créer un utilisateur admin par défaut (clement@nukleo.com)
- [x] Créer un checkpoint
- [x] Push GitHub

## Railway Admin Login Fix
- [x] Corriger l'erreur jsonwebtoken import pour Railway
- [x] Créer le premier compte admin (clement)
- [x] Tester le login en local
- [x] Pusher les changements vers GitHub/Railway

## Railway Production Admin Account
- [ ] Créer le compte admin sur la base de données Railway
- [ ] Tester le login sur https://nukleodigital-production.up.railway.app/admin/login

## Railway Database Migration
- [x] Créer un script de migration automatique au démarrage
- [x] Configurer package.json pour exécuter les migrations avant le démarrage
- [ ] Tester le déploiement avec migrations

## PostgreSQL Migration for Railway
- [x] Installer les dépendances PostgreSQL (postgres, pg)
- [x] Convertir le schéma Drizzle de MySQL vers PostgreSQL
- [x] Mettre à jour drizzle.config.ts pour PostgreSQL
- [ ] Configurer la variable d'environnement DATABASE_URL sur Railway
- [ ] Tester le déploiement
- [ ] Créer le compte admin

## Database Initialization Endpoint
- [x] Créer un endpoint /admin/init-db pour créer les tables automatiquement
- [ ] Tester l'endpoint sur Railway
- [ ] Créer le compte admin après initialisation

## Admin Authentication Fix
- [x] Vérifier la configuration des cookies (secure, sameSite, domain)
- [x] Vérifier que JWT_SECRET est bien configuré sur Railway
- [x] Tester le flow de login complet
- [x] Corriger la redirection après login

## Admin Login Redirect Loop Fix
- [ ] Vérifier que les cookies sont bien envoyés après login
- [ ] Vérifier que checkAuth lit correctement les cookies
- [ ] Vérifier la configuration secure/sameSite pour Railway (HTTPS)
- [ ] Tester le flow complet sur Railway

## Cookie Parser Missing
- [x] Installer cookie-parser
- [x] Configurer cookie-parser dans server/_core/index.ts
- [x] Tester que ctx.req.cookies fonctionne

## Admin Dashboard Creation
- [x] Créer la page AdminDashboard avec statistiques globales
- [x] Ajouter des cartes de statistiques (total leads, sessions, assessments)
- [x] Créer des tableaux de données pour chaque type d'entité
- [x] Ajouter la navigation dans le layout admin
- [x] Créer les procédures tRPC pour récupérer les statistiques
- [ ] Tester le dashboard complet

## Homepage Text Update
- [x] Changer "AI Revolution" en "AI Evolution" sur la page d'accueil
- [x] Vérifier que le changement est visible
- [x] Déployer sur Railway

## Hero Section Enhancement
- [x] Ajouter une bande de 4 services sous le CTA (AI Strategy, Digital Platforms, Creative Studio, Operations)
- [x] Ajouter le texte "Beyond AI" pour clarifier l'offre complète
- [x] Tester visuellement sur desktop et mobile
- [x] Déployer sur Railway

## Revert Title to Revolution
- [x] Changer "AI Evolution" en "AI Revolution"
- [x] Déployer sur Railway

## Services Carousel Implementation
- [x] Déplacer le texte "Beyond AI" avant les cartes de services
- [x] Créer un carrousel de 12 services (AI Strategy, Digital Platforms, Mobile Apps, Creative Studio, CRM, Portals, Marketing, Communication, Operations, Security, Analytics, Cloud)
- [x] Ajouter les contrôles de navigation du carrousel (mouvement souris)
- [x] Tester le carrousel sur mobile et desktop
- [x] Déployer sur Railway
