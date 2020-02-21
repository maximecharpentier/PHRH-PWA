let Hotel = require('./../model/hotel.model')
let Visite = require('../model/visite.model')
let User = require('../model/user.model')

class BaseValueInsertor {
    static async insertProtoBaseValues(dbtest, cbconfirm, cberror){
        //Clean DATABASE avant insertion
        await Hotel.deleteMany({})
        await Visite.deleteMany({})
        await User.deleteMany({})

        //Insert base values HOTEL & VISITES
        for (const [ index, hotel ] of dbtest.hotels.entries()) {
            //inserer Hotel
            const hotelObj = new Hotel({
                nom:        hotel.nom, 
                adresse:    hotel.adresse , 
                cp:         hotel.cp,
                ville:      hotel.ville,
                nb_chambres_utilise :   hotel.nb_chambres_utilise, 
                nb_visites_periode :    hotel.nb_visites_periode,
                last_time_visited :     null,
                urgences :  hotel.urgences,
                anomalies : hotel.anomalies,
                taches :    hotel.taches,
            })
            const HotelDB = await Hotel.insertIfNotExist(hotelObj)
            if (HotelDB) {
                //confirmation Hotel
                cbconfirm("<<Hotel "+ (index + 1) + "/" + dbtest.hotels.length +" inséré>>")
                //Inserer visites associées
                for (const [ index, visite ] of dbtest.visits.entries()) {
                    //Insere Visites associés a l'Hotel tout juste inséré
                    if(visite.hotel_id === hotel.id_temp) {
                        const visiteObj = new Visite({
                            hotel_id:   HotelDB._id, 
                            date_visite:visite.date_visite , 
                            note:       visite.note,
                            ville:      visite.ville,
                            duree :     visite.duree, 
                            type :      visite.type,
                            Priorisations : visite.priorisations,
                        })
                        const VisiteDB = await Visite.insertIfNotExist(visiteObj)
                        if(VisiteDB) {
                            cbconfirm("<<Visite "+ (index + 1) + "/" + dbtest.visits.length +" inséré>>")
                        }
                    }
                }
            }
        }

        //Insert base values USER
        const visitesDB = await Visite.find({})
        if(visitesDB) {
            const visites_ids = visitesDB.map(visite => visite._id)
            //Insertion des users
            for (const [ index, user ] of dbtest.users.entries()) {
                //inserer users
                if(user.fonction === 'Gestionnaire') {
                    const userPlannif = new User({
                        nom:        user.nom,
                        prenom:     user.prenom,
                        pwd:        user.pwd,
                        fonction:   user.fonction,
                        secteur:    user.secteur,
                        plage_h :   user.plage_h,
                        infos_equipe:   user.infos_equipe,
                        equipier_id:    user.equipier_id, 
                        visites_id:     user.visites_id,
                        vehicule_id:    user.vehicule_id
                    })
                    const userPlannifDB =  await User.insertIfNotExist(userPlannif)
                    if (userPlannifDB) {
                        cbconfirm("<<User "+ (index + 1) + "/" + dbtest.users.length +" inséré>>")
                    } else {
                        cberror(err)
                    }
                }
                if(user.fonction === 'Intervenant terrain') {
                    const userIntervenant = new User({
                        nom:        user.nom,
                        prenom:     user.prenom,
                        pwd:        user.pwd,
                        fonction:   user.fonction,
                        secteur:    user.secteur,
                        plage_h :   user.plage_h,
                        infos_equipe:   user.infos_equipe,
                        equipier_id:    user.equipier_id, 
                        visites_id:     visites_ids,
                        vehicule_id:    user.vehicule_id
                    })
                    const userIntervenantDB =  await User.insertIfNotExist(userIntervenant)
                    if (userIntervenantDB) {
                        cbconfirm("<<User "+ (index + 1) + "/" + dbtest.users.length +" inséré>>")
                    } else {
                        cberror(err)
                    }
                }
            }

            //Creation des equipes
            const visiteurs = await User.find({fonction: 'Intervenant terrain'}) //pour clef etrangère
            const visiteur1_id = visiteurs[0]._id
            const visiteur2_id = visiteurs[1]._id
            //inserer User 1 -> User 2
            User.findOneAndUpdate(
                { id: visiteur1_id }, 
                { $set: { 
                    equipier_id: visiteur2_id
                }}, 
            )
            .then( cbconfirm("visiteur 1 associé en équipe") )
            .catch( err => cberror(err) )

            //inserer User 2 -> User 1
            User.findOneAndUpdate(
                { id: visiteur2_id }, 
                { $set: { 
                    equipier_id: visiteur1_id
                }}, 
            )
            .then(cbconfirm("visiteur 2 associé en équipe"))
            .catch(err => cberror(err))
        }
    }
}

module.exports = BaseValueInsertor;