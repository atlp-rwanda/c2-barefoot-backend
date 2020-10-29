import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import models from '../src/models';

use(chaiHttp);

describe('Testing signup route', () => {
  models.user.destroy({
    where: {},
    truncate: true
  });
  const user = {
    first_name: 'TestName',
    last_name: 'TestName',
    email: 'renedeolynda@gmail.com',
    password: 'pa13332335',
    address: 'Kigali',
    language: 'English',
    profile_picture: 'image.png'
  };

  it('Should save a new user', async () => {
    const res = await request(app).post('/signup').send(user);
    expect(res).to.have.status(201);
    expect(res.type).to.equal('application/json');
    expect(res.body.Message).to.equal(`User ${user.first_name} has been created. Check email for verification`);
  });

  it('Should not save user with identical email', async () => {
    const res = await request(app).post('/signup').send(user);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('Error');
  });
});

describe('Testing email verification', () => {
  const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjMMDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  it('Should\'nt update with invalid token', async () => {
    const res = await request(app).patch(`/verification/${invalidToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('Error');
    expect(res.body.Error).to.have.equal('Invalid token');
  });
});
