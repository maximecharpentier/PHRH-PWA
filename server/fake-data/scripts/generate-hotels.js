var fs = require('fs');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * max) + min;
}

const getCB = () => {
  return 75000 + (Math.floor(Math.random() * 20) + 1);
}


const FAKE_DATA = []
for (let i = 0; i < 13; i++) {

  const MODEL = {
    "id": i,
    "nom": `${Math.random().toString(36).substring(7)} Hotel`,
    "adresse": `${getRandomInt(1, 250)} rue ${Math.random().toString(36).substring(7)}`,
    "cp" : getCB(),
    "ville" : "Paris",
    "nb_chambres_utilise" : getRandomInt(1, 999),
    "nb_visites_periode" : getRandomInt(1, 99),
    "last_time_visite" : "2020-02-19T15:13:28.988Z",
    "urgences" : [{
      "resume": "Moisissure",
      "detail": "présence de moisissures"
    }],
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

var json = JSON.stringify({
  hotels: FAKE_DATA
});

fs.writeFileSync('fake-data.json', json, 'utf8');