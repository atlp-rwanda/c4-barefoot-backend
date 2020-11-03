import Joi from 'joi';

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
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

export default updateProfileInputsValidation;
