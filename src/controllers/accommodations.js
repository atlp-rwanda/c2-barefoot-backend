import models from '../models';
import 'express-async-errors';
import accommodationNotFound from '../utils/Errors/notFoundRequestError';
import accommodationService from '../services/accommodations';
import getUserData from '../helper/tokenToData';

export const createAccommodation = async (req, res, next) => {
  try {
    const accommodation = await models.Accommodation.create(req.body);
    const amenity = await models.Amenity.create({ AccommodationId: accommodation.id });
    res.status(201).json({ accommodation });
  } catch (error) {
    next(error);
  }
};

export const getAccommodations = async (req, res, next) => {
  const page = Number(req.query.page);

  try {
    const accommodations = await accommodationService.getAccommodation(page);
    if (!accommodations) {
      throw new accommodationNotFound('There are no accommodations available');
    }
    res.status(200).json({ status: 200, page, accommodations });
  } catch (error) {
    next(error);
  }
};

export const getOneAccommodation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleAccommodation = await accommodationService.getSingleAccommodation(id);
    if (!singleAccommodation) {
      throw new accommodationNotFound('Accommodation does not exist');
    }
    const amenities = await models.Amenity.findOne({ where: { AccommodationId: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    res.status(200).json({ singleAccommodation, amenities });
  } catch (error) {
    next(error);
  }
};

export const updateAccommodation = async (req, res, next) => {
  try {
    const accommodationExist = await accommodationService.getSingleAccommodation(req.params.id);
    if (!accommodationExist) {
      throw new accommodationNotFound('Accommodation does not exist');
    }

    const update = await models.Accommodation.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Accommodation successfully updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteAccommodation = async (req, res, next) => {
  try {
    const accommodationExist = await accommodationService.getSingleAccommodation(req.params.id);
    if (!accommodationExist) {
      throw new accommodationNotFound('Accommodation does not exist');
    }

    const checkTrips = await accommodationService.getSingleAccommodation(req.params.id);
    if (checkTrips) {
      const updateTrips = await models.Trip.update({ accommodationId: null }, { where: { accommodationId: req.params.id } });
    }

    const dltAmenity = await models.Amenity.destroy({ where: { AccommodationId: req.params.id } });
    const dltAccommodation = await models.Accommodation.destroy({ where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Accommodation has been deleted' });
  } catch (error) {
    next(error);
  }
};

export const bookAccomodation = async (req, res, next) => {
  const user = await getUserData(req, res);
  req.body.username = user.username;
  req.body.accommodationId = req.params.id;
  console.log(req.body);
  try {
    const booking = await models.Booking.create(req.body);
    req.status(201).json({ message: 'Booking successfully made', data: booking });
  } catch (error) {
    next(error);
  }
};
