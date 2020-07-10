const mongoose = require('mongoose');
const Urgence = mongoose.model('Urgence');
const Visite = mongoose.model('Visite');

const RankBehaviour = require("../lib/RankBehaviourV1")

const Schema = mongoose.Schema;

const hotelRankSchema = new Schema({
    hotel_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel', 
        required: true,
    },
    urgences: [{
        type: Schema.Types.ObjectId, 
        ref: 'Urgence',
        required: false
    }],
    /*priorisations: [{
        type: Schema.Types.ObjectId, 
        ref: 'Urgence',
        required: false
    }],to define */
    isContreVisite : {
        type: Boolean,
        required: true,
        default: false
    },
    score : {
        type: Number, 
        required: true,
        trim: true,
    }
})

hotelRankSchema.statics.insertIfNotExist = async function (hotelRank) {
    const docs = await this.find({hotel_id : hotelRank.hotel_id}).exec()
    if (!docs.length){
        try {
            const hotelRankDB = await hotelRank.save()
            return hotelRankDB
        } catch(err) {
            console.log(
                "Hotel rank invalide : " + '\n' + 
                hotelRank + '\n' +
                "Erreur : " + '\n' +
                err
            )
        }
    }
    else{
        //throw new Error('Hotel <<'+ hotel.nom +'>> existe deja');
        console.log('Hotel rank pour l\'hotel <<'+ hotelRank.hotel_id +'>> existe deja')
    }
}

const HotelRank = mongoose.model('HotelRank', hotelRankSchema)

module.exports = HotelRank;
