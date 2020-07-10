const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const mongoose = require('mongoose');
const User = require('../../model/user.model');
const Urgence = mongoose.model('Urgence');
const Notification = mongoose.model('Notification');


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
router.route('/push/urgence_added/:urgence_id').post(authStrategy(), async (req, res) => {
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
 * @route : renvoi la notif de semaine a valider a l'utilisateur
 * @method GET
 * @param {string} iduser : id user
 * @return {object} :  conforme au model Notification
 */
router.route('/push/valid_semaine/:iduser').get(authStrategy(), async (req, res) => {
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
 * @route : delete
 * @method DELETE
 * @param {string} : id Vehicule
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete(authStrategy(), (req, res) => {
    Notification.findByIdAndDelete(req.params.id)
        .then(() => { res.status(200).json('Notification supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})


module.exports = router;