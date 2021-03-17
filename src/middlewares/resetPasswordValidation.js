import Joi from 'joi';
export const RequestResetEmail = (req, res, next) =>{
    const schema = Joi.object({
    email: Joi.string().email().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}
export const validateResetPassword = (req, res, next) =>{
    const schema = Joi.object({
    password: Joi.string().min(8).max(100).required(),
    confirmPassword: Joi.string().min(8).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}