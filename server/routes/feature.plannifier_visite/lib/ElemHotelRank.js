const RankBehaviour = require("./RankBehaviour")
const Urgence = require("../../../model/urgence.model")

const createHotelRankView = require("../utils").createHotelRankView
const getHotelRankView = require("../utils").getHotelRankView

class ElemHotelRank {

    /**
     * @param : 
     */
    constructor(hotel, rankBehaviour) {
        this.hotel = hotel
        this.score_interne = 0
        this.listUrgences = []
        this.listPriorisation = []
        this.isContreVisite = false

        if(rankBehaviour instanceof RankBehaviour) {
            this.rankBehavious = rankBehaviour
        } else {
            console.log("Le comportement de raning n'est pas standart")
        }
    }

    build() {
       //create list props
       this.score_interne = this.rankBehaviour.calculateScoreHotel()
       this.listUrgences = await Urgence.find({hotel_id: this.hotel.hotel_id})//list urgences pour affichage des infos ds la liste
       this.listPriorisation = //NON UTILISE ENCORE //list priorisations pour affichage d'infos ds la liste
       this.isContreVisite = await //informer si l'hotel porte une contre visite
    }
}

module.exports = ElemHotelRank;