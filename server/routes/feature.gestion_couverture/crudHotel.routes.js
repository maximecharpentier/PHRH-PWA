const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;
const passport = require('passport')
const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

//const Hotel = require('../../model/hotel.model');

/**
 * @route : get all
 * @method GET
 * @auth : dans l'entete de la requette "Authorisation" doit contenir le token
 * @param {void} filter Object : #toDefine
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Hotel
 *      (string) : error message
 */
router.route('/').get(authStrategy(), (req, res) => {
    //#REPRENDRE ICI ET REPRODUIRE POUR TOUTES LES ROUTES    
    //let mongoFilter = []
    let filterObj = {}
    /*
    if(req.body.filters) {
        req.body.filters.map(filter => {
            //create filter from request
            //old filterObj[filter.field] = { $regex: '.*' + filter.value + '*', $options: 'i' }
            filterObj[filter.field] = { $in: '.*' + filter.value + '*'}
            //filterObj['test'] = "ok"

            //populate aray filters
            //mongoFilter.push(
            //    {filterObj}
            //)
        })
    }
    */
    //reprendre ici et construire le system de filtre dynamic
    Hotel.find(filterObj/*{ville: { $in: '.*b*'}}*/)
        .then(hotels => res.status(200).json(hotels))            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : get
 * @method GET
 * @param {string} : id Hotel
 * @return : mixed 
 *      (Object JSON) : object model Hotel
 *      (string) : error message
 */
router.route('/get/:id').get(authStrategy(), (req, res) => {
    //get hotel from DB
    Hotel.findById(req.params.id)
        .then( hotel => res.status(200).json(hotel))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : add
 * @method POST
 * @param : (Object JSON) : object Hotel conforme au schema (voir schema)
 * @return : (string) : error/confirm message
 */
router.route('/add').post(authStrategy(), (req, res) => {
    //creer model Hotel
    const hotel = new Hotel({
        nom :           req.body.nom, 
        adresse :       req.body.adresse, 
        cp :            Number(req.body.cp), 
        ville :                 req.body.ville, 
        nb_chambres_utilise :   req.body.nb_chambres_utilise, 
        nb_visites_periode :    req.body.nb_visites_periode, 
        last_time_visited :     new Date(req.body.last_time_visited),
    })

    //save
    hotel.save()
        .then(() => res.status(200).json('Hotel ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : edit
 * @method POST
 * @param {string} : id Hotel
 * @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
 *      "fieldX" : (string) nom champ conforme au naming du model Hotel
 *      "newValue" : mixed 
 *          (string) / (integer) / (integer/string : UTC timestamp) pour les types date
 * @return : mixed 
 *      (array) : tableau d'objet model Hotel
 *      (string) : error message
 */
router.route('/edit/:id').post(authStrategy(), (req, res) => {
    //create 
    const propList = [
        'nom',      'adresse',              'cp',
        'ville',    'nb_chambres_utilise',  'nb_visites_periode',
        'last_time_visited']
    const setObject = {}
    propList.forEach(prop => {
        if(prop in req.body) {
            switch (prop) {
                case 'last_time_visited':
                    setObject[prop] = req.body[prop] ? new Date(Number(req.body[prop])) : null
                    break;
                case 'cp':
                    setObject[prop] = req.body[prop] ? Number(req.body[prop]) : null
                    break;
                default:
                    setObject[prop] = req.body[prop]
            }
        }
    })

    Hotel.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: setObject }, 
        //{ new: true }
        )
        .then(hotel => res.status(200).json('Hotel édité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/**
 * @route : delete
 * @method DELETE
 * @param {string} : id Hotel
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete(authStrategy(), (req, res) => {
    Hotel.findByIdAndDelete(req.params.id)
        .then(() => { res.status(200).json('Hotel supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;