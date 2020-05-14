const router = require('express').Router();

const Urgence = require('../../model/urgence.model');

/*
 * @route : get all
 * @method : GET
 * @param (optionnal) : filter Object : #toDefine
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Urgence
 *      (string) : error message
 */
router.route('/').get((req, res) => {
    Urgence.find({})
        .then(urgences => res.status(200).json(urgences))            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : get
 * @method : GET
 * @param : (string) : id Urgence
 * @return : mixed 
 *      (Object JSON) : object model Urgence
 *      (string) : error message
 */
router.route('/get/:id').get((req, res) => {
    //get urgence from DB
    Urgence.findById(req.params.id)
        .then( urgence => res.status(200).json(urgence))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : add
 * @method : POST
 * @param : (Object JSON) : object Urgence conforme au schema (voir schema)
 * @return : (string) : error/confirm message
 */
router.route('/add').post((req, res) => {
    //creer model Hotel
    const urgence = new Urgence({
        hotel_id : req.body.id_hotel,
        equipe_id : req.body.id_equipe,  
        resume : req.body.resume, 
        detail : req.body.detail 
    })

    //save
    urgence.save()
        .then(() => res.status(200).json('Urgence ajoutée'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : edit
 * @method : POST
 * @param : (string) : id Urgence
 * @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
 *      "fieldX" : (string) nom champ conforme au naming du model Urgence
 *      "newValue" : mixed 
 *          (string) / (integer) / (integer/string : UTC timestamp) pour les types date
 * @return : mixed 
 *      (array) : tableau d'objet model Urgence
 *      (string) : error message
 */
router.route('/edit/:id').post((req, res) => {   
    Urgence.findById(req.params.id) 
        .then(urgence => {
            const propList = ['resume', 'detail']
            propList.forEach(prop => {
                if(prop in req.body) urgence[prop] = req.body[prop]
            })
            
            urgence.save()
                .then( urgence => res.status(200).json('Urgence édité avec succès') )
                .catch( err => res.status(400).json('Erreur: ' + err) )
        })
        .catch(err => res.status(400).json('Erreur: urgence non treouvée : ' + err))
})

/*
 * @route : delete
 * @method : DELETE
 * @param : (string) : id Urgence
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete((req, res) => {
    Urgence.findByIdAndDelete(req.params.id)
        .then(() => { res.json('Urgence supprimée')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;