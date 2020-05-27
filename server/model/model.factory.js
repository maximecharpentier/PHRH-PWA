const Hotel = require("./../model/hotel.model");
const Visite = require("../model/visite.model");
const User = require("../model/user.model");
const Anomalie = require("./../model/anomalie.model");
const Assoc_user_visite = require("./../model/assoc_user_visite.model");
const Assoc_user_user = require("./../model/assoc_user_user.model");
const Priorisation = require("./../model/priorisation.model");
const Tache = require("./../model/tache.model");
const Urgence = require("./../model/urgence.model");
const Vehicule = require("./../model/vehicule.model");

class modelFactory {
    static get(tableName) {
        console.log(tableName)
        tableName = tableName.ucFirst()
        switch(tableName) {
            case "Hotel" :
                return Hotel
            case "Visite" :
                return Visite
            case "User" :
                return User
            case "Anomalie" :
                return Anomalie
            case "Assoc_user_visite" :
                return Assoc_user_visite
            case "Assoc_user_user" :
                return Assoc_user_user
            case "Priorisation" :
                return Priorisation
            case "Tache" :
                return Tache
            case "Urgence" :
                return Urgence
            case "Vehicule" :
                return Vehicule
            default :
                return null
        }
    }    
}

module.exports = modelFactory;
