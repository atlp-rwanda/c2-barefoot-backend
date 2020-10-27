import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
// import db from '../src/config/connection';
import models from '../src/models';

use(chaiHttp);
describe('authentication', () => {
  const user = {
    email: 'habajeunes2@gmail.com',
    password: '1234567890'
  };
  //   beforeEach(async () => {
  //     db.authenticate()
  //       .then(() => console.log('Database connected...'))
  //       .catch((err) => console.log(`Error: ${err}`));

  //     await models.user.destroy();
  //     await models.user.save();
  //   });
  it('it not login without email', async () => {
    const res = await request(app).post('/api/v1/login').send({ password: '1234567890' });
    expect(res).to.have.status([400]);
    expect(res).to.have.property('error');
  });
  it('it not login when email is invalid', async () => {
    const res = await request(app).post('/api/v1/login').send({ email: 'habajeunes2gmail.com' });
    expect(res).to.have.status([400]);
    expect(res).to.have.property('error');
  });
  it('it not login when email is not exist in database', async () => {
    const res = await request(app).post('/api/v1/login').send({ email: 'habajeunes2@gmail.com', password: '1234567890' });
    expect(res).to.have.status([200]);
    expect(res).to.have.property('message');
  });
});
