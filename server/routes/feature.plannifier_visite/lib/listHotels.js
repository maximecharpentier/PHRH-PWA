class ListHotel {

    /**
     * @param : 
     */
    constructor() {
        this.listHotels = null
    }

    setList() {
        let listHotels = await mongoose.connection.HotelRank.find({}, [], {
            sort: {
                score: -1 //Sort by score DESC
            }
        })

        return listHotels
    }

    list() {
        if(!this.listHotels) {
            this.listHotels = await this.setList()
            return this.listHotels
        }
        else {
            return this.listHotels
        }
    }
}

module.exports = ListHotel;