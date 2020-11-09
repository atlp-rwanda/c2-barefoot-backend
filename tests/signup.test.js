import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  validUser, invalidUser, validToken, invalidToken
} from './dummyData';

use(chaiHttp);
const verifiedUser = {
  id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
  first_name: 'Manager',
  last_name: 'Two',
  email: 'managertwo@gmail.com',
  password: 'manaager2',
  verified: true,
  username: 'managertwo',
  address: 'Kigali',
  language: 'English',
  // user_role_id: roles.MANAGER,
  manager_id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5'
};

const unverifiedUser = {
  id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
  first_name: 'Manager',
  last_name: 'One',
  email: 'mj@gmail.com',
  password: 'manager1',
  verified: false,
  username: 'managerOne',
  address: 'Kigali',
  language: 'English',
  // user_role_id: roles.MANAGER,
  manager_id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
};

describe('Testing signup route', () => {
  it('Should save a new user', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(validUser);
    expect(res).to.have.status(201);
    expect(res.type).to.equal('application/json');
  });

  it('Should not save user with identical email', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(validUser);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
  });

  it('Should\'nt save a user with invalid/incomplete data', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(invalidUser);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body).to.have.property('status');
    expect(res.body.status).to.equal(400);
  });
});

describe('Testing email verification', () => {
  it('Should\'nt update with invalid token', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/?token=${invalidToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Invalid token');
  });

  it('Should update email verification with valid token', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/?token=${validToken}`);
    // console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  }, 30000);

  it('Shouldn\'nt verify more than once', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/?token=${validToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
  }, 30000);
});
