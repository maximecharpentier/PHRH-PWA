const RankBehaviour = require("./RankBehaviour");

class RankBehaviourV1 extends RankBehaviour{

    constructor(hotel){
        super(hotel)
    }

    calculateScoreHotel() {
        super.calculateScoreHotel()

        const DATE_DEBUT_PERIODE = {month: 1}
        const DUREE_PERIODE_M = 12
        //return : int : % d'avancement par rapport a la periode
        const CURRENT_AVCMNT_PERIODE = () => {
            const current_month = new Date().getMonth()

            //le moi de début de priode est le moi courant
            if(current_month = DATE_DEBUT_PERIODE.month) {
                return 0
            }

            //le moi de début de priode suit le mois courant
            if(current_month < DATE_DEBUT_PERIODE.month) {
                return 100 - ((DATE_DEBUT_PERIODE.month - current_month) * 100 / DUREE_PERIODE_M)
            }

            //le moi de début de priode precède le mois courant
            if(current_month > DATE_DEBUT_PERIODE.month) {
                return 100 - ((current_month - DATE_DEBUT_PERIODE.month) * 100 / DUREE_PERIODE_M)
            }
        }

        const NB_VISITES_OPTI_PERIODE = 3

        const SEUIL_URGENCE = 1
        const SEUIL_CONTRE_VISITE = 0.99
        const SEUIL_VISITE_URGENTE = 0.98
        const PAS_PB_IMPORTANCE_FORTE = 0.08
        const PAS_PB_IMPORTANCE_FAIBLE = 0.06
        const PAS_BASE = 0.04
        const BASE_SCORE = 1/Number(this.hotel.note)
        //PS : verifier le processus compte rendu, programation des contres-visites
        //L'ordre des blocks suivants ne doit pas changer pour réaliser la bonne évaluation

        //si urgence
        const urgences = Urgence.find({hotel_id: this.hotel._id})
        if(urgences) {
            return SEUIL_URGENCE
        }

        //si contre visite
        const contreVisite = await Visite.findOne({ //ici on part du principe que l'on ne peux pas avoir deux contre-visites pour un meme hotel ce qui selon ma compéhension du metier : n'aurait pas de sens
           hotel_id: this.hotel._id,
           type: "Contre-visite",
           visite_effectue: false
        })
        if(contreVisite) {
            return SEUIL_CONTRE_VISITE
        }

        //si seuil visite urgente
        /**
         * si un hotel n'a qu'1 ou 0 visite sur la periode
         * et qu'il n'a pas été visité depuis (DUREE_PERIODE_M / NB_VISITES_OPTI_PERIODE)
         */
        if(this.hotel.nb_visites_periode in [0,1]) {
            //#REPRENDRE ICI ici faire le calcul de savoir su la dernière visite remonte a + de (DUREE_PERIODE_M / NB_VISITES_OPTI_PERIODE)
        }



        //si anomalie || priorisation || nb_visite_periode
        //évolution du score
        //score démare a 0.8
        baseScore = 0.8
        //si anomalie(s)
        //pour chaque anomalie : +pas

        //si priorisation(s)
        //pour chaque priorisation : +pas

        //si indicateur

        /**
         * base : 1/note Hotel
         * increment : 0.05
         * 
         */

        //evaluation nb_visite_periode en fonction de la période : plus on est loin ds l'année
        //pour les nombre de visite periode
            //3 visites par ans préconisées
                //calcul periode de l'année : P (old A) (1/2/3)
                //nb_visites_optimales par an : O (3)
                //get nb_visites_periode : V (old P)

                //V1
                //si A >= P OK
                //si A < P

                //V2
                //calcul ecart puis comparer a la periode en cours
                //ecartOV = O - V
                //si ecartPV < 0 : continue
                //si ecartPV =  ex : A=2 P=1



        //PS : voir ou incrementer le nb_visites_periode
        //calcul score de base
        const noteMediane = 38.52

        
        if(this.hotel.note) {
            baseScore = Math.floor(0.98/(this.hotel.note/100)) 
        } else {
            baseScore = Math.floor(0.98/(noteMediane/100))
        }

        //évolution du score
        const pas = 0.005
        //Si: anincrementer de "pas" * nb anomalies

        //#REPRENDRE ICI ET TROUVER METHODES POUR QUEL E CLASEMNT OSIT LP LUS PRECIS POSSIBLES IDEES :
        //-seuil pour les hotels qui ont au moins 1 anomalie, ou 1 prio ou autre (ex : nb_visite_periode)
        //anomalies non ?
    }
}

module.exports = RankBehaviourV1;