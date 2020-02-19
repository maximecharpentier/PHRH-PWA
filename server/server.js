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

    //inserer users
})

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