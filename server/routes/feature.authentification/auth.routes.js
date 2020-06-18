const router = require('express').Router();
const authStrategy = require('../../lib/utils').authStrategy;   
const mongoose = require('mongoose');
const User = mongoose.model('User');
const utils = require('../../lib/utils');

/*router.get('/protected', authStrategy(), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});*/

/**
 * @desc : valider le login avec couple (nom, pwd) et generer le token d'authentification
 * @method POST
 * @param {Object} : {nom: (string) nom user BD, pwd: (string) pwd en clair}
 * @return {Object} : { success: (bool) le login a reussi/échoué, 
 *                      token: (string) token d'authorisation), 
 *                      expiresIn: (string) "1d" pour un jour par exemple
 *                      }
 */
router.post('/login', function(req, res, next){
    User.findOne({ nom: req.body.nom })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            else{

                // Function defined at bottom of app.js
                const isValid = user.verifyPassword(req.body.pwd);
                
                if (isValid) {

                    const tokenObject = utils.issueJWT(user);

                    res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

                } else {

                    res.status(401).json({ success: false, msg: "you entered the wrong password" });

                }
            }
            
            
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;