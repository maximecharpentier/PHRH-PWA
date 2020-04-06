const mongoose = require('mongoose');

const Hotel = require('./hotel.model');

const Schema = mongoose.Schema;

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
    visite_effectue : {
        type: String,
        required: true,
        default: false
    }
})

//definir la methode insertIfNotExist
visiteSchema.statics.insertIfNotExist = async function(visite) {
    const docs = await this.find({date_visite: visite.date_visite, hotel_id : visite.hotel_id}).exec()
    if (!docs.length){
        return await visite.save()
    }
    else{
        //throw new Error('Visite <<X>> existe deja', null);
        console.log('Visite <<X>> existe deja')
    }
}

const Visite = mongoose.model('Visite', visiteSchema)

module.exports = Visite