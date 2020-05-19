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
  static async insertProtoBaseValues(dbtest, cbconfirm, cberror, deleteOldValues) {
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
        for (const [index, visite] of dbtest.visits.entries()) {
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
  static async insertRealBaseValues(mappingfile, cbconfirm, cberror, deleteOldValues) {
    //cette partie sert a parcourir les fichiers de reference pour peupler les entité, 
    //ensuite la fonction de recuperation de la valeur en fonciton du mapping, elle, ouvre 
    //les fichiers dont elle a besoin ou la BD cas echéant

    //init datas structure to insert les entite de base
    const datas = {}
    datas['hotels'] = null
    datas['users'] = null
    datas['visits'] = null
    datas['vehicules'] = null

    //init tool pour lire fichiers xlsx
    const itfFileReader = new XLSXHelper()

    //init vars pour algorithme
    let fileReader = null //contient le fichier de reference
    let sheetName = null //contient le nom de la sheet en cours de lecture
    let sheet = null //contient la worksheet du fichier de reference en cours de lecture

    let beginLine = 0
    
    //recreer tableau type data.json a partir de mapping
    //lire mapping avec algo

    /*
     * INSERTION ENTITE DE BASE
     */
    //
    itfFileReader.readFile('./datas/sources PHRH/Liste des hotels.xlsx')//set sur "Liste des hotels.xlsx"
    sheetName =     itfFileReader.getFirstSheetName()
    sheet =         itfFileReader.getSheetFromSheetName(sheetName)

    itfFileReader.setCurrentSheet(sheet)
    beginLine =     1 //sauter la première ligne
    
    //fonction recursive pour lire les propriété de l'entité associées depuis le mapping 
    //jusqu'a rencontrer une ligne vide sur le fichier de reference
    async function recursReadRefDocHotel(currentLine){
      //si ligne vide : return
      if(!itfFileReader.getCellValue(`A${currentLine}`) == '') {
        return
      }//semble inutile car le reader ne prend que les cases */

      //creer et peupler hotel model
      let hotel = {}
      for (const [index, propHotel] of Object.entries(mappingfile.hotels)) {
        //hotelObject.propUser = await setValueFromMapping(fileReader, currentLine, propUser)
        hotel[propHotel] = await BaseValueInsertor.setValueFromMapping(itfFileReader, currentLine, propHotel)
      }
      //mettre l'entité dans le tableau
      datas.hotels.push(hotel) //icic peux merder a tester

      //fileReader prend l + 1
      const nextLine = currentLine++
      //cbconfirm(Hotel pret pour insertion)

      //rappel pour ligne suivante
      recursReadRefDocHotel(nextLine)
    }
    recursReadRefDocHotel(beginLine)
    console.log(datas)

    //inserer users
    fileReader = null //set sur "Adresses Terrain.xlsx"
    beginLine = 1 //sauter la première ligne
    function recursReadRefDocUser(fileReader) {
      //si ligne vide : return
      //sinon
        //creer user model
        for (const [index, propUser] of mappingfile.users.entries()) {
          //userObject.propUser = await setValueFromMapping(fileReader, currentLine, propUser)
        }
        //datas.hotels.push(userObject) //icic peux merder a tester
        //fileReader prend l + 1
        //cbconfirm(Hotel pret pour insertion)
        //recursReadRefDocUser = (fileReader)
    }
    
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

  /* @desc permet de lire une ligne du fichier de mapping afin de recuperer la bonne valeur a inserer pour l'entité courante du model
   * @params : propName : propriété de l'entité en cours de traitement
   * @params : currentLine : ligne du fichier
   */
  static async setValueFromMapping(refSheetFileReader, currentLine, propName) {
    const cellToRead = null
    let propValue;
    for(const [key, mapInfo] in propName) {
      switch(key) {
        case "file" :
          if(mapInfo !== "BD") {
            //set file reader contenant la prop a lire
            //ATTENTION : la prop "file" de l'attribut de l'entité à set correspond tjr au doc de référence
          }
          if(mapInfo !== refSheetFileReader.getFirstSheetName()) { //ATTENTION la sheet en cours de lecture est toujours la première sheet (proto)
            console.log('Erreur le file de niveau 1 doit matcher le ref doc') 
          }
          break

        case "col" :
          //cellToRead = cellule(currentLine, col) (1)
          cellToRead = mapInfo.currentLine
          break

        case "join" :
          //si la cellule est bien set sinon erreur
          if(cellToRead) {
            //get depuis l'exterieur, deux possibilités en fonction de la prop "file" du "join" : 
              //- depuis un fichier à la cellule correspondate
              //- depuis la BD
            if(mapInfo === "BD") {
              //init vars
              //pour la jointure
              const joinProp =      propName[key]['on'] //propriété de jointure sur l'objet BD
              const joinPropValue = itfFileReader.getCellValue(cellToRead) //la valeur de jointure = la valeur de la cellule du fichier "file" (au dessus de "join") (a confition que le "fil" soit egal au fichier)
              //pour recuperer le propriété de l'objet qui nous interresse
              const propNameToGet = propName[key]['get']

              //get la valeur de jointure depuis la feuille courante
              const EntityDB = await ModelFactory
                                .get(propName[key]['table'])
                                .findOne({joinProp : joinPropValue })

              propValue = EntityDB[propNameToGet]
              break;
            }
            else{
              //#REPRENDRE ICI ET 1) Regler erreur quand lance server (erreur chelou) 2) continuer a tester ligne 238
              //init vars
              const file = null// set file reader du doc à jointer
              const joinValue = 0 //cellToRead.value
              //parcourir fichier a joindre "f" a la recherche du on pour tt les lignes "l" de "on" == joinValue
                //si trouvé
                  //propValue = f(l, "on")
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
          propValue = mapInfo(/*read cell (1)*/)
          break

        default :
          break
      }

      //fileReader retourne a la currentLine
      return propValue
    }
  }
}

module.exports = BaseValueInsertor;
