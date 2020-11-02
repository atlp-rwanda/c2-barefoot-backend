import usersService from '../../services/users';
import userValidation from '../../validation/createRole';
import applicationError from '../../errorHandling/applicationError';
import userBadRequest from '../../errorHandling/userBadRequest';
import notFound from '../../errorHandling/notFound';


exports.findThem = async (req, res, next) =>{
    try{


        const page = req.query.page || 1;
        const limit = req.query.limit || 3;
        const skip = ((page - 1) === -1) ? 0 : (page -1) * limit;
        // const skip = (page <= 0) ? throw new notFound(`Page ${page} does not exist`) : (page -1 ) * limit ;


        //find users using services
        const users = await usersService.findUsers({
            offset: skip,
            limit:limit,
            attributes:["id","first_name","last_name","email"]
        });
        if(users){
            if(!users.rows.length){
                throw new notFound(`Page ${page} does not exist!`);
            }
           return res.status(200).json({status:200, users: users }); 
        }
        else{
            throw new applicationError('Failed to fetch users, try again!', 500);
        }
    }
    catch(error){
        next(error);
    }
}


exports.deleteOne = async (req, res, next) =>{
    try{
        
        /* data validation */
        const { error } = userValidation.deleteValidationEmail(req.body);
        if (error) throw new userBadRequest(error.details[0].message);

        const userEmail = req.body.email;
        const deleted = await usersService.deleteUser(userEmail);
        if(deleted){
            res.status(200).json({status:200, message: "The user is deleted successfully!"});
        }
        else{
            throw new applicationError('User not deleted! Try again', 500);
        }
    }catch(error){
        next(error);
    }
}

