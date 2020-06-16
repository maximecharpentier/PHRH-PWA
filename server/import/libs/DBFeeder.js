const path = require('path');
const XLSXHelper = require('./module_xlsx.helper');
const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const Visite = mongoose.model('Visite');
const User = mongoose.model('User');
const Anomalie = mongoose.model('Anomalie');
const Assoc_user_visite = mongoose.model('Assoc_User_Visite');
const Assoc_user_user = mongoose.model('Assoc_User_User');
const Priorisation = mongoose.model('Priorisation');
const Tache = mongoose.model('Tache');
const Urgence = mongoose.model('Urgence');
const Vehicule = mongoose.model('Vehicule');

class DBFeeder {

  /**
   * @param : mappingFile : object : contient le fichier json de mapping pour constituer le tableau de données a inserer, a partir de fichiers sources externes
   * @param : objectDatas : (optionnal) object : objet contenant les données à inserer (voir data.sample.json)
   */
  constructor(mappingFile, objectDatas) {
    this.datasToInsert =  objectDatas ? objectDatas : {} 
    this.mappingFile =    mappingFile ? mappingFile : {} 
    this.pathSources =    './import/sources/' //emplacement des données sources pour le mapping
  }

  /** 
   * @desc : command de netpyage de la base de donnée
   * @retur : void
   */
  static async resetDB() {
    await Hotel.deleteMany({})
    await Visite.deleteMany({})
    await User.deleteMany({})
    await Anomalie.deleteMany({})
    await Assoc_user_visite.deleteMany({})
    await Assoc_user_user.deleteMany({})
    await Priorisation.deleteMany({})
    await Tache.deleteMany({})
    await Urgence.deleteMany({})
    await Vehicule.deleteMany({})
  }

  /**
   * @desc Fonction chapeau pour build puis lancer l'insertion (historique : 
   * l'insertion a été crées al abase pour les données de test et est réutilisé 
   * telle quelle ici une pour inseser le tableau build)
   * @param {callback} cbconfirm 
   * @param {callback} cberror 
   * @param {bool} deleteOldValues 
   */
  async importData(cbconfirm, cberror, deleteOldValues) {
    const buildOk = await this.buildDatasToInsert()
    if(buildOk !== this.BUILD_DATA_FAILED){
      this.insertData(cbconfirm, cberror, deleteOldValues)
    }
    else{
      console.log('le build des données à échoué, l\'insertion ne peux etre éfféctué')
    }
  }

