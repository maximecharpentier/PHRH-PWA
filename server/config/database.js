const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../model/user.model");
/**
 * CONNECTION A LA BASE
 */

const uri = process.env.DB_URI;

//CONNECTION (loop connect command (pour deploiement))
var connectWithRetry = function () {
  //loop connection with call back
  return mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    function (err) {
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

//CONNECTION FAIL
mongoose.connection.on("error", (error) =>
  console.log(`Erreur de connection a l\'uri : ${uri}`, error)
);

//CONNECTION SUCCESS
mongoose.connection.once("open", async () => {
  //message
  console.log("PHRH database connection established");

  //import
  require("../import/config/import");
});
