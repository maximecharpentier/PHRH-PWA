const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urgenceSchema = new Schema({
    hotel_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel',
        required: true
    },
    equipe_id : {
        type: Schema.Types.ObjectId,
        ref: 'Equipe',
        required: false
    },
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
    },
})

urgenceSchema.statics.notifyObservers = function (elem) {

    const loadFileIfExist = require('../lib/utils').loadFileIfExist;
    const observers = []

    //Hotel rank observer
    const observerHotelRank = loadFileIfExist('./routes/feature.plannifier_visite/lib/listHotelsRank')
    if(observerHotelRank !== false) observers.push( new observerHotelRank() )

    //notify observers
    observers.forEach( observer => {
        observer.notify(elem)
    })
}

const Urgence = mongoose.model('Urgence', urgenceSchema)

module.exports = Urgence