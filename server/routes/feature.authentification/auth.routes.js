const mongoose = require('mongoose');
const router = require('express').Router();   
const User = require("../../model/user.model");
const utils = require('../../lib/utils');

/*router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});*/

/**
 * @desc : route pour valider le login avec couple (nom, pwd) et generer le token d'authentification
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