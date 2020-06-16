const mongoose = require('mongoose')

const User = require("./user.model");

const Schema = mongoose.Schema;

const allowed_plage_h = [null, 'Matin', 'Journée', 'Soir']

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
    },
    plage_h : {
        type: String,
        enum: allowed_plage_h,
        /*required: [ 
            function() { return this.fonction !== fonction_administrateur },
            'plage_h is required if fonction is administrateur value'
        ]*/
    },
    secteur_binome : {
        type: String, 
        required: false, 
        trim: true,
        maxlength: 5
    },
})

//definir la methode insertIfNotExist
assoc_user_userSchema.statics.insertIfNotExist = async function(assoc) {
    const docs = await this.find({user_a_id : assoc.user_a_id, user_b_id: assoc.user_b_id}).exec()
    if (!docs.length){
        try {
            const assocDB = await assoc.save()
            return assocDB
        } catch(err) {
            console.log(
                "Equipe invalide : " + '\n' + 
                assoc + '\n' +
                "Erreur : " + '\n' +
                err
            )
        }
    }
    else{
        //throw new Error('Equipe existe deja', null);
        console.log('Equipe existe deja')
    }
}

const AssocUserUser = mongoose.model('Assoc_User_User', assoc_user_userSchema)

module.exports = AssocUserUser