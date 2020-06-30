const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memoSchema = new Schema({
    date: {
        type: Date, 
        required: true
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

const Memo = mongoose.model('Memo', memoSchema)

module.exports = Memo