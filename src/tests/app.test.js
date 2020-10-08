import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
describe('testing welcome router', () => {
  it('Should get welcome message', async () => {
    const res = await request(app).get('/');
    expect(res).to.have.status([200]);
    expect(res.text).to.equal('Welcome to Barefoot Nomad');
  });
});
