const mongoose = require('mongoose');

const Urgence = require("urgence.model");
const Anomalie = require("anomalie.model");
const Tache = require("tache.model");

const Schema = mongoose.Schema;

const urgenceSchema = new Schema({
    resume: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 50
    },
    detail: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 3600
    }
})

const tacheSchema = new Schema({
    type: {
        type: String, 
        required: true,
        enum: ['Relance hotel pour reglement anomalie', 'Appel famille', 'Amende à envoyer'],
    },
    date_au_plus_tot : {
        type: Date,
        required: true
    },
    date_au_plus_tard : {
        type: Date,
        required: true
    }
})

const anomalieSchema = new Schema({
    nature: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    }
})

const hotelSchema = new Schema({
    nom: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 50
    },
    adresse: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 6
    },
    cp : {
        type: Number, 
        required: true,
        trim: true,
        length: 5
    },
    ville : {
        type: String, 
        required: true,
        trim: true,
        maxlength: 25
    },
    nb_chambres_utilise : {
        type: Number, 
        required: true,
        trim: true,
        maxlength: 3
    },
    nb_visites_periode : {
        type: Number, 
        required: true,
        trim: true,
        maxlength: 2
    },
    last_time_visited : {
        type : Date
    },
    urgences : {
        type: [urgenceSchema]
    },
    anomalies : {
        type: [anomalieSchema]
    },
    taches : {
        type: [tacheSchema]
    },
})

//definir la methode insertIfNotExist
/*authSchema.statics.insertIfNotExist = function(auth, cb) {
    this.find({name : auth.name}).exec(function(err, docs) {
        if (!docs.length){
            auth.save(function(err) {
                cb(err, auth)
            })
        }
        else{
            cb('Auth <<'+ auth.nom +'>> existe deja', null);
        }
    })
}*/


const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel