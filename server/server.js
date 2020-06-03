const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
//ici red database
//#INC

//KEY PAIRS
require('./generateKeypair')

//PASSPORT
const passport = require('passport');
// Pass the global passport object into the configuration function
require('./config/passport')(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

//brancher cors
app.use(cors());
//brancher le parseur d'HttpRequest
app.use(express.json());

//connection a la base mongo
const uri = `mongodb://${process.env.SERVER_HOST}:27017/PHRH`;
//loop connect command (pour deploiement)
var connectWithRetry = function() {
  return mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    function(err) {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 5 sec",
          err
        );
        setTimeout(connectWithRetry, 5000);
      }
    }
  );
};
connectWithRetry();

//lancer le serveur
const serv_port = "27017"; //process.env.SERV_PORT
app.listen(serv_port, function() {
  console.log("server runing PORT: " + serv_port);
});

//ouvrir & deleguer la gestion de la connection a nodemon
mongoose.connection.once("open", async () => {
  console.log("PHRH database connection established");

  const BaseValueInsertor = require("./helpers/BaseValueInsertor.helper");
  /*
   * CLEAN DB
   */
  if(process.env.RESET_DB === 'true') {
    await BaseValueInsertor.resetDB()
    console.log('Base de données éffacée')
  }
  /*
   * INSERER DONNEES DE TEST
   */
  if(process.env.INSERT_TEST_DB === 'true') {
    console.log('Insertion des données DE TEST en cours ...')
    let baseValueInsertor = new BaseValueInsertor(
      mappingFile = null, 
      testDB = require('./datas/test/data.json')
      )
    await baseValueInsertor.insertData(
      msg => { console.log(msg) },
      err => { console.error(err) },
      insertTestAssocEntities = true //tmp : utiliser ce paramètre quand on insert les data de test
    )
    console.log('l\'Insertion des données DE TEST est terminée')
  }

  /*
   * INSERER DONNEES REELLES
   */
  if(process.env.INSERT_REAL_DB === 'true') {
    console.log('Insertion des données REELLES en cours ...')
    let baseValueInsertor = new BaseValueInsertor(
      mappingFile = require('./datas/sources/mappingfile.json'), 
      null
      )
    await baseValueInsertor.importData(
      msg => { console.log(msg) },
      err => { console.error(err) },
      insertTestAssocEntities = false //tmp : utiliser ce paramètre quand on insert les data de test
    )
    console.log('l\'Insertion des données REELLES est terminée')
  }
});

//en cas d'erreur de connection au server
mongoose.connection.on("error", error => console.log(`Erreur de connection a l\'uri : ${uri}`, error));

//Route to end points
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

const suggestionsVisitesRouter = require("./routes/feature.plannifier_visite/plannifierVisite.routes.js");
app.use("/gestion/visites", suggestionsVisitesRouter);

const authRouter =  require("./routes/feature.authentification/auth.routes.js");
app.use("/auth", authRouter);
/*const featureNoterHotelRouter = require('./routes/feature\.noterhotel/noterHotel.routes.js')
app.use('/noter', featureNoterHotelRouter)*/