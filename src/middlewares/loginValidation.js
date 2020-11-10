import Joi from 'joi';
import BadRequestError from '../utils/badRequestError';

export default function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message)
  }
  // return res.status(400).json({ error: error.details[0].message });
  next();
}
