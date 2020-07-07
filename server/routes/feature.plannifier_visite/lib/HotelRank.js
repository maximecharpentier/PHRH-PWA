const RankBehaviour = require('./RankBehaviourV1');
const ListHotelsRank = require('./ListHotelsRank');

class HotelRank {

    constructor() {
        this.rankBehaviour = new RankBehaviour()
    }

    async get() { }

    /**
     * @desc recupère la liste d'element, lance création si elle n'existe pas, l'efface si this.reset est true
     * @param {*} $options 
     * @return {Array} : liste d'element ElemListHotelsRank filtré en fonction des options et ordonné par score descroissant
     */
    async list($options) { }

    /**
     * @desc : set la liste en base & set snapshot
     * @param void 
     */
    async set() { }

    /**
     * @desc : update la liste en base & set snapshot
     * @param elem : Objet ElemListHotelsRank
     */
    async update(elem) { }

    /**
     * @desc : insert un element de la liste dans la base et dans le snapshot
     * @param elem : Objet ElemListHotelRank
     */
    async insert(elem) { }

    /**
     * @desc efface un element l'hotel de la liste et du snapshot
     * @param {*} $options 
     */
    delete($options) { }

     /**
     * @desc : cette fonction met à jour ou enrichi le snapshot de la table
     * avec le nouvel element
     * @param {*} elem : objet ElemListHotel ou HotelRank model
     */
    async updateSnapshot(elem) { }

    /**
     * @desc : trigger (Observer) déclanché sur certaines action pour assurer le maintiens de la liste
     * @param {*} objet {element: objet concerné, origin: motif du trigger} 
     */
    static async notify(elem) {
        //creer ojet list
        const list = new ListHotelsRank()
        
        let listElem = {}
        //actions possibles :
        switch(elem.origin) {
            
            //delete de la liste
            case 'visite added' :
                //qd visite est planiffiée
                    //elem = Visite, origin: plannif visite 
                    //effacer l'hotel du ranking
                listElem = await list.get(null, null, fromvisite = elem, null)
                list.delete(listElem)
                break

            
            //ajouter a la liste
            case 'hotel added' :
                //qd nouvel hotel est crée
                    //elem = Hotel, origin: nouvel hotel
                    //(re) insert l'hotel au ranking
                listElem = await list.get(null, fromhotel = elem, null, null)
            case 'visit done' :
                //qd une visite est efféctuée
                    //elem = Visite, origin: visite done
                    //(re) insert le ranking de l'hotel            
                listElem = await list.get(null, null, fromvisite = elem, null)
            case 'visit canceled' :
                //qd une visite (non effectuée) est supprimée
                    //elem = Visite, origin: visite non effectuée
                    //(re) insert l'hotel dans le ranking
                listElem = await list.get(null, null, fromvisite = elem, null)
                list.insert(listElem)
                break

            //modifier le ranking
            case 'hotel note updated' :
                //qd modification de la note de l'hotel
                    //elem = Hotel, origin: note hotel updated
                    //update l'hotel ds le ranking            
                listElem = await list.get(null, fromhotel = elem, null, null)
            case 'urgence added' :
                //qd placement d'une urgence
                    //elem = Urgence, origin: urgence added
                    //update l'hotel ds le ranking            
                listElem = await list.get(null, null, null, fromurgence = elem)
            case 'urgence deleted' :
                //qd suppression d'une urgence
                    //elem = Urgence, origin: urgence deleted
                    //update l'hotel ds le ranking
                listElem = await list.get(null, null, null, fromurgence = elem)
                list.update(listElem)
                break
        }    
        //always
            //refresh le score : une partie du score est calculé
            //en fonction de la "date courante" du moment ou il est calculé
            //donc il faut regulièrement le refresh pour assurer une 
            //adéquation du score avec l'etat courant du metier
            list.refreshScores()
    }

    /**
     * @desc : rafraichis les scores de la liste
     */
    async refreshScores() {
        //a venir
        for(let elemList of this.listHotelRank) {
            await elemList.refreshScore()
            this.update(elemList)
        }
    }
}

module.exports = HotelRank;