// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { validData, invalidData, validToken, validUpdatedUserToken, validUser } from './dummyData';

use(chaiHttp);

describe('testing getting user profile end point', () => {
  it('when a valid token is provided but first_name is not in DB it returns status of 400', async () => {
    const res = await request(app).get('/api/v1/profile/Sam').set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(404);
  });
  it('when a valid token is provided and username is in DB it returns status of 200', async () => {
    const res = await request(app).get('/api/v1/profile/TestAdmin').set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(200);
  });
});

describe('testing updating a user profile end point', async () => {
  it('when a valid token is provided and invalid data is provided it should return status 400 ', async () => {
    const res = await request(app).patch('/api/v1/profile/update-profile').send(invalidData).set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(404);
  });
  it('when a valid token is provided and data provided it should return status 200 ', async () => {
    const res = await request(app).patch('/api/v1/profile/update-profile').send(validData).set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(200);
  });
});

describe('testing updating a password field in user profile end point', async () => {
  it('when a valid token is provided and invalid current password is provided it should return status 404 ', async () => {
    const res = await request(app)
      .patch('/api/v1/profile/change-password')
      .send({ current_password: 'invalidPasss', new_password: 'newPass1234' })
      .set('Authorization', `Bearer ${validUpdatedUserToken}`);
    expect(res).to.have.status(404);
  });

  it('when a valid token is provided and valid current password is provided it should return status 200 ', async () => {
    const res = await request(app)
      .patch('/api/v1/profile/change-password')
      .send({ current_password: validUser.password, new_password: 'newPass1234' })
      .set('Authorization', `Bearer ${validUpdatedUserToken}`);
    expect(res).to.have.status(200);
  });
});