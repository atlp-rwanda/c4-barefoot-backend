import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  adminCredentials, reqTest, testPerm, updateRole, deleteReq
} from './dummyData';

use(chaiHttp);
let User = '';

/* ------------------------test of GET /api/v1/admin/roles ------------------*/

describe('Testing the route of retrieving all roles', () => {
  it('should return all roles for success', async () => {
    User = await request(app).post('/api/v1/user/login').send(adminCredentials);

    const res = await request(app).get('/api/v1/admin/roles').set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('roles');
  });
});
/* ---------------test of POST /api/v1/admin/roles ------------*/

describe('Testing the route of creating a new role', () => {
  it('should return a success message for creating a role', async () => {
    const res = await request(app).post('/api/v1/admin/roles').send(reqTest).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Role created successfully');
  });

  it('should handle input validation', async () => {
    const res = await request(app).post('/api/v1/admin/roles').send({ role: 'test' }).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should return an error if the role exist', async () => {
    const res = await request(app).post('/api/v1/admin/roles').send(reqTest).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Role exist!');
  });
});

/* ----------------------test of PUT /api/v1/admin/roles/update ----------------*/

describe('Testing the route of updating roles permissions', () => {
  it('should return a success message on success update', async () => {
    const res = await request(app).put('/api/v1/admin/roles/update').send(testPerm).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('failed permissions');
    expect(res.body).to.have.property('success');
    expect(res.body.message).to.equal('Permissions updated successfully');
  });

  it('should should handle invalid input', async () => {
    const res = await request(app).put('/api/v1/admin/roles/update').send({ invalidTest: 'invalidTest' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });
  it('should should handle non existing roles', async () => {
    const res = await request(app).put('/api/v1/admin/roles/update').send({ role: 'notExist', permissions: { 'edit profile': 0 } }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.have.equal('Role not exist!');
  });
  it('should should handle non existing permissions', async () => {
    const res = await request(app).put('/api/v1/admin/roles/update').send({ role: 'test', permissions: { notExist: 0 } }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.have.property('message');
    expect(res.body.error).to.have.property('failed permissions');
    expect(res.body.error).to.have.property('success');
    expect(res.body.error.message).to.have.equal('These permissions or values are not allowed');
  });
  it('should should handle invalid permission values not 1 || 0', async () => {
    const res = await request(app).put('/api/v1/admin/roles/update').send({ role: 'test', permissions: { 'edit profile': 3 } }).set('Authorization', `Bearer ${User.body.data}`);

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

/* ------------------------test of DELETE /api/v1/admin/roles ------------------*/

describe('Testing the route of deleting a role', () => {
  it('should return a success message on success delete', async () => {
    const res = await request(app).delete('/api/v1/admin/roles').send({ role: 'test' }).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('role');
    expect(res.body.message).to.equal('Role deleted successfully');
  });

  it('should handle invalid input', async () => {
    const res = await request(app).delete('/api/v1/admin/roles').send({ invalid: 'invalidInput' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should return an error if the role does not exist', async () => {
    const res = await request(app).delete('/api/v1/admin/roles').send({ role: 'invalidRole' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Role not exist!');
  });
});

/* ------------------------test of GET /api/v1/admin/users ------------------*/

describe('Testing the route of retrieving all users', () => {
  it('should return all users for success', async () => {
    const res = await request(app).get('/api/v1/admin/users').set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('users');
  });
});

/* ----------------------- test of PUT /api/v1/admin/users----------------*/

describe("Testing how to update someone's role", () => {
  it('should update this user role', async () => {
    const res = await request(app).put('/api/v1/admin/users').send(updateRole.req).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal(`The user role is updated to ${updateRole.req.role}`);
  });

  it('should handle invalid data', async () => {
    const res = await request(app).put('/api/v1/admin/users').send({ invalid: 'invalid' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });
  it('should handle invalid non existing users', async () => {
    const res = await request(app).put('/api/v1/admin/users').send(updateRole.nonExistingUser).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });
  it('should handle invalid non existing roles', async () => {
    const res = await request(app).put('/api/v1/admin/users').send(updateRole.nonExistingRole).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });
});

/* ------------------------test of PUT /api/v1/admin/users/line-manager ------------------*/

// describe('Testing the route of assigning someone a line-manager', ()=>{

//     it('should return a message for success', async ()=>{
//         const res = await request(app).put('/api/v1/admin/users/line-manager').send(line_manager.req).set('Authorization',token);

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.equal('Line manager is assigned successfully');
//     });
//     it('should handle non existing Line managers', async ()=>{
//         const res = await request(app).put('/api/v1/admin/users/line-manager').send(line_manager.invalidManager).set('Authorization',token);

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(404);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body.error).to.equal('The line manager does not exist');
//     });
//     it('should handle non existing Users', async ()=>{
//         const res = await request(app).put('/api/v1/admin/users/line-manager').send(line_manager.invalidUser).set('Authorization',token);

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(404);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//         expect(res.body.error).to.equal('No user found!');
//     });
//     it('should handle invalid inputs', async ()=>{
//         const res = await request(app).put('/api/v1/admin/users/line-manager').send(line_manager.invalidInput).set('Authorization',token);

//         expect(res.type).to.equal('application/json');
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('error');
//     });

// });

/* ------------------------test of DELETE /api/v1/admin/users ------------------*/

describe('Testing the route of deleting a user', () => {
  it('should return a success message for success', async () => {
    const res = await request(app).delete('/api/v1/admin/users').send(deleteReq).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('The user is deleted successfully!');
  });
  it('should handle invalid input', async () => {
    const res = await request(app).delete('/api/v1/admin/users').send({ invalidInput: 'invalid Input' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should should handle non existing users', async () => {
    const res = await request(app).delete('/api/v1/admin/users').send({ email: 'invalidemail@gmail.com' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.have.equal('invalidemail@gmail.com does not exist!');
  });
});
