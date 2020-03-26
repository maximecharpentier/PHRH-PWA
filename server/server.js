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
//ouvrir & deleguer la gestion de la connection a nodemon
mongoose.connection.once("open", () => {
  console.log("PHRH database connection established");
});

//insert base values
const baseValueInsertor = require("./helpers/BaseValueInsertor.helper");
baseValueInsertor.insertProtoBaseValues(
  require("./datas/data.json"),
  msg => {
    console.log(msg);
  },
  err => {
    console.error(err);
<<<<<<< HEAD
  }
=======
  },
  resetDBValues = false
>>>>>>> 0ba2ded26c4940dbb9d5df6e50f4b506926d81e7
);

//Route to end points
const crudHotelRouter = require("./routes/hotel/crudHotel.routes.js");
app.use("/hotels", crudHotelRouter);

const crudUrgenceRouter = require("./routes/urgence/crudUrgence.routes.js");
app.use("/urgences", crudUrgenceRouter);

const crudUserRouter = require("./routes/user/crudUser.routes.js");
app.use("/users", crudUserRouter);

const manageEquipesRouter = require("./routes/feature.gestioncouverture/manageEquipe.routes.js");
app.use("/gestion/equipes", manageEquipesRouter);

/*const featureNoterHotelRouter = require('./routes/feature\.noterhotel/noterHotel.routes.js')
app.use('/noter', featureNoterHotelRouter)*/

//lancer le serv
const serv_port = "27017"; //process.env.SERV_PORT
app.listen(serv_port, function() {
  console.log("server runing PORT: " + serv_port);
});
