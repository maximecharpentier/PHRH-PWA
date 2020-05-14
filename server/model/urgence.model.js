const mongoose = require('mongoose');
const Hotel = require("./hotel.model");
const Equipe = require("./assoc_user_user.model");

const Schema = mongoose.Schema;

const urgenceSchema = new Schema({
    hotel_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Hotel', 
    },
    equipe_id : {
        type: Schema.Types.ObjectId,
        ref: 'Equipe'
    },
    resume: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 50
    },
    detail: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 3600
    },
})

const Urgence = mongoose.model('Urgence', urgenceSchema)

module.exports = Urgence