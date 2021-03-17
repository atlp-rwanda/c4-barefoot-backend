import models from '../models';

const getLocations = async () => {
  const locations = await models.Location.findAndCountAll({});
  return locations;
};
export default getLocations;
