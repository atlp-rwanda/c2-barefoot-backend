import Joi from 'joi';
export const validateResetEmail = (req, res, next) =>{
    const schema = Joi.object({
    email: Joi.string().email().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}