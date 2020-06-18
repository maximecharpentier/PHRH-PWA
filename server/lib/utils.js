const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Get private key (la clef privée est utilisée pour generer le JW token privé de l'utilisateur)
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const _id = user._id;

  //determine la durée de validité du token
  const expiresIn = '1d';

  //le payload est l'objet qui fait le lien entre l'user de la BD logué et le JW Token
  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

/**
 * @desc : met le premier caractère de la chaine en capitale
 * @param {string} s
 */
function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * @desc : fonction passport strategy, est appelé à chaque requettes pour verifier l'authentification de l'user
 */
function authStrategy() {
  //en fonction de l'environnement il peux etre nescessaire de mocker la strategy d'authentification
  const passport = require('passport')
  if(process.env.ACTIVATE_AUTH_REQUESTS === "false") {
    return passport.authenticate('mock', { session: false })
  } else {
    return passport.authenticate('jwt', { session: false })
  }
}

module.exports.capitalize = capitalize;
module.exports.issueJWT = issueJWT;
module.exports.authStrategy = authStrategy;