const express = require("express");
const cors = require("cors");
require("dotenv").config();

/**
 * GENERAL SETUP
 */

//EXPRESS
const app = express()

//brancher cors
app.use(cors())

//brancher le parseur d'HttpRequest
app.use(express.json())

//MONGO DB & IMPORT DES DONNE
require('./config/database')

//PASSPORT
const passport = require('passport')

//generate keypairs for passport
require('./generateKeypair')

// Pass the global passport object into the configuration function
require('./config/passport')(passport)

// This will initialize the passport object on every request
app.use(passport.initialize())

/**
 * ROUTES
 */
const crudHotelRouter = require("./routes/feature.gestion_couverture/crudHotel.routes.js")
app.use("/hotels", crudHotelRouter)

const crudUrgenceRouter = require("./routes/feature.gestion_urgence/crudUrgence.routes.js")
app.use("/urgences", crudUrgenceRouter)

const crudUserRouter = require("./routes/feature.gestion_utilisateur/crudUser.routes.js")
app.use("/users", crudUserRouter)

const manageEquipesRouter = require("./routes/feature.gestion_couverture/manageEquipe.routes.js")
app.use("/gestion/equipes", manageEquipesRouter)

const plannnifierVisitesRouter = require("./routes/feature.plannifier_visite/crudVisite.routes.js")
app.use("/gestion/visites", plannnifierVisitesRouter)

const suggestionsVisitesRouter = require("./routes/feature.plannifier_visite/plannifierVisite.routes.js")
app.use("/gestion/visites", suggestionsVisitesRouter)

const authRouter =  require("./routes/feature.authentification/auth.routes.js")
app.use("/auth", authRouter)

/*const featureNoterHotelRouter = require('./routes/feature\.noterhotel/noterHotel.routes.js')
app.use('/noter', featureNoterHotelRouter)*/

/**
 * SERVER
 */
const serv_port = "27017"; //process.env.SERV_PORT
app.listen(serv_port, function() {
  console.log("server runing PORT: " + serv_port);
})
