const mongoose = require('mongoose');

const Hotel = require('./hotel.model');

const Schema = mongoose.Schema;

const priorisationSchema = new Schema({
    type: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 35
    },
    message: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 3600
    }
})

const visiteSchema = new Schema({
    hotel_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel', 
        required: true,
    },
    date_visite: {
        type: Date, 
        required: true
    },
    note : {
        type: Number, 
        required: true,
        trim: true,
        maxlength: 4
    },
    duree : {
        type: Number, 
        trim: true,
        maxlength: 3
    },
    type : {
        type: String,
        enum: ['Visite', 'Contre-visite'],
        required: true

    },
    Priorisations : {
        type: [priorisationSchema]
    }
})

//definir la methode insertIfNotExist
visiteSchema.statics.insertIfNotExist = function(visite, cb) {
    this.find({/*name : auth.name*/}).exec(function(err, docs) {
        if (!docs.length){
            visite.save(function(err) {
                cb(err, visite)
            })
        }
        else{
            cb('Visite <<X>> existe deja', null);
        }
    })
}


const Visite = mongoose.model('Visite', visiteSchema)

module.exports = Visite