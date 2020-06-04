const router = require('./node_modules/express').Router();


const Visite = mongoose.model('Visite');;

/**
 * @route : noter Hotel
 * @param : string : id Visite
 * @param : float : note
 */
router.route('/:idvisite/:note').get(passport.authenticate('jwt', { session: false }), (req, res) => {
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