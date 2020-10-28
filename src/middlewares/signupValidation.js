import Joi from 'joi';

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
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
