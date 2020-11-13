import models from '../models';
import 'express-async-errors';
import accommodationNotFound from '../utils/notFoundRequestError';

export const createAccommodation = async (req, res, next) => {
  try {
    const accommodation = await models.Accommodation.create(req.body);
    const amenity = await models.Amenity.create({ accommodationID: accommodation.id });
    res.status(200).json({ accommodation });
  } catch (error) {
    next(error);
  }
};

export const getAccommodations = async (req, res, next) => {
  try {
    const accommodation = await models.Accommodation.findAndCountAll({});
    res.status(200).json(accommodation);
  } catch (error) {
    next(error);
  }
};

export const getOneAccommodation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleAccommodation = await models.Accommodation.findOne({ where: { id } });
    if (!singleAccommodation) {
      throw new accommodationNotFound('Accommodation does not exist');
    }
    const amenities = await models.Amenity.findOne({ where: { accommodationID: id } });
    res.status(200).json({ singleAccommodation, amenities });
  } catch (error) {
    next(error);
  }
};

export const updateAccommodation = async (req, res, next) => {
  try {
    const accommodationExist = await models.Accommodation.findOne({ where: { id: req.params.id } });
    if (!accommodationExist) {
      throw new accommodationNotFound('Accommodation does not exist');
    }
  } catch (error) {
    next(error);
  }

  try {
    const update = await models.Accommodation.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Accommodation successfully updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteAccommodation = async (req, res, next) => {
  try {
    const accommodationExist = await models.Accommodation.findOne({ where: { id: req.params.id } });
    if (!accommodationExist) {
      throw new accommodationNotFound('Accommodation does not exist');
    }
  } catch (error) {
    next(error);
  }

  try {
    const dltAccommodation = await models.Accommodation.destroy({ where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Accommodation has been deleted' });
  } catch (error) {
    next(error);
  }
};