  /**  
   * @desc : fonction d'insertion du fichier de données json dans la base mongoDB
   * @param : cbconfirm : call back : cb success
   * @param : cberror : call back : cb erreur
   * @param : deleteOldValues : bool : reset la base de donnée
   * @param : insertTestAssocEntities : bool : inserer des associations : équipes
   * @return : void
   */
  async insertData(cbconfirm, cberror, insertTestAssocEntities) {
    //Begin : Inserer Hotels & Visites associées
    for (const [index, hotel] of this.datasToInsert.hotels.entries()) {
      //inserer Hotel
      const hotelObj = new Hotel({
        uid_internal: hotel.uid_internal ? hotel.uid_internal : null,
        nom: hotel.nom,
        adresse: hotel.adresse,
        cp: hotel.cp,
        ville: hotel.ville,
        nb_chambres_utilise: hotel.nb_chambres_utilise,
        nb_visites_periode: hotel.nb_visites_periode,
        last_time_visited: hotel.nb_visites_periode ? hotel.nb_visites_periode : null,
        /////#Outdated : traiter a part
        urgences: hotel.urgences ? hotel.urgences : null,
        anomalies: hotel.anomalies ? hotel.anomalies : null,
        taches: hotel.taches ? hotel.taches : null
        /////
      });
      const HotelDB = await Hotel.insertIfNotExist(hotelObj);
      if (HotelDB) {
        //confirmation Hotel
        cbconfirm(
          "<< Hotel " + (index + 1) + "/" + this.datasToInsert.hotels.length + " inséré >>"
        );
        //Begin : Inserer visites associées
        for (const [index, visite] of this.datasToInsert.visites.entries()) {
          //Insere Visites associés a l'Hotel tout juste inséré
          if (visite.hotel_id === hotel.uid_internal) {
            const visiteObj = new Visite({
              uid_internal: visite.uid_internal,
              hotel_id: HotelDB._id,
              date_visite: new Date(visite.date_visite),
              note: visite.note,
              ville: visite.ville,
              duree: visite.duree,
              type: visite.type,
              visite_effectue: visite.visite_effectue ? visite.visite_effectue : true
            });
            const VisiteDB = await Visite.insertIfNotExist(visiteObj);
            if (VisiteDB) {
              cbconfirm(
                "<< Visite " +
                  (index + 1) +
                  "/" +
                  this.datasToInsert.visites.length +
                  " inséré >>"
              );
            }
          }
        }
        //End : Inserer visites associées

        //Set Hotel base value
      }
      else{
        cberror(HotelDB + " invalide")
      }
    }
    //End : Inserer Hotels & Visites associées

    //Begin : Inserer Users (User) ans related Entities (Assoc_user_user, Assoc_user_visite)
    const visitesDB = await Visite.find({});
    const usersIntervenant_ids = []
    if (visitesDB) {
      const visites_ids = visitesDB.map(visite => visite._id);
      for (const [index, user] of this.datasToInsert.users.entries()) {
        //Begin : Inserer User "Gestionnaire"
        if (user.fonction === "Superviseur") {
          const userPlannif = new User({
            nom: user.nom,
            prenom: user.prenom,
            pwd: user.pwd,
            fonction: user.fonction,
            adresse: user.adresse,
            secteur: user.secteur,
            jour_bureau: user.jour_bureau,
            vehicule_id: user.vehicule_id
          });
          const userPlannifDB = await User.insertIfNotExist(userPlannif);
          if (userPlannifDB) {
            cbconfirm(
              "<< User " + (index + 1) + "/" + this.datasToInsert.users.length + " inséré >>"
            );
          }
        }
        //End : Inserer User "Gestionnaire"
        //Begin : Inserer User "Intervenant terrain"
        else {
          const userIntervenant = new User({
            nom: user.nom,
            prenom: user.prenom,
            pwd: user.pwd,
            fonction: user.fonction,
            adresse: user.adresse,
            secteur: user.secteur,
            jour_bureau: user.jour_bureau,
            vehicule_id: user.vehicule_id,
          });
          const userIntervenantDB = await User.insertIfNotExist(
            userIntervenant
          );
          if (userIntervenantDB) {
            //noter id pour après
            usersIntervenant_ids.push(userIntervenantDB._id)

            //confimer insertion
            cbconfirm(
              "<< User " + (index + 1) + "/" + this.datasToInsert.users.length + " inséré >>"
            );
            //#ICI a definir : une methode qui lit le tableau visites_ids dataToInsert.users, qui fait correspondre le contenu avec les visites en BD et crée l'association assoc_user_visite
            /////////// tmp : insertion de relations de test
            if(insertTestAssocEntities) {
              //Begin - Inserer Assoc Visites / user
              for (const [index, visite_id] of visites_ids.entries()) {
                const assoc = new Assoc_user_visite({
                  user_id: userIntervenantDB._id,
                  visite_id: visite_id,
                  date: null
                });
                const assocDB = await Assoc_user_visite.insertIfNotExist(assoc);
                if (assocDB) {
                  cbconfirm(
                    "<< Association " +
                      (index + 1) +
                      "/" +
                      visites_ids.length +
                      " inséré >>"
                  )
                }
              }
              //End - Inserer Assoc Visites / user
            }
            ///////////
          }
        }
        //End : Inserer User "Intervenant"
      }
      /////////// tmp : insertion de relations de test
      if(insertTestAssocEntities) {
        //Begin : Inserer equipes
        if(usersIntervenant_ids.length > 0) {
          const assoc_user_user = new Assoc_user_user({
            user_a_id: usersIntervenant_ids[0],
            user_b_id: usersIntervenant_ids[1],
            plage_h: 'Matin',
            secteur_binome: '91'
          });
          const assoc_user_userDB = await Assoc_user_user.insertIfNotExist(assoc_user_user);
          if (assoc_user_userDB) {
            cbconfirm("<< Equipe 1 créée >>")
          } else {
            cberror("erreur d\'insertion de l'equipe 1")
          }
          //End : Inserer equipes
        }
      }
      ///////////
    }
    //End : Inserer Users ans related Entities

    //Begin : Inserer Vehicules
    for (const [index, vehicule] of this.datasToInsert.vehicules.entries()) {
      const vehiculeObj = new Vehicule({
        immatriculation: vehicule.immatriculation,
        type: vehicule.type,
        adresse_parking: vehicule.adresse_parking,
        cp: vehicule.cp,
        ville: vehicule.ville
      });
      const vehiculeDB = await Vehicule.insertIfNotExist(vehiculeObj);
      if (vehiculeDB) {
        cbconfirm(
          "<< Vehicule " + (index + 1) + "/" + this.datasToInsert.vehicules.length + " inséré >>"
        );
      } 
    }
    //End : Inserer vehicules
    console.log('Insertion des données terminée')
  }

