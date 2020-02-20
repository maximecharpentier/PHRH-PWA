const { getRandomInt } = require('./utils');

const generateVisits = () => {
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

module.exports = generateVisits;