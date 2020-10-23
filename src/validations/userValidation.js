import Joi from 'joi';

export const validateResetEmail = () =>{
    const schema = Joi.object({
    email: Joi.string().email().required()
    });
 return schema
}
