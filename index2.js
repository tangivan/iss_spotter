const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (let i = 0; i < passTimes.length; i++) {
      console.log(`Next pass at ${new Date(passTimes[i].risetime * 1000)} for ${passTimes[i].duration}!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work!", error);
  });