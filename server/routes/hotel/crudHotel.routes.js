const router = require('express').Router();

const Hotel = require('../../model/hotel.model');

/*
 * @route : get
 * @param : id Hotel Object
 */
router.route('/get/:id').get((req, res) => {
    //get hotel from DB
    Hotel.findById(req.params.id)
        .then( hotel => res.status(200).json(hotel))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : add
 * @param : Hotel Object (voir schema)
 */
router.route('/add').post((req, res) => {
    //creer model Hotel
    const hotel = new Hotel({
        nom :           req.body.nom, 
        adresse :       req.body.adresse, 
        cp :            Number(req.body.cp), 
        ville :                 req.body.ville, 
        nb_chambres_utilise :   req.body.nb_chambres_utilise, 
        nb_visites_periode :    req.body.nb_visites_periode, 
        last_time_visited :     Date.parse(req.body.last_time_visited),
    })

    //save
    hotel.save()
        .then(() => res.status(200).json('Hotel ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : get all
 * @param : filterObject : #toDefine
 */
router.route('/all').get((req, res) => {    
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

/*
 * @route : edit
 * @param : id Hotel
 */
router.route('/edit/:id').post((req, res) => {
    Hotel.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: { 
            nom :           req.body.nom, 
            adresse :       req.body.adresse, 
            cp :            Number(req.body.cp), 
            ville :                 req.body.ville, 
            nb_chambres_utilise :   req.body.nb_chambres_utilise, 
            nb_visites_periode :    req.body.nb_visites_periode, 
            last_time_visited :     Date.parse(req.body.last_time_visited),
        }}, 
        //{ new: true }
        )
        .then(hotel => res.status(200).json('Hotel édité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : delete
 * @param : id Hotel
 */
router.route('/delete/:id').post((req, res) => {
    Hotel.findOneAndDelete({ id: req.params.id })
        .then(() => { res.status(200).json('Hotel supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;