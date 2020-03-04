const router = require('express').Router();

const { Hotel, Urgence, Tache, Anomalie } = require('../../model/hotel.model');

/*
 * @route : add
 */
router.route('/add').get((req, res) => {

    //creer model Urgences
    const urgences = JSON.parse(req.body.urgences).map( urgence => {
        new Urgence(
            resume = urgence.resume, 
            detail = urgence.detail,
        )
    })

    //creer model Taches
    const taches = JSON.parse(req.body.taches).map( tache => {
        new Urgence(
            type = tache.type, 
            date_au_plus_tot = tache.date_au_plus_tot,
            date_au_plus_tard = tache.date_au_plus_tard,
        )
    })

    //creer model Anomalies
    const anomalies = JSON.parse(req.body.anomalies).map( anomalie => {
        new Urgence(
            nature = anomalie.nature, 
        )
    })

    //creer model Hotel
    const hotel = new Hotel(
        nom = req.body.nom, 
        adresse = req.body.adresse, 
        cp = req.body.cp, 
        ville = req.body.ville, 
        nb_chambres_utilise = req.body.nb_chambres_utilise, 
        nb_visites_periode = req.body.nb_visites_periode, 
        last_time_visited = req.body.last_time_visited,
        urgences,
        anomalies,
        taches
        )

    //save
    newHotel.save()
        .then(() => res.json('Hotel, urgences, anomalies et taches liées ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : get all
 */
router.route('/all').post((req, res) => {
    /*
    let mongoFilter = []
    let filterObj = {}

    req.body.filters.map(filter => {
        //create filter from request
        filterObj[filter.field] = filter.value

        //populate aray filters
        mongoFilter.push(
            {filterObj}
        )
    })*/

    Hotel.find({})
        .then(hotels => res.json(hotels)/*{
            /*var studentsMap = {}
            students.forEach(student => {
                studentsMap[student._id] = student
            })
          
            res.json(studentsMap)*/
        )            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : edit
 */
router.route('/edit/:id').post((req, res) => {
    //creer model Urgences
    const urgences = JSON.parse(req.body.urgences).map( urgence => {
        new Urgence(
            _id = tache._id,
            resume = urgence.resume, 
            detail = urgence.detail,
        )
    })

    //creer model Taches
    const taches = JSON.parse(req.body.taches).map( tache => {
        new Urgence(
            _id = tache._id,
            type = tache.type, 
            date_au_plus_tot = tache.date_au_plus_tot,
            date_au_plus_tard = tache.date_au_plus_tard,
        )
    })

    //creer model Anomalies
    const anomalies = JSON.parse(req.body.anomalies).map( anomalie => {
        new Urgence(
            _id = tache._id,
            nature = anomalie.nature, 
        )
    })

    Hotel.findOneAndUpdate(
        { id: req.params.id }, 
        { $set: { 
            nom: req.body.nom,
            prenom: req.body.prenom,
            promo: req.body.promo,
            descCursus: req.body.descCursus,
            email: req.body.email,
            urgences,
            anomalies,
            taches
        }}, 
        //{ new: true }
        )
        .then(() => { res.json('Hotel, urgences, anomalies et taches liées edité')})
        .catch(err => res.status(400).json('Erreurs: ' + err))

})

/*
 * @route : edit
 */
router.route('/delete/:id').post((req, res) => {
    
    Hotel.findOneAndRemove({ id: req.params.id })
        .then(() => { res.json('Hotel, urgences, anomalies et taches liées supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))

})

module.exports = router;