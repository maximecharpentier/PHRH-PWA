const HotelRank = require('../model/hotelrank.model');
const Hotel = require("../../../model/hotel.model");
const ElemListHotelsRank = require("./ElemListHotelsRank");

class ListHotelsRank {

    constructor(rankBehaviour, reset) {
        this.listHotelRank = [] //snapshot : image 1:1 de la table HotelRank
        this.rankBehaviour = rankBehaviour
        this.reset = reset
    }

    async get($options) {

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
                await this.create(elemHotelRank)
            }
        }
    }

    async update(elem) {
        //update snapshot
        await this.updateSnapshot(elem)

        //update table
        await HotelRank.findByIdAndUpdate(
        { _id: elem._id }, 
        { $set: elem }, 
        //{ new: true }
        )

        console.log('Element mis à jour')
    }

    /**
     * @desc : 
     * @param {*} elem : Objet ElemListHotelRank
     */
    async create(elem) {
        //populate field
        await elem.populate('hotel_id').execPopulate()

        //update snapshot 
        await this.updateSnapshot(elem)

        //insert in view
        await HotelRank.insertIfNotExist(elem)

        //console.log('Element inséré')
    }

    delete($options) {
        //A VENIR
    }

     /**
     * @desc : cette fonction met à jour ou enrichi le snap^shot de la table
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
}

module.exports = ListHotelsRank;