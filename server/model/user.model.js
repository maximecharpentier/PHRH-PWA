const mongoose = require('mongoose')
const ucFirst = require('../utils/utils').capitalize

//const XLSXHelper = require('./module_xlsx.helper');

const Visite = require("./visite.model");
const Vehicule = require("./vehicule.model");

const Schema = mongoose.Schema;
    /*bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

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

userSchema.methods.getNamePres = function() {
    return `${ucFirst(this.prenom)} ${ucFirst(this.nom).substring(0,3)}.`  
}


const User = mongoose.model('Utilisateur', userSchema)

module.exports = User
//exports.AvailableFunctions = functions
//exports.SuperviseurFunctionName = fonction_administrateur
