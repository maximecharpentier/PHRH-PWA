const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    from : {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
    to : {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    },
    elem: {
        type: Object, 
        required: true,
    },
    read : {
        type: Boolean,
        required: true,
        default: false
    },
    date_insert: {
        type: Date, 
        default: Date.now()
    },
})

/**
 * @desc : methode du shema pour inserer si l'utilisateur n'existe pas
 * @param {object} : user object conforme au schema
 */
notificationSchema.statics.insertIfNotExist = async function(notification) {

    //existe deja si une notification exactement identique existe (lu ou pas)
    const docs = await this.find({
        from : notification.from,
        to: notification.from,
        'elem._id': notification.elem._id,
        read: notification.read
    }).exec()
    if (!docs.length){
        try {
            const userDB = await user.save()
            return userDB
        } catch(err) {
            console.log(
                "Notification invalide : " + '\n' + 
                user + '\n' +
                "Erreur : " + '\n' +
                err
            )
        }
    }
    else{
        //throw new Error('Utilisateur <<'+ user.nom +'>> existe deja', null);
        console.log(
            'Notification <<'+ '\n' +
            notification + '\n' + 
            '>> existe deja'
        )
    }
}

const Memo = mongoose.model('Notification', notificationSchema)

module.exports = Memo