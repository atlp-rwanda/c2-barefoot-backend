import Joi from 'joi';

export const validateResetEmail = () => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email should be valid')
    });
    return schema;
}