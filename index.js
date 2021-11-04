// index.js
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let i = 0; i < passTimes.length; i++) {
    console.log(`Next pass at ${new Date(passTimes[i].risetime * 1000)} for ${passTimes[i].duration}!`);
  }
});