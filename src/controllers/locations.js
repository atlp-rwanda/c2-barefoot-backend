import models from '../models';
import 'express-async-errors';

export const getLocations = async (req, res, next) => {
  try {
    const locations = await models.Location.findAndCountAll({});
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
    const location = await models.Location.create(req.body);
    res.status(200).json({ location });
  } catch (error) {
    next(error);
  }
};
