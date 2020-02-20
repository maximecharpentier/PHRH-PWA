const mongoose = require('mongoose')
/*Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

const Visite = require("./visite.model");
const Vehicule = require("./vehicule.model");

const Schema = mongoose.Schema;
    /*bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

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
        enum: ['Médiateur', 'Intervenant terrain', 'Mediateur SAS', 'Gestionnaire'],
        required: true
    },
    secteur : {
        type: String, 
        required: true, 
        trim: true,
        maxlength: 5
    },
    plage_h : {
        type: String,
        enum: ['Matin', 'Journée', 'Soir'],
        required: true

    },
    infos_equipe : {
        type: String, 
        required: true, 
        trim: true,
        maxlength: 50
    },
    equipier_id : {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    visites_id : [{
        type: Schema.Types.ObjectId, 
        ref: 'Visite'
    }],
    vehicule_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Vehicule', 
        required: true,
    }
})

//definir la methode insertIfNotExist
userSchema.statics.insertIfNotExist = function(user, cb) {
    this.find({user : user.nom}).exec(function(err, docs) {
        if (!docs.length){
            user.save(function(err) {
                cb(err, user)
            })
        }
        else{
            cb('Auth <<'+ user.nom +'>> existe deja', null);
        }
    })
}


const User = mongoose.model('Utilisateur', userSchema)

module.exports = User