const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../model/user.model");

/**
 * CONNECTION A LA BASE
 */
const uri = `mongodb://${process.env.SERVER_HOST}:27017/PHRH`;

//CONNECTION (loop connect command (pour deploiement))
var connectWithRetry = function() {

    //loop connection with call back
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

//CONNECTION FAIL
mongoose.connection.on("error", error => console.log(`Erreur de connection a l\'uri : ${uri}`, error));

//CONNECTION SUCCESS
mongoose.connection.once("open", async () => {

    //message
    console.log("PHRH database connection established");

    //import values in DB for test or migration
    const BaseValueInsertor = require("../import/libs/DBFeeder")
    
    //case : Clean Database
    if(process.env.RESET_DB === 'true') {

        //reset DB
        await BaseValueInsertor.resetDB()

        //fin reset 
        console.log('Base de données éffacée')
    }
    
    //case : Import test DB
    if(process.env.INSERT_TEST_DB === 'true') {

        //debut insertion
        console.log('Insertion des données DE TEST en cours ...')

        //recupération de l'objet d'import
        let baseValueInsertor = new BaseValueInsertor(
            mappingFile = null, 
            testDB = require('../import/test/data.json')
            )

        //inserer les données de test
        await baseValueInsertor.insertData(
            msg => { console.log(msg) },
            err => { console.error(err) },
            insertTestAssocEntities = true //tmp : utiliser ce paramètre quand on insert les data de test
            )

        //fin insertion
        console.log('l\'Insertion des données DE TEST est terminée')
    }

    //case : Import DB from external sources
    if(process.env.INSERT_REAL_DB === 'true') {

        //debut insertion
        console.log('Insertion des données REELLES en cours ...')

        //recupération de l'objet d'import
        let baseValueInsertor = new BaseValueInsertor(
            mappingFile = require('../import/sources/mappingfile.json'), 
            null
            )

        //inserer les données depuis sources externes
        await baseValueInsertor.importData(
            msg => { console.log(msg) },
            err => { console.error(err) },
            insertTestAssocEntities = false //tmp : utiliser ce paramètre quand on insert les data de test
            )
        
        //fin insertion
        console.log('l\'Insertion des données REELLES est terminée')
    }
});