  /**
   * @desc : build le tableau dataToInsert à partir de mapping 
   * (historique: l'insertion d'un tableau de test format json 
   * a été implémentée en premier, par contrainte de temps j'ai 
   * décidé pour l'import de données de rebuild un tableau 
   * identique en structure au tableau utilisé pour inserer 
   * les données de test, pour ensuite executer l'insertion avec)
   */
  async buildDatasToInsert() {
    //cette partie sert a parcourir les fichiers de reference pour peupler les entité, 
    //ensuite la fonction de recuperation de la valeur en fonciton du mapping, elle, ouvre 
    //les fichiers dont elle a besoin ou la BD cas echéant

    //init datas structure to insert les entite de base
    this.datasToInsert.hotels =    []
    this.datasToInsert.users =     []
    this.datasToInsert.visites =   []
    this.datasToInsert.vehicules = []

    /*
     * Construction de l'objet data conformément a data.sample
     */
    //Entités : Hotel
    const hotels = await this.importEntities('hotel', 2)
    if(hotels !== this.IMPORT_FAILED) {
      this.datasToInsert.hotels = hotels
    }
    else{
      console.log('la construction du tableau d\'Hotel a échoué')
      return this.BUILD_FAILED
    }

    //Entités : User
    const users = await this.importEntities('user', 2)
    if(users !== this.IMPORT_FAILED) {
      this.datasToInsert.users = users
    }
    else{
      console.log('la construction du tableau d\'Users a échoué')
      return this.BUILD_FAILED
    }

    //Entités : Vehicule
    const vehicules = await this.importEntities('vehicule', 2)
    if(vehicules !== this.IMPORT_FAILED) {
      this.datasToInsert.vehicules = vehicules
    }
    else{
      console.log('la construction du tableau de Vehicules a échoué')
      return this.BUILD_FAILED
    }

    //Entités : visites
    const visites = await this.importEntities('visite', 2)
    if(visites !== this.IMPORT_FAILED) {
      this.datasToInsert.visites = visites
    }
    else{
      console.log('la construction du tableau de Visites a échoué')
      return this.BUILD_FAILED
    }

    /*
     * UPDATE SPECIAL VALUES (aggregates) OF ENTITES
     */
    //inserer agreggats sur hotels "nb_visites_periode" & "last_time_visited" & "note"
    this.datasToInsert.visites.forEach(visite => {
      let uid_hotel = visite.hotel_id

      this.datasToInsert.hotels.forEach(hotel => {
        if(hotel.uid_internal == uid_hotel) {
          //nb_visites_periode
          hotel.nb_visites_periode++
          //last_time_visited
          hotel.last_time_visited = visite.date_visite
          //note
          hotel = visite.note
        }
      })
    })
    
    /*
     * ADD OTHER INFOS
     */
    //inserer un utilisateur administrateur
    const refDocAbsPath = path.resolve(this.pathSources + this.mappingFile['user'].ref_file_name)
    const refDocFileReader = new XLSXHelper(refDocAbsPath)
    refDocFileReader.setFirstSheetAsCurrentSheet()
    const userAdmin = await this.fillEntityFromMapping(refDocFileReader, 3, 'user') //tmp : "3" ligne choisie arbitrairement
    userAdmin.fonction = 'Superviseur'
    userAdmin.nom = 'admin'
    userAdmin.prenom = 'admin'
    userAdmin.pwd = 'admin'
    this.datasToInsert.users.push(userAdmin)

    //si on arrive ici c'est que l'import s'est bien déroulé
    return true
  }

