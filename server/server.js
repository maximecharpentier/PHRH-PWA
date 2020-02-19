const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//base values for test
const dbtest = require('dbtest')

const app = express()
//brancher cors
app.use(cors())
//brancher le parseur d'HttpRequest
app.use(express.json())

//connection a la base mongo
const uri = process.env.DB_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
//ouvrir & deleguer la gestion de la connection a nodemon
mongoose.connection.once('open', () => {
    console.log('PHRH database connection established')
})

//Models
let Hotel = require('./model/hotel.model')
let Visite = require('./model/visite.model')
let User = require('./model/user.model')

//Clean DATABASE avant insertion
Hotel.remove({}, function(err) {console.log('Hotels & entités liées removed')});
Visite.remove({}, function(err) {console.log('Visites & entités liées removed')});
User.remove({}, function(err) {console.log('User & entités liées removed')});

//Insert Base values
dbtest.hotels.map(hotel => {
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
            //Inserer visites associées
            dbtest.visites.each(visite => {
                //Insere Visites associés a l'Hotel
                if(visite.id_Hotel === hotel.id_temp) {
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
                        (err, VisiteDB) => {
                            console.error(err)
                        })
                }
            })
            console.error(err)
        }
    )
})
const visites = await Visites.find({})
const visites_ids = visites.map(visite => visites._id)
//insertion des users
dbtest.users.map((user, index) => {
    //inserer users
    if(user.fonction === 'Planificateur') {
        User.insertIfNotExist(
            new User({
                nom: user.nom,
                prenom: user.prenom,
                pwd: user.pwd,
                fonction: user.fonction,
                secteur: user.secteur,
                plage_h = user.plage_h,
                infos_equipe: user.infos_equipe,
                equipier_id: user.equipier_id,
                visites_id: user.visites_id,
                vehicule_id: user.vehicule_id
            }),
            (err, UserDB) => {
                console.error(err)
            }
        )
    }
    if(user.fonction === 'Intervenant terrain') {
        User.insertIfNotExist(
            new User({
                nom: user.nom,
                prenom: user.prenom,
                pwd: user.pwd,
                fonction: user.fonction,
                secteur: user.secteur,
                plage_h = user.plage_h,
                infos_equipe: user.infos_equipe,
                equipier_id: UserDB._id, //clef etrangère
                vehicule_id: user.vehicule_id
            }),
            (err, UserDB) => {
                console.error(err)
            }
        )
    }
})
//maj des id users pour creer l'equipê
const visiteur = await User.find({fonction: 'Intervenant terrain'}) //pour clef etrangère
const visiteur1_id = visiteurs[0]._id
const visiteur2_id = visiteurs[1]._id
User.findOneAndUpdate(
    { id: visiteur1_id }, 
    { $set: { 
        equipier_id: visiteur2_id
    }}, 
)
User.findOneAndUpdate(
    { id: visiteur2_id }, 
    { $set: { 
        equipier_id: visiteur1_id
    }}, 
)

//Route to end points
const studentRouter = require('./routes/student.route.js')
app.use('/student', studentRouter)

const authRouter = require('./routes/auth.route.js')
app.use('/auth', authRouter)

//lancer le serv
const serv_port = process.env.SERV_PORT
app.listen(serv_port, function() {
    console.log("server runing PORT: " + serv_port)
})