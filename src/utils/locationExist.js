import 'express-async-errors';
import models from '../models';
import locationNotFound from './notFoundRequestError';

const locationExist = async (data) => {
  try {
    const location = await models.Location.findOne({ where: { id: data } });
    if (!location) {
      throw new locationNotFound('Location does not exist');
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default (locationExist);
