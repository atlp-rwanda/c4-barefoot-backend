import models from '../models';

const getLocations = async (page = 1) => {
  if (Number.isNaN(page)) { page = 1; }
  const pageSize = 2;
  const skip = (page - 1) * pageSize;
  const locations = await models.Location.findAndCountAll({ limit: pageSize, offset: skip });
  return locations;
};
export default getLocations;
