const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priorisationSchema = new Schema({
    type: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 35
    },
    message: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 3600
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

const Priorisation = mongoose.model('Priorisation', priorisationSchema)

module.exports = Priorisation