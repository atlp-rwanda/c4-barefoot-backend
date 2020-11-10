import Joi from 'joi';
import signUpError from '../utils/signUpError';

const schema = Joi.object({
  first_name: Joi.string().required().regex(/^[A-Za-z]+$/),
  last_name: Joi.string().required().regex(/^[A-Za-z]+$/),
  username: Joi.string().required().min(5),
  occupation: Joi.string().required().min(4),
  email: Joi.string().email().required(),
  bio: Joi.string().min(0).allow('').allow(null),
  password: Joi.string().required().min(8),
  address: Joi.string().required(),
  language: Joi.string().required().regex(/^[A-Za-z]+$/),
  profile_picture: Joi.string().required()
});

export default (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw new signUpError(error.details[0].message, 400);
  }
  next();
};
