const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const mongoose = require('mongoose');
const User = require('../../model/user.model');
const Urgence = mongoose.model('Urgence');
const Notification = mongoose.model('Notification');

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
 * @route : Get notifs pour un user
 * @method POST
 * @param {object} id : id User
 * @return : array [Object] : confirm message
 */
router.route('/get/foruser/:id').get(authStrategy(), async (req, res) => {
    Notification.find({to: req.params.id})
        .sort({date_insert: 'desc'})
        .limit(10)
        .then( notifs => res.status(200).json(notifs) )
        .catch( err => res.status(400).json('Erreurs: ' + err) )
})

/**
 * @route : notifie l'urgence a tout les intervenants de terrain
 * @method POST
 * @param {object} : object {from: userid}
 * @return : (string) : confirm message
 */
router.route('/urgence_added/:urgence_id').post(authStrategy(), async (req, res) => {
    //{from: userid}
    const urgence = await Urgence.findById(req.params.urgence_id)
    const usersVisiteurs = User.find({ fonction: { $nin: ['Superviseur', 'admin'] } })

    let notifObject = {}

    for(const user of usersVisiteurs) {

        //création de la notif : PS ici c'est une notif a sois meme
        notifObject = new Notification({
            from: req.params.from, 
            to: user._id, 
            elem: urgence, 
            read: false
        })

        await Notification.insertIfNotExist(notifObject)
    }

    //create context custom object
    notifObject.to = 'visiteurs'

    //emit
    socket.emit('urgence_added', notifObject)

    res.status(200).json('Notification envoyée')
})

/**
 * @route : envoi la notif de semaine a valider a l'utilisateur
 * @method GET
 * @param {string} iduser : id user
 * @return {object} :  conforme au model Notification
 */
router.route('/valid_semaine/:iduser').get(authStrategy(), async (req, res) => {
    //création de la notif : PS ici c'est une notif a sois meme
    const notifObject = new Notification({
        from: req.params.iduser, 
        to: req.params.iduser, 
        elem: {_id: -1, message: 'veuillez entrer les hotels que vous avez visité' }, 
        read: false
    })

    //save la notification pour l'user
    await Notification.insertIfNotExist(notifObject)

    //emit
    //#socket.emit('urgence_added', notifObject)

    res.status(200).json(notifObject)
})

/**
 * @route : lis une notification
 * @method GET
 * @param {string} id : id Notification
 * @return {object} : object Notification conforme au model
 */
router.route('/notification/read/:id').get(authStrategy(), async (req, res) => {
    //création de la notif : PS ici c'est une notif a sois meme
    const notifObject = new Notification({
        from: req.params.iduser, 
        to: req.params.iduser, 
        elem: {_id: -1, message: 'veuillez entrer les hotels que vous avez visité' }, 
        read: false
    })

    Notification.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: { read: true } },
        //{ new: true }
        )
        .then(notif => res.status(200).json(notif))
        .catch(err => res.status(400).json('Erreurs: ' + err))
    //emit
    //#socket.emit('urgence_added', notifObject)
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