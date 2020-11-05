import Joi from 'joi';
import UsersError from '../utils/userserror';

const updateProfileInputsValidation = async (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().required().regex(/^[A-Za-z]+$/),
    last_name: Joi.string().required().regex(/^[A-Za-z]+$/),
    username: Joi.string().required().min(5),
    occupation: Joi.string().required().min(4),
    password: Joi.string().required().min(8),
    address: Joi.string().required(),
    language: Joi.string().required().regex(/^[A-Za-z]+$/),
    profile_picture: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) throw new UsersError(error.details[0].message, 400);
  next();
};

export default updateProfileInputsValidation;
