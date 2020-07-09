const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
const { options } = require('../feature.authentification/auth.routes');
const Visite = mongoose.model('Visite');
const User = mongoose.model('User');
const Hotel = mongoose.model('Hotel');
const Assoc_user_visite = mongoose.model('Assoc_User_Visite');
const Equipe = mongoose.model('Assoc_User_User');

/**
 * Au moment où l'utilisateur valide l'hôtel non visité et la raison. 
 * La donnée est stocké en base et est rebalancer côté back office 
 * sous forme de notification pour avertir le planificateur des hôtels 
 * non Visité par l'intervenant terrain
 *
 */



/**
 * @route : get les hotels des visites plannifiées sur la période (1 periode se déroule entre deux comptes rendus)
 * @method : GET
 * @param {id} : id User
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object Visite peuplé avec l'hotel
 *      (string) : error message
 */
router.route('/hotel/planned/foruser/:id').get(authStrategy(), async (req, res) => {

    //get tt les visites non effectuées pour l'user    
    if(req.params.id) {

        //get tt les visites non effectuées pour l'user
        const assocs = await Assoc_user_visite.find({
            user_id: req.params.id, 
            date_effectue: null
        })
    
        //get visits non effectué et peupler l'hotel
        Visite.find({
            "_id" : { "$in": assocs.map(function(el) {
                return el.visite_id
            })},
            "visite_effectue": false 
        })
        .populate('hotel_id')
            .then( visitesWithHotel => {

                console.log(visitesWithHotel)
                res.status(200).json( visitesWithHotel )
            })
            .catch(err => res.status(400).json('Erreurs: ' + err))
    } else {

        res.status(400).json('Missing params GET iduser')
    }
})

/**
 * @route : cancel les visites qui n'ont pas été effectuées
 * @method : POST
 * @param {arra[object]} : array d'objet a cancel et raison {visite_id: (string), raison: (string)}
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object Visite peuplé avec l'hotel
 *      (string) : error message
 */
router.route('/hotel/cancel/many/foruser/:id').post(authStrategy(), async (req, res) => {
    if(req.params.id) {

        if(req.body.visitesToCancel) {
           
            //tableau d'id de visites a cancel
            const visitsToCancel = req.body.visitesToCancel.map( el =>{ return el.visite_id })                

            //recup all visites non effectuées
            const visitNonEffectue = await Assoc_user_visite.find({
                    user_id: req.params.id, 
                    date_effectue: null
                })
                .populate("visite_id")

            console.log('visitsToCancel ids :', visitsToCancel)
            console.log('visitNonEffectue ids :', visitNonEffectue)

            //pour les visites a cancel, effacer les visites & autres actions
            for(const [index, visite_id] of visitsToCancel) {

                //get elem for Observers
                const visiteBeforeDelete = await Visite.findById(visite_id)

                //delete visite
                await Visite.findByIdAndDelete(visite_id)

                //delete associations
                await Assoc_user_visite.deleteMany({visite_id: visite_id})
                
                //#appeler l'evenement : "visit deleted", elem : visit pour le scoring
                //A VENIR

                //#appeler l'evenement : "visit canceled", elem : visit pour notifier superviseur
                //notification({from: user_id, event: (string), message: })
                //A VENIR
            }

            //faire la diff = visitNonEffectue - visitsToCancel pour recup visites à valider
            const visitsToValid = visitNonEffectue.filter( elem => !visitsToCancel.includes(elem._id))

            //passer les visites a éffectuer & autres actions liées
            for(const [index, visit] of visitsToValid) {

                //passer la visite en éfféctué PS : bien penser a ne pas mettre a jour la note de l'hotel et creer 
                const visiteUpdated = Visite.findByIdAndUpdate(
                    { _id: visit._id }, 
                    { $set: { visite_effectue: true } }, 
                    //{ new: true }
                    )

                //maj assocs pour tout ls users
                Assoc_user_visite.update(
                    {"visite_id": visit._id},
                    {"$set":{"date_effectue": new Date()}},
                    {"multi": true})

                //mettre a jour l'hotel nb_visites_période +1, last_time_visited = visite.date //PS : faire attention ici pour le calcul de nb_visites_période, cela dépend de la période
                Hotel.findOneAndUpdate({'_id' : visit.hotel_id}, {$inc : {'nb_visites_periode' : 1}})

                //appeler l'evenement : "visit done", elem : visit pour le scoring
                //#A VENIR                
            }   
            
            res.status(200).json('Informations enregistrées')
        }
        res.status(400).json('Paramètre POST manquant : visitesToCancel')
    }
    res.status(400).json('Paramètre GET id user manquant')
})

module.exports = router;