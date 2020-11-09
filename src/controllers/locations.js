import models from '../models';
import 'express-async-errors';

const createLocation = async (req, res, next) => {
  try {
    const location = await models.Location.create(req.body);
    res.status(200).json({ location });
  } catch (error) {
    next(error);
  }
};

export default { createLocation };
