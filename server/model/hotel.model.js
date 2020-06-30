const mongoose = require('mongoose');

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

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;
