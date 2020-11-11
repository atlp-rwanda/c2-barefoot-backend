import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

use(chaiHttp);
describe('view verified users /api/v1/user/verified-users', () => {
  it('should view all verified users', async () => {
    const res = await request(app).get('/api/v1/user/verified-users');
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('verified users');
  });
});
