import models from '../models';
import {Op} from 'sequelize';

export const queryLocations = async (query) => {
    const { search, offset, limit } = query;

    const searchByLocationName = await models.Location.findAll({offset, limit,  where: { LocationName: {[Op.iLike]:`%${search}%`}}});
    const searchByCountry = await models.Location.findAll({offset, limit,  where: { country: {[Op.iLike]:`%${search}%`}}});
    const results = [...searchByLocationName,...searchByCountry];

    const key = 'LocationName';
    const resultsUniqueByLocationName = [...new Map(results.map(item =>
    [item[key], item])).values()];

    return resultsUniqueByLocationName;
};
  
export const queryAccommodations = (query) => {
    const { fromLocation, offset, limit } = query;
    const results = models.Accommodation.findAll({offset, limit,  where: { locationID: fromLocation}});
  
    return results;
};
  