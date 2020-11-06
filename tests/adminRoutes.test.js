import {use, request, expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

use(chaiHttp);

/*------------- test of GET admin/ ---------------*/

describe('Testing the welcome admin route', ()=>{
    it('should return a welcome message', async () =>{
        const res = await request(app).get('/api/v1/admin');

        expect(res).to.have.status(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Welcome as an administrator of Barefoot nomad');
    });
});


/*------------------------test of GET /api/v1/admin/roles ------------------*/

describe('Testing the route of retrieving all roles', ()=>{
    it('should return all roles for success',  ()=>{
        const res = request(app).get('/api/v1/admin/roles');

        // expect(res.type).to.equal('application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('roles'); 
    });

});
/*---------------test of POST admin/roles ------------*/

// describe('Testing the route of creating a new role', ()=>{
//     const req = {
//         "role":"test",
//         "description":"this is a test"
//     };
//     it('should return a success message for success', async () => {
//         const res= await request(app).post('/admin/roles').send(req);
//         expect(res.type).to.equal('application/json');
        
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message'); 
//         expect(res.body.message).to.equal('Role created successfully'); 

//     });

//     it ('should handle input validation', async ()=>{
//         const res = await request(app).post('/admin/roles').send({role:"test"});
//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.have.property('stack');
//     });

//     it('should return an error if the role exist', async () => {
//         const res= await request(app).post('/admin/roles').send(req);
//         expect(res.type).to.equal('application/json');
        
//         expect(res).to.have.status(401);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error'); 
//         expect(res.body).to.have.property('stack'); 
//         expect(res.body.error).to.equal('Role exist!'); 

//     });
// });

// /*----------------------test of POST /admin/roles/update ----------------*/


// describe('Testing the route of updating roles permissions', ()=>{
//     const req = { role:"test", permissions:{ "edit profile":0}};
//     it('should return a success message on success update', async ()=>{
//         const res = await request(app).post('/admin/roles/update').send(req);
//         expect(res.type).to.equal('application/json');

//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('failed permissions');
//         expect(res.body).to.have.property('success');
//         expect(res.body.message).to.equal('Permissions updated successfully');
//     });

//     it('should should handle invalid input', async () =>{
//         const res = await request(app).post('/admin/roles/update').send({invalidTest:'invalidTest'});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.have.property('stack');
//     });
//     it('should should handle non existing roles', async () =>{
//         const res = await request(app).post('/admin/roles/update').send({ role:"notExist", permissions:{ "edit profile":0}});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(401);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.have.property('stack');
//         expect(res.body.error).to.have.equal('Role not exist!');
//     });
//     it('should should handle non existing permissions', async () =>{
//         const res = await request(app).post('/admin/roles/update').send({ role:"test", permissions:{ "notExist":0}});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.have.property('stack');
//         expect(res.body.error).to.have.property('message');
//         expect(res.body.error).to.have.property('failed permissions');
//         expect(res.body.error).to.have.property('success');
//         expect(res.body.error.message).to.have.equal('These permissions or values are not allowed');
//     });
//     it('should should handle invalid permission values not 1 || 0', async () =>{
//         const res = await request(app).post('/admin/roles/update').send({ role:"test", permissions:{ "edit profile":3}});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.have.property('stack');
//         expect(res.body.error).to.have.property('message');
//         expect(res.body.error).to.have.property('failed permissions');
//         expect(res.body.error).to.have.property('success');
//         expect(res.body.error.message).to.have.equal('These permissions or values are not allowed');
//     });


// });


// /*------------------------test of DELETE /admin/roles ------------------*/

// describe('Testing the route of creating a new role', ()=>{
//     const req = {
//         "role":"test"
//     };

//     it('should return a success message on success delete', async ()=>{
//         const res = await request(app).delete('/admin/roles').send(req);
//         expect(res.type).to.equal('application/json');

//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('roles');
//         expect(res.body.message).to.equal('Role deleted successfully');
//     });

//     it ('should handle invalid input', async ()=>{
//         const res = await request(app).delete('/admin/roles').send({invalid:"invalidInput"});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.have.property('stack');
//     });

//     it('should return an error if the role does not exist', async () => {
//         const res= await request(app).delete('/admin/roles').send({role:"invalidRole"});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(401);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error'); 
//         expect(res.body).to.have.property('stack'); 
//         expect(res.body.error).to.equal('Role not exist!'); 

//     });
// });


// /*------------------------test of GET /admin/users ------------------*/

// describe('Testing the route of retrieving all users', ()=>{
//     it('should return all users for success', async ()=>{
//         const res = await request(app).get('/admin/users');

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('users'); 
//     });

// });


// /*------------------------test of DELETE /admin/users ------------------*/

// describe('Testing the route of deleting a user', ()=>{
//     const req={email:"rene@gmail.com"};
//     it('should return a success message for success', async ()=>{
//         const res = await request(app).delete('/admin/users').send(req);

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message'); 
//         expect(res.body.message).to.equal('The user is deleted successfully!'); 
//     });
//     it('should handle invalid input', async ()=>{
//         const res = await request(app).delete('/admin/users').send({invalidInput:"invalid Input"});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error'); 
//         expect(res.body).to.have.property('stack');
//     });

//     it('should should handle non existing users', async () =>{
//         const res = await request(app).delete('/admin/users').send({email:"invalidemail@gmail.com"});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(500);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body).to.have.property('stack');
//         expect(res.body.error).to.have.equal('User not deleted! Try again');
//     });

// });



// /*------------------------test of DELETE /admin/user ------------------*/

// describe('Testing the route that requires permissions', ()=>{
//     const req = { role: "test2", task:"edit profile"};
//     it('should return a message for success', async ()=>{
//         const res = await request(app).delete('/admin/user').send(req);

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message'); 
//         expect(res.body.message).to.equal('Allowed to test this endpoint!'); 
//     });
//     it('should handle non existing roles', async ()=>{
//         const res = await request(app).delete('/admin/user').send({role:"testing",task:"edit profile"});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(403);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error'); 
//         expect(res.body).to.have.property('stack'); 
//         expect(res.body.error).to.equal('Access denied, not allowed!'); 
//     });
//     it('should handle non existing permissions', async ()=>{
//         const res = await request(app).delete('/admin/user').send({role:"test2",task:"notExist profile"});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(403);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error'); 
//         expect(res.body).to.have.property('stack'); 
//         expect(res.body.error).to.equal('Access denied, permission does not exist!'); 
//     });
//     it('should handle no permissions allowed', async ()=>{
//         const res = await request(app).delete('/admin/user').send({role:"test2",task:"delete locations"});

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(403);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error'); 
//         expect(res.body).to.have.property('stack'); 
//         expect(res.body.error).to.equal("You don't have permissions to perform this task"); 
//     });

// });
