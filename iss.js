const request = require("request");

const nextISSTimesForMyLocation = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body).ip;

    request(`http://ipwho.is/${IP}`, (error, response, body) => {
      if (error) return callback(error, null);

      const coords = JSON.parse(body);

      if (!coords.success) {
        const msg = `Success status was ${coords.success}. Server message says: ${coords.message} when fetching for IP ${coords.ip}`;
        callback(Error(msg), null);
        return;
      }

      request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (error) return callback(error, null);

        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }
    
        callback(null, JSON.parse(body).response);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };