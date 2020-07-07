const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const mongoose = require('mongoose');
const AssocUserVisite = require('../../model/assoc_user_visite.model');
const Visite = mongoose.model('Visite');
const Urgence = mongoose.model('Urgence');
const User = mongoose.model('User');
const Equipe = mongoose.model('Assoc_User_User');
const RankBehaviourV1 = require('./lib/RankBehaviourV1')

const ListHotelRank = require('./lib/ListHotelsRank');

/**
 * @route : recuperer la liste des visites a efectuer
 * @method GET
 * @param {} : objet filter (seul le secteur est dispo a l'heure acteulle) {"filters": {"secteur": X}}
 * @return array[ (Object JSON) ]) : tableau d'object HotelRank
 */
router.route('/suggestions').get(authStrategy(), async (req, res) => {
    //QUESTION : l'affichage de la liste se fait pour un binome ? -> metre des filtrs custom -> OK
    //notes :
        //pour les contre-visites : elles sont automatiquement set lorsque un Hotel a une anomalie
        //quand un Hotel est ajouté : ScoreView est recalculé (voir pour mettre une note default qui permet de reperer les nouveau hotels et les traiter différament : voir groupe pour ca)
        //quand une visite se valide : on recalcul le score ppour l'hotel
        //quand une anomalie est ajouté : on recalcul le score pour l'hotel
        //quand une priorisation est ajouté : on recalcul le score pour l'hotel
        //creer une fonction cron qui chaque jour calcul si un hotel n'a pas été visité au moins trois fois en un an et met une priorisation

    const options = {}
    if(req.query.filters) {
        for(const prop in JSON.parse(req.query.filters)) {
            options[prop] = JSON.parse(req.query.filters)[prop]
        }
    }
    
    const rankBehaviour = new RankBehaviourV1()
    const listHotelRankObj = new ListHotelRank(rankBehaviour, reset = false)

    const list = await listHotelRankObj.get(options)

    res.status(200).json(list)
})

module.exports = router;