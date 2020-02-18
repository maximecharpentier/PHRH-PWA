const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urgenceSchema = new Schema({
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

const Urgence = mongoose.model('Urgence', urgenceSchema)

module.exports = Urgence