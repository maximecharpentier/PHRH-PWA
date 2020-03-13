const mongoose = require('mongoose');
const Hotel = require("./hotel.model");

const Schema = mongoose.Schema;

const tacheSchema = new Schema({
    hotel_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel', 
    },
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

const Tache = mongoose.model('Tache', tacheSchema)

module.exports = Tache