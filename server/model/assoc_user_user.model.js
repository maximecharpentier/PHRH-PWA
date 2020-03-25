const mongoose = require('mongoose')

const User = require("./user.model");

const Schema = mongoose.Schema;

const assoc_user_userSchema = new Schema({
    user_a_id : {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    user_b_id : {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
})

//definir la methode insertIfNotExist
assoc_user_userSchema.statics.insertIfNotExist = async function(assoc) {
    const docs = await this.find({user_a_id : assoc.user_a_id, user_b_id: assoc.user_b_id}).exec()
    if (!docs.length){
        return await assoc.save()
    }
    else{
        //throw new Error('Equipe existe deja', null);
        console.log('Equipe existe deja')
    }
}

const AssocUserUser = mongoose.model('AssocUserUser', assoc_user_userSchema)

module.exports = AssocUserUser