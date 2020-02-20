const { getRandomString } = require('./utils');

const generateUsers = () => {
  const FAKE_DATA = [];
  const VISITS_IDS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42
  ];
  for (let i = 0; i < 2; i++) {
    const MODEL = {
      nom : getRandomString(),
      prenom : getRandomString(),
      pwd : getRandomString(),
      fonction : "Intervenant terrain",
      secteur :  "75",
      plage_h : "Matin",
      infos_equipe : getRandomString(),
      equipier_id : null,
      visites_id : VISITS_IDS,
      vehicule_id : null
    }
    FAKE_DATA.push(MODEL)
  }
  for (let i = 0; i < 1; i++) {
    const MODEL = {
      nom : getRandomString(),
      prenom : getRandomString(),
      pwd : getRandomString(),
      fonction : "Superviseur",
      secteur :  "75",
      plage_h : null,
      infos_equipe : getRandomString(),
      equipier_id : null,
      visites_id : VISITS_IDS,
      vehicule_id : null
    }
    FAKE_DATA.push(MODEL)
  }
  return FAKE_DATA;
}

module.exports = generateUsers;