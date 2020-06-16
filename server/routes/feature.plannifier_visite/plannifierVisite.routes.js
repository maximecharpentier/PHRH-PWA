const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Visite = mongoose.model('Visite');
const Urgence = mongoose.model('Urgence');
const User = mongoose.model('User');
const utils = require('../lib/utils');

/**
 * @route : get all visites
 * @method GET
 * @param {void}
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite
 *      (string) : error message
 */
router.route('/suggestions').get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    //si première fois
    //test si la vue existe
    let hotels = await mongoose.connection.HotelRank.find({}, [], {
            sort:{
                score: -1 //Sort by score DESC
            }
        })

    if(hotels) {
        res.status(200).json(hotels)
    } else {
        //creer vue HotelRank
        const hotels = await utils.getHotelRank()
        if(hotels) res.status(200).json(hotels)
        else res.status(400).json('Erreur dans le scoring interne')
    }
})

/**
 * @route : plannifier une visite (equivalent à add)
 * @method POST
 * @param : (Object JSON) : object Visite conforme au schema (voir schema)
 * @return : (string) : error/confirm message
 */
router.route('/plannifier').post(passport.authenticate('jwt', { session: false }), (req, res) => {
    //#SAME AS PLANNIFIER dans crudVisite
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

module.exports = router;