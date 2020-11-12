import { generateToken } from '../src/utils/auth';
import Roles from '../src/utils/roles';
// signup data

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

// Login data

const loginUser = {
  email: 'habajeunes2@gmail.com',
  password: '1234567890'
};

export const userToken = generateToken(loginUser);


// super admin

const adminCredentials ={
  email: 'superadmin@gmail.com',
  user_role_id: Roles.SUPER_ADMIN
} 
export const token = generateToken(adminCredentials);

export const reqTest = {
  "role":"test",
  "description":"this is a test"
};

export const testPerm = { role:"test", permissions:{ "edit profile":0}};

export const updateRole={
  req:{
    email:'manager_id@gmail.com',
    role:'manager'
  },
  nonExistingUser:{
    email:'notexist@gmail.com',
    role: 'manager'
  },
  nonExistingRole:{
    email:'manager_id@gmail.com',
    role:'notExistRole'
  }
}

export const line_manager = {
  req: { email: "manager_id@gmail.com", manager_id:Roles.LINE_MANAGER},
  invalidManager: { email:"manager_id@gmail.com", manager_id: Roles.MANAGER},
  invalidUser: {email : "invalidUser@gmail.com", manager_id: Roles.LINE_MANAGER},
  invalidInput: {email:"invalidInput@gmail.com", manager_id: "123456"}
}

export const deleteReq ={
  email: 'manager_id@gmail.com'
}


