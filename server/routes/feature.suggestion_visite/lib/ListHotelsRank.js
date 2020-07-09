const HotelsRank = require("./HotelRank");
const ElemListHotelsRank = require("./ElemListHotelsRank");

const mongoose = require('mongoose');
const HotelRank = require('../model/hotelrank.model');
const Urgence = mongoose.model('Urgence');
const Hotel = mongoose.model('Hotel');
//const Visite = require("../../../model/visite.model");
const Visite = mongoose.model('Visite');


class ListHotelsRank extends HotelsRank {

    constructor() {
        super()
        this.listHotelRank = [] //snapshot : image 1:1 de la table HotelRank (peu ne pas etre rempli suivant la situation)
        this.filter = {}
    }

    async get(id = null,  idhotel = null) {

        let elem = {}

        if(id) {
            elem = await HotelRank.findById(id).populate('hotel_id')
        }

        if(idhotel) {
            elem = await HotelRank.findOne({hotel_id: idhotel}).populate('hotel_id')
        }

        return new ElemListHotelsRank(this.rankBehaviour, elem)
    }

    /**
     * @desc recupère la liste d'element, lance création si elle n'existe pas, l'efface si this.reset est true
     * @param {*} $options 
     * @return {Array} : liste d'element ElemListHotelsRank filtré en fonction des options et ordonné par score descroissant
     */
    async list($options = null) {

        //fill this.listHotelRank with ElemListHotelsRank items
        const tmpList = await HotelRank.find({})
                                .populate('hotel_id')
                                .sort({score: 'desc'})
        tmpList.forEach( (hotelRankDB, index) => {
            this.listHotelRank[index] = new ElemListHotelsRank(this.rankBehaviour, hotelRankDB) 
            })

        
        //si le ranking n'a jamais été appelé
        /*if(!this.listHotelRank.length) {

            //create
            await this.set()
        }*/ 
            
        //filters
        if($options) {

            this.filter = $options

            if($options.hasOwnProperty('secteur')) {
                

                //filter snapshot plutot que la requette Mongo
                this.listHotelRank = this.listHotelRank.filter(hotelElem =>

                    //filter
                    hotelElem.hotel_id.cp
                        .toString()
                        .match(new RegExp("^" + $options.secteur + ".*",'g')) !== null
                )
            }
            if($options.hasOwnProperty('hotel_id')) {

                //filter snapshot plutot que la requette Mongo
                this.listHotelRank = this.listHotelRank.filter(hotelElem =>

                    //filter
                    hotelElem.hotel_id._id.toString() === $options.hotel_id
                )
            } 
        }

        return this.listHotelRank
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
                console.log(elemHotelRank)
                await this.insert(elemHotelRank)
            }
        }
    }

    /**
     * @desc : update la liste en base & set snapshot
     * @param elem : Objet ElemListHotelsRank
     */
    async replace(elem) {

        //update table
        await elem.update()
    }

    /**
     * @desc : insert un element de la liste dans la base et dans le snapshot
     * @param elem : Objet ElemListHotelRank
     */
    async add(elem) {

        //insert in view
        await elem.insert()

        //console.log('Element inséré')
    }

    /**
     * @desc efface un element l'hotel de la liste et du snapshot
     * @param {*} $options 
     */
    remove(elem) {
        
        //INUTILE POUR LE MOMENT
    }

    /**
     * @desc : trigger (Observer) déclanché sur certaines action pour assurer le maintiens de la liste
     * @param {*} objet {element: objet concerné, origin: motif du trigger} 
     */
    async notify(event, data) {
        let listElem = {}

        if(data instanceof Visite)  listElem = await this.get(null, data.hotel_id)
        if(data instanceof Urgence) listElem = await this.get(null, data.hotel_id)
        if(data instanceof Hotel && 
           event !== 'hotel added') listElem = await this.get(null, data._id)

        //actions possibles :
        switch(event) {
            
            //effacer l'hotel du ranking
            case 'visite added' :
                listElem.delete()
                break

            //(re)insert l'hotel au ranking
            case 'hotel added' :
                //creer listElem
                listElem = new ElemListHotelsRank(this.rankBehaviour)
                await listElem.buildFromHotel(data)

            case 'visit done' :
            case 'visit canceled' :

                listElem.insert()
                break

            //update l'hotel ds le ranking
            case 'hotel note updated' :
            case 'urgence added' :
            case 'urgence deleted' :

                //remove urgence du tableau

                listElem.update()
                break
        }

        //always :
        //refresh le score : une partie du score est calculé
        //en fonction de la "date courante" du moment ou il est calculé
        //donc il faut regulièrement le refresh pour assurer une 
        //adéquation du score avec l'etat courant du metier
        this.refreshScores()
    }

    async refreshScores() {
        const listHotelRank = await this.list()

        listHotelRank.forEach( listElem => {
            listElem.refreshScore()
        })
    }

    async refreshList() {
        const hotelsRank = this.list()
        hotelsRank.forEach( listElem => {
            listElem.refresh()
        })
    }
}

module.exports = ListHotelsRank;