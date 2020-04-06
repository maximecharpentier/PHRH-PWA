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
    //QUESTION : l'affichage de la liste se fait pour un binome ? -> metre des filtrs custom -> OK
    //notes :
        //pour les contre-visites : elles sont automatiquement set lorsque un Hotel a une anomalie
        //quand un Hotel est ajouté : ScoreView est recalculé (voir pour mettre une note default qui permet de reperer les nouveau hotels et les traiter différament : voir groupe pour ca)
        //quand une visite se valide : on recalcul le score ppour l'hotel
        //quand une anomalie est ajouté : on recalcul le score pour l'hotel
        //quand une priorisation est ajouté : on recalcul le score pour l'hotel
        //creer une fonction cron qui chaque jour calcul si un hotel n'a pas été visité au moins trois fois en un an et met une priorisation
    
    //#REPRDNRE ICI
    //première fois :
    //classer par score interne -> HS
        //pour chaque Hotels
        //creer table view
        /*table ScoreView [
            Hotel : entité
            score_interne : int
            Urgence : entité
            Priorisations : [entités] //a venir
            Contre-visite = bool
        ]*/

        //Methode : 
        //3 "catégories" de classement : Urgences, Contre visites, visites normales (avec priorisation)
        //donc on découpe le traitement pour ces 3 catégories
        //definition de "seuils" de score_interne pour les categories qui doivent s'afficher en premier
        //Urgence : score 1
        //Contre Visite : score 0.99
        //Visites normales : calculé par algorithme


        //1) extraire Hotels avec "Urgences" : score 1
            //QUESTION : pour un secteur corresondant au binome ou TOUTES ?
            //SELECT Urgences
            //FROM Urgence
            //WHERE Urgences.hotel_id IN 
                //SELECT hotel_id
                //FROM Hotel
                //WHERE extract_secteur_from_cp(Hotel.cp) == User.secteur
            //creer ScoreView
                /*
                    Hotel,
                    score_interne = 1,
                    Urgence = entité
                    Priorisation = //a venir
                    Contre-visite = false
                */

        //2) extraire les Hotels avec "Contre-visites" : score 0.99
            //REQUETTE A FORMULER
            //creer ScoreView
                /*
                    Hotel,
                    score_interne = 0.99
                    Urgence = null
                    Priorisation = //a venir
                    Contre-visite = false
                */

        //3) extraire les Hotels avec "visites normales" : score calculé
            //definir note de base : 1/note Hotel
            //augmenter la note si anomalies : //a venir
            //augmenter la note si priorisations : si 
            //augmenter la note si nb_visite_periode < 3 :
            //creer ScoreView
                /*
                    Hotel,
                    score_interne = note
                    Urgence = null
                    Priorisation = //a venir
                    Contre-visite = false
                */

        //liste finale
            //si fonction d'une adresse A
                //get Hotels de ScoreView avec score_interne ASC et adresse a moins de Xmin a pieds -> pb de seuil

    //#FIN

    //get all visites
    Visite.find()
        .then(visites => res.status(200).json(visites))
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