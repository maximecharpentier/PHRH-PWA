const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const ucFirst = require('../lib/utils').capitalize

const Schema = mongoose.Schema;

//BCRYPT
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    nom : {
        type: String, 
        required: true, 
        trim: true,
        maxlength: 20
    },
    prenom : {
        type: String, 
        required: true, 
        trim: true,
        maxlength: 20
    },
    pwd : {
        type: String, 
        required: true, 
        trim: true,
        maxlength: 20
    },
    fonction : {
        type: String,
        required: true, 
        trim: true,
        maxlength: 25
        //enum: functions, //tmp : ici pas d'enum car cela cause une sensibilité trop élevé pour l'import, il faudrai adapter le code
    },
    adresse : {
        type: String,
        required: false, 
    },
    secteur : {
        type: String, 
        required: true, 
        trim: true,
        maxlength: 5
    },
    jour_bureau : {
        type : Date,
        default: null
    },
    vehicule_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Vehicule', 
    }
})

/**
 * @desc : methode du shema pour inserer si l'utilisateur n'existe pas
 * @param {object} : user object conforme au schema
 */
userSchema.statics.insertIfNotExist = async function(user) {
    const docs = await this.find({nom : user.nom}).exec()
    if (!docs.length){
        try {
            const userDB = await user.save()
            return userDB
        } catch(err) {
            console.log(
                "User invalide : " + '\n' + 
                user + '\n' +
                "Erreur : " + '\n' +
                err
            )
        }
    }
    else{
        //throw new Error('Utilisateur <<'+ user.nom +'>> existe deja', null);
        console.log('Utilisateur <<'+ user.nom +'>> existe deja')
    }
}

/**
 * @desc : methode de l'objet BD qui présente l'objet sous la forme "Pierre Jea."" 
 * @param {void}
 */
userSchema.methods.getNamePres = function() {
    return `${ucFirst(this.prenom)} ${ucFirst(this.nom).substring(0,3)}.`  
}

/**
 * @desc : methode de l'objet BD qui vérifie l'egalité entre le hash du pwd et celui en BD
 * @param {string} : password en clair
 */
userSchema.methods.verifyPassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.pwd)
}

/*
 * HOOKS 
 */

/**
 * @hook : pre
 * @desc : Cryptage du password a chaque insertion/edition
 * @param {object} : user object conforme au schema
 */
userSchema.pre('save', function(next) {
    var user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('pwd')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.pwd, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.pwd = hash;
            next();
        });
    });
})

const User = mongoose.model('User', userSchema)

module.exports = User
