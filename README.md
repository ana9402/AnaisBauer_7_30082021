# Présentation du projet

Groupomania est un groupe spécialisé dans la grande distribution. Suite à la mise en place d'un comité de pilotage sur le bien-être au travail, l'entreprise a décidé de renforcer la communication entre les salariés en mettant en place un réseau social interne.

# Objectifs

- Développer un MVP du site intégrant la fonctionnalité 9GAG (partager et commenter des gifs)
- Organiser le projet en mode agile

## Spécifications fonctionnelles
- La présentation des fonctionnalités doit être simple
- La création d'un compte doit être simple et possible depuis un téléphone mobile
- Le profil doit contenir très peu d'informations pour que sa complétion soit rapide
- La suppression du compte doit être possible
- L'accès à un forum où les salariés publient des contenus multimédias doit être présent;
- L'accès à un forum où les salariés publient des textes doit être présent ;
- Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
- Le ou la chargé(e) de communication Groupomania doit pouvoir modérer les interactions entre salariés

# Environnements

## Frontend

**Outil utilisé :**
- Vuejs (Vue Router, Vuex)
- Sass

**Démarrer le serveur front :**
- Ouvrir le dossier frontend et exécuter npm install pour installer les dépendances.
- Exécuter npm run serve pour lancer le serveur.
- Se rendre sur http://localhost:8080.

## Backend

**Outils utilisés :**
- Framework: Express
- Serveur: Nodejs
- Base de données : MySQL
- ORM : Sequelize
- Langages: JavaScript, SQL

**Démarrer le serveur back :**
- Ouvrir le dossier backend et exécuter npm install pour installer les dépendances.
- Dans le dossier backend, créer un fichier .env et intégrer les variables suivantes :
    - "DB_NAME=" suivi du nom à donner à la BDD
    - "DB_USERNAME=" suivi du nom d'utilisateur pour l'accès à la BDD
    - "DB_PASSWORD=" suivi du mot de passe lié à l'utilisateur ayant les droits d'accès à la base
    - "DB_HOST=127.0.0.1"
    - "TOKEN=" suivi de la chaîne de caractères à utiliser pour la création du token
- Lancer la commande npx sequelize-cli db:create
- Lancer la commande npx sequelize-cli db:migrate
- Lancer la commande nodemon server.