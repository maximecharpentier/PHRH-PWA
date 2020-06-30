const createHotelRankView = require("../utils").createHotelRankView
const getHotelRankView = require("../utils").getHotelRankView

class ListHotelsRank {

    /**
     * @param : 
     */
    constructor() {
        this.listHotelRank = []
    }

    get($options) {
        if(!this.listHotel) {
            //create | get listHotelRank
        }
        //return with $options
    }

    /**
     * @desc : fonction qui update la vue HotelRank et le snapshot
     * @param {*} elem : element de liste
     */
    addOrUpdate(elem) {
        if(elem instanceof ElemHotelRank) {
            const indexElem = this.listHotelRank.findIndex(hotel => hotel.getId() === elem.getId());
            if(indexElem) {
                //update snapshot
                this.listHotelRank[indexElem] = elem

                //update view
                //update view & return string message
            } else {
                //insert in view
            }
        }
        console.log('Elem doit etre un objet ElemHotelRank')
    }

    delete($options) {

    }
}

module.exports = ListHotelsRank;