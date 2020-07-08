const RankBehaviour = require('./RankBehaviourV1');

class HotelRank {

    constructor() {
        this.rankBehaviour = new RankBehaviour()
    }
}

module.exports = HotelRank;