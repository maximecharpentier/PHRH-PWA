const path = require('path');
const XLSXHelper = require('./module_xlsx.helper');
const Hotel = require("./../model/hotel.model");
const Visite = require("../model/visite.model");
const User = require("../model/user.model");
const Anomalie = require("./../model/anomalie.model");
const Assoc_user_visite = require("./../model/assoc_user_visite.model");
const Assoc_user_user = require("./../model/assoc_user_user.model");
const Priorisation = require("./../model/priorisation.model");
const Tache = require("./../model/tache.model");
const Urgence = require("./../model/urgence.model");
const Vehicule = require("./../model/vehicule.model");
const ModelFactory = require("./../model/model.factory");

class BaseValueInsertor {

  /* @param : mappingFile : object : tableau de mapping permettant d'associer à une propriété d'une entité sa position dans les documents sources
   * @param : objectDatas : (optionnal) object : objet contenant les données à inserer (voir data.sample.json)
   */
  constructor(mappingFile, objectDatas) {
    this.datasToInsert = objectDatas //dataToInsert contient la donée a inserer
    this.mappingFile = mappingFile   //mappingFile contient le fichier de mapping pour constituer datasToInsert a partir de fichiers sources externes
    this.pathSources = './datas/sources/' //emplacement des données sources pour le mapping
  }


