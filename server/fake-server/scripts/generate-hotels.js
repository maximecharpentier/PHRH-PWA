const { getRandomInt, getCB, getRandomString } = require('./utils');

const generateHotels = () => {
  const FAKE_DATA = [];
  const ABNORMALITIES = [
    {
      "nature": "Chauffage"
    },
    {
      "nature": "Electricité"
    },
    {
      "nature": "Propreté"
    }
  ];
  for (let i = 0; i < 12; i++) {
    const MODEL = {
      "id_temp": i + 1,
      "nom": `${getRandomString()} Hotel`,
      "adresse": `${getRandomInt(250, 1)} rue ${getRandomString()}`,
      "cp" : getCB(),
      "ville" : "Paris",
      "nb_chambres_utilise" : getRandomInt(999, 1),
      "nb_visites_periode" : null,
      "last_time_visited" : "2020-02-19T15:13:28.988Z",
      "urgences" : null,
      "anomalies" : [],
      "taches": []
    }
    FAKE_DATA.push(MODEL)
  }
  const MODEL = {
    "id_temp": 13,
    "nom": `${getRandomString()} Hotel`,
    "adresse": `${getRandomInt(250, 1)} rue ${getRandomString()}`,
    "cp" : getCB(),
    "ville" : "Paris",
    "nb_chambres_utilise" : getRandomInt(999, 1),
    "nb_visites_periode" : null,
    "last_time_visited" : "2020-02-19T15:13:28.988Z",
    "urgences": [
      {
        "resume": "Moisissure",
        "detail": "présence de moisissures"
      }
    ],
    "anomalies" : [],
    "taches": []
  }
  for (let i = 14; i < 26; i++) {
    const SUB_ABNORMALITIES = [];
    for (let i = 0; i < getRandomInt(3, 1); i++) {
      SUB_ABNORMALITIES.push(ABNORMALITIES[getRandomInt(3)]);
      
    }
    const MODEL = {
      "id_temp": i,
      "nom": `${getRandomString()} Hotel`,
      "adresse": `${getRandomInt(250, 1)} rue ${getRandomString()}`,
      "cp" : getCB(),
      "ville" : "Paris",
      "nb_chambres_utilise" : getRandomInt(999, 1),
      "nb_visites_periode" : null,
      "last_time_visited" : "2020-02-19T15:13:28.988Z",
      "urgences" : null,
      "anomalies" : SUB_ABNORMALITIES,
      "taches": []
    }
    FAKE_DATA.push(MODEL)
  }
  FAKE_DATA.push(MODEL)
  return FAKE_DATA;
}

module.exports = generateHotels;