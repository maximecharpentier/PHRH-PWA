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
const studentRouter = require('./routes/student.route.js')
app.use('/student', studentRouter)

const authRouter = require('./routes/auth.route.js')
app.use('/auth', authRouter)

//lancer le serv
const serv_port = process.env.SERV_PORT
app.listen(serv_port, function() {
    console.log("server runing PORT: " + serv_port)
})