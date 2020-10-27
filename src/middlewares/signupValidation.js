import Joi from 'joi';

export default function (req, res, next) {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    address: Joi.string().required(),
    language: Joi.string().required(),
    profile_picture: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
