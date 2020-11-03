import Joi from 'joi';
import UpdateProfileError from '../utils/updateProfileError';

const updateProfileInputsValidation = async (req, res, next) => {
  const schema = Joi.object({
    profile_picture: Joi.string().allow(null),
    first_name: Joi.string().allow(null),
    last_name: Joi.string().allow(null),
    username: Joi.string().allow(null),
    address: Joi.string().allow(null),
    language: Joi.string().allow(null),
    password: Joi.string().allow(null),
    occupation: Joi.string().allow(null),
  });
  const { error } = schema.validate(req.body);
  if (error) throw new UpdateProfileError(error.details[0].message, 400);
  next();
};

export default updateProfileInputsValidation;
