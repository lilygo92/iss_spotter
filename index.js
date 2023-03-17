const { fetchMyIP , fetchCoordsByIP , fetchISSFlyoverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP("108.180.20.23", (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned latitude and longitude:' , data);
});

fetchISSFlyoverTimes({ latitude: 49.2827291, longitude: -123.1207375 }, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned risetime and duration:' , data);
});