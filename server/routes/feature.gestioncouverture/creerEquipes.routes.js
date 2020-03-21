const router = require('./node_modules/express').Router();

const User = require('../../model/user.model');

/*
 * @route : get users pour association
 * @param : string : id Visite
 * @param : float : note
 */
router.route('/users').get((req, res) => {
    //get users
    User.find(null, '_id nom prenom equipier_id')
        .then(users => {
            //init tableau duos
            const duos = []
            //pour chaque users intervenant de terrain
            users.forEach(user => {
                //si présent dans le tableau duo : passer au suivant
                const indexDuo = duos.filter(
                    duo, indexDuo => duo.some(
                        userDuo => {
                            if(userDuo.equipier_id.includes(user.equipier_id)) {
                                return indexDuo
                            }
                        }
                    )
                )
                if(indexDuo){
                    return
                }
                //sinon inserer avec son duo
                else{
                    duos[indexDuo].push(user)
                }
            })
            users
            res.status(200).json(Users)
        })            
        .catch(err => res.status(400).json('Erreurs: ' + err))
    
    
        
        

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

/*
 * @route : associer User A avec B
 * @param : string : id Visite
 * @param : float : note
 */
router.route('/:propuserA/:propuserB').post((req, res) => {
    //recup user A
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