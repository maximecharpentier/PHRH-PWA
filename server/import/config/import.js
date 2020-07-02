require("dotenv").config();

const BaseValueInsertor = require("../libs/DBFeeder");

/**
 * IMPORT VALUES IN DB FOR TEST OR MIGRATION
 */
importData()

async function importData() {
    //case : Clean Database
    if(process.env.RESET_DB === 'true') {
        await resetDB()
    }

    //case : Import test DB
    if(process.env.INSERT_TEST_DB === 'true') {
        await insertTestDB()
    }

    //case : Import DB from external sources
    if(process.env.INSERT_REAL_DB === 'true') {
        await insertRealDB()
    }
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
        testDB = require('../test/data.json')
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
         mappingFile = require('../sources/mappingfile.json'), 
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