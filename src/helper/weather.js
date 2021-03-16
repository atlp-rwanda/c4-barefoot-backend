import { error } from 'console';
const URL = require('url').URL;
const request = require('request');
 const getWeatherData = function(req, city) {
    var weatherInfo = {}; 
    const options = {
    url: `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}` ,
    headers: {
        "x-rapidapi-key": "39d2b5eb60msh9c338f352dc40efp17f5a9jsn93ca64d0491e",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com" 
    }
    };
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
   
    const info = JSON.parse(body);
    //console.log(info);
    req.body.weather =info;
    //return info;
    // res.status(200).json({
    //     
    // })
  }
}
request(options, callback);
console.log("******", weatherInfo);
return weatherInfo;
}
module.exports = getWeatherData;