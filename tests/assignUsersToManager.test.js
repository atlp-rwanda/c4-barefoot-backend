import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { validUser, verifiedUserToken, notManagerVerifiedUserToken } from './mockData';


const user = {
  email: 'mj@gmail.com',
  password: 'manager1'
}

use(chaiHttp);
describe('ASSIGNING THE USER TO THE MANAGER TESTING', () => {
  it('It should not assign user to managers if no token provided', async () => {
    const res = await request(app).patch('/api/v1/assignUserstoManager/verified-users/122a0d86-8b78-4bb8-b28f-8e5f7811c456');
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
  });
  it('It should not assign user to managers if is no manager id provided', async () => {
    const res = await request(app).patch('/api/v1/assignUserstoManager/verified-users/122a0d86-8b78-4bb8-b28f-8e5f7811c456').set('Authorization', `Bearer ${verifiedUserToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
  });
  it('It should not assign user to managers if provided ID is not for manager', async () => {
    const res = await request(app).patch('/api/v1/assignUserstoManager/verified-users/122a0d86-8b78-4bb8-b28f-8e5f7811c456').set('Authorization', `Bearer ${notManagerVerifiedUserToken}`);
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
  });
  it('It should not assign user to managers', async () => {
    const res = await request(app).patch('/api/v1/assignUserstoManager/verified-users/122a0d86-8b78-4bb8-b28f-8e5f7811c4').send({ manager_id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c' }).set('Authorization', `Bearer ${verifiedUserToken}`);
    expect(res).to.have.status(500);
    expect(res.type).to.equal('application/json');
  });
  it('It should assign user to managers', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user)
    const res = await request(app).patch(`/api/v1/assignUserstoManager/verified-users/83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc`).send({ manager_id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5' }).set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  });
});
