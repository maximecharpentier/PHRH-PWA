const router = require('express').Router();

const User = require('../../model/user.model');

const Helper = require('../feature.gestion_couverture/helpers/feature_gestion_couverture.helper');

/*
 * @desc : requette de login qui verifie si un couple (nom, pwd) existe pour un user
 * @route : login 
 * @method : POST
 * @param : (Object JSON) : {nom: (string), pwd: (string) }
 * @return : mixed 
 *      (array[ (Object JSON) ]) : object model User
 *      (string) : error message
 */
router.route('/login').post((req, res) => {
    //envoyer la req user,pwd a la BD
    const filterObject = {nom: req.body.nom, pwd: req.body.pwd}
    User.findOne(filterObject)
        .then(User => res.status(200).json(User))
        .catch(err => res.status(400).json('Utilisateur inconnu'))
    //#REPRENDRE ICI ET CONTINUER LA VIDEO https://www.youtube.com/watch?v=7nafaH9SddU&t=107s
})

/*
 * @route : get
 * @method : GET
 * @param : (string) : id User
 * @return : mixed 
 *      (Object JSON) : object model User
 *      (string) : error message
 */
router.route('/disconnect').get((req, res) => {
    //get User from DB
    User.findById(req.params.id)
        .then( User => res.status(200).json(User))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;