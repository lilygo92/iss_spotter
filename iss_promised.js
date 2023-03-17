const request = require('request-promise-native');

const fetchMyIP = () => {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = body => {
  const IP = JSON.parse(body).ip;
  return request(`http://ipwho.is/${IP}`);
};

const fetchISSFlyoverTimes = body => {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyoverTimes)
    .then(data => {
      return JSON.parse(data);
    });

};

module.exports = { nextISSTimesForMyLocation };