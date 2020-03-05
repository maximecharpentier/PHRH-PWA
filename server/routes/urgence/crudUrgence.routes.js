const router = require('express').Router();

const { Hotel, Urgence } = require('../../model/hotel.model');

/*
 * @route : add
 * @param : Urgence Object (voir schema)
 */
router.route('/add').get((req, res) => {

    //creer model Urgences
    new Urgence(
        resume = req.body.resume, 
        detail = req.body.detail,
    )

    //get Hotel

    /*
    //save
    newHotel.save()
        .then(() => res.json('Hotel, urgences, anomalies et taches liées ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
        */
})

/*
 * @route : get all
 * @param : void
 */
router.route('/all').post((req, res) => {
    
    /*Hotel.find({})
        .then(hotels => res.status(200).json(hotels))            
        .catch(err => res.status(400).json('Erreurs: ' + err))
        */
})

/*
 * @route : edit
 * @param : id Urgence
 */
router.route('/edit/:id').post((req, res) => {
    //construire objet $set
    //ex : { $set:  { 'urgences.$.name': req.body.name }}
    let updateObj = {$set: {}}
    for(var param in req.body) {
        updateObj.$set['urgences.$.'+param] = req.body[param];
    }

    Hotel.update(
        { 'urgences._id': req.body.id },
        updateObj,
        /*(err, result) => {
          if (err) {
            res.status(500)
            .json({ error: 'Unable to update urgence.', });
          } else {
            res.status(200)
            .json(result);
          }
       }*/
    )
    .then(result => {
        res.status(200).json('Hotel, urgences, anomalies et taches liées edité')
        }
    )
    .catch(err => {
        res.status(500).json('Erreurs: ' + err)
        }
    )
})

/*
 * @route : delete
 * @param : id Hotel
 */
router.route('/delete/:id').post((req, res) => {
    
    /*Hotel.findOneAndRemove({ id: req.params.id })
        .then(() => { res.json('Hotel, urgences, anomalies et taches liées supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
        */

})

module.exports = router;