/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  let url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data['ip']);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP. Response: ${body},`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const latitude = data.latitude;
    const longitude = data.longitude;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS Fly over Times. Response: ${body},`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, data);
      });
    });
  });
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };