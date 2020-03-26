const router = require('express').Router();

const Visite = require('../../model/visite.model');

/*
 * @route : get all visites pour un user
 * @method : GET
 * @param (optionnal) : filter Object : #toDefine
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Visite pour un User ou un Visite
 *      (string) : error message
 */
router.route('/:identite').get((req, res) => {
    //chercher l'user avec l'id
    //si trouvé : cas 1
    //si pas trouvé chercher pour visite avec id
    //si trouvé : cas 2    

    //cas 1 : 
    //chercher les Assoc_user_visite avec user_id = :identite
    //creer les objets visites et retourner

    //cas 2 :
    //chercher les Visites avec id Visite = :identite
    //retourner

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
    Visite.find(filterObj/*{ville: { $in: '.*b*'}}*/)
        .then(visites => res.status(200).json(visites))            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : get
 * @method : GET
 * @param : (string) : id Visite
 * @return : mixed 
 *      (Object JSON) : object model Visite
 *      (string) : error message
 */
router.route('/get/:id').get((req, res) => {
    //get visite from DB
    Visite.findById(req.params.id)
        .then( visite => res.status(200).json(visite))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : add
 * @method : POST
 * @param : (Object JSON) : object Visite conforme au schema (voir schema)
 * @return : (string) : error/confirm message
 */
router.route('/add').post((req, res) => {
    //creer model Visite
    const visite = new Visite({
        nom :           req.body.nom, 
        adresse :       req.body.adresse, 
        cp :            Number(req.body.cp), 
        ville :                 req.body.ville, 
        nb_chambres_utilise :   req.body.nb_chambres_utilise, 
        nb_visites_periode :    req.body.nb_visites_periode, 
        last_time_visited :     new Date(req.body.last_time_visited),
    })

    //save
    visite.save()
        .then(() => res.status(200).json('Visite ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : edit
 * @method : POST
 * @param : (string) : id Visite
 * @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
 *      "fieldX" : (string) nom champ conforme au naming du model Visite
 *      "newValue" : mixed 
 *          (string) / (integer) / (integer/string : UTC timestamp) pour les types date
 * @return : mixed 
 *      (array) : tableau d'objet model Visite
 *      (string) : error message
 */
router.route('/edit/:id').post((req, res) => {
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

    Visite.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: setObject }, 
        //{ new: true }
        )
        .then(visite => res.status(200).json('Visite édité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : delete
 * @method : DELETE
 * @param : (string) : id Visite
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete((req, res) => {
    Visite.findByIdAndDelete(req.params.id)
        .then(() => { res.status(200).json('Visite supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;