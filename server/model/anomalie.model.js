const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const anomalieSchema = new Schema({
    nature: {
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
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

const Anomalie = mongoose.model('Urgence', anomalieSchema)

module.exports = Anomalie