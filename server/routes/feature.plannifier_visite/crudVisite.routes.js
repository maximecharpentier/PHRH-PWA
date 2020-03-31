const router = require('express').Router();

const ObjectId = require('mongoose').Types.ObjectId;
const Visite = require('../../model/visite.model');
const User = require('../../model/user.model');
const Hotel = require('../../model/hotel.model');
const Assoc_user_visite = require('../../model/assoc_user_visite.model');

/*
 * @route : get all visites
 * @method : GET
 * @param : void
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite
 *      (string) : error message
 */
router.route('/').get((req, res) => {
    //get all visites
    Visite.find()
        .then( visites => res.status(200).json(visites))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : get all visites pour un Hotel
 * @method : GET
 * @param : (string) : id entité Hotel
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite pour un Hotel
 *      (string) : error message
 */
router.route('/get/forhotel/:idhotel').get(async (req, res) => {
    //#todo : UTILISER DES VIEWS ICI
    let visites = []
    const hotelDB = await Hotel.findById(req.params.idhotel)
    if(hotelDB){
        //return les visites associées à l'User
        const hotel_id = new ObjectId(hotelDB._id)
        const visitesDB = await Visite.find({hotel_id})
        if(visitesDB) {
            visitesDB.forEach(visiteDB => {
                visites.push(visiteDB)
            })
        }
    }
    //return
    if(visites.length){
        res.status(200).json(visites)
    }
    else{
        res.status(400).json('Aucune visite pour cet Hotel')
    }
})

/*
 * @route : get all visites pour un User
 * @method : GET
 * @param : (string) : id entité Hotel
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite pour un User
 *      (string) : error message
 */
router.route('/get/foruser/:iduser').get(async (req, res) => {
    //#todo : UTILISER DES VIEWS ICI

    let visites = []
    //chercher l'user avec l'id
    const userDB = await User.findById(req.params.iduser)
    if(userDB){
        const assocsDB = await Assoc_user_visite.find({user_id: userDB._id})
        //return les visites associées à l'User
        if(assocsDB){
            //get visites objects
            for(assocDB of assocsDB) {
                const visiteDB = await Visite.findById(assocDB.visite_id)
                if(visiteDB){
                    visites.push(visiteDB)
                }
            }
        }
    }
   
    //return
    if(visites.length){
        res.status(200).json(visites)
    }
    else{
        res.status(400).json('Aucune visite pour cet user')
    }
})

/*
 * @route : get
 * @method : GET
 * @param : (string) : id Visite
 * @return : mixed 
 *      (Object JSON) : object model Visite
 *      (string) : error message
 */
router.route('/get/:id').get((req, res) => {
    //get visite from DB
    Visite.findById(req.params.id)
        .then( visite => visite ? res.status(200).json(visite) : res.status(200).json('Aucune visites avec cet id'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : plannifier une visite (equivalent à add)
 * @method : POST
 * @param : (Object JSON) : object Visite conforme au schema (voir schema)
 * @return : (string) : error/confirm message
 */
router.route('/plannifier').post((req, res) => {
    //creer model Visite
    const visite = new Visite({
        nom :           req.body.nom, 
        adresse :       req.body.adresse, 
        cp :            Number(req.body.cp), 
        ville :                 req.body.ville, 
        nb_chambres_utilise :   req.body.nb_chambres_utilise, 
        nb_visites_periode :    req.body.nb_visites_periode, 
        last_time_visited :     new Date(req.body.last_time_visited),
    })

    //save
    visite.save()
        .then(() => res.status(200).json('Visite ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : edit
 * @method : POST
 * @param : (string) : id Visite
 * @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
 *      "fieldX" : (string) nom champ conforme au naming du model Visite
 *      "newValue" : mixed 
 *          (string) / (int) / UTC timestamp (int/string)) pour les types date
 * @return : mixed 
 *      (array) : tableau d'objet model Visite
 *      (string) : error message
 */
router.route('/edit/:id').post((req, res) => {
    //create 
    const propList = [
        'hotel_id',     'date_visite',  'note',
        'duree',        'type']
    const setObject = {}
    propList.forEach(prop => {
        if(prop in req.body) {
            switch (prop) {
                case 'date_visite':
                    setObject[prop] = req.body[prop] ? new Date(Number(req.body[prop])) : null
                    break;
                case 'note':
                case 'duree':
                    setObject[prop] = req.body[prop] ? Number(req.body[prop]) : null
                    break;
                default:
                    setObject[prop] = req.body[prop]
            }
        }
    })

    Visite.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: setObject }, 
        //{ new: true }
        )
        .then(visite => res.status(200).json('Visite édité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : delete
 * @method : DELETE
 * @param : (string) : id Visite
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete((req, res) => {
    Visite.findByIdAndDelete(req.params.id)
        .then(() => { res.status(200).json('Visite supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;