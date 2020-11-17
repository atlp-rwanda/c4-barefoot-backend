import Joi from 'joi';
import BadRequestError from '../utils/Errors/badRequestError';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
});

export default (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }
  next();
};
