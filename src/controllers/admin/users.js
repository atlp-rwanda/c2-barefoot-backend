import usersService from '../../services/users';
import userValidation from '../../validation/createRole';
import applicationError from '../../errorHandling/applicationError';
import userBadRequest from '../../errorHandling/userBadRequest';
import notFound from '../../errorHandling/notFound';
import roleServices from '../../services/roles';
import accessDenied from '../../errorHandling/accessDenied';

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
            attributes:["id","first_name","last_name","email","user_role_id","address","language","profile_picture","manager_id"]
            
        });


        if(users){
        
            if(!users.rows.length){
                throw new notFound(`No user found on page ${page}`);
            }
           return res.status(200).json({status:200, users: users}); 
        }
        else{
            throw new applicationError('Failed to fetch users, try again!', 500);
        }
    }
    catch(error){
        next(error);
    }
}

exports.updateHim = async (req, res, next) =>{
    try{
        /* data validation */
        const { error } = userValidation.updateUserRoleValidation(req.body);
        if (error) throw new userBadRequest(error.details[0].message);

        const { email, role } = req.body;

        /* read data from index.json file */

        const existingData = roleServices.readFile();

        /* converting the data from buffer to json format */
        const roles = JSON.parse(existingData);

        /* check if role exist */
        if (!roles.hasOwnProperty(role)){throw new notFound("Role not exist!")}
        if(role === 'administrator'){throw new accessDenied("Access denied!") }
        
        /* check if the user exist*/
        const findUser = await usersService.getUser({email: email});
        if(findUser){
            const findRole = await roleServices.findRole({name: role});
            if(findRole){
                /* update the user role*/
                const upDate = await usersService.updateUserRole({email:email, user_role: role});
                if(upDate){
                    res.status(201).json({status:201, message: `The user role is updated to ${role}`});
                }else{
                    throw new applicationError('Failed to update this role, try again!',500);
                } 
            }else{
                throw new notFound(`${role} does not exist`);
            }

            
        }else{
            throw new notFound(`${email} does not exist!`);
        }

    }
    catch(err){
        next(err);
    }
}


exports.deleteOne = async (req, res, next) =>{
    try{
        
        /* data validation */
        const { error } = userValidation.deleteValidationEmail(req.body);
        if (error) throw new userBadRequest(error.details[0].message);

        const userEmail = req.body.email;
        const findUser = await usersService.getUser({email: userEmail});
        if(findUser){
            if(findUser.user_role === "administrator"){
                throw new accessDenied('Can not delete the administrator!');
            }
            const deleted = await usersService.deleteUser(userEmail);
            if(deleted){
                res.status(200).json({status:200, message: "The user is deleted successfully!"});
            }
            else{
                throw new applicationError('Failed to delete this user! Try again', 500);
            }
        }else{
            throw new notFound(`${userEmail} does not exist!`);
        }
        
    }catch(error){
        next(error);
    }
}

