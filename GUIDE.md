# 📖 Guide d'Utilisation — Portfolio Zakaria Bait

Bienvenue sur la documentation complète de ton portfolio. Ce guide est conçu pour être simple, direct et sans jargon technique.

---

## 🧭 1. Architecture de ton site (Qu'y a-t-il sur ton site ?)

Ton portfolio est composé de 5 pages publiques et d'un panneau d'administration secret :

1. **Page d'Accueil (`index.html`)** : En-tête typographique brutaliste, heure de Marrakech en temps réel, statut de disponibilité et accès rapide aux sections.
2. **Galerie Projets (`work.html`)** : Grille modulaire de tous tes travaux avec filtre par catégorie (Branding, Direction Artistique, 3D, Posters) et le curseur rouge personnalisé `(+)`.
3. **Pages Détaillées de Projets (`project-detail.html?id=...`)** : Pages individuelles pour chaque projet, composées comme des articles de magazine avec de grands visuels, des vidéos MP4, des duos asymétriques et des textes éditoriaux.
4. **Page À Propos & CV (`info.html`)** : Présentation, démarche, parcours professionnel, formation et contact en 3 langues (**Français**, **Anglais** et **Arabe** avec mise en page RTL native).
5. **Page Erreur 404 (`404.html`)** : Page plein écran avec lecture automatique instantanée de ta vidéo motion (`video_404.mp4`).
6. **Panneau d'Administration CMS (`admin.html`)** : Ta plateforme secrète pour tout modifier sans toucher au code.

---

## 🔑 2. Accéder à ton panneau d'administration

* **Sur ton ordinateur :** Double-clique sur le fichier `admin.html` dans ton dossier, ou tape son chemin dans Chrome / Safari.
* **En ligne :** Rends-toi sur l'adresse de ton site suivie de `/admin.html` (par exemple : `https://portfolio-bay-two-55.vercel.app/admin.html`).

---

## 🎨 3. Comment ajouter un nouveau projet (Pas à pas)

### Étape 1 : Créer la carte du projet
1. Ouvre `admin.html`.
2. Reste sur le 1ᵉʳ onglet : **🎨 Projets & Galerie**.
3. Clique sur le bouton noir **`+ Ajouter un Élément`**. Une nouvelle carte apparaît en haut.
4. Choisis le **Type de contenu** (📷 Image, 🎬 Vidéo, 🎞️ GIF ou ✍️ Bloc de texte).
5. Sélectionne la **Catégorie** (Branding, Direction Artistique, etc.).
6. Dépose ton image ou ta vidéo dans la zone en pointillés, ou clique sur **`📁 Parcourir`** pour la choisir sur ton Mac.
7. Renseigne la **Légende / Titre affiché** (ex: `022    MON NOUVEAU PROJET, Direction Artistique`).

### Étape 2 : Composer sa page détaillée
1. Sur la carte de ton projet, clique directement sur le bouton noir : **`📖 Éditer page détaillée`**.
   *(Tu bascules instantanément dans le 2ᵉ onglet avec ton nouveau projet sélectionné)*.
2. Dans la section **1. En-tête éditorial** :
   * Modifie si tu le souhaites le titre principal, l'année, le client et le sous-titre d'accroche.
3. Dans la section **2. Médiathèque & Fichiers disponibles** :
   * Tu peux cliquer sur **`+ En Grand`** ou **`+ En Duo`** sous n'importe quel fichier existant pour l'ajouter immédiatement au projet.
   * Ou cliquer sur **`+ Importer depuis mon ordinateur`** pour charger un nouveau fichier depuis ton Mac.
4. Dans la section **3. Composition de la page** :
   * Utilise les boutons pour ajouter les blocs souhaités :
     - **`🖼️ + Grande Image (100%)`** : Image héro pleine largeur avec légende.
     - **`🎬 + Grande Vidéo MP4 (100%)`** : Vidéo fluide en lecture automatique muette.
     - **`👥 + Duo 2 Colonnes`** : Deux visuels côte à côte à parts égales.
     - **`📐 + Duo Asymétrique (1.4 : 1)`** : Grand visuel à gauche et cadrage vertical à droite (style Trabuc.co).
     - **`✍️ + Paragraphe / Récit`** : Texte libre pour raconter le brief et la démarche.
   * Réorganise l'ordre des blocs comme tu veux grâce aux flèches **▲** et **▼**.
