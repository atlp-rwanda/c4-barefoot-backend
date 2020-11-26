
import Joi from 'joi';
import BadRequestError from '../utils/Errors/badRequestError';

const reviewValidation = (req, res, next) =>{
    const schema = Joi.object({
        rate: Joi.number().min(1).max(5).required(),
        review: Joi.string().min(3).max(255)
    });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message)
  }
  next();
}

export default reviewValidation;