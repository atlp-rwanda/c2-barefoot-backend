import usersService from '../../services/users';
import userValidation from '../../validation/createRole';
import applicationError from '../../utils/errorHandling/applicationError';
import userBadRequest from '../../utils/errorHandling/userBadRequest';
import notFound from '../../utils/errorHandling/notFound';
import roleServices from '../../services/roles';
import accessDenied from '../../utils/errorHandling/accessDenied';

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
            attributes:["id","first_name","last_name","username","bio","email","user_role_id","address","language","profile_picture","manager_id"]
            
        });


        if(users){
        
            if(!users.rows.length){ throw new notFound(`No user found on page ${page}`); }
            const findLineManagers = await roleServices.findLineManagers({});
            if(findLineManagers){users.allLineManagers = findLineManagers;}
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
                const upDate = await usersService.updateUserRole({email:email, user_role_id: findRole.id});
                if(upDate){
                    //if the role is manager add him to line_managers
                    if(role === 'manager'){
                        const findManager = await usersService.findManager({first_name: findUser.first_name, last_name: findUser.last_name});
                        if(!findManager){
                            const addLineManager = await usersService.addLineManager({first_name: findUser.first_name,last_name: findUser.last_name});
                            if(addLineManager){
                               return res.status(201).json({status:201, message: `The user role is updated to ${role}`});
                            }else{
                               throw new applicationError('Failed to update this role, try again!',500);
                            }
                        }
                        
                    }
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

            const findRoleById = await roleServices.findRoleById({id:findUser.user_role_id});
            if(findRoleById.name === "administrator"){  throw new accessDenied('Can not delete the administrator!'); }
            if(findRoleById.name === "manager"){
                const findManager = await usersService.findManager({first_name: findUser.first_name, last_name: findUser.last_name});
                if(findManager){
                    const changeRole = await usersService.changeRole({change: null,manager_id: findManager.id});
                    if(changeRole){
                        const deleteManager = await usersService.deleteManager({first_name: findUser.first_name, last_name: findUser.last_name});

                    }
                }
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

exports.assignLineManager = async (req, res, next) => {
    try{
        /* data validation */
        const { error } = userValidation.assignLineManager(req.body);
        if (error) throw new userBadRequest(error.details[0].message);

        const { email, manager_id } = req.body;
        const findUser = await usersService.getUser({email: email});
        if(findUser){
            // if(findUser.last_name === 'Administrator'){
            //     throw new accessDenied("Can not assign line manager to administrator!");
            // }
            const findRoleById = await roleServices.findRoleById({id: findUser.user_role_id});
            if(findRoleById){
                if(findRoleById.name !== 'requester' && findRoleById.name !== 'manager'){
                    throw new accessDenied(`Cannot assign line manager to this user! ${findRoleById.name}`,403);
                }
                
            }
            const findLineManager = await usersService.findLineManager(manager_id);
            if(findLineManager){
                const updateUser = await usersService.updateUser({email:email, manager_id:manager_id});
                if(updateUser){
                    res.status(201).json({status:201, message: "Line manager is assigned successfully"});
                }
                else{
                    throw new applicationError("Failed to assign this line manager, try again!");
                }
            }else{
                throw new notFound("The line manager does not exist",404);
            }
        }else{
            throw new notFound("No user found!",404);
        }

    }
    catch(err){
        next(err);
    }
}