const mongoose = require('mongoose')

const Schema = mongoose.Schema;

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
        try {
            const assocDB = await assoc.save()
            return assocDB
        } catch(err) {
            console.log(
                "Assoc User Visite invalide : " + '\n' + 
                assoc + '\n' +
                "Erreur : " + '\n' +
                err
            ) //#REPRENDRE A PARTIR DE CE CODE ET LE RECOPIER SQUR TOUT LES MODELS
        }
    }
    else{
        //throw new Error('Association <<'+ assoc.user_id +'>> existe deja', null);
        console.log('Association avec la visite existe deja')
    }
}

const AssocUserVisite = mongoose.model('Assoc_User_Visite', assoc_user_visiteSchema)

module.exports = AssocUserVisite