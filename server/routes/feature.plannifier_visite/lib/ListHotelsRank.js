const HotelRank = require('../model/hotelrank.model')
const Hotel = require("../../../model/hotel.model")

class ListHotelsRank {

    constructor(rankBehaviour) {
        this.listHotelRank = []
        this.rankBehavious = rankBehaviour
    }

    async get($options) {
        //await HotelRank.deleteMany({})
        if(!this.listHotelRank.length) {

            //get elems to verify table is created
            const elems = await HotelRank.find({})
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
                for(const hotelRankDB in elems) {

                    //update snapshot
                    this.listHotelRank.push(hotelRankDB)
                }
            
            //sinon remplir la table
            } else {

                //create
                const hotels = await Hotel.find({})

                if(hotels.length) {

                    //fill this.listHotelRank
                    for(const hotelDB of hotels) {

                        //build list elem
                        const elemHotelRank = new HotelRank()
                        await elemHotelRank.build(hotelDB) //reprendre ici

                        //ajouter l'element
                        await this.addOrUpdate(elemHotelRank)

                        //update snapshot
                        this.listHotelRank.push(elemHotelRank)
                    }
                }
            }
        } 
            
        //return
        return this.listHotelRank.filter(hotelElem => hotelElem.hotel_id.cp.match(new RegExp("^" + $options.secteur + ".*",'g')))            
    }

    /**
     * @desc : fonction qui update la vue HotelRank et le snapshot
     * @param {*} elem : element de liste
     */
    async addOrUpdate(elem) {
        console.log(elem)
        //definir si c'est un cas d'update
        const indexElem = this.listHotelRank.findIndex(hotelRank => hotelRank.hotel_id === elem.hotel_id);
        if(indexElem) {
            //update snapshot
            this.listHotelRank[indexElem] = elem

            //update table
            await HotelRank.findByIdAndUpdate(
                { _id: elem._id }, 
                { $set: elem }, 
                //{ new: true }
                )
            console.log('Element mis à jour')
        
        //sinon inserer l'element
        } else {

            //insert in view
            await HotelRank.insertIfNotExist(elem.get())

            console.log('Element inséré')
        }
    }

    delete($options) {
        //A VENIR
    }
}

module.exports = ListHotelsRank;