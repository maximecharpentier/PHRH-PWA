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
vehiculeSchema.statics.insertIfNotExist = async function(vehicule) {
    const docs = await this.find({vehicule : vehicule.immatriculation}).exec()
    if (!docs.length){
        try {
            const vehiculeDB = await vehicule.save()
            return vehiculeDB
        } catch(err) {
            console.log(
                "Vehicule invalide : " + '\n' + 
                vehicule + '\n' +
                "Erreur : " + '\n' +
                err
            )
        }
    }
    else{
        console.log('Vehicule <<'+ vehicule.immatriculation +'>> existe deja');
    }
}

const Vehicule = mongoose.model('Vehicule', vehiculeSchema)

module.exports = Vehicule