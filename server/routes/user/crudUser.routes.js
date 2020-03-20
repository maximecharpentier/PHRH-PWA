const router = require('express').Router();

const User = require('../../model/user.model');

/*
 * @route : get
 * @param : id User Object
 */
router.route('/get/:id').get((req, res) => {
    //get User from DB
    User.findById(req.params.id)
        .then( User => res.status(200).json(User))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : add
 * @param : User Object (voir schema)
 */
router.route('/add').post((req, res) => {
    //creer model User
    const user = new User({
        nom :       req.body.nom, 
        prenom :    req.body.prenom, 
        pwd :       req.body.pwd, 
        fonction :  req.body.fonction, 
        secteur :   req.body.secteur, 
        plage_h :   req.body.plage_h, 
        infos_equipe :req.body.infos_equipe,
        equipier_id : req.body.equipier_id,
        vehicule_id : req.body.vehicule_id,
    })

    //save
    user.save()
        .then(() => res.status(200).json('User ajouté'))
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
    User.find(filterObj/*{ville: { $in: '.*b*'}}*/)
        .then(Users => res.status(200).json(Users))            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : edit
 * @param : id User
 */
router.route('/edit/:id').post((req, res) => {
    //create 
    const propList = [
        'nom',          'prenom',       'pwd',
        'fonction',     'secteur',      'plage_h',
        'infos_equipe', 'equipier_id',  'vehicule_id']
    const setObject = {}
    propList.forEach(prop => {
        if(prop in req.body) setObject[prop] = req.body[prop]
    })
    User.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: setObject }, 
        //{ new: true }
        )
        .then(User => res.status(200).json('User édité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : delete
 * @param : id User
 */
router.route('/delete/:id').delete((req, res) => {
    User.findOneAndDelete(req.params.id)
        .then(() => { res.status(200).json('User supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;