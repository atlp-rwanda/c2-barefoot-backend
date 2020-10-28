import fs from 'fs';
import roleValidate from '../../validation/createRole';
import models from '../../models';


exports.create = async (req, res) => {
  /* data validation */
  const { error } = roleValidate.roleValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

    /* creates index.js if it doesn't exist */

    if (!fs.existsSync('./permissions/index.json')) {
        fs.writeFileSync('./permissions/index.json', '{}');
    }

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

  try {
    /* read data from index.json file */

    const existingData = fs.readFileSync('./permissions/index.json');

    /* converting the data from buffer to json format */
    let roles = {};
    roles = JSON.parse(existingData);

    let existProp = false;
    /* check if index.json has this requested role */
    const role = `${requestData.role}`;
    if (roles.hasOwnProperty(role)) {
      existProp = true;
      return res.status(401).json({ status: 401, message: 'Unauthorized role, role exist!' });
    }
    /* if request role doesn't exist, then create one */
    if (!existProp) {

        /* a role object to add in db*/
      const Roles = {
            name: requestData.role,
            description: requestData.description
        };

        const saveRole = await models.Role.create(Roles);
        if(saveRole){

            roles[role] = new Perm();

            /* convert this new JSON data from one line to readable using stringify */
            const dataJson = JSON.stringify(roles, null, 2);
            fs.writeFileSync('./permissions/index.json', dataJson);
            
            res.status(201).json({message:"Role created successfully"});
        }
        else{
            res.status(500).json({error:"Failed to create this role, try again!"});
        }
      
    }
  } catch (err) {
    res.status(500).json({ status: 500, errors: err });
  }
};

exports.updatePermissions = (req, res)=>{

    /* data validation */
    const { error } = roleValidate.updateValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    /* creates index.js if it doesn't exist */

    if (!fs.existsSync('./permissions/index.json')) {
        fs.writeFileSync('./permissions/index.json', '{}');
    }


    let requestData = req.body;
    try {
        /* read data from index.json file */

        const existingData = fs.readFileSync('./permissions/index.json');

        /* converting the data from buffer to json format */
        let roles = {};
        roles = JSON.parse(existingData);

        let existProp = true;
        /* check if index.json does not have this requested role */
        const role = `${requestData.role}`;
        if (!roles.hasOwnProperty(role)) {
            existProp = false;
            return res.status(401).json({ status: 401, message: 'Unauthorized role, role not exist!' });
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
            fs.writeFileSync('./permissions/index.json', dataJson);     

            if(validPermission != ""){
                res.status(201).json( {error: "these permissions or values are not allowed", "failed permissions": validPermission, success: roles[role]}); 
            }
            else{
                res.status(400).json({message: "Permissions updated successfully", "failed permissions": validPermission, success: roles[role]});
            }
            
        }

    } catch (err) {
        res.status(500).json({ status: 500, errors: err });
    }
};

exports.deleteRoles = async (req, res)=>{
    /* data validation */
    const { error } = roleValidate.deleteValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    /* creates index.js if it doesn't exist */

    if (!fs.existsSync('./permissions/index.json')) {
        fs.writeFileSync('./permissions/index.json', '{}');
    }


    let requestRole = req.body.role;
    try {



        
        /* read data from index.json file */

        const existingData = fs.readFileSync('./permissions/index.json');

        /* converting the data from buffer to json format */
        let roles = {};
        roles = JSON.parse(existingData);

        let existProp = true;
        /* check if index.json does not have this requested role */
        if (!roles.hasOwnProperty(requestRole)) {
            existProp = false;
            return res.status(401).json({ status: 401, message: 'Unauthorized role, role not exist!' });
        }

        if(existProp){
            if(delete roles[requestRole]){
                const dataJson = JSON.stringify(roles, null, 2);

                const deletedRole = await models.Role.destroy({ where:{ name: requestRole}});
               if(deletedRole){
                    /* save changes */
                    fs.writeFileSync('./permissions/index.json', dataJson);     

                    return res.status(201).json({status:201,message: "Role deleted successfully", roles: roles});
                }else{
                    return res.status(500).json({error: "Failed to delete this role, try again"});
                }
            }else{
                return res.status(500).json({status:500,error: "Failed to delete this role"});
            }
            
        }

    } catch (err) {
        res.status(500).json({ status: 500, errors: err });
    }
}