5. Clique sur le bouton en haut **`👁️ Voir la page en direct`** pour vérifier le résultat dans un nouvel onglet !

---

## 📁 4. Comment ajouter des images, vidéos et GIFs

### Méthode recommandée (Directement dans l'Admin) :
* Partout où tu vois un champ média, tu peux soit :
  1. Cliquer sur le bouton **`📁 Parcourir`** et choisir ton fichier dans ton Mac.
  2. Glisser-déposer le fichier directement sur la zone en pointillés.
  3. Sélectionner un fichier déjà présent via le menu déroulant.
* Un aperçu s'affiche immédiatement en direct.

### Important pour la mise en ligne permanente :
Pour que tes nouvelles images et vidéos soient visibles par tout le monde sur Internet :
* Place tes fichiers images (`.jpg`, `.png`, `.svg`, `.gif`) et vidéos (`.mp4`) dans le dossier de ton portfolio.
* Privilégie des noms simples sans accents ni espaces bizarres (ex: `projet_nike_01.jpg`, `motion_reveal.mp4`).

---

## 📝 5. Modifier la page À Propos / Info et ton CV

1. Dans `admin.html`, va sur le 4ᵉ onglet : **📝 Page Info & CV (FR / EN / AR)**.
2. Tu as 3 panneaux distincts :
   * 🇫🇷 **Français**
   * 🇬🇧 **Anglais**
   * 🇲🇦 **Arabe**
3. Tu peux y modifier ta Bio (Profil), ton Approche, tes Expériences professionnelles, ta Formation et tes coordonnées.
4. *Astuce :* Les balises `<b>Texte en gras</b>` et `<br>` (retour à la ligne) sont acceptées pour formater proprement tes textes.

---

## 📁 6. Gérer les catégories

1. Dans `admin.html`, va sur le 3ᵉ onglet : **📁 Catégories**.
2. Tu peux renommer les catégories existantes ou en ajouter de nouvelles avec le bouton **`+ Ajouter une Catégorie`**.
3. Les boutons de filtres sur `work.html` se mettront à jour automatiquement.

---

## ☁️ 7. Comment sauvegarder et mettre à jour ton site en ligne (Vercel)

Dès que tu as fini tes modifications dans l'admin, tu as **deux façons** de mettre ton site à jour :

### Option A — La Méthode Automatique 1-Clic (Recommandée) :
1. Dans l'en-tête de l'admin, clique sur le bouton **`☁️ Clé GitHub`**.
2. Colle ton Personal Access Token GitHub (si ce n'est pas déjà fait).
3. Clique sur le gros bouton rouge **`💾 Enregistrer les Modifications`**.
4. Le CMS pousse automatiquement la mise à jour sur ton GitHub (`zwakr/portfolio`).
5. **Vercel détecte le commit et redéploie ton site en 30 secondes chrono !**

### Option B — La Méthode Manuelle (Fichier data.js) :
1. Clique sur **`📥 Télécharger data.js`**.
2. Ton navigateur télécharge le fichier `data.js` mis à jour.
3. Glisse ce nouveau fichier `data.js` dans le dossier de ton portfolio en remplaçant l'ancien.
4. Si tu as ajouté de nouvelles photos/vidéos, glisse-les également dans le dossier.
5. Fais un commit Git ou glisse les fichiers sur l'interface web de GitHub pour que Vercel mette à jour ton site.

---

## 💡 8. Conseils & Bonnes Pratiques pour Art Directors

* **Images :** Pour un affichage ultra net sur écran Retina sans ralentir le site, exporte tes images JPG/WebP en largeur `1800px` à `2400px` (qualité 80-85%).
* **Vidéos :** Format `.mp4` encodé en H.264 (taille idéale sous 15-20 Mo pour un chargement instantané).
* **GIFs :** Privilégie des GIFs optimisés ou convertis en courtes vidéos MP4 si le fichier dépasse 5 Mo.