  /** 
   * @desc : fonction pour importer une entité de base dans le tableai dataToInsert 
   * @param entityName       : (string)  : nom de l'entité
   * @param refDocAbsPath    : (string)  : path de fichier absolue vers le fichier de référence pour le parcours
   * @param beginLineRefDoc  : (integer) : ligne a partir de laquelle commencer la lecture du ref doc (numéroté a partir de 1) (=2 : revient a sauter la première ligne)
   * @return mixed : 
   *    baseEntityArray : (array) : tableau d'objet d'entité de base (Hotel, User, Visite & Vehicule) exportés depuis les fichiers sources pour insertion dans BD
   *    (string) error message IMPORT_ENTITY_FAILED | BUILD_ENTITY_ARRAY_FAILED | GLOBAL_IMPORT_FAIL
   */
  async importEntities(entityName, beginLineRefDoc) {
    /////Affichage avancement
    let prev10Percent = 0
    /////Affichage avancement

    const baseEntityArray = []
    /*
     * INSERTION ENTITE DE BASE
     */
    //init tool pour lire fichiers xlsx
    const refDocAbsPath = path.resolve(this.pathSources + this.mappingFile[entityName].ref_file_name)
    const refDocFileReader = new XLSXHelper(refDocAbsPath)
    if(!refDocFileReader.error) {
      //set file reader avec le fichier de référence
      refDocFileReader.setFirstSheetAsCurrentSheet()    
      //parcourir le fichier de référence
      console.log("Construction du tableau d\'entités '" + entityName + "' en cours ...")
      
      /////Affichage avancement
      prev10Percent = 0
      /////Affichage avancement

      let parcoursState = await refDocFileReader.forEachLine(
        beginLineRefDoc, 
        null, 
        async (line) => {

          ///////Affichage avancement
          let avancement = line * 100 / refDocFileReader.getNbLines()
          let value = Math.floor(avancement/10)
          if(value > prev10Percent && value <=10) {
            console.log(value * 10 + "%")
            prev10Percent = value
          } 
          ///////Affichage avancement

          let baseEntity = await this.fillEntityFromMapping(refDocFileReader, line, entityName)
           //test si la propriété s'est set correctement
          if(baseEntity === this.SET_PROP_FAILED) {
            //return this.FILL_ENTITY_FAILED
            return this.IMPORT_FAILED
          }
          if(baseEntity === this.SKIP_ENTITY) {
            return refDocFileReader.SKIP_LINE
          }
          else{
            baseEntityArray.push(baseEntity)
          }
        }
      )
      //test si le parcours s'est déroulé correctement
      if(parcoursState === refDocFileReader.END_OF_FILE) {
        console.log("tableau d\'entités '" + entityName + "' peuplé")
        return baseEntityArray
      }
      else{
        console.log("erreur de construction du tableau d'entités \'" + entityName + "'")
        //return this.BUILD_ENTITY_ARRAY_FAILED
        return this.IMPORT_FAILED
      }
    } else {
      console.log(refDocFileReader.error)
      return this.IMPORT_FAILED
    }
  }

  /** 
   * @desc : fonction recurssive qui depuis un fichier de reference va creer peupler l'entité grace au fichier de mapping et inserer l'entité dans le tableau final pour insertion
   * @param : refDocFileReader : classe outil du module du file reader choisit (ici module xlsx)
   * @param : entityName : nom de l'entité a extraire
   * @param : ligne courante : pour le parcours du fichier de reference, ligne en cours d'analyse
   * @return : mixed : (objet) EntityName / (string) erreur message FILL_ENTITY_FAILED
   */
  async fillEntityFromMapping(refDocFileReader, currentLine, entityName) {
    //creer et peupler hotel model
    let entity = {entityName}
    for (const [propEntity, mapObject] of Object.entries(this.mappingFile[entityName])) {
      //seule propriété a ne pas check
      if(propEntity == 'ref_file_name') continue

      //set la valeur de l'atribut en fonction des infos de mapping
      let propValue = await this.setAttrFromMapping(refDocFileReader, currentLine, mapObject)

      //test si la propriété s'est set correctement
      if(propValue === this.SET_PROP_FAILED) {
        return this.FILL_ENTITY_FAILED
      }
      if(propValue === this.JOIN_FAILED) {
        return this.SKIP_ENTITY
      }
      else{
        entity[propEntity] = propValue
      }
    }
    //fileReader prend l + 1
    currentLine++
    //cbconfirm(Hotel pret pour insertion)
    //rappel pour ligne suivante
    return entity
  }

