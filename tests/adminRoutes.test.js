import {use, request, expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import Roles from '../src/utils/roles';

use(chaiHttp);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwidXNlcl9yb2xlX2lkIjoiZWZhY2U0M2MtMmU0OS00NzNiLWJiZTItMzA1ZDFhNTE5MGYxIiwiaWF0IjoxNjA1MDE0NDU1LCJleHAiOjE2MDU2MTkyNTV9.k9hwTx7rvGIfv8MGqhVBCox0l6MEyA3ZBvZurk1Bh-4";

/*------------- test of GET /api/v1/admin/ ---------------*/

describe('Testing the welcome admin route', ()=>{
    it('should return a welcome message', async () =>{
        const res = await request(app).get('/api/v1/admin').set('Authorization',token);

        expect(res).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Welcome as an administrator of Barefoot nomad');
    });
});


/*------------------------test of GET /api/v1/admin/roles ------------------*/

describe('Testing the route of retrieving all roles', ()=>{
    it('should return all roles for success', async ()=>{
        const res = await request(app).get('/api/v1/admin/roles').set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('roles'); 
    });

});
/*---------------test of POST /api/v1/admin/roles ------------*/

describe('Testing the route of creating a new role', ()=>{
    const req = {
        "role":"test",
        "description":"this is a test"
    };
    it('should return a success message for success', async () => {
        const res= await request(app).post('/api/v1/admin/roles').send(req).set('Authorization',token);
        expect(res.type).to.equal('application/json');
        
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message'); 
        expect(res.body.message).to.equal('Role created successfully'); 

    });

    it ('should handle input validation', async ()=>{
        const res = await request(app).post('/api/v1/admin/roles').send({role:"test"}).set('Authorization',token);
        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
    });

    it('should return an error if the role exist', async () => {
        const res= await request(app).post('/api/v1/admin/roles').send(req).set('Authorization',token);
        expect(res.type).to.equal('application/json');
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error'); 
        expect(res.body.error).to.equal('Role exist!'); 

    });
});

/*----------------------test of PUT /api/v1/admin/roles/update ----------------*/


describe('Testing the route of updating roles permissions', ()=>{
    const req = { role:"test", permissions:{ "edit profile":0}};
    it('should return a success message on success update', async ()=>{
        const res = await request(app).put('/api/v1/admin/roles/update').send(req).set('Authorization',token);
        expect(res.type).to.equal('application/json');

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('failed permissions');
        expect(res.body).to.have.property('success');
        expect(res.body.message).to.equal('Permissions updated successfully');
    });

    it('should should handle invalid input', async () =>{
        const res = await request(app).put('/api/v1/admin/roles/update').send({invalidTest:'invalidTest'}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
    });
    it('should should handle non existing roles', async () =>{
        const res = await request(app).put('/api/v1/admin/roles/update').send({ role:"notExist", permissions:{ "edit profile":0}}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.equal('Role not exist!');
    });
    it('should should handle non existing permissions', async () =>{
        const res = await request(app).put('/api/v1/admin/roles/update').send({ role:"test", permissions:{ "notExist":0}}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('message');
        expect(res.body.error).to.have.property('failed permissions');
        expect(res.body.error).to.have.property('success');
        expect(res.body.error.message).to.have.equal('These permissions or values are not allowed');
    });
    it('should should handle invalid permission values not 1 || 0', async () =>{
        const res = await request(app).put('/api/v1/admin/roles/update').send({ role:"test", permissions:{ "edit profile":3}}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('message');
        expect(res.body.error).to.have.property('failed permissions');
        expect(res.body.error).to.have.property('success');
        expect(res.body.error.message).to.have.equal('These permissions or values are not allowed');
    });


});


/*------------------------test of DELETE /api/v1/admin/roles ------------------*/

describe('Testing the route of deleting a role', ()=>{
    const req = {
        "role":"test"
    };

    it('should return a success message on success delete', async ()=>{
        const res = await request(app).delete('/api/v1/admin/roles').send(req).set('Authorization',token);
        expect(res.type).to.equal('application/json');

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('role');
        expect(res.body.message).to.equal('Role deleted successfully');
    });

    it ('should handle invalid input', async ()=>{
        const res = await request(app).delete('/api/v1/admin/roles').send({invalid:"invalidInput"}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
    });

    it('should return an error if the role does not exist', async () => {
        const res= await request(app).delete('/api/v1/admin/roles').send({role:"invalidRole"}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error'); 
        expect(res.body.error).to.equal('Role not exist!'); 

    });
});


/*------------------------test of GET /api/v1/admin/users ------------------*/

describe('Testing the route of retrieving all users', ()=>{
    it('should return all users for success', async ()=>{
        const res = await request(app).get('/api/v1/admin/users').set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('users'); 
    });

});

/*----------------------- test of PUT /api/v1/admin/users----------------*/

describe("Testing how to update someone's role",()=>{
    const req ={
        email:'sequester@gmail.com',
        role:'manager'
    };
    const nonExistingUser ={
        email:'notexist@gmail.com',
        role:'manager'
    };
    const nonExistingRole ={
        email:'sequester@gmail.com',
        role:'notExistRole'
    };
    it('should update this user role', async ()=>{
        const res = await request(app).put('/api/v1/admin/users').send(req).set('Authorization',token);
        
        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(`The user role is updated to ${req.role}`);
    });

    it('should handle invalid data', async ()=>{
        const res = await request(app).put('/api/v1/admin/users').send({invalid:'invalid'}).set('Authorization',token);
        
        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
    });
    it('should handle invalid non existing users', async ()=>{
        const res = await request(app).put('/api/v1/admin/users').send(nonExistingUser).set('Authorization',token);
        
        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
    });
    it('should handle invalid non existing roles', async ()=>{
        const res = await request(app).put('/api/v1/admin/users').send(nonExistingRole).set('Authorization',token);
        
        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
    });
});

/*------------------------test of PUT /api/v1/admin/users/line-manager ------------------*/

describe('Testing the route of assigning someone a line-manager', ()=>{
    const req = { email: "sequester@gmail.com", manager_id:Roles.LINE_MANAGER};
    const invalidManager = { email:"sequester@gmail.com", manager_id: Roles.MANAGER};
    const invalidUser = {email : "invalidUser@gmail.com", manager_id: Roles.LINE_MANAGER};
    const invalidInput = {email:"invalidInput@gmail.com", manager_id: "123456"};
    it('should return a message for success', async ()=>{
        const res = await request(app).put('/api/v1/admin/users/line-manager').send(req).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message'); 
        expect(res.body.message).to.equal('Line manager is assigned successfully'); 
    });
    it('should handle non existing Line managers', async ()=>{
        const res = await request(app).put('/api/v1/admin/users/line-manager').send(invalidManager).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error'); 
        expect(res.body.error).to.equal('The line manager does not exist'); 
    });
    it('should handle non existing Users', async ()=>{
        const res = await request(app).put('/api/v1/admin/users/line-manager').send(invalidUser).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error'); 
        expect(res.body.error).to.equal('No user found!'); 
    });
    it('should handle invalid inputs', async ()=>{
        const res = await request(app).put('/api/v1/admin/users/line-manager').send(invalidInput).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error'); 
    });
    
});

/*------------------------test of DELETE /api/v1/admin/users ------------------*/

describe('Testing the route of deleting a user', ()=>{
    const req={email:"sequester@gmail.com"};
    it('should return a success message for success', async ()=>{
        const res = await request(app).delete('/api/v1/admin/users').send(req).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message'); 
        expect(res.body.message).to.equal('The user is deleted successfully!'); 
    });
    it('should handle invalid input', async ()=>{
        const res = await request(app).delete('/api/v1/admin/users').send({invalidInput:"invalid Input"}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error'); 
    });

    it('should should handle non existing users', async () =>{
        const res = await request(app).delete('/api/v1/admin/users').send({email:"invalidemail@gmail.com"}).set('Authorization',token);

        expect(res.type).to.equal('application/json');
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.equal(`invalidemail@gmail.com does not exist!`);
    });

});


