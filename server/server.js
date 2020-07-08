const express = require("express");
const MockStrategy = require('passport-mock-strategy');
const cors = require("cors");
require("dotenv").config();

//generate keypairs for passport
require("./generateKeypair");

/**
 * GENERAL SETUP
 */

//-------------------------------------------------
//EXPRESS
const app = express();

//brancher cors
app.use(cors());

//brancher le parseur d'HttpRequest
app.use(express.json());

//-------------------------------------------------
//MONGO DB & IMPORT DES DONNEES
require("./config/database");

//-------------------------------------------------
//MODELS (require les models ici pour pouvoir les appeler partout sur "mongoose.model('ModelName')" sans avoir a mettre le chemin relatif dans les fichiers)
require("./config/models");

//-------------------------------------------------
//PASSPORT
const passport = require("passport");

// Pass the global passport object into the configuration function
require("./config/passport")(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

/**
 * ROUTES
 */
const crudHotelRouter = require("./routes/feature.gestion_couverture/crudHotel.routes.js");
app.use("/hotels", crudHotelRouter);

const crudUrgenceRouter = require("./routes/feature.gestion_urgence/crudUrgence.routes.js");
app.use("/urgences", crudUrgenceRouter);

const crudUserRouter = require("./routes/feature.gestion_utilisateur/crudUser.routes.js");
app.use("/users", crudUserRouter);

const manageEquipesRouter = require("./routes/feature.gestion_couverture/manageEquipe.routes.js");
app.use("/gestion/equipes", manageEquipesRouter);

const plannnifierVisitesRouter = require("./routes/feature.plannifier_visite/crudVisite.routes.js");
app.use("/gestion/visites", plannnifierVisitesRouter);

const suggestionsVisitesRouter = require("./routes/feature.suggestion_visite/plannifierVisite.routes.js");
app.use("/gestion/suggestions/visites", suggestionsVisitesRouter);

const authRouter = require("./routes/feature.authentification/auth.routes.js");
app.use("/auth", authRouter);

/*const featureNoterHotelRouter = require('./routes/feature\.noterhotel/noterHotel.routes.js')
app.use('/noter', featureNoterHotelRouter)*/

/**
 * SERVER
 */
const serv_port = process.env.SERV_PORT; //process.env.SERV_PORT
app.listen(serv_port, function () {
  console.log("server runing PORT: " + serv_port);
});