import usersService from '../../services/users';
import userValidation from '../../validation/createRole';
import applicationError from '../../errorHandling/applicationError';
import userBadRequest from '../../errorHandling/userBadRequest';


exports.findThem = async (req, res, next) =>{
    try{

        //find users using services
        const users = await usersService.findUsers({});
        if(users){
           return res.status(200).json({ users }); 
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
            res.status(200).json({message: "The user is deleted successfully!"});
        }
        else{
            throw new applicationError('User not deleted! Try again', 500);
        }
    }catch(error){
        next(error);
    }
}

