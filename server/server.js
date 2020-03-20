const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
//brancher cors
app.use(cors())
//brancher le parseur d'HttpRequest
app.use(express.json())

//connection a la base mongo
const uri = "mongodb://localhost:27017/PHRH"
mongoose.connect(
    uri, 
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true 
    } 
)
//ouvrir & deleguer la gestion de la connection a nodemon
mongoose.connection.once(
    'open', () => {
        console.log('PHRH database connection established')
    }
)

//insert base values
const baseValueInsertor = require('./helpers/BaseValueInsertor.helper')
baseValueInsertor.insertProtoBaseValues(
    require('./datas/data.json'),
    (msg) => {console.log(msg)}, 
    (err) => {console.error(err)}
)

//Route to end points
const crudHotelRouter = require('./routes/hotel/crudHotel.routes.js')
app.use('/hotel', crudHotelRouter)

const crudUrgenceRouter = require('./routes/urgence/crudUrgence.routes.js')
app.use('/urgence', crudUrgenceRouter)

const crudUserRouter = require('./routes/user/crudUser.routes.js')
app.use('/user', crudUserRouter)

const featureNoterHotelRouter = require('./routes/feature.noterhotel/noterHotel.routes.js')
app.use('/noter', featureNoterHotelRouter)

//lancer le serv
const serv_port = "27017" //process.env.SERV_PORT
app.listen(serv_port, function() {
    console.log("server runing PORT: " + serv_port)
})