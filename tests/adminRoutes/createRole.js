import {use, request, exptect, expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

use(chaiHttp);


/*---------------test of POST admin/roles ------------*/

describe('Testing the route of creating a new role', ()=>{
    const req = {
        "role":"test",
        "description":"this is a test"
    };
    // it('should return a success message for success', async () => {
    //     const res= await request(app).post('/admin/roles').send(req);
    //     expect(res.type).to.equal('application/json');
        
    //     // console.log('response=', res);
    //     expect(res).to.have.status(201);
    //     expect(res.body).to.have.property('status');
    //     expect(res.body).to.have.property('message'); 
    //     expect(res.body.message).to.equal('Role created successfully'); 

    // });

    it ('should handle input validation', async ()=>{
        const res = await request(app).post('/admin/roles').send({role:"test"});
        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('stack');
    });

    it('should return an error if the role exist', async () => {
        const res= await request(app).post('/admin/roles').send(req);
        expect(res.type).to.equal('application/json');
        
        // console.log('response=', res);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error'); 
        expect(res.body).to.have.property('stack'); 
        expect(res.body.error).to.equal('Role exist!'); 

    });
});