import Joi from 'joi';
import userBadRequest from '../../utils/Errors/badRequestError';

export const roleValidation = (req, res, next) =>{
  const schema = Joi.object({
    role: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(5).max(500).required()
  });
  const { error } = schema.validate(req.body);
  if(error){
    throw new userBadRequest(error.details[0].message);
  }
  next();
}

export const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    role: Joi.string().min(2).max(50).required(),
    permissions: Joi.object().required()
  });
  const { error } = schema.validate(req.body);
  if(error){
    throw new userBadRequest(error.details[0].message);
  } 
  next();
};

export const updateUserRoleValidation = (req, res, next) => {
  const schema = Joi.object({
    role: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).email().max(50).required()
  });
  const { error } = schema.validate(req.body);
  if(error){
    throw new userBadRequest(error.details[0].message);
  }
  next();

};

export const deleteValidation = (req, res, next) => {
  const schema = Joi.object({
      role: Joi.string().min(2).max(50).required()
  });
  const { error } = schema.validate(req.body);
  if(error){
    throw new userBadRequest(error.details[0].message);
  }
  next();
};

export const deleteValidationEmail = (req, res, next) => {
  const schema = Joi.object({
      email: Joi.string().min(5).email().max(50).required()
  });
  const { error } = schema.validate(req.body);
  if(error){
    throw new userBadRequest(error.details[0].message);
  }
  next();
};


export const assignLineManagerValidation = (req, res, next) => {
  const schema =  Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    manager_id: Joi.string().min(36).max(36).required()
  });
  const { error } = schema.validate(req.body);
  if(error){
    throw new userBadRequest(error.details[0].message);
  }
  next();
}