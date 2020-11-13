import models from '../models';
import 'express-async-errors';
import amenityNotFound from '../utils/notFoundRequestError';

export const createAmenity = async (req, res, next) => {
  try {
    const amenity = await models.Amenity.create(req.body);
    res.status(200).json({ amenity });
  } catch (error) {
    next(error);
  }
};

export const updateAmenity = async (req, res, next) => {
  try {
    const amenityExist = await models.Amenity.findOne({ where: { id: req.params.id } });
    if (!amenityExist) {
      throw new amenityNotFound('Amenity does not exist');
    }
  } catch (error) {
    next(error);
  }
};