import models from '../models';

const isAccommodationExist = async (id, next) => {
  let result = '';
  await models.Accommodation.findByPk(id)
    .then((data) => {
      result = data;
    })
    .catch((err) => {
      result = null;
    });
  return result;
};

export default isAccommodationExist;
