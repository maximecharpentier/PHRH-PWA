/*const Hotel = require("./../model/hotel.model");
const Visite = require("../model/visite.model");
const User = require("../model/user.model");
const Anomalie = require("./../model/anomalie.model");
const Assoc_user_visite = require("./../model/assoc_user_visite.model");
const Priorisation = require("./../model/priorisation.model");
const Tache = require("./../model/tache.model");
const Urgence = require("./../model/urgence.model");
const Vehicule = require("./../model/vehicule.model");*/
const Equipe = require('../../../model/assoc_user_user.model');

class feature_gestion_couverture {

  static async deleteEquipeFromUserId(id_user) {
      Equipe.findOneAndDelete({ 
          $or: [
              {'user_a_id': id_user}, 
              {'user_b_id': id_user}
          ] 
      }, 
      msg => { return msg }
    )
  }

}

module.exports = feature_gestion_couverture;
