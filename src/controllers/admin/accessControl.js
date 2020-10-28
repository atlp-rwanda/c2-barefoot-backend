import fs from 'fs';

/* check if index.json exist if not create one */
const permissionsFile = './permissions/index.json';
if (!fs.existsSync(permissionsFile)) {
  fs.mkdirSync('./permissions');
  fs.writeFileSync('./permissions/index.json', '{}');
}
/* read permissions file */
const roles = fs.readFileSync(permissionsFile);
let rolesData = {};
rolesData = JSON.parse(roles);

const permissions = (req, res, next) => {
  const { role } = req.body;
  const { task } = req.body;

  /* check if this role exist */
  if (!rolesData.hasOwnProperty(role)) {
    return res.status(403).json({ status: 403, message: 'Access denied, not allowed!' });
  }

  /* check if this task exist */
  if (!rolesData[role].hasOwnProperty(task)) {
    return res.status(403).json({ status: 403, message: 'Access denied, permission does not exist!' });
  }

  /* if everything is okay, check the permission (1 or 0) */
  if (rolesData[role][task]) {
    next();
  } else {
    return res.status(403).json({ status: 403, message: "You don't have permissions to perform this task" });
  }
};

export default permissions;
