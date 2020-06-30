//appelé dans : server.js

//sert a ne pas require les models dans tt les fichiers via un chemin relatif, et permettre de les charger come suit "mongoose.model('ModelName')"
require("../model/vehicule.model")
require("../model/hotel.model")
require("../model/visite.model")
require("../model/user.model")
require("../model/anomalie.model")
require("../model/assoc_user_visite.model")
require("../model/assoc_user_user.model")
require("../model/priorisation.model")
require("../model/tache.model")
require("../model/urgence.model")
require("../model/memo.model")