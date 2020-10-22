import Joi from '@hapi/joi';

const roleValidation = (data) => {
  const schema = Joi.object({
    role: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(5).max(500).required()
  });
  return schema.validate(data);
};

export default roleValidation;
