import Joi from 'joi';
import signUpError from '../utils/signUpError';

const schema = Joi.object({
  first_name: Joi.string().required().regex(/^[A-Za-z]+$/),
  last_name: Joi.string().required().regex(/^[A-Za-z]+$/),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  address: Joi.string().required(),
  language: Joi.string().required().regex(/^[A-Za-z]+$/),
  profile_picture: Joi.string().required()
});

export default (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw new signUpError(error.details[0].message, 400);
  }
  next();
};
