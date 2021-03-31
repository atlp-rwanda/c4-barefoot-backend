import models from '../models';
import { Op } from 'sequelize';

const getAccommodation = (page = 1) => {
  if (Number.isNaN(page)) { page = 1; }
  const pageSize = 2;
  const skip = (page - 1) * pageSize;
  const accommodations = models.Accommodation.findAndCountAll({ limit: pageSize, offset: skip });
  return accommodations;
};

const getAccommodationLocationId = (page, country) => {
  // if (Number.isNaN(page)) { page = 1; }
  const pageSize = 6;
  const skip = (page - 1) * pageSize;
  const accommodations = models.Accommodation.findAndCountAll({ limit: pageSize, offset: skip, where: { locationID: country, numberOfRooms: { [Op.gt]: 0 } } });
  return accommodations;
};

const getSingleAccommodation = (query) => {
  const singleAccommodation = models.Accommodation.findOne({ where: { id: query }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  return singleAccommodation;
};
const getAccommodationsWithlocationId = (locationId) => {
  const Accommodations = models.Accommodation.findAll({ where: { locationID: locationId }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
  return Accommodations;
};

export default {
  getAccommodation, getSingleAccommodation, getAccommodationsWithlocationId
};
