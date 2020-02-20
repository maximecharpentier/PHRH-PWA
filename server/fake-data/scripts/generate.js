var fs = require('fs');

const getRandomInt = (max, min) => {
  if (min) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    return Math.floor(Math.random() * max);
  }
  
}

const getCB = () => {
  return 75000 + (Math.floor(Math.random() * 20) + 1);
}

const getRandomString = () => {
  return Math.random().toString(36).substring(7);
}

const generateVisite = (numberOfHotelPerVisite) => {
  const FAKE_DATA = [];
  const id_hotels_1 = [
    1, 1, 1,
    2, 2, 2,
    3, 3, 3,
    4, 4, 4,
    5, 5, 5,
    6, 6, 6,
  ]
  const id_hotels_2 = [
    7, 7,
    8, 8,
    9, 9,
    10, 10,
    11, 11,
    12, 12,
  ]
  const id_hotels_3 = [
    13, 14, 15, 16, 17, 18
  ]
  const id_hotels_4 = [
    19, 20, 21, 22, 23, 24, 25
  ]
  for (let i = 0; i < 18; i++) {
    const MODEL = {
      hotel_id: id_hotels_1[i],
      date_visite: "2020-02-20T11:42:06.537Z",
      note : getRandomInt(85, 70),
      duree : getRandomInt(60, 1),
      type : "Visite"
    }
    FAKE_DATA.push(MODEL)
  }
  for (let i = 0; i < 12; i++) {
    const MODEL = {
      hotel_id: id_hotels_2[i],
      date_visite: "2020-02-20T11:42:06.537Z",
      note : getRandomInt(69, 50),
      duree : getRandomInt(60, 1),
      type : "Visite"
    }
    FAKE_DATA.push(MODEL)
  }
  for (let i = 0; i < 6; i++) {
    const MODEL = {
      hotel_id: id_hotels_3[i],
      date_visite: "2020-02-20T11:42:06.537Z",
      note : getRandomInt(69, 50),
      duree : getRandomInt(60, 1),
      type : "Visite"
    }
    FAKE_DATA.push(MODEL)
  }
  for (let i = 0; i < 7; i++) {
    const MODEL = {
      hotel_id: id_hotels_4[i],
      date_visite: "2020-02-20T11:42:06.537Z",
      note : getRandomInt(49),
      duree : getRandomInt(60, 1),
      type : "Visite"
    }
    FAKE_DATA.push(MODEL)
  }
  return FAKE_DATA;
}

const generateHotels = () => {
  const FAKE_DATA = [];
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
      "urgences" : [],
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
    const MODEL = {
      "id_temp": i,
      "nom": `${getRandomString()} Hotel`,
      "adresse": `${getRandomInt(250, 1)} rue ${getRandomString()}`,
      "cp" : getCB(),
      "ville" : "Paris",
      "nb_chambres_utilise" : getRandomInt(999, 1),
      "nb_visites_periode" : null,
      "last_time_visited" : "2020-02-19T15:13:28.988Z",
      "urgences" : [],
      "anomalies" : [
        {
          "nature": "Chauffage"
        },
        {
          "nature": "Electricité"
        }
      ],
      "taches": []
    }
    FAKE_DATA.push(MODEL)
  }
  FAKE_DATA.push(MODEL)
  return FAKE_DATA;
}


const generateUsers = () => {
  const FAKE_DATA = [];
  const fns = [
    'Médiateur', 
    'Intervenant terrain', 
    'Mediateur SAS', 
    'Plannificateur'
  ] 
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
      visites_id : [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 41, 42
      ],
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
      visites_id : [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 41, 42
      ],
      vehicule_id : null
    }
    FAKE_DATA.push(MODEL)
  }
  return FAKE_DATA;
}




var json = JSON.stringify({
  hotels: generateHotels(),
  users: generateUsers(),
  visites: generateVisite()
});

fs.writeFileSync('fake-data.json', json, 'utf8');