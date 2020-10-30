import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);
describe('authentication', () => {
  const user = {
    email: 'habajeunes2@gmail.com',
    password: '1234567890'
  };
  const userToken = jwt.sign(user, process.env.TOKEN_SECRET);

  it('it not login without email', async () => {
    const res = await request(app).post('/login').send({ password: '1234567890' });
    expect(res).to.have.status(400);
    expect(res).to.have.property('error');
  });
  it('it not login when email is invalid', async () => {
    const res = await request(app).post('/login').send({ email: 'habajeunes2gmail.com' });
    expect(res).to.have.status(400);
    expect(res).to.have.property('error');
  });
  it('it should not login if email is not in database', async () => {
    const res = await request(app).post('/login').send({ email: 'habajeun@gmail.com', password: '1234567890' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('You don\'t have an accoutn with this email: habajeun@gmail.com');
  });
  // it('it should not login if email is not verified', async () => {
  //   const res = await request(app).post('/login').send({ email: 'habajeune1@gmail.com', password: '1234567890' });
  //   expect(res).to.have.status(403);
  //   expect(res.body).to.have.property('error');
  //   expect(res.body.error).to.equal('Please verify your email first');
  // });
  it('it login whith incorrect password', async () => {
    const res = await request(app).post('/login').send({ email: 'habajeunes2@gmail.com', password: '123456789' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Password incoreect');
  });
});
describe('/logout', () => {
  const user = {
    email: 'habajeunes2@gmail.com',
    password: '1234567890'
  };
  const userToken = jwt.sign(user, process.env.TOKEN_SECRET);
  it('it should logout user', async () => {
    const res = await request(app).post('/logout').set('Authorization', `Bearer ${userToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Logout successful!');
  });
});
