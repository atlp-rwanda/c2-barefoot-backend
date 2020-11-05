// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

use(chaiHttp);
const token = process.env.Test_Token_Secret;
const data = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestName1212',
  occupation: 'software development',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};
const invalidData = {
  first_name: 'TestName',
  last_name: 'TestName',
  username: 'TestName1212',
  occupation: 'm',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};
describe('testing getting a single user profile end point', () => {
  it('when a valid token is provided but first_name params is not in DB it returns status of 404', async () => {
    const res = await request(app).get('/api/v1/Sam').set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(400);
  });
  it('when a valid token is provided  and username params is in DB it returns status of 200', async () => {
    const res = await request(app).get('/api/v1/TestName1212').set('Authorization', `Bearer ${token}`);
    // console.log(res.body);
    expect(res).to.have.status(200);
  });
});

describe('testing getting updating a single user profile end point', async () => {
  it('when a valid token is provided and invalid data is provided it should return status 400 ', async () => {
    const res = await request(app).patch('/api/v1/update-profile').send(invalidData).set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(400);
  });
  it('when a valid token is provided and data provided it should return status 200 ', async () => {
    const res = await request(app).patch('/api/v1/update-profile').send(data).set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
  });
});