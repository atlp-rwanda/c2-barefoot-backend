import fs from 'fs';
import roleValidation from '../../validation/createRole';

exports.create = (req, res) => {
  /* data validation */
  const { error } = roleValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  /** receives the body object from the request */
  const requestData = req.body;

  /* creates a new folder if it does not exist */
  const dir = './permissions';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.writeFileSync('./permissions/index.json', '{}');
  }

  /* creates index.js if it doesn't exist */

  if (!fs.existsSync('./permissions/index.json')) {
    fs.writeFileSync('./permissions/index.json', '{}');
  }

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
      return res.status(500).json({ status: 500, message: 'Bad request, role exist!' });
    }
    /* if request role doesn't exist, then create one */
    if (!existProp) {
      roles[role] = new Perm();

      /* convert this new JSON data from one line to readable using stringify */
      const dataJson = JSON.stringify(roles, null, 2);
      fs.writeFileSync('./permissions/index.json', dataJson);
      return res.status(200).json(roles);
    }
  } catch (err) {
    res.status(500).json({ status: 500, errors: err });
  }
};
