const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//REFS
const Visite = require("./visite.model");
const Vehicule = require("./vehicule.model");

//BCRYPT
const SALT_WORK_FACTOR = 10;

/*const fonction_administrateur = 'Superviseur'
const functions = () => {
    cpnst mappingFile = 
    const refDocUserAbsPath =     path.resolve('./datas/sources/Adresses Terrain.xlsx')
    const fileReader = XLSXHelper()
    ['Médiateur', 'Intervenant terrain', 'Mediateur SAS', fonction_administrateur]
}*/

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

//definir la methode insertIfNotExist
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


//old meileur facon que "static" : comme ca on peux appeler la fonction sur l'objet recu après la requette BD
userSchema.methods.verifyPassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.pwd)
};

/*
 * HOOKS 
 */

//Cryptage du password a chaque insertion/edition
userSchema.pre('save', function(next) {
    var user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('pwd')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})


const User = mongoose.model('Utilisateur', userSchema)

module.exports = User
//exports.AvailableFunctions = functions
//exports.SuperviseurFunctionName = fonction_administrateur
