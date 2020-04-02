const router = require('express').Router();

const ObjectId = require('mongoose').Types.ObjectId;
const Visite = require('../../model/visite.model');
const Urgence = require('../../model/urgence.model');
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
router.route('/suggestions').get((req, res) => {
    //pour un binome ?
    //extraire les urgences -> U
        //get urgence : pour un secteur corresondant au binome ou TOUTES ?
        //SELECT Urgences
        //FROM Urgence
        //WHERE Urgences.hotel_id IN 
            //SELECT hotel_id
            //FROM Hotel
            //WHERE extract_secteur_from_cp(Hotel.cp) == User.secteur

    //extraire les priorisations -> P
        //à venir

    //classer hotel par note -> H (50 premiers)
        //SELECT Hotel
        //FROM Hotel
        //WHERE extract_secteur_from_cp(Hotel.cp) == User.secteur
        //GROUP BY Hotel.note ASC
        
    //classer par score interne -> HS
    //si fonction d'une adresse A
        //classer HS en fonction de l'adresse la plus proche A HS.addr
    //retourner U + P + HS(.addr)

    //get all visites
    Visite.find()
        .then( visites => res.status(200).json(visites))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : plannifier une visite (equivalent à add)
 * @method : POST
 * @param : (Object JSON) : object Visite conforme au schema (voir schema)
 * @return : (string) : error/confirm message
 */
router.route('/plannifier').post((req, res) => {
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