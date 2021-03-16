import models from '../models';
import 'express-async-errors';
import amenityNotFound from '../utils/Errors/notFoundRequestError';

const updateAmenity = async (req, res, next) => {
  try {
    const amenityExist = await models.Amenity.findOne({ where: { accommodationId: req.params.id } });
    if (!amenityExist) {
      throw new amenityNotFound('Amenity does not exist');
    }
    const update = await models.Amenity.update(req.body, { where: { accommodationId: req.params.id } });
    res.status(201).json({ status: 201, message: 'Amenity successfully updated' });
  } catch (error) {
    next(error);
  }
};

export default updateAmenity;
