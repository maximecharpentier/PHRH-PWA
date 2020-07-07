const mongoose = require('mongoose');
const Urgence = mongoose.model('Urgence');
const Visite = mongoose.model('Visite');
const HotelRank = require('../model/hotelrank.model');
const RankBehaviour = require('./RankBehaviour');

class ElemListHotelsRank extends HotelRank {

    constructor(rankBehaviour, entity = {}) {
        super(entity)
        this.rankBehaviour = rankBehaviour
    }

    /**
     * @desc : fonction de build de l'element HotelRank, est déclanché a 
     * chaque modification du metier qui pourra impacter le classement
     * @param {*} hotel 
     */
    async buildFromHotel(hotel) {
        this.hotel_id = hotel._id

        this.score = await this.rankBehaviour.calculateScoreHotel(hotel)
    
        this.urgences = await Urgence.find({hotel_id: hotel._id}).select('_id')//list urgences pour affichage des infos ds la liste
    
        //this.listPriorisation = //NON UTILISE ENCORE //list priorisations pour affichage d'infos ds la liste
        
        this.isContreVisite = false
        const contreVisite = await Visite.findOne({ //ici on part du principe que l'on ne peux pas avoir deux contre-visites pour un meme hotel ce qui selon ma compéhension du metier : n'aurait pas de sens
           hotel_id: hotel._id,
           type: "Contre-visite",
           visite_effectue: false
        })
        if(contreVisite) {
            this.isContreVisite = true
        }
    }

    async refreshScore() {
        this.score = await this.rankBehaviour.calculateScoreHotel(hotel)
    }
}

module.exports = ElemListHotelsRank;