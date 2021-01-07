import models from '../models';
import {Op} from 'sequelize';

//search accommodations based on the locationID
export const queryAccommodations = async (query) => {
    const { fromLocation, city, offset, limit } = query;

    //search based on the city only
    if(!fromLocation && city){
        const results = await models.Accommodation.findAll({offset, limit,  where: { city:{[Op.iLike]:`%${city}%`} }});
        const data = {
            counts: results.length,
            rows: results
        }
        return data;
    }

    //search based on the country only
    if(!city && fromLocation){
        const results = await models.Accommodation.findAll({offset, limit,  where: { country :{[Op.iLike]:`%${fromLocation}%`} }});
        const data = {
            counts: results.length,
            rows: results
        }
        return data;
    }

    //search based on the country and city
    const results = await models.Accommodation.findAll({offset, limit,  where: { country: {[Op.iLike]:`%${fromLocation}%`}, city:{[Op.iLike]:`%${city}%`} }});
    const data = {
        counts: results.length,
        rows: results
    }
    return data;
    
};