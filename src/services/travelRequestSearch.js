import db from '../models';
import isUserExist from "../services/findUserById";
const findTravelRequest = (res, query, next, pagination) => {
  const resultSet = [];
  db.TravelRequest.findAndCountAll({ where: query, ...pagination })
    .then((tRequestDataSet) => {
      if (tRequestDataSet.rows.length > 0) {
        let counter = tRequestDataSet.rows.length;
        tRequestDataSet.rows.forEach( async (tRequestData) => {
          const travelData = tRequestData.get({ plain: true })

         const userData = await isUserExist(travelData.userId)
            const user = {
              first_name: userData.first_name,
              last_name:userData.last_name,
              email:userData.email,
              occupation:userData.occupation,
              profile_picture:userData.profile_picture,
              address:userData.address,
              language:userData.language,
              bio:userData.bio

            }
          db.Trip.findAll({ where: { travelId: tRequestData.travelId } })
            .then((tripData) => {
              counter -= 1;
              if (tripData != null) {
                const allData = {

                  ...tRequestData.get({ plain: true }),
                  requesterInfo: user,
                  Trip: tripData,
                };
                // console.log(allData)
                resultSet.push(allData);
                if (counter === 0) { res.json(resultSet); }
              }
            })
            .catch((err) => {
              next(err);
            });
        });
      } else {
        res.status(404).json({ message: 'Travel request(s) Not Found' });
      }
    })
    .catch((err) => {
      next(err);
    });
};

export default findTravelRequest;
