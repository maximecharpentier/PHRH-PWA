require("dotenv").config();

const BaseValueInsertor = require("../import/libs/DBFeeder")

/**
 * IMPORT VALUES IN DB FOR TEST OR MIGRATION
 */

//case : Clean Database
if(process.env.RESET_DB === 'true') {
    resetDB()
}

//case : Import test DB
if(process.env.INSERT_TEST_DB === 'true') {
    insertTestDB()
}

//case : Import DB from external sources
if(process.env.INSERT_REAL_DB === 'true') {
    insertRealDB()
}

async function resetDB() {
    //reset DB
    await BaseValueInsertor.resetDB()

    //fin reset 
    console.log('Base de données éffacée')
}

async function insertTestDB() {
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

async function insertRealDB() {
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
