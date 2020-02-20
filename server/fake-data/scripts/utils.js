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

module.exports = {
  getRandomInt,
  getCB,
  getRandomString
}