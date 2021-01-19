import models from '../models';
import 'express-async-errors';
import amenityNotFound from '../utils/Errors/notFoundRequestError';

const updateAmenity = async (req, res, next) => {
  try {
    const amenityExist = await models.Amenity.findOne({ where: { id: req.params.id } });
    if (!amenityExist) {
      throw new amenityNotFound(res.__('Amenity does not exist'));
    }
    const update = await models.Amenity.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: res.__('Amenity successfully updated') });
  } catch (error) {
    next(error);
  }
};

export default updateAmenity;
