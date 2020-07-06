const HotelRank = require('../model/hotelrank.model');
const Hotel = require("../../../model/hotel.model");
const ElemListHotelsRank = require("./ElemListHotelsRank");

class ListHotelsRank {

    constructor(rankBehaviour) {
        this.listHotelRank = [] //snapshot
        this.rankBehaviour = rankBehaviour
    }

    async get($options) {
        //await HotelRank.deleteMany({})
        if(!this.listHotelRank.length) {

            //get elems to verify table is created
            const elems = await HotelRank.find()
            .populate({
                "path" : 'hotel_id',
                //"match": { "cp": { $regex: /^75.*/, $options: 'i' }}
            })
            .populate({ 
                "path" : 'urgences'
            })

            //si la table est remplie
            if(elems.length) {
                
                //get listHotelRank
                for(const hotelRankDB of elems) {

                    //update snapshot
                    this.updateSnapshot(hotelRankDB)
                }
            
            //sinon remplir la table
            } else {

                //create
                const hotels = await Hotel.find({})

                if(hotels.length) {

                    //fill this.listHotelRank
                    for(const hotelDB of hotels) {

                        //build list elem
                        const elemHotelRank = new ElemListHotelsRank(this.rankBehaviour)
                        await elemHotelRank.buildFromHotel(hotelDB)

                        //update / create
                        const indexElem = this.listHotelRank.findIndex(hotelRank => hotelRank.hotel_id === elem.hotel_id);
                        if(indexElem > 0) {
                            
                            //update element
                            await this.update(elemHotelRank)
                        } else {

                            //ajouter l'element
                            await this.create(elemHotelRank)
                        }
                    }
                }
            }
        } 
            
        //console.log(this.listHotelRank)
        //return
        if($options.hasOwnProperty('secteur')) {
            return this.listHotelRank.filter(hotelElem => hotelElem.hotel_id.cp.match(new RegExp("^" + $options.secteur + ".*",'g')))            
        } else {
            return this.listHotelRank
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
        //update snapshot 
        await this.updateSnapshot(elem)

        //insert in view
        await HotelRank.insertIfNotExist(elem)

        console.log('Element inséré')
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