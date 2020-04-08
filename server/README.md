# API

- [API](#api)
  - [Responsable](#responsable)
  - [Schemas] (#schema) 
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
  - [Lancer serveur (v1)](#lancer-serveur-v1)
  - [Routes doc (temporary)](#routes-doc-temporary)

## Responsable

- Pierre-Alexis KRSTIC
## Schemas
- MCD : https://drive.google.com/open?id=1UMMQUOhA-LHNeCp8qDGUCWP6EIRUp916
- Uses Cases : https://drive.google.com/open?id=1tM9b8GaIkdVRMG6M4u-KDcKa3gEFmw25

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

## Lancer serveur (v1)
  - lancer mongo sur votre machine
  - [a la racine] executer npm start server

## Routes doc (temporary)
**feature Gestion couverture terrain: CRUD Hotel :**
  - **_/hotels_** : get All
    - @method : GET
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model Hotel
        - (string) : error message

  - **_/hotels/get/:id_** : get hotel by id :id
    - @method : GET
    - @param : (string) : id Hotel
    - @return : mixed 
        - (Object JSON) : object model Hotel
        - (string) : error message

  - **_/hotels/add_** : ajouter un hotel
    - @method : POST
    - @param : (Object JSON) : object Hotel conforme au schema (voir schema)
    - @return : (string) : error/confirm message

  - **_/hotels/edit/:id_** : editer l'hotel ayant l'id :id
    - @method : POST
    - @param : (string) : id Hotel
    - @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
          "fieldX" : (string) nom champ conforme au naming du model Hotel
        "newValue" : mixed 
            (string) / (integer) / (integer/string : UTC timestamp) pour les types date

  - **_/hotels/delete/:id_** : supprimer l'hotel ayant l'id :id
    - @method : DELETE
    - @param : (string) : id Hotel
    - @return : (string) : error/confirm message

**feature Gestion couverture terrain: Creer equipes :**
  - **_/gestion/equipes_** : get All
    - @method : GET
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model Equipe (= Assoc_user_user)
        - (string) : error message

  - **_/gestion/get/:iduser_** : get equipe by id
    - @method : GET
    - @param : (string) : id Equipe
    - @return : mixed 
        - (Object JSON) : object model Equipe (= Assoc_user_user)
        - (string) : error message

  - **_/gestion/equipes/users_** : afficher les utilisateurs non (encore) associés en equipe
    - @method : GET
    - @param : void
    - @return : (array[ (JSON Object{_id, nom, prenom}) ]) : tableau d'Users non associé ds une equipe

  - **_/creer/:idusera/:iduserb_** : associer User A avec User B
    - @method : POST
    - @param : (string) : id User A
    - @param : (string) : id User B
    - @return : (string) : error/confirm message

  - **_/users/delete/:id_** : effacer equipe
    - @method : DELETE
    - @param : (string) : id Equipe
    - @return : (string) : error/confirm message

**feature Plannification visite: Plannifier visite (avec algo suggestion) :**
  (INC)

**feature Gestion utilisateur : CRUD User :**
  - **_/users_** : get All
    - @method : GET
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model User
        - (string) : error message

  - **_/users/get/:id_** : get user by id
    - @method : GET
    - @param : (string) : id User
    - @return : mixed 
        - (Object JSON) : object model User
        - (string) : error message

  - **_/users/add_** : ajouter un user
    - @method : POST
    - @param : (Object JSON) : object User conforme au schema (voir schema)
    - @return : (string) : error/confirm message

  - **_/users/edit/:id_** : editer l'user ayant l'id :id
    - @method : POST
    - @param : (string) : id User
    - @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
          "fieldX" : (string) nom champ conforme au naming du model Hotel
          "newValue" : mixed 
              (string) / (integer) / (integer/string : UTC timestamp) pour les types date

  - **_/users/delete/:id_** : supprimer l'user ayant l'id :id
    - @method : DELETE
    - @param : (string) : id User
    - @return : (string) : error/confirm message

**feature CRUD Urgence :**
  - **_/urgences_** : get All
    - @method : GET
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model Urgence
        - (string) : error message

  - **_/urgences/get/:id_** : get urgence ayant l'id :id
     - @method : GET
    - @param : (string) : id Urgence
    - @return : mixed 
        - (Object JSON) : object model Urgence
        - (string) : error message

  - **_/urgences/add_** : ajouter un urgence
    - @method : POST
    - @param : (Object JSON) : object Urgence conforme au schema (voir schema)
    - @return : (string) : error/confirm message

  - **_/urgences/edit/:id_** : editer l'urgence ayant l'id :id
    - @method : POST
    - @param : (string) : id Urgence
    - @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
          "fieldX" : (string) nom champ conforme au naming du model Urgence
          "newValue" : mixed 
              (string) / (integer) / (integer/string : UTC timestamp) pour les types date

  - **_/urgences/delete/:id_** : supprimer l'urgence ayant l'id :id
    - @method : DELETE
    - @param : (string) : id Urgence
    - @return : (string) : error/confirm message
