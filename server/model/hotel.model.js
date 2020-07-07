const mongoose = require('mongoose');
const Visite = require('./visite.model');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    uid_internal : {
        type: Number, 
        required: false,
        trim: true,
    },
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
    note : {
        type: Number, 
        required: false,
        trim: true,
        maxlength: 4
    },
    nb_chambres_utilise : {
        type: Number, 
        required: false,
        trim: true,
        maxlength: 3,
        default: null
    },
    nb_visites_periode : {
        type: Number, 
        trim: true,
        maxlength: 2
    },
    last_time_visited : {
        type : Date
    },
    memos : [{
        type: Schema.Types.ObjectId, 
        ref: 'Memo',
        required: false
    }]
})

hotelSchema.statics.insertIfNotExist = async function (hotel) {
    const docs = await this.find({nom : hotel.nom}).exec()
    if (!docs.length){
        try {
            const hotelDB = await hotel.save()
            return hotelDB
        } catch(err) {
            console.log(
                "Hotel invalide : " + '\n' + 
                hotel + '\n' +
                "Erreur : " + '\n' +
                err
            )
        }
    }
    else{
        //throw new Error('Hotel <<'+ hotel.nom +'>> existe deja');
        console.log('Hotel <<'+ hotel.nom +'>> existe deja')
    }
}

/**
 * @desc : recuperer l'historique complet des visites ou pour la période en cours
 * @param {object} : object de description de la période {month: (int) moi de début de periode [0-11], day: (int) [1-31] jour du mois de debut de peridoe}
 * @return {array} : tableau d'objet model Visites
 */
hotelSchema.statics.getVisitsHistory = async function(periodeInfo = null) {
    let visits = []

    //si periode est indiqué, donné les visites de la periode en cours (on assume que cette periode commence forcément a un moment de l'année EN COURS et non l'année d'avant)
    if(periodeInfo) {
        visits = await Visite.find({
                date_visite: { 
                    $gte: new Date(new Date().getFullYear(), periodeInfo.month, periodeInfo.day)
                }
            }).sort({date: 'descending'})

    //sinon get toutes les visites
    } else {
        visits = await Visite.find({hotel_id: this._id})
    }

    //retourner les visites
    if(visits) {
        return visits
    } else {
        return []
    }
}

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;
