import models from '../models';

const getAccommodations = async (page = 1) => {
  if (Number.isNaN(page)) { page = 1; }
  const pageSize = 2;
  const skip = (page - 1) * pageSize;
  const accommodations = await models.Accommodation.findAndCountAll({ limit: pageSize, offset: skip });
  return accommodations;
};
export default getAccommodations;
