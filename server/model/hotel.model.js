const mongoose = require('mongoose');

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
        maxlength: 400
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

hotelSchema.statics.insertIfNotExist = async function (hotel) {
    const docs = await this.find({nom : hotel.nom}).exec()
    if (!docs.length){
        return await hotel.save()
    }
    else{
        throw new Error('Hotel <<'+ hotel.nom +'>> existe deja');
    }
}

const Hotel = mongoose.model('Hotel', hotelSchema)
const Urgence = mongoose.model('Urgence', urgenceSchema)
const Tache = mongoose.model('Tache', tacheSchema)
const Anomalie = mongoose.model('Anomalie', anomalieSchema)

exports.Hotel = Hotel;
exports.Urgence = Urgence;
exports.Tache = Tache;
exports.Anomalie = Anomalie;
