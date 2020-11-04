import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);

describe('api/v1/refreshtoken', () => {
  // it('it should not refresh token if no cookies', async () => {
  //   const res = await request(app).post('/refresh-token');
  //   expect(res).to.have.status(400);
  //   expect(res.body).to.have.property('error');
  //   expect(res.body.error).to.equal('no token in cookie');
  // });
  // it('it should refresh token if there are cookies', async () => {
  //   const userToken = jwt.sign({
  //     id: 1, first_name: 'ami', last_name: 'joseph', email: 'habajeunes2@gmail.com', address: 'kigali', language: 'english', profile_picture: 'ami.png'
  //   }, process.env.TOKEN_SECRET, { expiresIn: '2h' });

  //   const res = await request(app).post('/api/v1/user/refresh-token').set('Cookie', `make=${userToken}`);
  //   expect(res).to.have.status(200);
  //   expect(res.body).to.have.property('userToken');
  // });
});
