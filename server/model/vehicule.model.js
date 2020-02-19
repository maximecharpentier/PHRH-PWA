const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehiculeSchema = new Schema({
    immatriculation: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 15
    },
    type: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 10
    },
    adresse_parking : {
        type: String, 
        required: true,
        trim: true,
        maxlength: 50
    },
    cp : {
        type: Number, 
        trim: true,
        maxlength: 5
    },
    ville : {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    }
})

//definir la methode insertIfNotExist
/*authSchema.statics.insertIfNotExist = function(auth, cb) {
    this.find({name : auth.name}).exec(function(err, docs) {
        if (!docs.length){
            auth.save(function(err) {
                cb(err, auth)
            })
        }
        else{
            cb('Auth <<'+ auth.nom +'>> existe deja', null);
        }
    })
}*/


const Vehicule = mongoose.model('Vehicule', vehiculeSchema)

module.exports = Vehicule