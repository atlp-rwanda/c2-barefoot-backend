import {use, request, exptect, expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

use(chaiHttp);

/*------------- test of GET admin/ ---------------*/

describe('Testing the welcome admin route', ()=>{
    it('should return a welcome message', async () =>{
        const res = await request(app).get('/admin');

        expect(res).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Welcome as an admin');
    });
});