  /* @desc : fonction d'insertion du fichier de données json dans la base mongoDB
   * @param : cbconfirm : call back : cb success
   * @param : cberror : call back : cb erreur
   * @param : deleteOldValues : bool : reset la base de donnée
   * @param : insertTestAssocEntities : bool : inserer des associations : équipes
   * @return : void
   */
  async insertProtoBaseValues(cbconfirm, cberror, deleteOldValues, insertTestAssocEntities) {
    //Clean DATABASE avant insertion
    if(deleteOldValues) {
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

    //Insert base values HOTEL & VISITES
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
          "<<Hotel " + (index + 1) + "/" + this.datasToInsert.hotels.length + " inséré>>"
        );
        //Inserer visites associées
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
                "<<Visite " +
                  (index + 1) +
                  "/" +
                  this.datasToInsert.visites.length +
                  " inséré>>"
              );
            }
          }
        }

        //Set Hotel base value
      }
    }

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
              "<<User " + (index + 1) + "/" + this.datasToInsert.users.length + " inséré>>"
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
              "<<User " + (index + 1) + "/" + this.datasToInsert.users.length + " inséré>>"
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
                    "<<Association " +
                      (index + 1) +
                      "/" +
                      visites_ids.length +
                      " inséré>>"
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
        if(usersIntervenant_ids.length() > 0) {
          const assoc_user_user = new Assoc_user_user({
            user_a_id: usersIntervenant_ids[0],
            user_b_id: usersIntervenant_ids[1],
            plage_h: 'Matin',
            secteur_binome: '91'
          });
          const assoc_user_userDB = await Assoc_user_user.insertIfNotExist(assoc_user_user);
          if (assoc_user_userDB) {
            cbconfirm("<<Equipe 1 créée>>")
          } else {
            cberror("erreur d\'insertion de l'equipe 1")
          }
          //End : Inserer equipes
        }
      }
      ///////////
    }
    //End : Inserer Users ans related Entities
  }

  async insertRealBaseValues(cbconfirm, cberror, deleteOldValues) {
    await this.buildDatasToInsert()
    this.insertProtoBaseValues(cbconfirm, cberror, deleteOldValues)
  }

  //recreer tableau type data a partir de mapping pour appeler insertProtoBaseValues(datas)
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
    this.datasToInsert.hotels = await this.importEntities('hotel', 2)
    this.datasToInsert.users = await this.importEntities('user', 2)
    this.datasToInsert.vehicules = await this.importEntities('vehicule', 2)
    this.datasToInsert.visites = await this.importEntities('visite', 2)

    /*
     * UPDATE SPECIAL VALUES (aggregates) OF ENTITES
     */
    //inserer agreggats sur hotels "nb_visites_periode" & "last_time_visited" & "note"
    this.datasToInsert['visites'].forEach(visite => {
      let uid_hotel = visite.hotel_id
      this.datasToInsert['hotels'].forEach(hotel => {
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
  }

  /* @desc : fonction pour importer une entité de base dans le tableai dataToInsert 
   * @param entityName       :(string)  : nom de l'entité
   * @param refDocAbsPath    :(string)  : path de fichier absolue vers le fichier de référence pour le parcours
   * @param beginLineRefDoc  :(integer) : ligne a partir de laquelle commencer la lecture du ref doc (numéroté a partir de 1) (=2 : revient a sauter la première ligne)
   * @return baseEntityArray :(array)   : tableau d'objet d'entité de base (Hotel, User, Visite & Vehicule) exportés depuis les fichiers sources pour insertion dans BD
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
        baseEntityArray.push(baseEntity)
      }
    )
    if(parcoursState === refDocFileReader.END_OF_FILE) {
      console.log("tableau d\'entités '" + entityName + "' peuplé")
    }
    else{
      console.log("erreur de construction du tableau d'entités \'" + entityName + "'")
    }

    return baseEntityArray
  }

  /* @desc : fonction recurssive qui depuis un fichier de reference va creer peupler l'entité grace au fichier de mapping et inserer l'entité dans le tableau final pour insertion
   * @param : refDocFileReader : classe outil du module du file reader choisit (ici module xlsx)
   * @param : entityName : nom de l'entité a extraire
   * @param : ligne courante : pour le parcours du fichier de reference, ligne en cours d'analyse
   */
  async fillEntityFromMapping(refDocFileReader, currentLine, entityName) {
    //creer et peupler hotel model
    let entity = {entityName}
    for (const [propEntity, mapObject] of Object.entries(this.mappingFile[entityName])) {
      if(propEntity == 'ref_file_name') continue
      //hotelObject.propUser = await setValueFromMapping(fileReader, currentLine, propUser)
      entity[propEntity] = await this.setAttrFromMapping(refDocFileReader, currentLine, mapObject)
    }
    //fileReader prend l + 1
    currentLine++
    //cbconfirm(Hotel pret pour insertion)
    //rappel pour ligne suivante
    return entity
  }

  /* @desc permet de lire une ligne du fichier de mapping afin de recuperer la bonne valeur a inserer pour l'entité courante du model
   * @param : refSheetFileReader : objet module_xlsx, helper de manipulation de l'outil de lecture du fichier
   * @param : propName : propriété de l'entité en cours de traitement
   * @param : currentLine : ligne du fichier
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

            //get depuis l'exterieur, deux possibilités en fonction de la prop "file" du "join" : 
            //- depuis la BD
            if(mapInfo['file'] === "BD") {
              //realiser la jointure et recuoerer la valeur
              const joinProp = mapInfo['on'] //propriété de jointure sur l'objet BD
              const objectFilter = {}
              objectFilter[joinProp] = joinPropValue //creer objet filtre pour recherche dans le BD
              const EntityDB = await ModelFactory.get(mapInfo['table']).findOne(objectFilter) //get l'entité voulue depuis la BD
              const propNameToGet = mapInfo['get'] //pour recuperer le propriété de l'objet qui nous interresse
              //value finale
              propValue = EntityDB[propNameToGet]
            }
            //- depuis un fichier à la cellule correspondate
            else{
              //set le reader du fichier a joindre
              const fileAbsPath = path.resolve('./datas/sources/' + mapInfo['file']) //set absolute filepath of the file
              const iftJoinedFileReader = new XLSXHelper(fileAbsPath) //init tool pour lire fichiers xlsx
              iftJoinedFileReader.setFirstSheetAsCurrentSheet() //set file reader avec le fichier a joindre
              //init vars
              let linePropValue = iftJoinedFileReader.LINE_NOT_FOUND
              //parcourir fichier a joindre, a la recherche de la ligne contenant la propriété de jointure "on" = joinPropValue
              linePropValue = await iftJoinedFileReader.forEachLine(
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
   * 
   */
  parseTimeStampFromDateDDMMAAA(rawDate) {
    //convertir date du fichier en date JS correct
    return XLSXHelper.getJSDateFromExcellDate(rawDate)
  }
}

module.exports = BaseValueInsertor;