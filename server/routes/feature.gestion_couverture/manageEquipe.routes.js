const router = require('express').Router();

const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../../model/user.model');
const Equipe = require('../../model/assoc_user_user.model');

/*
 * @route : get all
 * @method : GET
 * @param (optionnal) : filter Object : #toDefine
 * @return : mixed 
 *      (array[ (Object JSON) ]) : tableau d'object model Equipe
 *      (string) : error message
 */
router.route('/').get((req, res) => {    
    //let mongoFilter = []
    let filterObj = {}
    //reprendre ici et construire le system de filtre dynamic
    Equipe.find(filterObj/*{ville: { $in: '.*b*'}}*/)
        .then(equipes => res.status(200).json(equipes))            
        .catch('Aucune equipes')
})

/*
 * @route : get l'equipe de l'user
 * @method : GET
 * @param : (string) : id User
 * @return : mixed 
 *      (Object JSON) : object model Equipe 
 *      (string) : error message
 */
router.route('/get/:iduser').get((req, res) => {
    //get hotel from DB
    Equipe.findOne({ 
        $or: [
            {'user_a_id': req.params.iduser}, 
            {'user_b_id': req.params.iduser}
        ] 
    })
    .then(hotel => res.status(200).json(hotel))
    .catch(err => res.status(400).json('Aucune equipe trouvée'))
})

/*
 * @route : get users pour association
 * @method : GET
 * @param : void
 * @return : (array[ (JSON Object{_id, nom, prenom}) ]) : tableau d'Users non associé ds une equipe
 */
router.route('/users').get(async (req, res) => {
    //get users
    User.find({ fonction: { $nin: ['Superviseur'] }}, '_id nom prenom')
        //ici on passe par une fonction async pour pouvoir peupler 'users' 
        //pck si on le peuple ds le .then de AssocUserUser.find alors 
        //const "users" n'est pas remplie
        .then(async usersDB => {
            //tableau des usuer n'appartenant à aucune equipe
            const users = []
            for(userDB of usersDB) {
                //recherche des joueurs appartenant a une equipe
                var userDB_id = new ObjectId(userDB._id)
                const assocDB = await Equipe.find({ 
                    $or: [
                        {'user_a_id': userDB._id}, 
                        {'user_b_id': userDB._id}
                    ] 
                })
                //si le joueur n'appartient a aucune equipe
                if(!assocDB.length) {
                    users.push(userDB)
                }
            }
            res.status(200).json(users)  
        })            
        .catch(err => res.status(400).json('Aucun utilisateur'))
})

/*
 * @route : associer User A avec B
 * @method : POST
 * @param : (string) : id user A
 * @param : (string) : id user B
 * @return : (string) : error/confirm message
 */
router.route('/creer/:idusera/:iduserb').post((req, res) => {
    //checker si un des id est ds une equipe
    Equipe.find({ 
        $or: [
            {'user_a_id': req.params.idusera}, 
            {'user_a_id': req.params.iduserb},
            {'user_b_id': req.params.idusera}, 
            {'user_b_id': req.params.iduserb}, 
        ] 
    })
    .then(assocsDB => {
        //si une equipe existe avec l'un ou l'autre user
        if(assocsDB) {
            //on efface d'office les equipes qui comportent l'un ou l'autre
            for(assocDB of assocsDB) {
                Equipe.findByIdAndDelete(assocDB._id)
            }
            //on créé l'équipe
            const equipe = new Equipe({
                user_a_id: req.params.idusera,
                user_b_id: req.params.iduserb
            })
            equipe.save()
                .then(equipeDB => res.status(200).json('Equipe créée'))
                .catch(err => res.status(400).json('Erreurs: ' + err))
        }
    })
    .catch(err => res.status(400).json('Erreurs: ' + err))
})

/*
 * @route : delete
 * @method : DELETE
 * @param : (string) : id Equipe
 * @return : (string) : error/confirm message
 */
router.route('/delete/:id').delete((req, res) => {
    Equipe.findByIdAndDelete(req.params.id)
        .then(() => { res.status(200).json('Equipe supprimée')})
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;