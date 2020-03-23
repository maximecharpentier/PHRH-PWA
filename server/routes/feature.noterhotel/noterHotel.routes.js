const router = require('./node_modules/express').Router();

const Visite = require('../../model/visite.model');

/*
 * @route : noter Hotel
 * @param : string : id Visite
 * @param : float : note
 */
router.route('/:idvisite/:note').get((req, res) => {
    //get visite
    Visite.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: {
            note: req.params.note,
            date_visite: Date.now()
        } }, 
        //{ new: true }
        )
        .then(visite => res.status(200).json('Hotel noté avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;