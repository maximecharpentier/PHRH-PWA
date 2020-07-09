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
