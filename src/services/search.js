import models from '../models';
import {Op} from 'sequelize';

//search locations based on the location name and the country
export const queryLocations = async (query) => {
    const { search, offset, limit } = query;

    const searchByLocationName = await models.Location.findAll({offset, limit,  where: { LocationName: {[Op.iLike]:`%${search}%`}}});
    const searchByCountry = await models.Location.findAll({offset, limit,  where: { country: {[Op.iLike]:`%${search}%`}}});
    const results = [...searchByLocationName,...searchByCountry];

    const key = 'LocationName';
    const resultsUniqueByLocationName = [...new Map(results.map(item =>
    [item[key], item])).values()];
    const data ={
        counts: resultsUniqueByLocationName.length,
        rows: resultsUniqueByLocationName
    }
    return data;
};
  
//search accommodations based on the locationID
export const queryAccommodations = async (query) => {
    const { fromLocation, offset, limit } = query;
    const results = await models.Accommodation.findAll({offset, limit,  where: { locationID: fromLocation}});
    const data = {
        counts: results.length,
        rows: results
    }
    return data;
};