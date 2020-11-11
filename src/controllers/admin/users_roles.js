import usersService from '../../services/users';
import applicationError from '../../utils/errorHandling/applicationError';
import userBadRequest from '../../utils/errorHandling/userBadRequest';
import notFound from '../../utils/errorHandling/notFound';
import roleServices from '../../services/roles';
import accessDenied from '../../utils/errorHandling/accessDenied';
import readData from '../../utils/readData';

exports.findThem = async (req, res, next) =>{
    try{


        const page = req.query.page || 1;
        const limit = req.query.limit || 3;
        const skip = ((page - 1) === -1) ? 0 : (page -1) * limit;


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
        
        const { email, role } = req.body;

        /* read data from index.json file */

        // const existingData = roleServices.readFile();

        /* converting the data from buffer to json format */
        const roles = readData.getPermissionsObject();//JSON.parse(existingData);

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
        
        const { email, manager_id } = req.body;
        const findUser = await usersService.getUser({email: email});
        if(findUser){
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
};

/*------------------------------------------ROLES CONTROLLERS---------------------------*/


exports.create = async (req, res, next) => {
    try{

        /** receives the body object from the request */
        const requestData = req.body;

        /* a constructor holding all permissions */

        function Perm() {
            this['edit profile'] = 1,

            this['assign requesters to manager'] = 0,
            this['create travel requests'] = 0,
            this['view travel requests'] = 0,
            this['edit travel requests'] = 0,
            this['cancel travel requests'] = 0,

            this['approve direct reports travel requests'] = 0,
            this['view direct reports travel requests'] = 0,
            this['reject direct reports travel requests'] = 0,

            this['create accommodations'] = 0,
            this['update accommodations'] = 0,
            this['delete accommodations'] = 0,
            this['book accommodations'] = 0,

            this['create locations'] = 0,
            this['update locations'] = 0,
            this['delete locations'] = 0;
        }

        /* read data from index.json file */

        // const existingData = roleServices.readFile(); 

        /* converting the data from buffer to json format */
        // let roles = {};
        const roles = readData.getPermissionsObject();//JSON.parse(existingData);

        let existProp = false;
        /* check if index.json has this requested role */
        const role = `${requestData.role}`;
        if (roles.hasOwnProperty(role)) {
            existProp = true;
            throw new userBadRequest("Role exist!");
        }
        /* if request role doesn't exist, then create one */
        if (!existProp) {

            /* a role object to add in db*/
        const Roles = {
                name: requestData.role,
                description: requestData.description
            };

            const saveRole = await roleServices.createOne(Roles); 
            if(saveRole){

                roles[role] = new Perm();

                /* convert this new JSON data from one line to readable using stringify */
                const dataJson = JSON.stringify(roles, null, 2);
                roleServices.saveInFile(dataJson); 
                
                res.status(201).json({status: 201, message:"Role created successfully"});
            }
            else{
                throw new applicationError('Failed to create this role, try again!', 500);
            }
        
        }
    }
    catch (err) {
        next(err);
    }
};


exports.getAll = async (req, res, next) => {
    try{
        //find roles using services
        const allRoles = await roleServices.findRoles({});


        if(allRoles){
        
            if(!allRoles.rows.length){  throw new notFound(`No role found`); }
           return res.status(200).json({status:200, roles: allRoles}); 
        }
        else{
            throw new applicationError('Failed to fetch roles, try again!', 500);
        }
    }
    catch(error){
        next(error);
    }
}



exports.updatePermissions = (req, res, next)=>{
    try{
        
        let requestData = req.body;
        /* read data from index.json file */

        // const existingData = roleServices.readFile();

        /* converting the data from buffer to json format */
        // let roles = {};
        const roles = readData.getPermissionsObject();//JSON.parse(existingData);

        let existProp = true;
        /* check if index.json does not have this requested role */
        const role = `${requestData.role}`;
        if (!roles.hasOwnProperty(role)) {
            existProp = false;
            throw new notFound("Role not exist!");
        }

        if(existProp){
            /*check if requested permissions are valid and values are valid*/
            let permissions = requestData.permissions;
            let validPermission = [];
            for(let property in permissions){
                if(roles[role].hasOwnProperty(property)){
                    if((permissions[property] === 0) || (permissions[property] === 1) ){

                        /*a property from index.json is assigned a value from the request*/
                        roles[role][property]= permissions[property];       

                    }else{
                        
                        /*catch invalid property values (non 0 or 1 values)*/
                        validPermission.push(property);         
                    }
                    
                }else{
                    
                    /* catch invalid properties*/
                    validPermission.push(property);         
                }
            }
            const dataJson = JSON.stringify(roles, null, 2);

            /* save changes */
            roleServices.saveInFile(dataJson);

            if(validPermission != ""){
                throw new userBadRequest( {message: "These permissions or values are not allowed", "failed permissions": validPermission, success: roles[role]});
            }
            else{
                res.status(201).json({status: 201, message: "Permissions updated successfully", "failed permissions": validPermission, success: roles[role]});
            }
            
        }

    }
    catch (err) {
        next(err);
    }
};

exports.deleteRoles = async (req, res, next)=>{
    try{
        
        let requestRole = req.body.role;

        /* read data from index.json file */

        // const existingData = roleServices.readFile();

        /* converting the data from buffer to json format */
        // let roles = {};
        const roles = readData.getPermissionsObject();//JSON.parse(existingData);

        let existProp = true;
        /* check if index.json does not have this requested role */
        if (!roles.hasOwnProperty(requestRole)) {
            existProp = false;
            throw new notFound("Role not exist!");
        }

        if(existProp){
            if(delete roles[requestRole]){
                const dataJson = JSON.stringify(roles, null, 2);
                const findRole = await roleServices.findRole({name:requestRole});
                if(findRole){
                    if(requestRole ==='manager'){
                        await roleServices.changeRole({change: null,role_id: findRole.id});
                    }
                    const deletedRole = await roleServices.deleteOne(findRole.id);
                    if(deletedRole){
                    
                    /* save changes */
                    // fs.writeFileSync('./permissions/index.json', dataJson);    
                    roleServices.saveInFile(dataJson);
                    return res.status(200).json({status:200,message: "Role deleted successfully", role: requestRole});
                    }else{
                        throw new applicationError('Failed to delete this role, try again!', 500);
                    }
                    
                }else{
                    throw new notFound('Role not found!', 404);     
                } 
            }else{
                throw new applicationError('Failed to delete this role, try again!', 500)
            }
                
  
        }

    }
    catch (err) {
        next(err);
    }
}


