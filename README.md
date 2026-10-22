# Site de recettes

## 1. Présentation du projet

Ce projet consiste à développer un site web de recettes de cuisine avec React. Il permet aux utilisateurs de consulter des recettes, de rechercher des plats, de filtrer les résultats selon différents critères, d'enregistrer des favoris et ajouter de nouvelle recette.

Les données des recettes proviennent de l'API publique [DummyJSON](https://dummyjson.com/recipes).

L'objectif du projet est de mettre en pratique le développement d'une application React, la communication avec une API REST, la création de composants réutilisables et la gestion des interactions utilisateur.

## 2. Technologies utilisées

- React 19 : création de l'interface utilisateur.

- React DOM : rendu de l'application dans le navigateur.

- React Router : gestion de la navigation entre les pages.

- JavaScript (ES Modules) : logique de l'application.

- CSS : mise en forme et identité visuelle.

- Fetch API : communication avec l'API REST.

- DummyJSON Recipes API : récupération des recettes et simulation de création.

- Vite : serveur de développement et construction de l'application.

- Oxlint : vérification statique du code.

- Git et GitHub : gestion du code source et suivi du projet.

## 3. Fonctionnalités réalisées

### Consultation des recettes
- Affichage des recettes récupérées depuis l'API.
- Présentation détaillée d'une recette.
- Affichage des ingrédients, des instructions, des temps de préparation et de cuisson, de la difficulté et des notes.

### Recherche et filtres
- Recherche de recettes par nom.
- Filtrage par tags.
- Filtrage selon une note minimale.
- Combinaison des filtres.

### Pagination
- Affichage des recettes par pages.
- Navigation entre les pages.
- Affichage d'un nombre limité de recettes par page.

### Favoris
- Ajout et retrait de recettes des favoris.
- Consultation de la liste des recettes favorites.
- Affichage du nombre de favoris dans la navigation.

### Création d'une recette
- Ouverture d'un formulaire dans une fenêtre modale.
- Saisie des informations d'une recette.
- Validation des champs du formulaire.
- Envoi d'une requête HTTP `POST` à DummyJSON.
- Affichage d'un message de confirmation lorsque la requête réussit.

### Interface utilisateur
- Composants réutilisables, notamment pour les boutons.
- Identité visuelle cohérente.
- Navigation entre les pages.
- Conservation des filtres lors de la navigation.

## 4. API utilisée

Le projet utilise l'API publique DummyJSON.

Documentation : https://dummyjson.com/docs/recipes

### Récupération des recettes

```http
GET https://dummyjson.com/recipes?limit=0
```

Cette requête permet de récupérer les recettes disponibles.

### Consultation d'une recette

Les détails d'une recette sont obtenus à partir des données récupérées depuis l'API.

### Simulation de création

```http
POST https://dummyjson.com/recipes/add
Content-Type: application/json
```

Les données de la recette sont envoyées au format JSON.

**Important :** DummyJSON simule la création et renvoie une réponse, mais ne sauvegarde pas réellement la nouvelle recette sur son serveur. La recette créée n'est donc pas ajoutée durablement à la liste des recettes.

## 5. Prérequis

Pour installer et lancer le projet, il faut disposer de :

- Node.js, de préférence dans une version compatible avec Vite 8.

- npm, installé avec Node.js.

- Git pour cloner le dépôt.

- Un navigateur web récent.

- Une connexion Internet pour accéder à l'API DummyJSON.

## 6. Installation

### Étape 1 : récupérer le projet

Cloner le dépôt Git :

```bash
git clone git@github.com:AntoninWoerther/ProjetReactRecette.git
```
Ceci nécessite une configuration prealable.

Entrer ensuite dans le dossier du projet :

```bash
cd ProjetReactRecette
```

### Étape 2 : installer les dépendances

Exécuter la commande suivante à la racine du projet :

```bash
npm install
```

Cette commande installe les dépendances déclarées dans `package.json`.

### Étape 3 : lancer l'application

```bash
npm run dev
```

Ouvrez ensuite dans votre navigateur l'adresse indiquée dans le terminal, généralement http://localhost:5173/.

#### Autres commandes disponibles

Construire l'application pour la production :

```bash
npm run build
```

Vérifier le code :

```bash
npm run lint
```

Prévisualiser la version construite :

```bash
npm run preview
```

## 7. Configuration

L'application utilise l'API publique DummyJSON. Aucune clé API n'est nécessaire pour les endpoints publics utilisés.

Une connexion Internet est nécessaire pour récupérer les recettes.

Les scripts et dépendances du projet sont déclarés dans package.json.

## 8. Organisation du code

Le projet est organisé pour séparer les responsabilités et faciliter la maintenance.

```text
src/
├── api/
│   └── recipes.js
├── components/
│   ├── AddRecipeModal/
│   ├── Button/
│   ├── Header.jsx
│   ├── Paginations/
│   ├── RatingFilter/
│   ├── SearchBar/
│   ├── TagFilter/
│   └── ScrollToTop.jsx
├── hooks/
│   ├── useRecipes.js
│   ├── useFavorites.js
│   ├── useDefaultRecipe.js
│   └── useSiteSettings.js
├── pages/
│   ├── Home/
│   ├── RecipeDetails/
│   └── Favorites/
├── App.jsx
└── main.jsx
```

Cette arborescence présente les principaux fichiers du projet. 
### Principaux choix techniques

- **Composants réutilisables** : les éléments d'interface communs, comme les boutons, sont regroupés dans des composants dédiés.
- **Hooks personnalisés** : certaines logiques sont isolées dans des hooks afin de séparer les responsabilités.
- **Séparation de l'accès aux données** : les requêtes HTTP sont regroupées dans le dossier `api`.
- **Navigation par routes** : les différentes pages sont accessibles grâce à React Router.
- **Gestion des états React** : les filtres, les favoris et les interactions du formulaire sont gérés côté client.
- **SaugevardeLocal** : les informations sont sauvegarder en local afin de pouvoir les garder.

## 9. Limites et problèmes connus

- Les données nécessitent une connexion Internet pour être récupérées depuis DummyJSON.
- La création d'une recette est simulée : les nouvelles données ne sont pas persistées sur le serveur.
- Les recettes créées via le formulaire ne sont pas ajoutées à la liste affichée.
- L'application ne dispose pas de son propre serveur ni de sa propre base de données.
- Les fonctionnalités de gestion des utilisateurs et d'authentification ne sont pas implémentées.
- La disponibilité de l'application dépend de celle de l'API externe.

## 10. Utilisation de l'intelligence artificielle

ChatGPT a été utilisé comme outil d'assistance au développement.

Ses usages comprennent notamment :

- La mise en place au fur et a mesure du projet.
- L'explication de concepts React et JavaScript.
- L'aide au débogage et à la compréhension des erreurs.
- Les propositions d'amélioration de l'organisation du code.
- La création et l'amélioration de composants réutilisables.
- L'accompagnement dans la mise en place de fonctionnalités comme les filtres, la pagination et le formulaire de création.
- L'aide à la rédaction de la documentation du projet.


## 11. Déploiement

Application en ligne : **à compléter si le projet est déployé**.

Dépôt GitHub : **https://github.com/AntoninWoerther/ProjetReactRecette**.
