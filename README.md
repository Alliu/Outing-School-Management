Objectif du projet

Cette application vise à simplifier la gestion des sorties scolaires grâce à une plateforme conviviale permettant :

La création et la gestion des sorties scolaires par les enseignants.
La communication efficace avec les parents pour obtenir leurs validations ou retours.
Une vue claire des participants, autorisations et informations pratiques.

Architecture du projet
Le projet est une ébauche et ne présente pas toutes les fonctionnalités ni toutes les pages de présentation.
L'application est divisée en trois principales parties :

1️⃣ Frontend
Interface utilisateur développée pour une navigation fluide et intuitive, permettant :
Le projet front présente les pages d'authentification et de création de compte, page d'accueil et des événements ainsi que les dynamisations et cablages.

📚 Technologies utilisées : React.js, Tailwind CSS.

2️⃣ Backend
Contient les routes API intégrant la logique métier et les interactions avec la base de données et les fonctionnalités correspondant aux pages front
📚 Technologies utilisées : Node.js, Nestjs, Prisma ORM.

3️⃣ Base de données
Un modèle relationnel structuré avec MySQL pour gérer :
Les utilisateurs (enseignants, parents).
Les sorties scolaires.
Les contacts
L'authentification
Les événements et les participations, Les taches liées.
📚 Modélisation avec Prisma : voir prisma/schema.prisma.

🌐 Documentation API
L'API est documentée avec Swagger pour faciliter la compréhension et les tests des différentes routes.

Pour accéder à la documentation interactive Swagger, démarrez l'application backend et visitez :
http://localhost:<port>/api-docs.

⚙️ Variables d'environnement
Le projet utilise des variables d'environnement pour configurer les services de manière dynamique.
Créez un fichier .env à la racine du projet avec les clés suivantes :

DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database_name>"

BREVO_API_KEY
SECRET_KEY
SECRET_REFRESH_KEY
FROM_EMAIL
FROM_NAME

FRONT_URL
URL_BACK

VITE_API_BASE_URL
NODE_ENV

🛠️ Installation et démarrage
Prérequis
Node.js (v16+)
npm ou yarn
MySQL
Git

Commandes 
Backend 
cd backend
- npm install
- npx prisma generate
- npx prisma migrate dev --name init
- npm run start:dev

Frontend
- cd frontend
- npm install
- npm run dev

