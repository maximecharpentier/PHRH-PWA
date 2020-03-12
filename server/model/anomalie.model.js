const mongoose = require('mongoose');
const Hotel = require("./hotel.model");

const Schema = mongoose.Schema;

const anomalieSchema = new Schema({
    hotel_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel', 
    },
    nature: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    }
})

const Anomalie = mongoose.model('Anomalie', anomalieSchema)

module.exports = Anomalie