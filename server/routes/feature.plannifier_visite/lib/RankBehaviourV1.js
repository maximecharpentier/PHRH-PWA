const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const Urgence = mongoose.model('Urgence');
const Visite = mongoose.model('Visite');

const RankBehaviour = require("./RankBehaviour"); 

class RankBehaviourV1 extends RankBehaviour {

    constructor(){
        super()
    }

    async calculateScoreHotel(hotel) {
        super.calculateScoreHotel(hotel)

        //vars diverses
        const DATE_DEBUT_PERIODE = {month: 1}
        const DUREE_PERIODE_M = 12
        const NB_VISITES_OPTI_PERIODE = 3
        const AMELIORATION_SOUHAITEE_NOTE_MOYENNE = 3
        const CURRENT_NOTE_MOYENNE =  await Hotel.aggregate([{
            $group: {
                _id: null,
                average: {
                    $avg: "$note"
                }
            }
        }]).exec().average
        const NOTE_MOYENNE_SOUHAITEE = CURRENT_NOTE_MOYENNE + AMELIORATION_SOUHAITEE_NOTE_MOYENNE
        //return : int : % d'avancement par rapport a la periode
        const CURRENT_AVCMNT_PERIODE = () => {
            const current_month = new Date().getMonth()

            //le moi de début de priode est le moi courant
            if(current_month === DATE_DEBUT_PERIODE.month) {
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

        //quartilles pour les notes
        const QUARTILE_1_NOTE = 65
        const QUARTILE_2_NOTE = 45
        const QUARTILE_3_NOTE = 30
        const QUARTILE_4_NOTE = 20
        const getScoreQuartile = () => {
            if(hotel.note <= QUARTILE_1_NOTE) return 0
            if(hotel.note <= QUARTILE_2_NOTE) return PAS_BASE
            if(hotel.note <= QUARTILE_3_NOTE) return PAS_PB_IMPORTANCE_FAIBLE
            if(hotel.note <= QUARTILE_4_NOTE) return PAS_PB_IMPORTANCE_FORTE
        }

        //definitions des seuils = scores definissants des intervales de catégories de classement
        const SCORE_SEUIL_URGENCE = 1 //si l'hotel comporte une urgence
        const SCORE_SEUIL_CONTRE_VISITE = 0.99 //si l'hotel nescessite une contre visite
        const SCORE_SEUIL_VISITE_URGENTE = 0.98 //si la visite est urgente pour maintenir un bon equilibrage du nb de visites / hotels
        const SCORE_SEUIL_OPTI_VISITE = 0.8 //seuil le plus bas

        //definition des pas
        const PAS_PB_IMPORTANCE_FORTE = 0.08
        const PAS_PB_IMPORTANCE_FAIBLE = 0.06
        const PAS_BASE = 0.04

        //score de base
        let SCORE = SCORE_SEUIL_OPTI_VISITE/Number(hotel.note)

        //PS : verifier le processus compte rendu, programation des contres-visites
        //PS : L'ordre des blocks suivants ne doit pas changer pour réaliser la bonne évaluation

        //score de base
        /**
         * Le score de base est calculé par rapport a la une note médiane 
         * qualitative, c'est a dire calculé non pas par rapport a la reele note médianes
         * mais par rapport a la note médiane souhaitée par le métier #REPRNENDREI CI ET LIER LA QUALI ET LE CALCUL DU SCORE
         */

        //si urgence
        const urgences = await Urgence.find({hotel_id: hotel._id})
        if(urgences.length) {
            return SCORE_SEUIL_URGENCE
        }

        //si contre visite
        const contreVisite = await Visite.findOne({ //ici on part du principe que l'on ne peux pas avoir deux contre-visites pour un meme hotel ce qui selon ma compéhension du metier : n'aurait pas de sens
           hotel_id: hotel._id,
           type: "Contre-visite",
           visite_effectue: false
        })
        if(contreVisite) {
            return SCORE_SEUIL_CONTRE_VISITE
        }

        //si seuil visite urgente
        /**
         * Si 70% de la période a été depassé et que seulement 0 ou 1 visites on été faites pour l'hotel
         * On cosidère que la visite presse vraiment vraiment
         */
        if(hotel.nb_visites_periode in [0,1] && CURRENT_AVCMNT_PERIODE() >= 70) {
            return SCORE_SEUIL_VISITE_URGENTE
        }

        //si seuil visite optimale
        /**
         * Le but est d'optimiser globalement le rithme des visites en fonction
         * de l'ecart de temps entre le moment présent et la date de la dernière visite pour 
         * le comparer a l'ecart optimal théorique entre chaque visite (=temps total periode / nombre de visites optimale)
         * et remonter les hotels qui n'ont pas un bon rithme de visite
         */
        
        if(hotel.nb_visites_periode < NB_VISITES_OPTI_PERIODE) {
            //si ecart entre 
            const ecart = Math.abs(Math.floor((new Date() - new Date(hotel.last_time_visited)) / (1000*60*60*24*31)))

            const intervalIdeal = Math.floor(DUREE_PERIODE_M / NB_VISITES_OPTI_PERIODE)

            if(ecart > intervalIdeal) {
                SCORE = SCORE_SEUIL_OPTI_VISITE + getScoreQuartile()

                //si on depace le seuil juste au dessus, on retranche 0.01 pour etre juste en dessous
                if(SCORE >= SCORE_SEUIL_VISITE_URGENTE) {
                    SCORE = SCORE_SEUIL_VISITE_URGENTE - 0.01
                }
            }
        }

        //si anomalies etc, augmenter le score
        /*
         * si anomalie || priorisation || nb_visite_periode
         */
        //si anomalie(s)
        //pour chaque anomalie : +PAS_PB_IMPORTANCE_FORTE || +PAS_PB_IMPORTANCE_FAIBLE || +PAS_BASE

        //si priorisation(s)
        //pour chaque priorisation : +PAS_PB_IMPORTANCE_FORTE || +PAS_PB_IMPORTANCE_FAIBLE || +PAS_BASE

        //calcul pour le dernier seuil
        /**
         * On calcul a partir de la note et du quartile
         */
        SCORE += getScoreQuartile()
        //si on depace le seuil juste au dessus, on retranche 0.01 pour etre juste en dessous
        console.log(SCORE)
        if(SCORE >= SCORE_SEUIL_OPTI_VISITE) {
            SCORE = SCORE_SEUIL_OPTI_VISITE - 0.01
        }
        
        return SCORE
    }
}

module.exports = RankBehaviourV1;