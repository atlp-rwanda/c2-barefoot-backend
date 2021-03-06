
import Joi from 'joi';
import BadRequestError from '../utils/Errors/badRequestError';

export default function (req, res, next) {
    const schema = Joi.object({
        travelRequestId: Joi.string().required().min(36).max(36),
        action: Joi.string().required().min(6).max(7)
    });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message)
  }
  next();
}
