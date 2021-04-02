import Joi from 'joi';
import BadRequestError from '../utils/Errors/badRequestError';

export default function (req, res, next) {
  // const schema = Joi.object({
  //   manager_id: Joi.string().required(),
  // });
  // const { error } = schema.validate(req.query);
  // if (error) {
  //   throw new BadRequestError(error.details[0].message);
  // }
  // return res.status(400).json({ error: error.details[0].message });
  next();
}
