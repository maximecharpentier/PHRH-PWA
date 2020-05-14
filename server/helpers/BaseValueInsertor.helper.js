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

  static async insertRealBaseValues(mappingfile, cbconfirm, cberror, deleteOldValues) {
    //cette partie sert a parcourir les fichiers de reference pour peupler les entité, 
    //ensuite la fonction de recuperation de la valeur en fonciton du mapping elle ouvre 
    //les fichiers dont elle a besoin ou la BD cas echéant
    const datas = {}

    //recreer tableau type data.json a partir de mapping
    //lire mapping avec algo
    /*
     * INSERTION ENTITE DE BASE
     */
    //inserer hotels
    fileReader = null //set sur "Liste des hotels.xlsx"
    beginLAt = 1 //sauter la première ligne
    recursReadRefDocHotel = (fileReader) => {
      //si ligne vide : return
      //sinon
        //creer user model
        for (const [index, propUser] of mappingfile.users.entries()) {
          //hotelObject.propUser = await setValueFromMapping(fileReader, currentLine, propUser)
        }
        //datas.hotels.push(hotelObject) //icic peux merder a tester
        //fileReader prend l + 1
        //cbconfirm(Hotel pret pour insertion)
        //recursReadRefDocUser = (fileReader)
    }

    //inserer users
    fileReader = null //set sur "Adresses Terrain.xlsx"
    beginLAt = 1 //sauter la première ligne
    recursReadRefDocUser = (fileReader) => {
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
  async setValueFromMapping(fileReader, currentLine, propName) {
    const cellToRead = null
    let propValue;
    for(const [key, mapInfo] in propName) {
      switch(key) {
        case "file" :
          if(mapInfo !== "BD") {
            //set file reader correctement
            //si le file de la prop est différent
              //charger l'autre fileReader
          }
          break

        case "col" :
          //cellToRead = cellule(currentLine, col) (1)
          break

        case "join" :
          //si la cellule est bien set sinon erreur
          if(cellToRead) {
            //get depuis l'exterieur : fichier a la cellule correspondate | BD pour l'entité correspondate
            if(mapInfo === "BD") {
              //init vars
              const EntityName =    propName[key]['table']
              const joinProp =      propName[key]['on']
              const propNameToGet = propName[key]['get']

              //get la valeur de jointure depuis la feuille courante
              const joinPropValue = 0 //cellToRead.value
              const EntityDB = await EntityName.findOne({[joinProp] : joinPropValue })
              propValue = EntityDB[propNameToGet]
              break;
            }
            else{
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
