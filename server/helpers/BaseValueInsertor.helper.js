const path = require('path');
const XLSX = require('xlsx');
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

  constructor() {
    this.datasToInsert = {}
  }

  async insertProtoBaseValues(dbtest, cbconfirm, cberror, deleteOldValues) {
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
    for (const [index, hotel] of dbtest.hotels.entries()) {
      //inserer Hotel
      const hotelObj = new Hotel({
        uid_internal: hotel.uid_internal ? hotel.uid_internal : null,
        nom: hotel.nom,
        adresse: hotel.adresse,
        cp: hotel.cp,
        ville: hotel.ville,
        nb_chambres_utilise: hotel.nb_chambres_utilise,
        nb_visites_periode: hotel.nb_visites_periode,
        last_time_visited: null,
        urgences: hotel.urgences,
        anomalies: hotel.anomalies,
        taches: hotel.taches
      });

      const HotelDB = await Hotel.insertIfNotExist(hotelObj);
      if (HotelDB) {
        //confirmation Hotel
        cbconfirm(
          "<<Hotel " + (index + 1) + "/" + dbtest.hotels.length + " inséré>>"
        );
        //Inserer visites associées
        for (const [index, visite] of dbtest.visites.entries()) {
          //Insere Visites associés a l'Hotel tout juste inséré
          if (visite.hotel_id === hotel.id_temp) {
            const visiteObj = new Visite({
              hotel_id: HotelDB._id,
              date_visite: new Date(visite.date_visite),
              note: visite.note,
              ville: visite.ville,
              duree: visite.duree,
              type: visite.type
            });
            const VisiteDB = await Visite.insertIfNotExist(visiteObj);
            if (VisiteDB) {
              cbconfirm(
                "<<Visite " +
                  (index + 1) +
                  "/" +
                  dbtest.visits.length +
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
      for (const [index, user] of dbtest.users.entries()) {
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
              "<<User " + (index + 1) + "/" + dbtest.users.length + " inséré>>"
            );
          }
        }
        //End : Inserer User "Gestionnaire"
        //Begin : Inserer User "Intervenant"
        if (user.fonction === "Intervenant terrain") {
          const userIntervenant = new User({
            nom: user.nom,
            prenom: user.prenom,
            pwd: user.pwd,
            fonction: user.fonction,
            adresse: user.adresse,
            secteur: user.secteur,
            jour_bureau: user.jour_bureau,
            vehicule_id: user.vehicule_id
          });
          const userIntervenantDB = await User.insertIfNotExist(
            userIntervenant
          );
          if (userIntervenantDB) {
            //noter id pour après
            usersIntervenant_ids.push(userIntervenantDB._id)

            //confimer insertion
            cbconfirm(
              "<<User " + (index + 1) + "/" + dbtest.users.length + " inséré>>"
            );

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
        }
        //End : Inserer User "Intervenant"
      }
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
          cbconfirm("<<Equipe 1 créée>>")
        } else {
          cberror("erreur d\'insertion de l'equipe 1")
        }
        //End : Inserer equipes
      }
    }
    //End : Inserer Users ans related Entities
  }

  //recreer tableau type data a partir de mapping pour appeler insertProtoBaseValues(datas)
  async insertRealBaseValues(mappingfile, cbconfirm, cberror, deleteOldValues) {
    //cette partie sert a parcourir les fichiers de reference pour peupler les entité, 
    //ensuite la fonction de recuperation de la valeur en fonciton du mapping, elle, ouvre 
    //les fichiers dont elle a besoin ou la BD cas echéant

    //init mapping file var
    const mappingFile = require('./../datas/mappingfile.json')

    //init datas structure to insert les entite de base
    this.datasToInsert['hotels'] =    []
    this.datasToInsert['users'] =     []
    this.datasToInsert['visites'] =   []
    this.datasToInsert['vehicules'] = []

    //init vars pour algorithme
    const refDocHotelAbsPath =    path.resolve('./datas/sources/Liste des hotels.xlsx')
    const refDocUserAbsPath =     path.resolve('./datas/sources/Adresses Terrain.xlsx')
    const refDocVisiteAbsPath =   path.resolve('./datas/sources/note_visites_hotels.xlsx')
    const refDocVehiculeAbsPath = path.resolve('./datas/sources/voiture.xlsx')
    let beginLine = 0
    
    //recreer tableau type data.json a partir de mapping
    //lire mapping avec algo

    /*
     * INSERTION ENTITE DE BASE
     */
    //INSERT HOTEL
    //init tool pour lire fichiers xlsx
    const refDocHotelFileReader = new XLSXHelper(refDocHotelAbsPath)
    //set file reader avec le fichier de référence
    refDocHotelFileReader.setFirstSheetAsCurrentSheet()
    //commencer le sauter la première ligne
    beginLine = 2 
    this.recursFillEntityFromMapping(refDocHotelFileReader, beginLine, 'hotel', mappingFile)
    console.log(this.datasToInsert)

    //inserer users
    
    
    //inserer visites
    
    
    //inserer vehicules

    /*
     * INSERTION ASSOCIATIONS
     */
    //inserer assoc hotel_visite
    //inserer assoc_user_visite

    /*
     * UPDATE SPECIAL VALUES OF ENTITES
     */
    //inserer agreggats sur hotels "nb_visites_periode" & "last_time_visited" & "note"
    //inserer evals sur hotel
                    
    //peupler tableau json de la meme structure que data.json
    //relancer insertProtoBaseValues(dbtest, cbconfirm, cberror, deleteOldValues)
  }

  //fonction recursive pour lire les propriété de l'entité associées depuis le mapping 
    //jusqu'a rencontrer une ligne vide sur le fichier de reference
  /* @desc : fonction recurssive qui depuis un fichier de reference va creer peupler l'entité grace au fichier de mapping et inserer l'entité dans le tableau final pour insertion
   * @param : refDocFileReader : classe outil du module du file reader choisit (ici module xlsx)
   * @param : entityName : nom de l'entité a extraire
   * @param : ligne courante : pour le parcours du fichier de reference, ligne en cours d'analyse
   */
  async recursFillEntityFromMapping(refDocFileReader, currentLine, entityName, mappingFile) {
    const result = []
    //condition d'arret : si ligne vide dans le ref doc : return
    if(!refDocFileReader.getCellValue(`A${currentLine}`) 
      ) {
      return
    }
    if(currentLine == 10) {
      console.log('10 atteint')
      return
    }
    //creer et peupler hotel model
    let entity = {}
    for (const [propEntity, mapObject] of Object.entries(mappingFile[entityName])) {
      //hotelObject.propUser = await setValueFromMapping(fileReader, currentLine, propUser)
      entity[propEntity] = await this.setValueFromMapping(refDocFileReader, currentLine, mapObject)
      console.log(propEntity + " : " + entity[propEntity])
      //console.log(propHotel)
    }
    //mettre l'entité dans le tableau
    this.datasToInsert[entityName + "s"].push(entity) //icic peux merder a tester

    //fileReader prend l + 1
    currentLine++

    //cbconfirm(Hotel pret pour insertion)

    //rappel pour ligne suivante
    this.recursFillEntityFromMapping(refDocFileReader, currentLine, entityName, mappingFile)
  }

  /* @desc permet de lire une ligne du fichier de mapping afin de recuperer la bonne valeur a inserer pour l'entité courante du model
   * @param : refSheetFileReader : objet module_xlsx, helper de manipulation de l'outil de lecture du fichier
   * @param : propName : propriété de l'entité en cours de traitement
   * @param : currentLine : ligne du fichier
   */
  async setValueFromMapping(itfFileReader, currentLine, mapObject){
    let cellToRead
    let propValue
    //parcours du mapObject pour recuperer la valeur a assigner a la propriété courante de entityName
    for(const key in mapObject) {
      let mapInfo = mapObject[key]
      switch(key) {
        case "file" :
          if(mapInfo !== "BD") {
            //set file reader contenant la prop a lire
            //ATTENTION : la prop "file" de l'attribut de l'entité à set correspond tjr au doc de référence
          }
          if(mapInfo !== itfFileReader.getFileName()) { //ATTENTION la sheet en cours de lecture est toujours la première sheet (proto)
            console.log('Erreur le file de niveau 1 doit matcher le ref doc') 
          }

        case "col" :
          //cellToRead = cellule(currentLine, col) (1)
          cellToRead = mapInfo + currentLine

        case "join" :
          console.log(mapObject) //#REPRENDRE ICI ET CORRIGER BUS
          //si la cellule est bien set sinon erreur
          if(cellToRead) {
            //get depuis l'exterieur, deux possibilités en fonction de la prop "file" du "join" : 
              //- depuis un fichier à la cellule correspondate
              //- depuis la BD
            //init vars
            const joinPropValue = itfFileReader.getCellValue(cellToRead) //la valeur de jointure = la valeur de la cellule du fichier "file" (au dessus de "join") (a confition que le "fil" soit egal au fichier)
            //#repdnre ici aussi et init vars pour une meilleur lecture
            if(mapInfo['file'] === "BD") {
              //realiser la jointure et recuoerer la valeur
              const joinProp =      mapInfo['on'] //propriété de jointure sur l'objet BD
              const objectFilter =  {}
              objectFilter[joinProp] = joinPropValue //creer objet filtre
              const EntityDB = await ModelFactory.get(mapInfo['table']).findOne(objectFilter) //get l'entité voulue depuis la BD
              const propNameToGet = mapInfo['get'] //pour recuperer le propriété de l'objet qui nous interresse
              //value finale
              propValue = EntityDB[propNameToGet]
            }
            else{
              //init vars
              const fileAbsPath = path.resolve('./datas/sources/' + mapInfo['file']) //set absolute filepath of the file
              const iftJoinedFileReader = new XLSXHelper(fileAbsPath) //init tool pour lire fichiers xlsx
              iftJoinedFileReader.setFirstSheetAsCurrentSheet() //set file reader avec le fichier a joindre
              //parcourir fichier a joindre a la recherche de la ligne contenant la propriété de jointure "on" = joinPropValue
              let line = iftJoinedFileReader.filterLine(mapInfo['on'], joinPropValue)
              if(line) {
                let coordCell = mapInfo['get'] + line //coordonnées de la cellule ou la valeur cherchée se trouve
                //value finale
                propValue = iftJoinedFileReader.getCellValue(coordCell)
              }
            }
          }
          else{
            console.log('cellule non set')
          }

        case "default" :
          propValue = mapInfo

        case "function_parse_name" :
          switch(mapInfo) {
            case "parseTimeStampFromDateDDMMAAA" :
              propValue = this.parseTimeStampFromDateDDMMAAA(propValue)
          }
      }
    }
    return propValue
  }

  parseTimeStampFromDateDDMMAAA(dateDDMMAAA) {
    console.log('map date')
    //inverser DD & MM
    const dateSplited = dateDDMMAAA.split('/')
    const mois = dateSplited[1]
    const jour = dateSplited[0]
    const anne = dateSplited[2]
    return new Date(mois + '/' + jour + '/' + anne)
  }
}

module.exports = BaseValueInsertor;
