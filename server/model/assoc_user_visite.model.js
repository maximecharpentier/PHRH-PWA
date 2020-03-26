const mongoose = require('mongoose')
/*Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

const User = require("./user.model");
const Visite = require("./visite.model");

const Schema = mongoose.Schema;
    /*bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

const assoc_user_visiteSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
    visite_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Visite', 
    },
    date_effectue : {
        type : Date
    }
})

//definir la methode insertIfNotExist
assoc_user_visiteSchema.statics.insertIfNotExist = async function(assoc) {
    const docs = await this.find({user_id : assoc.user_id, visite_id: assoc.visite_id}).exec()
    if (!docs.length){
        return await assoc.save()
    }
    else{
<<<<<<< HEAD
        throw new Error('Association <<'+ assoc.user_id +'>> existe deja', null);
=======
        //throw new Error('Association <<'+ assoc.user_id +'>> existe deja', null);
        console.log('Association avec la visite existe deja')
>>>>>>> 0ba2ded26c4940dbb9d5df6e50f4b506926d81e7
    }
}

const AssocUserVisite = mongoose.model('AssocUserVisite', assoc_user_visiteSchema)

module.exports = AssocUserVisite