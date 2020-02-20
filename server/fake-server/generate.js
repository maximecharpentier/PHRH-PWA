var fs = require('fs');

const generateUsers = require('./scripts/generate-users');
const generateHotels = require('./scripts/generate-hotels');
const generateVisits = require('./scripts/generate-visits');

const FAKE_DATA = JSON.stringify({
  hotels: generateHotels(),
  users: generateUsers(),
  visits: generateVisits()
});

fs.writeFileSync('fake-data.json', FAKE_DATA, 'utf8');