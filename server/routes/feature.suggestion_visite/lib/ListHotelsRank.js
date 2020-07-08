const HotelsRank = require("./HotelRank");
const HotelRank = require('../model/hotelrank.model');
const Hotel = require("../../../model/hotel.model");
const ElemListHotelsRank = require("./ElemListHotelsRank");


class ListHotelsRank extends HotelsRank {

    constructor(reset = null) {
        super()
        this.listHotelRank = [] //snapshot : image 1:1 de la table HotelRank (peu ne pas etre rempli suivant la situation)
        this.reset = reset
    }

    async get(fromidelem = null, 
        fromhotel = null, 
        fromvisite = null, 
        fromurgence = null) {

        let elem = {}

        if(fromidelem) {
            elem = await HotelRank.findById(fromidelem).populate('hotel_id')
        }

        if(fromhotel) {
            elem = await HotelRank.find({hotel_id: fromhotel._id}).populate('hotel_id')
        }

        if(fromvisite) {
            elem = await HotelRank.find({hotel_id: fromvisite.hotel_id}).populate('hotel_id')
        }

        if(fromurgence) {
            elem = await HotelRank.find({hotel_id: fromurgence.hotel_id}).populate('hotel_id')
            console.log('test', elem)
        }

        return new ElemListHotelsRank(this.rankBehaviour, elem)
    }

    /**
     * @desc recupère la liste d'element, lance création si elle n'existe pas, l'efface si this.reset est true
     * @param {*} $options 
     * @return {Array} : liste d'element ElemListHotelsRank filtré en fonction des options et ordonné par score descroissant
     */
    async list($options) {

        //reset si nescessaire
        if(this.reset) {
            await HotelRank.deleteMany({})
            this.listHotelRank = []
        }

        //get sorted list
        this.listHotelRank = await HotelRank.find({}).populate('hotel_id').sort({score: 'desc'})
        
        //set snapshot : depuis la table classement existante ou creer la table classement
        if(!this.listHotelRank.length) {

            //create
            await this.set()
        } 
            
        //filters
        let filteredHotelRank = this.listHotelRank
        if($options.hasOwnProperty('secteur')) {
            

            //filter snapshot plutot que la requette Mongo
            filteredHotelRank = filteredHotelRank.filter(hotelElem =>

                //filter
                hotelElem.hotel_id.cp
                    .toString()
                    .match(new RegExp("^" + $options.secteur + ".*",'g')) !== null
            )
        }
        if($options.hasOwnProperty('hotel_id')) {

            //filter snapshot plutot que la requette Mongo
            filteredHotelRank = filteredHotelRank.filter(hotelElem =>

                //filter
                hotelElem.hotel_id._id.toString() === $options.hotel_id
            )
        } 

        return filteredHotelRank
    }

    /**
     * @desc : set la liste en base & set snapshot
     * @param void 
     */
    async set() {
        //create
        const hotels = await Hotel.find({})

        if(hotels.length) {

            //fill this.listHotelRank
            for(const hotelDB of hotels) {

                //build list elem
                const elemHotelRank = new ElemListHotelsRank(this.rankBehaviour)
                await elemHotelRank.buildFromHotel(hotelDB)

                //ajouter l'element
                await this.insert(elemHotelRank)
            }
        }
    }

    /**
     * @desc : update la liste en base & set snapshot
     * @param elem : Objet ElemListHotelsRank
     */
    async update(elem) {
        //update snapshot
        await this.updateSnapshot(elem)

        //update table
        console.log('hotelRank trouvé', elem)
        await elem.update()

        console.log('Element mis à jour')
    }

    /**
     * @desc : insert un element de la liste dans la base et dans le snapshot
     * @param elem : Objet ElemListHotelRank
     */
    async insert(elem) {
        //populate field
        await elem.populate('hotel_id').execPopulate()

        //update snapshot 
        await this.updateSnapshot(elem)

        //insert in view
        await elem.insert()

        //console.log('Element inséré')
    }

    /**
     * @desc efface un element l'hotel de la liste et du snapshot
     * @param {*} $options 
     */
    delete($options) {
        //A VENIR
    }

     /**
     * @desc : cette fonction met à jour ou enrichi le snapshot de la table
     * avec le nouvel element
     * @param {*} elem : objet ElemListHotel ou HotelRank model
     */
    async updateSnapshot(elem) {

        //convert elem in right class
        if(!elem instanceof ElemListHotelsRank) {
            elem = new ElemListHotelsRank(this.rankBehaviour, elem)
            await elem.buildFromHotel(hotelDB)
        }

        //check if snapshot need to be updated or filled
        const indexElem = this.listHotelRank.findIndex(elemHotelRank => elemHotelRank.hotel_id === elem.hotel_id)
        if(indexElem > 0) {
            this.listHotelRank[indexElem] = elem
        } else {
            this.listHotelRank.push(elem)
        }
    }

    /**
     * @desc : trigger (Observer) déclanché sur certaines action pour assurer le maintiens de la liste
     * @param {*} objet {element: objet concerné, origin: motif du trigger} 
     */
    async notify(elem) {
        console.log('debut')

        let listElem = {}

        //actions possibles :
        switch(elem.origin) {
            
            //delete de la liste
            case 'visite added' :
                //qd visite est planiffiée
                    //elem = Visite, origin: plannif visite 
                    //effacer l'hotel du ranking
                listElem = await this.get(null, null, elem)
                this.delete(listElem)
                break

            
            //ajouter a la liste
            case 'hotel added' :
                //qd nouvel hotel est crée
                    //elem = Hotel, origin: nouvel hotel
                    //(re) insert l'hotel au ranking
                listElem = await this.get(null, elem)
            case 'visit done' :
                //qd une visite est efféctuée
                    //elem = Visite, origin: visite done
                    //(re) insert le ranking de l'hotel            
                listElem = await this.get(null, null, elem)
            case 'visit canceled' :
                //qd une visite (non effectuée) est supprimée
                    //elem = Visite, origin: visite non effectuée
                    //(re) insert l'hotel dans le ranking
                listElem = await this.get(null, null, elem)
                this.insert(listElem)
                break

            //modifier le ranking
            case 'hotel note updated' :
                //qd modification de la note de l'hotel
                    //elem = Hotel, origin: note hotel updated
                    //update l'hotel ds le ranking            
                listElem = await this.get(null, elem)
            case 'urgence added' :
                //qd placement d'une urgence
                    //elem = Urgence, origin: urgence added
                    //update l'hotel ds le ranking            
                listElem = await this.get(null, null, null, elem)
                console.log('listElem :', listElem)
            case 'urgence deleted' :
                //qd suppression d'une urgence
                    //elem = Urgence, origin: urgence deleted
                    //update l'hotel ds le ranking
                listElem = await this.get(null, null, null, elem)
                this.update(listElem)
                break
        }    
        //always
            //refresh le score : une partie du score est calculé
            //en fonction de la "date courante" du moment ou il est calculé
            //donc il faut regulièrement le refresh pour assurer une 
            //adéquation du score avec l'etat courant du metier
            this.refreshScores()
    }

    refreshScores() {
        if(this.listHotelRank.length) {
            this.listHotelRank.forEach( elemListVisit => {
                elemListVisit.refreshScores()
            })
        } else {
            //#REPRENDRE ICI
        }
    }
}

module.exports = ListHotelsRank;