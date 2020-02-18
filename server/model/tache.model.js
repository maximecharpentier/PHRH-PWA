const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tacheSchema = new Schema({
    type: {
        type: String, 
        required: true,
        enum: ['Relance hotel pour reglement anomalie', 'Appel famille', 'Amende à envoyer'],
    },
    date_au_plus_tot : {
        type: Date,
        required: true
    },
    date_au_plus_tard : {
        type: Date,
        require: true
    }
})

/*competenceSchema.statics.insertIfNotExist = function(comp, cb) {
    this.find({name : comp.name}).exec(function(err, docs) {
        if (!docs.length){
            comp.save(function(err) {
                cb(err, comp)
            })
        }
        else{
           cb('Compentence <<'+ comp.nom +'>> existe deja', null);
        }
    })
}*/

const Tache = mongoose.model('Tache', tacheSchema)

module.exports = Tache