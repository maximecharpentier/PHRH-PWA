const mongoose = require('mongoose');

const Hotel = mongoose.model('Hotel');

const Schema = mongoose.Schema;

const visiteSchema = new Schema({
    uid_internal : {
        type: Number, 
        required: false,
        trim: true,
    },
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
        required: false,
        trim: true,
        maxlength: 4,
        default: null
    },
    duree : {
        type: Number, 
        trim: true,
        maxlength: 3,
        default: 60
    },
    type : {
        type: String,
        enum: ['Visite', 'Contre-visite'],
        required: true

    },
    visite_effectue : {
        type: Boolean,
        required: true,
        default: false
    }
})

//definir la methode insertIfNotExist
visiteSchema.statics.insertIfNotExist = async function(visite) {
    const docs = await this.find({date_visite: visite.date_visite, hotel_id : visite.hotel_id}).exec()
    if (!docs.length){
        try {
            const visiteDB = await visite.save()
            return visiteDB
        } catch(err) {
            console.log(
                "Visite invalide : " + '\n' + 
                visite + '\n' +
                "Erreur : " + '\n' +
                err
            )
        }
    }
    else{
        //throw new Error('Visite <<X>> existe deja', null);
        console.log('Visite <<X>> existe deja')
    }
}

const Visite = mongoose.model('Visite', visiteSchema)

module.exports = Visite