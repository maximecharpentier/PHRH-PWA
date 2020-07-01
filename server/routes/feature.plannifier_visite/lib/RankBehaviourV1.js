const RankBehaviour = require("./RankBehaviour");

class RankBehaviourV1 extends RankBehaviour{

    constructor(hotel){
        super(hotel)
    }

    calculateScoreHotel() {
        super.calculateScoreHotel()
        //PS : verifier le processus compte rendu, programation des contres-visites
        //L'ordre des blocks suivants ne doit pas changer pour réaliser la bonne évaluation

        //si urgence
        const urgences = Urgence.find({hotel_id: this.hotel._id})
        if(urgences) {
            return 1
        }

        //si contre visite
        const contreVisite = await Visite.findOne({ //ici on part du principe que l'on ne peux pas avoir deux contre-visites pour un meme hotel ce qui selon ma compéhension du metier : n'aurait pas de sens
           hotel_id: this.hotel._id,
           type: "Contre-visite",
           visite_effectue: false
        })
        if(contreVisite) {
            return 0.99
        }

        //calcul score de base
        const noteMediane = 38.52

        let baseScore = 0
        if(this.hotel.note) {
            baseScore = Math.floor(0.98/(this.hotel.note/100)) 
        } else {
            baseScore = Math.floor(0.98/(noteMediane/100))
        }

        //évolution du score
        const pas = 0.005
        //incrementer de "pas" * nb anomalies

        //#REPRENDRE ICI ET TROUVER METHODES POUR QUEL E CLASEMNT OSIT LP LUS PRECIS POSSIBLES IDEES :
        //-seuil pour les hotels qui ont au moins 1 anomalie, ou 1 prio ou autre (ex : nb_visite_periode)
        //
    }
}

module.exports = RankBehaviourV1;