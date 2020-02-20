var fs = require('fs');

const generateUsers = require('./generate-users');
const generateHotels = require('./generate-hotels');
const generateVisits = require('./generate-visits');

const FAKE_DATA = JSON.stringify({
  hotels: generateHotels(),
  users: generateUsers(),
  visits: generateVisits()
});

fs.writeFileSync('fake-data.json', FAKE_DATA, 'utf8');