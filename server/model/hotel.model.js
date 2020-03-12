const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    }
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

module.exports = Hotel;
