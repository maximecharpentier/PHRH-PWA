const RankBehaviour = require("./RankBehaviour")
const Urgence = require("../../../model/urgence.model")
const Visite = require("../../../model/visite.model")

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
       this.listUrgences = await Urgence.find({hotel_id: this.hotel._id})//list urgences pour affichage des infos ds la liste
       this.listPriorisation = //NON UTILISE ENCORE //list priorisations pour affichage d'infos ds la liste
       this.isContreVisite = await Visite.findOne({ //ici on part du principe que l'on ne peux pas avoir deux contre-visites pour un meme hotel ce qui selon ma compéhension du metier : n'aurait pas de sens
           hotel_id: this.hotel._id,
           type: "Contre-visite",
           visite_effectue: false
        })//informer si l'hotel porte une contre visite
    }
}

DBFeeder.BUILD_FAILED = "la construction du tableau de données a inserer a échoué"
DBFeeder.SET_PROP_FAILED = "la propriété de l\'entité n\'a pas pu se set"
DBFeeder.JOIN_FAILED = "la jointure a échouée"
DBFeeder.FILL_ENTITY_FAILED = "l'entité n'a pas pu se set"
DBFeeder.IMPORT_ENTITY_FAILED = "l'entité ne peux etre importée"
DBFeeder.SKIP_ENTITY = "passer a l'entité suivante"
DBFeeder.BUILD_ENTITY_ARRAY_FAILED = "erreur de construction du tableau d'entités"
DBFeeder.IMPORT_FAILED = "l'importation des entités a échoué"

module.exports = ElemHotelRank;