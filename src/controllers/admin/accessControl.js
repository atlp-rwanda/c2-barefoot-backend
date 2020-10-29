import accessDenied from '../../errorHandling/accessDenied';
import roleServices from '../../services/roles';



  /* check if index.json exist if not create one */
  const permissionsFile = './permissions/index.json';

  /* creates index.js if it doesn't exist */

  roleServices.fileExistOrNot(permissionsFile);

  /* read permissions file */
  const roles =  roleServices.readFile();
  let rolesData = {};
  rolesData = JSON.parse(roles);

  const permissions = (req, res, next) => {
    const { role } = req.body;
    const { task } = req.body;
    try{
      /* check if this role exist */
      if (!rolesData.hasOwnProperty(role)) {
        throw new accessDenied('Access denied, not allowed!');
      }

      /* check if this task exist */
      if (!rolesData[role].hasOwnProperty(task)) {
        throw new accessDenied('Access denied, permission does not exist!');
      }

      /* if everything is okay, check the permission (1 or 0) */
      if (rolesData[role][task]) {
        next();
      } else {
        throw new accessDenied("You don't have permissions to perform this task");
      }
    }
    catch(error){
      next(error);
    }
  };



export default permissions;
