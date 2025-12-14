# Notes de Conversion des Polices WOFF2

## ✅ Mise à jour effectuée

Le fichier `client/public/fonts-lazy.css` a été mis à jour pour utiliser le format WOFF2 au lieu d'OTF pour toutes les variantes de polices.

## ⚠️ Action requise : Conversion des fichiers OTF en WOFF2

Les fichiers suivants doivent être convertis de OTF vers WOFF2 :

1. `AktivGrotesk-XBold.otf` → `AktivGrotesk-XBold.woff2`
2. `AktivGrotesk-XBoldItalic.otf` → `AktivGrotesk-XBoldItalic.woff2`
3. `AktivGrotesk-Black.otf` → `AktivGrotesk-Black.woff2`
4. `AktivGrotesk-BlackItalic.otf` → `AktivGrotesk-BlackItalic.woff2`

## Outils de conversion recommandés

### Option 1 : Font Squirrel Webfont Generator (Recommandé)
- URL : https://www.fontsquirrel.com/tools/webfont-generator
- Upload les fichiers OTF
- Sélectionner "Expert" mode
- Cocher "WOFF2" uniquement
- Télécharger et remplacer les fichiers dans `client/public/fonts/`

### Option 2 : woff2 (CLI)
```bash
# Installer woff2
npm install -g woff2

# Convertir chaque fichier
woff2_compress AktivGrotesk-XBold.otf
woff2_compress AktivGrotesk-XBoldItalic.otf
woff2_compress AktivGrotesk-Black.otf
woff2_compress AktivGrotesk-BlackItalic.otf
```

### Option 3 : Online Converter
- https://cloudconvert.com/otf-to-woff2
- Upload les fichiers OTF
- Télécharger les fichiers WOFF2 convertis

## Avantages du format WOFF2

- ✅ **30-50% plus petit** que OTF/TTF
- ✅ **Meilleure compression** grâce à Brotli
- ✅ **Support moderne** dans tous les navigateurs récents
- ✅ **Chargement plus rapide** pour les utilisateurs
- ✅ **Meilleur pour le SEO** (Core Web Vitals)

## Statut actuel

- ✅ **Polices critiques** : Déjà en WOFF2 (Light, Regular, Bold)
- ✅ **Polices non-critiques** : Majoritairement en WOFF2 (Italic, Medium)
- ⚠️ **Polices rares** : En attente de conversion (XBold, Black)

Une fois les fichiers convertis et placés dans `client/public/fonts/`, le site utilisera automatiquement le format WOFF2 pour toutes les variantes.
