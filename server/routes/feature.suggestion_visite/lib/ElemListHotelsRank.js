const mongoose = require('mongoose');
const Urgence = mongoose.model('Urgence');
const Visite = mongoose.model('Visite');
const Hotel = mongoose.model('Hotel');
const HotelRank = require('../model/hotelrank.model');

class ElemListHotelsRank {

    constructor(rankBehaviour, entity = {}) {
        this.id =               entity._id ? entity._id : -1
        this.hotel_id =         entity.hotel_id ? entity.hotel_id : null
        this.score =            entity.score ? entity.score : -1
        this.urgences =         entity.urgences ? entity.urgences : []
        this.isContreVisite =   entity.isContreVisite ? entity.isContreVisite : false

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
        
        const contreVisite = await Visite.findOne({ //ici on part du principe que l'on ne peux pas avoir deux contre-visites pour un meme hotel ce qui selon ma compéhension du metier : n'aurait pas de sens
           hotel_id: hotel._id,
           type: "Contre-visite",
           visite_effectue: false
        })
        if(contreVisite) {
            this.isContreVisite = true
        }
    }

    async refresh() {
        if(this.hotel_id) {
            const hotel = await Hotel.find({})
            this.buildFromHotel(hotel)
        }
    }

    async insert() {
        let hotelRank = new HotelRank(this)
        const elem = await HotelRank.insertIfNotExist(hotelRank)
            
        return elem
    }

    async update() {
        let hotel = await Hotel.findById(this.hotel_id)
        await this.buildFromHotel(hotel)
        const elem =  await HotelRank.findByIdAndUpdate(
            { _id: this.id }, 
            { $set: this }
            )

        return elem
    }

    async delete() {
        const elem = await HotelRank.findByIdAndDelete(this.id)
        
        return elem
    }

    async refreshScore() {
        if(this.hotel_id) {
            const hotel = await Hotel.findById(this.hotel_id)
            this.score = await this.rankBehaviour.calculateScoreHotel(hotel)
            this.update()
        }
    }
}

module.exports = ElemListHotelsRank;