const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const Visite = mongoose.model('Visite');
const User = mongoose.model('User');
const Hotel = mongoose.model('Hotel');
const Assoc_user_visite = mongoose.model('Assoc_User_Visite');
const Equipe = mongoose.model('Assoc_User_User');

/**
 * @route : get all visites
 * @method : GET
 * @param {void}
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite
 *      (string) : error message
 */
router.route('/').get(authStrategy(), (req, res) => {
    //get all visites
    Visite.find()
        .then( visites => res.status(200).json(visites))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : get all visites pour un Hotel
 * @method : GET
 * @param {string} : id entité Hotel
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite pour un Hotel
 *      (string) : error message
 */
router.route('/get/forhotel/:id').get(authStrategy(), async (req, res) => {
    const hotelDB = await Hotel.findById(req.params.id)

    if(hotelDB){

        //return les visites associées à l'User
        const visitesDB = await Visite.find({hotel_id: hotelDB._id})
      
        //get visi objects
        const visites = []

        if(visitesDB) {
            visitesDB.forEach(visiteDB => {
                visites.push(visiteDB)
            })
        }

        //return
        if(visites.length){
            res.status(200).json(visites)
        }
        else{
            res.status(400).json('Aucune visite pour cet Hotel')
        }
    }
})

/**
 * @route : get all visites pour un User
 * @method : GET
 * @param {string} : id entité User
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite pour un User
 *      (string) : error message
 */
router.route('/get/foruser/:id').get(authStrategy(), async (req, res) => {
    const assocsDB = await Assoc_user_visite.find({user_id: req.params.id})
    .populate({
        "path" : 'visite_id',
        populate: {
            path: 'hotel_id',
            model: 'Hotel'
          } 
    })

    //return les visites associées à l'User
    if(assocsDB.length){
        //get visites objects
        let visites = []

        for(const [index, assocDB] of assocsDB.entries()) {
            visites.push(assocDB.visite_id)
        }

        //return
        if(visites.length){
            res.status(200).json(visites)
        }

    } else {
        //return
        res.status(200).json('Aucune visite pour cet user')
    }
})

/**
 * @route : get all visites pour une Equipe
 * @method : GET
 * @param {string} : id entité Equipe
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite pour un User
 *      (string) : error message
 */
router.route('/get/forequipe/:id').get(authStrategy(), async (req, res) => {
    //chercher l'user avec l'id
    const equipeDB = await Equipe.findById(req.params.id)

    if(equipeDB){
        const assocsDB = await Assoc_user_visite.find({
            $or : [
                {user_id: equipeDB.user_a_id},
                {user_id: equipeDB.user_b_id}
            ]
            
        }).populate({
            "path" : 'visite_id',
            //INSERER FILTRE ICI : "match": { "cp": { $regex: /^75.*/, $options: 'i' }}
        }).populate({
            "path" : 'user_id',
            //INSERER FILTRE ICI : "match": { "cp": { $regex: /^75.*/, $options: 'i' }}
        })

        console.log(assocsDB[0].visite_id)

        //return les visites associées aux users de l'equipe
        //si des visites sont trouvées
        if(assocsDB[0].visite_id) {

            //get visites objects
            const visitesInfos = []

            for(const [index, assocDB] of assocsDB.entries()) {

                //inserer la visite et les informations de l'utilisateur associé par comodité
                visitesInfos.push({
                    user_assoc : {
                        user_id: assocDB.user_id._id, 
                        name: assocDB.user_id.getNamePres()
                    },
                    visite: assocDB.visite_id
                })
            }

            //return
            if(visitesInfos.length){
                res.status(200).json(visitesInfos)
            }

        } else {
            //return
            res.status(400).json('Aucune visite pour cet user')
        }

    } else{
        //return
        res.status(400).json('Utilisateur inconnu')
    }
})

/**
 * @route : get
 * @method : GET
 * @param {string} : id Visite
 * @return : mixed 
 *      (Object JSON) : object model Visite
 *      (string) : error message
 */
router.route('/get/:id').get(authStrategy(), (req, res) => {
    //get visite from DB
    Visite.findById(req.params.id)
        .then( visite => visite ? res.status(200).json(visite) : res.status(200).json('Aucune visites avec cet id'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : plannifier une visite (equivalent à add) pour un user ou pour une equipe
 * @method : POST
 * @param {Object JSON} : object Visite restreint & custom {
 *      user_id | equipe_id : (string) id entité Equipe ou User
 *      hotel_id: (string) 
 *       date_visite: (string)
 *       duree : (int) 
 *       type :  (string) "Visite ou "Contre-visite"
 *   }
 * @return {string} : error/confirm message
 */
router.route('/plannifier').post(authStrategy(), async (req, res) => {
    const visite = new Visite({
        hotel_id :      req.body.hotel_id, 
        date_visite :   req.body.date_visite, 
        duree :         Number(req.body.duree), 
        type :          req.body.type, 
        visite_effectue: false
    })

    //creer visite
    const visiteDB = await Visite.insertIfNotExist(visite)

    if(visiteDB) {
        let msg = "Visite ajouté"
        //creer model assoc_user_visites
        let usersToAssoc

        //recupération des informations de la requette
        if(req.body.hasOwnProperty('equipe_id')) {
            const equipe = await Equipe.findById(req.body.equipe_id)
            if(equipe) {
                usersToAssoc = [equipe.user_a_id, equipe.user_b_id]
                msg+=" pour les users de l'équipe"
            }
        }
        if(req.body.hasOwnProperty('user_id')) {
            usersToAssoc = [req.body.user_id]
            msg+=" pour l'user"
        }
    
        for(const [index, user_id] of usersToAssoc.entries()) {
            const assocUserVisite = new Assoc_user_visite({
                user_id: user_id,
                visite_id: visiteDB._id
            })

            const assocDB = await Assoc_user_visite.insertIfNotExist(assocUserVisite)
            if(!assocDB) {
                //delete visite
                Visite.findByIdAndDelete(visiteDB._id)

                res.status(400).json('Erreurs d\'insertion de l\'association visite/user, la visite n\'a pas été enregistrée')
            }
        }
        res.status(200).json(msg)

    } else {
        res.status(400).json('Erreur d\'insertion de la visite ou la visite existe deja')
    }
})

/**
 * @route : edit
 * @method : POST
 * @param {string} : id Visite
 * @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
 *      "fieldX" : (string) nom champ conforme au naming du model Visite
 *      "newValue" : mixed 
 *          (string) / (int) / UTC timestamp (int/string)) pour les types date
 * @return : mixed 
 *      (array) : tableau d'objet model Visite
 *      (string) : error message
 */
router.route('/edit/:id').post(authStrategy(), (req, res) => {
    //create 
    const propList = [
        'hotel_id',     'date_visite',  'note',
        'duree',        'type',         'visite_effectue'
    ]
    const setObject = {}
    propList.forEach(prop => {
        if(prop in req.body) {
            switch (prop) {
                case 'date_visite':
                    setObject[prop] = req.body[prop] ? req.body[prop] : null
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

    //Si visites periode < 3 (periode = depuis le un an)
        //creer priorisation
            /*
                type : "visites manquantes"
                message : ""
            */
        .then(visite => res.status(200).json('Visite édité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : delete
 * @method : DELETE
 * @param {string} : id Visite
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete(authStrategy(), (req, res) => {
    Visite.findByIdAndDelete(req.params.id)
        .then(() => { 

            //supprimer assoc users visite
            const assocsDB = Assoc_user_visite.deleteMany({visite_id: req.params.id})

            res.status(200).json('Visite supprimé')
        })
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;