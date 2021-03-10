import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  adminCredentials, reqTest, testPerm, updateRole, deleteReq
} from './dummyData';

const upRoleId = "0ce36391-2c08-3074-bddb-a4ea8cccbbc8";

use(chaiHttp);
let User = '';

/* ------------------------test of GET /api/v1/admin/roles ------------------*/

describe('ROLES END-POINTS TESTING', () => {
  it('should return all roles', async () => {
    User = await request(app).post('/api/v1/user/login').send(adminCredentials);
    const res = await request(app).get('/api/v1/admin/roles').set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('roles');
  });

  it('should create role', async () => {
    const res = await request(app).post('/api/v1/admin/roles').send(reqTest).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Role created successfully');
  });

  it('should validate role creation inputs', async () => {
    const res = await request(app).post('/api/v1/admin/roles').send({ role: 'test' }).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should not create role', async () => {
    const res = await request(app).post('/api/v1/admin/roles').send(reqTest).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Role exist!');
  });

  it('should update role', async () => {
    const res = await request(app).put('/api/v1/admin/role/update').send(testPerm).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('update successfully');
  });

  it('should validate role updates input', async () => {
    const res = await request(app).put('/api/v1/admin/role/update').send({ invalidTest: 'invalidTest' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should not update roles', async () => {
    const res = await request(app).put('/api/v1/admin/roles/update').send({ role: 'notExist', permissions: { 'edit profile': 0 } }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.have.equal('Role not exist!');
  });
  
  it('should not permit update action', async () => {
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

  it('should should handle invalid permission', async () => {
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

  it('should delete a role', async () => {
    const res = await request(app).delete('/api/v1/admin/roles').send({ role: 'test' }).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('role');
    expect(res.body.message).to.equal('Role deleted successfully');
  });

  it('should validate the deletion inputs input', async () => {
    const res = await request(app).delete('/api/v1/admin/roles').send({ invalid: 'invalidInput' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should not delete non-existing role', async () => {
    const res = await request(app).delete('/api/v1/admin/roles').send({ role: 'invalidRole' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Role not exist!');
  });
});


/* ------------------------test of GET /api/v1/admin/users ------------------*/

describe('USER END-POINTS TESTING', () => {

  const updateRoleData = {
    email: 'songachillethe1her@gmail.com',
    role: 'manager'
  }
  it('should return all users', async () => {
    const res = await request(app).get('/api/v1/admin/users').set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('users');
  });
  it('should update the role of the user', async () => {
    User = await request(app).post('/api/v1/user/login').send(adminCredentials);
    const res = await request(app).pu('/api/v1/admin/users').set('Authorization', `Bearer ${User.body.data}`).send(updateRoleData);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
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
  it('should should not update non-existing users', async () => {
    const res = await request(app).put('/api/v1/admin/users').send(updateRole.nonExistingUser).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });
  it('should not update with user with non-existing roles', async () => {
    const res = await request(app).put('/api/v1/admin/users').send(updateRole.nonExistingRole).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });
  it('should delete the user', async () => {
    const res = await request(app).delete('/api/v1/admin/users').send(deleteReq).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('The user is deleted successfully!');
  });
  it('should validate deletion inputs', async () => {
    const res = await request(app).delete('/api/v1/admin/users').send({ invalidInput: 'invalid Input' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should not delete non-existing user', async () => {
    const res = await request(app).delete('/api/v1/admin/users').send({ email: 'invalidemail@gmail.com' }).set('Authorization', `Bearer ${User.body.data}`);

    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.have.equal('invalidemail@gmail.com does not exist!');
  });
});
