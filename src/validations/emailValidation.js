import Joi from 'joi';
import UsersError from '../utils/userserror';

const validateResetEmail = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });

  try {
    const { error } = schema.validate(req.body);
    if (error) throw new UsersError(error.details[0].message, 400);
    next();
  } catch (err) { next(err); }
};

export default validateResetEmail;
