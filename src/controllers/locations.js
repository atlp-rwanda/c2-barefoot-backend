import models from '../models';
import 'express-async-errors';
import locationNotFound from '../utils/Errors/notFoundRequestError';
import badRequest from '../utils/Errors/badRequestError';
import retrieveLocations from '../services/getLocations';
import { queryLocations } from '../services/search';

export const getLocations = async (req, res, next) => {
  const page = Number(req.query.page);
  try {
    const locations = await retrieveLocations(page);
    if (!locations) {
      throw new locationNotFound('There are no locations available');
    }
    res.status(200).json({ status: 200, page, locations });
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
    const location = await models.Location.create(req.body);
    res.status(201).json({ location });
  } catch (error) {
    next(error);
  }
};

export const getOneLocation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleLocation = await models.Location.findOne({ where: { id } });
    if (!singleLocation) {
      throw new locationNotFound('Location does not exist');
    }
    res.status(200).json(singleLocation);
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const locationExist = await models.Location.findOne({ where: { id: req.params.id } });
    if (!locationExist) {
      throw new locationNotFound('Location does not exist');
    }
    const update = await models.Location.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Location successfully updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const locationExist = await models.Location.findOne({ where: { id: req.params.id } });
    if (!locationExist) {
      throw new locationNotFound('Location does not exist');
    }

    const linkedAccommodation = await models.Accommodation.findOne({ where: { locationID: req.params.id } });
    if (linkedAccommodation) {
      throw new badRequest('This location can not be deleted with linked accomodations.');
    }

    const dltLocation = await models.Location.destroy({ where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Location has been deleted' });
  } catch (error) {
    next(error);
  }
};

export const searchLocations = async (req, res, next) => {
  
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = ((page - 1) === -1) ? 0 : (page - 1) * limit;
    const { search } = req.query;

    const getLocations = await queryLocations({
      offset: skip,
      limit,
      search
    })
    if (!getLocations.length) {
      throw new locationNotFound('Location not found!');
    }
    res.status(200).json(getLocations);
  } catch (error) {
    next(error);
  }
};