  /** 
   * @desc permet de lire une ligne du fichier de mapping afin de recuperer la bonne valeur a inserer pour l'entité courante du fichier de référence
   * @param : refSheetFileReader : objet module_xlsx, helper de manipulation de l'outil de lecture du fichier
   * @param : propName : propriété de l'entité en cours de traitement
   * @param : currentLine : ligne du fichier
   * @return : mixed : (mixed) valeur de l'attribut / (string) message d'erreur du reader
   */
  async setAttrFromMapping(refDocFileReader, currentLine, mapObject){
    let cellToRead //celle to read est la cellule qui contient l'info : soi t ds le doc joint, soit dans le doc de reference
    let propValue //propValue est la valeur lue par le fileReader a l'adresse de cellToRead

    //parcours du mapObject pour recuperer la valeur a assigner a la propriété courante de entityName
    for(const key in mapObject) {
      let mapInfo = mapObject[key]
      switch(key) {
        case "col" :
          //cellToRead = cellule(currentLine, col) (1)
          cellToRead = mapInfo + currentLine
          //si la clé join est présente alors la valeur proviens d'ailleur que le doc de ref et elle se set plus tard dans le cas "join"
          //sinon la valeur est dans le fichier de référence, il faut la set tout de suite
          if(!mapObject["join"]) {
            propValue = refDocFileReader.getCellValue(cellToRead)
          }
          break

        case "join" :
          //si la cellule est bien set sinon erreur
          if(cellToRead) {
            //init vars
            const joinPropValue = refDocFileReader.getCellValue(cellToRead) //la valeur de jointure = la valeur de la cellule du fichier "file" (au dessus de "join") (a confition que le "fil" soit egal au fichier)
        
            //- depuis un fichier à la cellule correspondate
            //set le reader du fichier a joindre
            const fileAbsPath = path.resolve(this.pathSources + mapInfo['file']) //set absolute filepath of the file
            const iftJoinedFileReader = new XLSXHelper(fileAbsPath) //init tool pour lire fichiers xlsx
            //si pas d'erreur d'instanciation du reader
            if(!iftJoinedFileReader.error) {
              iftJoinedFileReader.setFirstSheetAsCurrentSheet() //set file reader avec le fichier a joindre
              //parcourir fichier a joindre, a la recherche de la ligne contenant la propriété de jointure "on" = joinPropValue
              const linePropValue = await iftJoinedFileReader.forEachLine(
                1, 
                null, 
                (line) => {
                  //coordonnées de la valeur de jointure recherchée dans la feuille jointe
                  let coordToCheck = mapInfo['on'] + line 
                  //stoper quand la ligne avec la valeur de jointure a été trouvée
                  if(iftJoinedFileReader.getCellValue(coordToCheck) === joinPropValue) {
                    return line
                  }
                }
              )
              //si ligne trouvées get la valeur de l'attribut 
              if(linePropValue !== iftJoinedFileReader.LINE_NOT_FOUND) {
                propValue = iftJoinedFileReader.getCellValue(mapInfo['get'] + linePropValue)
              }
              //sinon informer que la jointure a retourné un resultat vide
              else {
                console.log('[skip visite] cause : jointure échouée, valeur < '
                  + joinPropValue +
                  ' > absente de < ' 
                  + mapInfo['file'] + 
                  ' > à la position < ' 
                  + mapInfo['on'] + 
                  ' >')
                return this.JOIN_FAILED
              }
            }
            //si erreur d'instanciation du reader
            else{
              console.log(iftJoinedFileReader.error)
              return this.SET_PROP_FAILED
            }
            
          }
          else{
            console.log('cellule non set')
          }
          break

        case "default" :
          propValue = mapInfo
          break

        case "function_parse_name" :
          switch(mapInfo) {
            case "parseTimeStampFromDateDDMMAAA" :
              propValue = this.parseTimeStampFromDateDDMMAAA(propValue)
              break
          }
          break
      }
    }
    //console.log(propValue)
    return propValue
  }

  /* 
   * 
   */
  parseTimeStampFromDateDDMMAAA(rawDate) {
    //convertir date du fichier en date JS correct
    return XLSXHelper.getJSDateFromExcellDate(rawDate)
  }
}

DBFeeder.BUILD_FAILED = "la construction du tableau de données a inserer a échoué"
DBFeeder.SET_PROP_FAILED = "la propriété de l\'entité n\'a pas pu se set"
DBFeeder.JOIN_FAILED = "la jointure a échouée"
DBFeeder.FILL_ENTITY_FAILED = "l'entité n'a pas pu se set"
DBFeeder.IMPORT_ENTITY_FAILED = "l'entité ne peux etre importée"
DBFeeder.SKIP_ENTITY = "passer a l'entité suivante"
DBFeeder.BUILD_ENTITY_ARRAY_FAILED = "erreur de construction du tableau d'entités"
DBFeeder.IMPORT_FAILED = "l'importation des entités a échoué"

module.exports = DBFeeder;