import Joi from 'joi';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';

const updateProfileInputsValidation = async (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().regex(/^[A-Za-z]+$/),
    last_name: Joi.string().regex(/^[A-Za-z]+$/),
    username: Joi.string().min(5),
    occupation: Joi.string().min(4),
    bio: Joi.string().min(0).allow('').allow(null),
    password: Joi.string().min(8),
    address: Joi.string(),
    language: Joi.string().regex(/^[A-Za-z]+$/),
    profile_picture: Joi.string()
  });
  try {
    const { error } = schema.validate(req.body);
    if (error) throw new NotFoundRequestError(error.details[0].message, 400);
    next();
  } catch (err) { next(err); }
};
export default updateProfileInputsValidation;
