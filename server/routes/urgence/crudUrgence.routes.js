const router = require('express').Router();

const Urgence = require('../../model/urgence.model');

/*
 * @route : get
 * @param : id Urgence
 */
router.route('/get/:id').get((req, res) => {
    //get urgence from DB
    Urgence.findById(req.params.id)
        .then( urgence => res.status(200).json(urgence))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : add
 * @param : Hotel Object (voir schema)
 */
router.route('/add').post((req, res) => {
    //creer model Hotel
    const urgence = new Urgence({
        hotel_id : req.body.id_hotel, 
        resume : req.body.resume, 
        detail : req.body.detail 
    })

    //save
    urgence.save()
        .then(() => res.status(200).json('Urgence ajoutée'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : get all
 * @param : void
 */
router.route('/all').get((req, res) => {
    Urgence.find({})
        .then(urgences => res.status(200).json(urgences))            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : edit
 * @param : id Urgence
 */
router.route('/edit/:id').post((req, res) => {
    Urgence.findById(req.params.id) 
        .then(urgence => {
            urgence.resume = req.body.resume, 
            urgence.detail = req.body.detail 

            urgence.save()
                .then( urgence => res.status(200).json('Urgence édité avec succès') )
                .catch( err => res.status(400).json('Erreur: ' + err) )
        })
        .catch(err => res.status(400).json('Erreur: urgence non treouvée : ' + err))
})

/*
 * @route : delete
 * @param : id Hotel
 */
router.route('/delete/:id').delete((req, res) => {
    Urgence.findOneAndRemove(req.params.id)
        .then(() => { res.json('Urgence supprimée')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;