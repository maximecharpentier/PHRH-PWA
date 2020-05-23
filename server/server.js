const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
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

//lancer le serv
const serv_port = "27017"; //process.env.SERV_PORT
app.listen(serv_port, function() {
  console.log("server runing PORT: " + serv_port);
});

//ouvrir & deleguer la gestion de la connection a nodemon
mongoose.connection.once("open", () => {
  console.log("PHRH database connection established");

  //Quand la connection est ouverte
  //insert base values
  const BaseValueInsertor = require("./helpers/BaseValueInsertor.helper");
  const mappingFileForRealData = require('./datas/mappingfile.json');
  const datas = {} //require('./datas/data.json');
  let baseValueInsertor = new BaseValueInsertor(mappingFileForRealData, datas)
  //baseValueInsertor.insertProtoBaseValues(
  baseValueInsertor.insertRealBaseValues(
    msg => {
      console.log(msg);
    },
    err => {
      console.error(err);
    },
    resetDBValues = (process.env.RESET_DB === 'true')
  );
});

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
/*const featureNoterHotelRouter = require('./routes/feature\.noterhotel/noterHotel.routes.js')
app.use('/noter', featureNoterHotelRouter)*/