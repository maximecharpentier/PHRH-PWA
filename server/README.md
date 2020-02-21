# API

- [API](#api)
  - [Responsable](#responsable)
  - [Choix techniques](#choix-techniques)
    - [1. Express](#1-express)
      - [Pourquoi nous l'utilisons](#pourquoi-nous-lutilisons)
      - [Comment nous l'utilisons](#comment-nous-lutilisons)
    - [2. Mongoose](#2-mongoose)
      - [Pourquoi nous l'utilisons](#pourquoi-nous-lutilisons-1)
      - [Comment nous l'utilisons](#comment-nous-lutilisons-1)
    - [3. Swagger](#3-swagger)
      - [Pourquoi nous l'utilisons](#pourquoi-nous-lutilisons-2)
      - [Comment nous l'utilisons](#comment-nous-lutilisons-2)

## Responsable

- Pierre-Alexis KRSTIC

## Choix techniques

### 1. Express

#### Pourquoi nous l'utilisons

Nous utilisons `Express` car: 
  - c'est **open-source**
  - c'est un middleware très **rapide à mettre en place** et très performant car basé sur `Node.js`. 
  - il s'adapte parfaitement à des **librairies de manipulation de technologies de bases de données** comme `MongoDB`. 
  - il permet de gérer les **ressources serveurs** avec la même technologie que celle utilisée pour le front (`Javascript ES6`), ce qui uniformise les compétences nécessaires pour maintenir l'application, **rendant son coût de maintien plus faible**.
  - standard (OAS) et très populaire car **adapté aux applications de cette taille**.

#### Comment nous l'utilisons

Connection au service `mongoDB`, **création des routes de l'API**.

### 2. Mongoose

#### Pourquoi nous l'utilisons

Nous utilisons `Mongoose` car:
  - c'est un package standard (encouragé par NodeJS) pour la **gestion d'écriture/lecture de données dans une base MongoDB**.

#### Comment nous l'utilisons

Mongoose est utilisé pour **réaliser** et **contrôler** les modèles d'entités de la base de donnée et dans les routes pour **manipuler la donnée métier**.

### 3. Swagger

#### Pourquoi nous l'utilisons

Nous utilisons `Swagger` car/pour:
  - c'est un projet **open-source** chapoté par la **Linux Fondation**.
  - il y a une **génération automatisée de la documentation**.
  - Auteur du standart OAS pour une visualisation/configuration de l'API.
  - le **monitoring** et la **gestion** à la volée des **clefs d'accès à l'API**

#### Comment nous l'utilisons

En cours d'étude
