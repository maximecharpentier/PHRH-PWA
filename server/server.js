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

//insert base values
const baseValueInsertor = require('./helpers/BaseValueInsertor')
baseValueInsertor.insertProtoBaseValues(
    (msg) => {console.log(msg)}, 
    (err) => {console.error(err)}
)

//Route to end points
const crudHotelRouter = require('./routes/crudHotels.routes.js')
app.use('/hotel', crudHotelRouter)

const crudUrgenceRouter = require('./routes/crudUrgences.routes.js')
app.use('/urgence', crudUrgenceRouter)

const crudNoteHotelRouter = require('./routes/crudNoteHotel.routes.js')
app.use('/note', crudNoteHotelRouter)

const crudVisiteRouter = require('./routes/crudVisites.routes.js')
app.use('/visite', crudVisiteRouter)
   //get liste visites pour le jour de plannif
   //get edt visites
   //placer visite dans emploi du temps

const crudUserRouter = require('./routes/crudUsers.routes.js')
app.use('/user', crudUserRouter)



//lancer le serv
const serv_port = process.env.SERV_PORT
app.listen(serv_port, function() {
    console.log("server runing PORT: " + serv_port)
})