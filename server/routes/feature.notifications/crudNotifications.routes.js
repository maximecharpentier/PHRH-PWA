const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const mongoose = require('mongoose');
const User = require('../../model/user.model');
const Urgence = mongoose.model('Urgence');
const Memo = mongoose.model('Memo');

//const Vehicule = require('../../model/vehicule.model');

/**
 * @route : get all
 * @method GET
 * @auth : dans l'entete de la requette "Authorisation" doit contenir le token
 * @param {void} filter Object : #toDefine
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Vehicule
 *      (string) : error message
 */
router.route('/').get(authStrategy(), (req, res) => {
    let filterObj = {}
    
    //reprendre ici et construire le system de filtre dynamic
    Vehicule.find(filterObj)
        .then(vehicules => res.status(200).json(vehicules))            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : get
 * @method GET
 * @param {string} : id Vehicule
 * @return : mixed 
 *      (Object JSON) : object model Vehicule
 *      (string) : error message
 */
router.route('/get/:id').get(authStrategy(), (req, res) => {
    //get vehicule from DB
    Vehicule.findById(req.params.id)
        .then( vehicule => res.status(200).json(vehicule))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : book vehicule
 * @method GET
 * @param {string} iduser : id User qui emprunte le vehicule
 * @param {string} idvehicule : id Vehicule a emprunter
 * @return {string} : error/success message
 */
router.route('/book/foruser/:iduser/:idvehicule').get(authStrategy(), async (req, res) => {
    //regarder si un user l'a deja
    const otherUserHasVehicule = await User.find({vehicule_id: req.params.idvehicule})

    //si oui "le vehicule est deja emprunté par quel'un d'autre
    if(otherUserHasVehicule) {
        res.status(200).json("Vehicule deja emprunté par ". otherUserHasVehicule.getNamePres())
    } else {
        User.findByIdAndUpdate(
            { _id: req.params.iduser }, 
            { $set: { vehicule_id: req.params.idvehicule } }, 
            //{ new: true }
            )
            .then(vehicule => res.status(200).json('Vehicule réservé avec succès'))
            .catch(err => res.status(400).json('Erreurs: ' + err))
    }
})

/**
 * @route : rendre le vehicule (inverse de book)
 * @method GET
 * @param {string} iduser : id User qui emprunte le vehicule
 * @param {string} idvehicule : id Vehicule a emprunter
 * @return {string} : error/success message
 */
router.route('/drop/foruser/:iduser').get(authStrategy(), (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.iduser }, 
        { $set: { vehicule_id: null } }, 
        //{ new: true }
        )
        .then(vehicule => res.status(200).json('Vehicule déposé au garage'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : add
 * @method POST
 * @param : (Object JSON) : object Vehicule conforme au schema (voir schema)
 * @return : (string) : error/confirm message
 */
router.route('/urgence_added/:urgence_id').post(authStrategy(), (req, res) => {
    //{from: userid}
    const urgence = await Urgence.findById(req.params.urgence_id)
    const usersVisiteurs = User.find({ fonction: { $nin: ['Superviseur', 'admin'] } })

    for(const user of usersVisiteurs) {

        //création de la notif : PS ici c'est une notif a sois meme
        let notifObject = new Notification({
            from: req.params.from, 
            to: user._id, 
            elem: urgence, 
            read: false
        })
    }



    //creer model Vehicule
    const vehicule = new Vehicule({
        immatriculation :   req.body.immatriculation, 
        type :              req.body.type, 
        cp :                Number(req.body.cp), 
        ville :             req.body.ville, 
        adresse_parking :   req.body.adresse_parking, 
    })

    //save
    vehicule.save()
        .then(() => res.status(200).json('Vehicule ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : edit
 * @method POST
 * @param {string} : id Vehicule
 * @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
 *      "fieldX" : (string) nom champ conforme au naming du model Vehicule
 *      "newValue" : mixed 
 *          (string) / (integer) / (integer/string : UTC timestamp) pour les types date
 * @return : mixed 
 *      (array) : tableau d'objet model Vehicule
 *      (string) : error message
 */
router.route('/edit/:id').post(authStrategy(), (req, res) => {
    //create 
    const propList = [
        'immatriculation',  
        'type',              
        'cp',               
        'ville',
        'adresse_parking'
    ]
    const setObject = {}
    propList.forEach(prop => {
        if(prop in req.body) {
            switch (prop) {
                case 'cp':
                    setObject[prop] = req.body[prop] ? Number(req.body[prop]) : null
                    break;
                default:
                    setObject[prop] = req.body[prop]
            }
        }
    })

    Vehicule.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: setObject }, 
        //{ new: true }
        )
        .then(vehicule => res.status(200).json('Vehicule édité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : delete
 * @method DELETE
 * @param {string} : id Vehicule
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete(authStrategy(), (req, res) => {
    Vehicule.findByIdAndDelete(req.params.id)
        .then(() => { res.status(200).json('Vehicule supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})


module.exports = router;