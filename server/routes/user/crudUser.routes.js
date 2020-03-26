const router = require('express').Router();

const User = require('../../model/user.model');

/*
 * @route : get all
 * @method : GET
 * @param (optionnal) : filter Object : #toDefine
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model User
 *      (string) : error message
 */
router.route('/').get((req, res) => {    
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
 * @route : get
 * @method : GET
 * @param : (string) : id User
 * @return : mixed 
 *      (Object JSON) : object model User
 *      (string) : error message
 */
router.route('/get/:id').get((req, res) => {
    //get User from DB
    User.findById(req.params.id)
        .then( User => res.status(200).json(User))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : add
 * @method : POST
 * @param : (Object JSON) : object User conforme au schema (voir schema)
 * @return : (string) : error/confirm message
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
        equipier_id : req.body.equipier_id,
        vehicule_id : req.body.vehicule_id,
    })

    //save
    user.save()
        .then(() => res.status(200).json('User ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : edit
 * @method : POST
 * @param : (string) : id User
 * @param : (object JSON) : {field1 : newValue, field2 : newValue ...}, 
 *      "fieldX" : (string) nom champ conforme au naming du model User
 *      "newValue" : mixed 
 *          (string) / (integer) / (integer/string : UTC timestamp) pour les types date
 * @return : mixed 
 *      (array) : tableau d'objet model User
 *      (string) : error message
 */
router.route('/edit/:id').post((req, res) => {
    //create 
    const propList = [
        'nom',          'prenom',       'pwd',
        'fonction',     'secteur',      'plage_h',
        'vehicule_id', 'jour_bureau'
    ]
    const setObject = {}
    propList.forEach(prop => {
        if(prop in req.body) {
            switch (prop) {
                case 'jour_bureau':
                    setObject[prop] = req.body[prop] ? new Date(Number(req.body[prop])) : null
                    break;
                default:
                    setObject[prop] = req.body[prop]
            }
        }
    })
    
    User.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: setObject },  
        //{ new: true }
        )
        .then(User => res.status(200).json('User edité avec succès'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : delete
 * @method : DELETE
 * @param : (string) : id User
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => { res.status(200).json('User supprimé')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;