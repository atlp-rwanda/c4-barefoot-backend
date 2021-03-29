import models from '../models';
import 'express-async-errors';
import locationNotFound from '../utils/Errors/notFoundRequestError';
import badRequest from '../utils/Errors/badRequestError';
import retrieveLocations from '../services/getLocations';
import getWeather from '../helper/weather';

import { error } from 'console';
const URL = require('url').URL;
const request = require('request');

export const getLocations = async (req, res, next) => {
  try {
    const locations = await retrieveLocations();
    if (!locations) {
      throw new locationNotFound(('There are no locations available'));
    }
    res.status(200).json({ status: 200, locations });
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
   const weatherData = getWeather(req, req.body.LocationName);
   //req.body.weather = "";
   const locationData = {
      LocationName: req.body.LocationName,
      country: req.body.country,
      description: req.body.description,
      link: req.body.link,
      currency: req.body.currency,
    //  weather: req.body.weather
      };
     // console.log("********",weatherData);
    const location = await models.Location.create(locationData);
    res.status(201).json({ location });
  } catch (error) {
    next(error);
  }
};

 var weatherData;
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
    weatherData = info;
    //console.log("3435664523",weatherData);
    //return info;
    // res.status(200).json({    
    // })
  }
}
request(options, callback);
//console.log(weatherInfo);
return weatherInfo;
}

export const getOneLocation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleLocation = await models.Location.findOne({ where: { id } });
    if (!singleLocation) {
      throw new locationNotFound(('Location does not exist'));
    }
     const returnWeather = await getWeatherData(req, singleLocation.LocationName);
    //console.log(req.body);
    res.status(200).json({singleLocation, weatherData});
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const locationExist = await models.Location.findOne({ where: { id: req.params.id } });
    if (!locationExist) {
      throw new locationNotFound(('Location does not exist'));
    }
    const update = await models.Location.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Location successfully updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const locationExist = await models.Location.findOne({ where: { id: req.params.id } });
    if (!locationExist) {
      throw new locationNotFound(('Location does not exist'));
    }

    const linkedAccommodation = await models.Accommodation.findOne({ where: { locationID: req.params.id } });
    if (linkedAccommodation) {
      throw new badRequest(('This location can not be deleted with linked accomodations.'));
    }

    const dltLocation = await models.Location.destroy({ where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Location has been deleted' });
  } catch (error) {
    next(error);
  }
};


