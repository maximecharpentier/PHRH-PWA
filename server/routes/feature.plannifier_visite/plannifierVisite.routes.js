const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const mongoose = require('mongoose');
const AssocUserVisite = require('../../model/assoc_user_visite.model');
const Visite = mongoose.model('Visite');
const Urgence = mongoose.model('Urgence');
const User = mongoose.model('User');
const Equipe = mongoose.model('Assoc_User_User');

/**
 * @route : get all visites
 * @method GET
 * @param {void}
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite
 *      (string) : error message
 */
router.route('/suggestions').get(authStrategy(), (req, res) => {
    //QUESTION : l'affichage de la liste se fait pour un binome ? -> metre des filtrs custom -> OK
    //notes :
        //pour les contre-visites : elles sont automatiquement set lorsque un Hotel a une anomalie
        //quand un Hotel est ajouté : ScoreView est recalculé (voir pour mettre une note default qui permet de reperer les nouveau hotels et les traiter différament : voir groupe pour ca)
        //quand une visite se valide : on recalcul le score ppour l'hotel
        //quand une anomalie est ajouté : on recalcul le score pour l'hotel
        //quand une priorisation est ajouté : on recalcul le score pour l'hotel
        //creer une fonction cron qui chaque jour calcul si un hotel n'a pas été visité au moins trois fois en un an et met une priorisation
    
    //première fois :
        //classer par score interne
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
            //--v1 sans prendre en compte l'agreg de mongo
            //SELECT Urgences
            //FROM Urgence
            //WHERE Urgences.hotel_id IN 
                //SELECT hotel_id
                //FROM Hotel
                //WHERE extract_secteur_from_cp(Hotel.cp) == User.secteur
            //v2 avec agreg
            //SELECT Hotel, Urgence
            //FROM Urgence JOIN Hotel ON Urgence.hotel_id = Hotel._id
            //WHERE isEqualSecteurCP(User.secteur, Hotel.cp) == TRUE
            /* V1 : marche pas retourne tout les 
                hotels Hotel.aggregate([
                {
                    $lookup : {
                        from : "Urgence",
                        localField : "_id",
                        foreignField : "hotel_id",
                        as : "Urgence"
                        },
                    },
                    //{$match: {}},
                    //{$group: {}}
            ])*/
            /* V2 : retourne tt les urgences (probablement)
                Urgence.aggregate([
                {
                    "$addFields": { "userId": { "$toString": "$_id" }}},
                    $lookup : {
                        from : "Hotel",
                        localField : "hotel_id",
                        foreignField : "id",
                        as : "Hotel"
                        },
                    },
                    {$match: {"myArray":{$ne:[]}}},
                    //{$match: {}},
                    //{$group: {}}
            ])
            */
           /* V3 debut utilisation populate : retourne tjr tt les urgences
           //Transformer
            Urgence.find().populate({
                "path": "Hotel",
                //"match": { "cp": { $regex: /^75., $options: 'i' }} //reprendre ici et trouver moyen de mettre une fonction custom pour verifier legalité de hotel "cp" et user "secteur"
            })
            */
            Urgence.find().populate({
                "path" : 'hotel_id',
                "match": { "cp": { $regex: /^75.*/, $options: 'i' }}
            })
            .exec(function(err,entries) {
                // Now client side filter un-matched results
                /*entries = entries.filter(function(entry) {
                    return entry.student != null;
                });*/
                // Anything not populated by the query condition is now removed
                res.status(200).json(entries)
            })
            //.then(hotelsXurgences => res.status(200).json(hotelsXurgences)) //PB je get tout les hotels
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
            //augmenter la note si priorisations : //a venir 
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

    //autres fois
        //si fonction d'une adresse A
            //get Hotels de ScoreView avec score_interne ASC et adresse a moins de Xmin a pieds -> pb de seuil

    //#FIN
    //get all visites
    /*Visite.find()
        .then(visites => res.status(200).json(visites))
        .catch(err => res.status(400).json('Erreurs: ' + err))
        */
})

/**
 * @route : plannifier une visite (equivalent à add)
 * @method POST
 * @param : (Object JSON) : object Visite conforme au schema (voir schema) + equipe_id
 * @return : (string) : error/confirm message
 */
router.route('/plannifier').post(authStrategy(), (req, res) => {
    //vide déplac é ds crudVisite
})

module.exports = router;