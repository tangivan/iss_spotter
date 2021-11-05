const request = require('request-promise-native');

const fetchMyIP = (callback) => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body, callback) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (body, callback) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };