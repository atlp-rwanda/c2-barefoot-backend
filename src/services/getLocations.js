import models from '../models';

export const retrieveLocations = async (page = 1) => {
  if (Number.isNaN(page)) { page = 1; }
  const pageSize = 5;
  const skip = (page - 1) * pageSize;
  const locations = await models.Location.findAndCountAll({ limit: pageSize, offset: skip });
  return locations;
};

export const retrieveAllLocations = async () => {
  const locations = await models.Location.findAndCountAll();
  return locations;
};

