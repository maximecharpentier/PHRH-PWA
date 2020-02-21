# Client app

- [Client app](#client-app)
  - [People in charge](#people-in-charge)
  - [Technical choices](#technical-choices)
    - [1. Express](#1-express)
      - [How we are using it](#how-we-are-using-it)
    - [2. Mongoose](#2-mongoose)
      - [How we are using it](#how-we-are-using-it-1)
    - [3. etc...](#3-etc)
      - [How we are using it](#how-we-are-using-it-2)

## People in charge

- Pierre-Alexis KRSTIC

## Technical choices

### 1. Express

We use `Express` because: 
  - Open source
  - Middleware très rapide à mettre en place et très performant car basé sur la technologie Node.js. 
  - Il s'adapte parfaitement à des librairies de manipulation de technologies de bases de données comme MongoDB. 
  - Il permet de gerer les resources serveurs avec la meme technologies que celle utilisée pour le front (Javascript ES6) ce qui uniformise les competences nescessaire pour maintenir l'application, rendant son cout de maintient plus faible.
  - Standart (OAS) et très populaire car adapté aux applications de cette taille.

#### How we are using it
Connection au service mongoDB, création des routes de l'API.

### 2. Mongoose

We use `Mongoose` because ...
  - Package standart (encouragé par NodeJS) pour la gestion d'ecriture/lecture de données dans une base MongoDB.

#### How we are using it
Mongoose est utilisé pour réaliser et controller les models de d'entités de la base de donnée et dans les routes pour manipuler la donnée metier.

### 3. Swagger

We use `etc...` because ...
  - Projet Open Source chapoté par la Linux Fondation.
  - Genération automatisée de la documentation.
  - Auteur du standart OAS pour une visualisation/configuration de l'API.
  - Pour le monitoring et la gestion à la volée des clefs d'accès à l'API

#### How we are using it
En cours d'étude

### 3. "sécurisation de l'API"

We use `etc...` because ...
  - Sécurise via un system robuste chaques requettes

#### How we are using it
En cours d'étude