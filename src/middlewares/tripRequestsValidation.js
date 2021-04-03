import Joi from 'joi';
import BadRequestError from '../utils/Errors/badRequestError';

export const createTripValidation= (req, res, next) =>{
    const schema = Joi.object({
        status: Joi.string(),
        trip:Joi.array().items(
            Joi.object({
                originCity: Joi.string().required(),
                destination: Joi.string().required(),
                tripDate: Joi.date().iso().required().messages({
                    "date.format":('Trip Date is not a correct iso 8601 format')
                }),
                returnDate: Joi.date().iso().messages({
                    "date.format":('Returning Date is not a correct iso 8601 format')
                }),
                accommodationId: Joi.string().required(),
                reason: Joi.string().required()
            })
        ).required()
    })
  const { error } = schema.validate(req.body);
  if (error) throw new BadRequestError(error.details[0].message);
  next();
}


export const editTripValidation = (req, res, next) =>{
    const schema = Joi.object({
        tripId: Joi.string().min(36).max(36).required(),
        updates: Joi.object({
                originCity: Joi.string(),
                destination: Joi.string(),
                tripDate: Joi.date().iso().messages({
                    "date.format":('Trip Date is not a correct iso 8601 format')
                }),
                returnDate: Joi.date().iso().messages({
                    "date.format":('Returning Date is not a correct iso 8601 format')
                }),
                accommodationId: Joi.string().min(36).max(36),
                reason: Joi.string()
            }).required()
    })
  const { error } = schema.validate(req.body);
  if (error) throw new BadRequestError(error.details[0].message);
  if(Object.keys(req.body.updates).length === 0) { throw new BadRequestError(("updates can not be empty!"));}
  next();
}


