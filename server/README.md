# API

- [API](#api)
  - [Responsable](#responsable)
  - [Schemas](#schemas) 
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
  - [Insertion données réelles](#insertions-données-réelles)

## Responsable

- Pierre-Alexis KRSTIC

## Schemas
- MCD : https://drive.google.com/file/d/12eNoJk4cU_rhuOTO6lgLC-cS2hcC9raa/view?usp=sharing
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
  - [a la racine] executer **npm start**

## Routes doc (temporary)
**feature Gestion couverture terrain: CRUD Hotel :**
  - **_/hotels_** : get All
    - @method : GET
    - @auth : dans l'entete de la requette "Authorisation" doit contenir le token
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model Hotel
        - (string) : error message

  - **_/hotels/get/:id_** : get hotel by id :id
    - @method : GET
    - @param {string} : id Hotel
    - @return : mixed 
        - (Object JSON) : object model Hotel
        - (string) : error message

  - **_/hotels/add_** : ajouter un hotel
    - @method : POST
    - @param : (Object JSON) : object Hotel conforme au schema (voir schema)
    - @return : (string) : error/confirm message

  - **_/hotels/edit/:id_** : editer l'hotel ayant l'id :id
    - @method : POST
    - @param {string} : id Hotel
    - @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
          "fieldX" : (string) nom champ conforme au naming du model Hotel
        "newValue" : mixed 
            (string) / (integer) / (integer/string : UTC timestamp) pour les types date

  - **_/hotels/delete/:id_** : supprimer l'hotel ayant l'id :id
    - @method : DELETE
    - @param {string} : id Hotel
    - @return : (string) : error/confirm message

  - **_/hotels/add/:id/memo_** : ajouter memo sur un Hotel
    - @method : POST
    - @param {string} id : id de l'Hotel auquel ajouter le mémo
    - @param (Object JSON) : { "message" : (string) "contenu du mémo" }
    - @return : (string) : error/confirm message

  - **_/hotels/get/:id/memos_** : get les memos d'un hotel
    - @method : GET
    - @param {string} id : Id de l'hotel ou ajouter le mémo
    - @return : {mixed} 
        - (array[ (Object JSON) ]) : tableau d'object mémos de l'Hotel
        - (string) : error message

**feature Gestion couverture terrain: Creer equipes :**
  - **_/gestion/equipes_** : get All
    - @method : GET
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object { equipe: model Equipe, 
                                                        user_names: {
                                                          user_a: (string), 
                                                          user_b: (string)
                                                      }}
        - (string) : error message

  - **_/gestion/get/:iduser_** : get equipe by id
    - @method : GET
    - @param {string} : id Equipe
    - @return : mixed 
        - (Object JSON) : object model Equipe (= Assoc_user_user)
        - (string) : error message

  - **_/gestion/equipes/users_** : afficher les utilisateurs non (encore) associés en equipe
    - @method : GET
    - @param : void
    - @return : (array[ (JSON Object{_id, nom, prenom}) ]) : tableau d'Users non associé ds une equipe

  - **_/creer/:idusera/:iduserb_** : associer User A avec User B
    - @method : POST
    - @param {string} : id User A
    - @param {string} : id User B
    - @return : (string) : error/confirm message

  - **_/users/delete/:id_** : effacer equipe
    - @method : DELETE
    - @param {string} : id Equipe
    - @return : (string) : error/confirm message

**feature Plannification visite: Plannifier visite (avec algo suggestion) :**
  - **_/gestion/visites_** : get all visites
    - @method : GET
    - @param : void
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model Visite
        - (string) : error message

  - **_/gestion/visites/get/forhotel/:idhotel_** : get all visites pour un Hotel
    - @method : GET
    - @param {string} : id Hotel
    - @return : mixed 
        - (Object JSON) : tableau d'object model Visite pour un Hotel
        - (string) : error message

  - **_/gestion/visites/get/foruser/:iduser_** : get all visites pour un User
    - @method : GET
    - @param {string} : id User
    - @return : mixed 
        - (Object JSON) : tableau d'object model Visite pour un User
        - (string) : error message
  
  - **_/gestion/visites/get/forequipe/:idequipe_** : get all visites pour une Equipe
    - @method : GET
    - @param {string} : id User
    - @return : mixed 
        - (Object JSON) : tableau d'object {visite: Visite model, user_assoc: (string) id, name: (string) user name en texte formaté
        - (string) : error message

  - **_/gestion/visites/get/:id_** : get visite by id
    - @method : GET
    - @param {string} : id Visite
    - @return : mixed 
        - (Object JSON) : object model Visite
        - (string) : error message

  - **_/gestion/visites/plannifier/_** : plannifier une visite (equivalent à add) pour un user ou pour une equipe
    - @method : POST
    - @param : {Object JSON} : object Visite restreint & custom {
        user_id | equipe_id : (string) id entité Equipe ou User
        hotel_id: (string) 
        date_visite: (string)
        duree : (int) 
        type :  (string) "Visite ou "Contre-visite"
      }
    - @return : (string) : error/confirm message
    
  - **_/gestion/visites/edit/:id_** : plannifier une visite (equivalent à add)
    - @method : POST
    - @param {string} : id Visite
    - @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
        "fieldX" : (string) nom champ conforme au naming du model Visite
        "newValue" : mixed 
            (string) / (int) / UTC timestamp (int/string)) pour les types date
    - @return : mixed 
        (array) : tableau d'objet model Visite
        (string) : error message

  - **_/gestion/visites/delete/:id_** : supprimer la visite ayant l'id :id
    - @method : DELETE
    - @param {string} : id Hotel
    - @return : (string) : error/confirm message 

  - **_/gestion/visites/suggestions_** : supprimer la visite ayant l'id :id
    - @method GET
    - @param {object} : objet filter (seul le secteur est dispo a l'heure acteulle) {"filters": {"secteur": X}}
    - @return : array[ (Object JSON) ] : tableau d'object HotelRank

  - **_/gestion/visites/cr/hotel/planned/foruser/:id_** : get les hotels des visites plannifiées et non effectuées pour l'user ayant l'id :id
    - @method GET
    - @param {id} : id User
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object Visite peuplé avec l'hotel
        - (string) : error message

  - **_/gestion/visites/cr/hotel/cancel/many/foruser/:id_** : get les hotels des visites plannifiées et non effectuées pour l'user ayant l'id :id
    - @method POST
    - @param GET {id} : id User
    - @param POST {object} : { visitesToCancel : [{
                              "visite_id": (string) visite id,
                              "raison": (string) le texte
                            }]
                          }
    - @return  (string) : error message 

**feature Gestion utilisateur : CRUD User :**
  - **_/users_** : get All
    - @method : GET
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model User
        - (string) : error message

  - **_/users/get/:id_** : get user by id
    - @method : GET
    - @param {string} : id User
    - @return : mixed 
        - (Object JSON) : object model User
        - (string) : error message

  - **_/users/add_** : ajouter un user
    - @method : POST
    - @param : (Object JSON) : object User conforme au schema (voir schema)
    - @return : (string) : error/confirm message

  - **_/users/edit/:id_** : editer l'user ayant l'id :id
    - @method : POST
    - @param {string} : id User
    - @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
          "fieldX" : (string) nom champ conforme au naming du model Hotel
          "newValue" : mixed 
              (string) / (integer) / (integer/string : UTC timestamp) pour les types date

  - **_/users/delete/:id_** : supprimer l'user ayant l'id :id
    - @method : DELETE
    - @param {string} : id User
    - @param : POST (object JSON) : { deleteEquipe = (string) true/false }
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
    - @param {string} : id Urgence
    - @return : mixed 
        - (Object JSON) : object model Urgence
        - (string) : error message

  - **_/urgences/add_** : ajouter un urgence
    - @method : POST
    - @param : (Object JSON) : object Urgence conforme au schema (voir schema)
    - @return : (string) : error/confirm message

  - **_/urgences/edit/:id_** : editer l'urgence ayant l'id :id
    - @method : POST
    - @param {string} : id Urgence
    - @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
          "fieldX" : (string) nom champ conforme au naming du model Urgence
          "newValue" : mixed 
              (string) / (integer) / (integer/string : UTC timestamp) pour les types date

  - **_/urgences/delete/:id_** : supprimer l'urgence ayant l'id :id
    - @method : DELETE
    - @param {string} : id Urgence
    - @return : (string) : error/confirm message

**feature Gestion vehicule : CRUD Vehicule & Book vehicule :**
  - **_/vehicules_** : get All
    - @method : GET
    - @param (optionnal) : filter Object : #toDefine
    - @return : mixed 
        - (array[ (Object JSON) ]) : tableau d'object model Vehicule
        - (string) : error message

  - **_/vehicules/get/:id_** : get vehicule by id
    - @method : GET
    - @param {string} : id Vehicule
    - @return : mixed 
        - (Object JSON) : object model User
        - (string) : error message

  - **_/vehicules/add_** : ajouter un vehcule
    - @method : POST
    - @param : (Object JSON) : object Vehicule conforme au schema (voir schema)
    - @return : (string) : error/confirm message

  - **_/vehicules/book/foruser/:iduser/:idvehicule_** : book vehicule
    - @method : GET
    - @param {string} iduser : id User qui emprunte le vehicule
    - @param {string} idvehicule : id Vehicule a emprunter
    - @return : (string) : error/confirm message

  - **_/vehicules/drop/foruser/:iduser_** : rendre le vehicule (inverse de book)
    - @method : GET
    - @param {string} iduser : id User qui emprunte le vehicule
    - @param {string} idvehicule : id Vehicule a emprunter
    - @return : (string) : error/confirm message

**feature Autenthification**
  - **IDs Plannificateur/Superviseur/admin** : {nom: admin, pwd: admin}
  - **IDs Tout les autres utilisateurs** : {nom: <nom>, pwd: demodemo}
  - **"Desactiver" (=mocker passport authentification) l'authentification des requettes** : .env -> ACTIVATE_AUTH_REQUESTS = _false_

  - **_/auth/login_** : valider le login avec couple (nom, pwd) et generer le token d'authentification
    - @method : POST
    - @param Object : {nom: (string) nom user BD, pwd: (string) pwd en clair}
    - @return : Object 
      - Object JSON : { 
          success: (bool) le login a reussi/échoué, 
          token: (string) token d'authorisation), 
          expiresIn: (string) "1d" pour un jour par exemple
          }

## Insertions données réelles
  1) Telecharger TOUT les fichiers excell du dossier **Données** de **PHRH** (voir drive, fichiers 
    "partagés avec moi" sur le drive de votre compte HETIC)
  2) Placer ces fichiers dans ./server/import/**sources**
  3) Mettez a jour votre fichier **.env** avec les nouveau parametres (voir **.env.sample**)
  4) Editer le fichier ./server/**.env** à votre convenance pour l'insertion :
  - **DUMP_DB** : reset de la base de données
  - **INSERT_TEST_DB** : si a "true" inserer les données de test
  - **INSERT_REAL_DB** : si a "true" importer et inserer les données reelles
  5) Lancer le serveur express : **node server**
  6) Les données vont s'inserer, patientez jusqu'a la fin du chargement ~2min chez moi
  7) Metez la configuration de votre **.env** de nouveau a jour pour eviter :
  - de supprimer vos données eventuelement par erreur en mettant **DUMP_DB** à "false"
  - de relancer la procedure d'import pour rien en mettant **INSERT_TEST_DB** et/ou **INSERT_REAL_DB** à "false"
  7) Si vous voulez afficher votre base de données locale dans un GUI :
  - telecharger : MongoDB Compass Comunity : https://www.mongodb.com/download-center/compass (Version Community Edition Stable)
  - à l'ouverture connectez vous grace a l'url : mongodb://<**SERVER_HOST**>:27017/PHRH ou **SERVER_HOST** est defini dans .env (chez moi c'est "localhost")
