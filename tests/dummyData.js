import { generateToken, hashPassword } from '../src/utils/auth';
import roles from '../src/utils/roles';

// signup data
export const verifiedUser = {
  email: 'manager_id@gmail.com',
  role: '7254a9e7-2e1b-4f83-ad73-78b90dd3df77'
};
export const notManagerVerifiedUser = {
  email: 'sequester@gmail.com',
  role: '45429837-ed2c-435d-bc22-ad9c5dbe3782'
};
export const validUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
  email: 'renedeolynda@gmail.com',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

export const invalidUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestAdmin',
  email: '123',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

const payload = { user: validUser.email };

export const validToken = generateToken(payload);

export const invalidToken = `${validToken}234`;
export const verifiedUserToken = generateToken(verifiedUser);
export const notManagerVerifiedUserToken = generateToken(notManagerVerifiedUser);
// Login data

const loginUser = {
  email: 'habajeunes2@gmail.com',
  password: '1234567890'
};

export const userToken = generateToken(loginUser);
