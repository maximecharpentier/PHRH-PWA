let Hotel = require('./../model/hotel.model')
let Visite = require('../model/visite.model')
let User = require('../model/user.model')

class BaseValueInsertor {
    static insertProtoBaseValues(dbtest, cbconfirm, cberror){
        //Models

        //Clean DATABASE avant insertion
        Hotel.deleteMany({}, function(err) {console.log('Hotels & entités liées removed')})
        .then(() => {
            Visite.deleteMany({}, function(err) {console.log('Visites & entités liées removed')})
            .then(() => {
                User.deleteMany({}, function(err) {console.log('User & entités liées removed')})
                .then(() => {
                    dbtest.hotels.forEach((hotel, index) => {
                        //Insert Base values
                        //inserer Hotel & visites liées
                        Hotel.insertIfNotExist(
                            new Hotel({
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
                            }), 
                            (err, HotelDB) => {
                                if(HotelDB) {
                                    cbconfirm("<<Hotel "+ (index + 1) + "/" + dbtest.hotels.length +" inséré>>")
                                    //Inserer visites associées
                                    dbtest.visits.forEach((visite, index) => {
                                        //Insere Visites associés a l'Hotel
                                        if(visite.hotel_id === hotel.id_temp) {
                                            Visite.insertIfNotExist(
                                                new Visite({
                                                    hotel_id:   HotelDB._id, 
                                                    date_visite:visite.date_visite , 
                                                    note:       visite.note,
                                                    ville:      visite.ville,
                                                    duree :     visite.duree, 
                                                    type :      visite.type,
                                                    Priorisations : visite.priorisations,
                                                }),
                                                //insertion visite à échoué
                                                (err, VisiteDB) => {
                                                    if(VisiteDB) {
                                                        cbconfirm("<<Visite "+ (index + 1) + "/" + dbtest.visits.length +" inséré>>")
                                                    }
                                                    else {
                                                        cberror(err)
                                                    }
                                                }
                                            )
                                        }
                                    })
                                }
                                else {
                                    cberror(err)
                                }
                            }
                        )
                    })
                    const visites = Visite.find({})
                    const visites_ids = visites.map(visite => visites._id)
                    //insertion des users
                    dbtest.users.forEach((user, index) => {
                        //inserer users
                        if(user.fonction === 'Planificateur') {
                            User.insertIfNotExist(
                                new User({
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
                                }),
                                (err, UserDB) => {
                                    if(UserDB) {
                                        cbconfirm("<<User "+ (index + 1) + "/" + dbtest.user.length +" inséré>>")
                                    }
                                    else {
                                        cberror(err)
                                    }
                                }
                            )
                        }
                        if(user.fonction === 'Intervenant terrain') {
                            User.insertIfNotExist(
                                new User({
                                    nom:        user.nom,
                                    prenom:     user.prenom,
                                    pwd:        user.pwd,
                                    fonction:   user.fonction,
                                    secteur:    user.secteur,
                                    plage_h:    user.plage_h,
                                    infos_equipe:   user.infos_equipe,
                                    equipier_id:    user.equipier_id, //clef etrangère
                                    visites_id:     visites_ids,
                                    vehicule_id:    user.vehicule_id
                                }),
                                (err, UserDB) => {
                                    if(UserDB) {
                                        cbconfirm("<<User "+ (index + 1) + "/" + dbtest.users.length +" inséré>>")
                                    }
                                    else {
                                        cberror(err)
                                    }                    
                                }
                            )
                        }
                    })
                    //maj des id users pour creer les equipes
                    const visiteurs = User.find({fonction: 'Intervenant terrain'}) //pour clef etrangère
                    /*
                    const visiteur1_id = visiteurs[0]._id
                    const visiteur2_id = visiteurs[1]._id
                    User.findOneAndUpdate(
                        { id: visiteur1_id }, 
                        { $set: { 
                            equipier_id: visiteur2_id
                        }}, 
                    )
                    .then(cbconfirm("visiteur 1 associé en équipe"))
                    .catch(err => cberror(err))
                    User.findOneAndUpdate(
                        { id: visiteur2_id }, 
                        { $set: { 
                            equipier_id: visiteur1_id
                        }}, 
                    )
                    .then(cbconfirm("visiteur 2 associé en équipe"))
                    .catch(err => cberror(err))
                    */
                })
            })
        })
    }
}

module.exports = BaseValueInsertor;