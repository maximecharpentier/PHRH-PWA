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
    console.log(hotelRank)
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

/**
 * @desc : fonction de build de l'element HotelRank, est déclanché a 
 * chaque modification du metier qui pourra impacter le classement
 * @param {*} hotel 
 */
/*hotelRankSchema.statics.build = async function (hotel) {
    const rankBehaviour = new RankBehaviour()

    //create list props
    this.score = rankBehaviour.calculateScoreHotel(hotel)

    this.listUrgences = await Urgence.find({hotel_id: hotel._id}).select('_id')//list urgences pour affichage des infos ds la liste

    //this.listPriorisation = //NON UTILISE ENCORE //list priorisations pour affichage d'infos ds la liste

    const contreVisite = await Visite.findOne({ //ici on part du principe que l'on ne peux pas avoir deux contre-visites pour un meme hotel ce qui selon ma compéhension du metier : n'aurait pas de sens
       hotel_id: hotel._id,
       type: "Contre-visite",
       visite_effectue: false
    })
    if(contreVisite) this.isContreVisite = true
    else this.isContreVisite = false

    console.log(this)
    return this
}*/

const HotelRank = mongoose.model('HotelRank', hotelRankSchema)

module.exports = HotelRank;
