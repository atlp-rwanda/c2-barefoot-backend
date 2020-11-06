import accessDenied from '../../utils/errorHandling/accessDenied';
import notFound from '../../utils/errorHandling/notFound';
import roleServices from '../../services/roles';



  /* check if index.json exist if not create one */
  // const permissionsFile = './permissions/index.json';

  // /* creates index.js if it doesn't exist */

  // roleServices.fileExistOrNot(permissionsFile);

  /* read permissions file */
  const roles =  roleServices.readFile();
  let rolesData = {};
  rolesData = JSON.parse(roles);
export default function  permit(permission) {

  return (req, res, next) => {
    const { role } = req.body;
    try{
      /* check if this role exist */
      if (!rolesData.hasOwnProperty(role)) {
        throw new notFound('Access denied, role does not exist');
      }
      let allowed = permission.length ? true : false;

      /* loop through permissions sent */

      for(let i = 0; i< permission.length; i++){
        /* check if this task does not exist */
        if (!rolesData[role].hasOwnProperty(permission[i])) {
          throw new notFound(`Access denied, permission does not exist! ["${permission[i]}"]`);
        }

        /* check if rolesData[role][permission[i]] is 1 or 0 
           then assign "allowed", true or false
           if false "break" the loop otherwise go to the next permission */
        if(!(allowed = rolesData[role][permission[i]] ? true : false)) break;
      }
      

     if(allowed) {
        next();
      }else{
        throw new accessDenied(`You don't have permissions to [${permission}]`);
      }

    }
    catch(error){
      next(error);
    }
  }
  
  
}
