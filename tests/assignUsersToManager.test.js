import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { verifiedUserToken, notManagerVerifiedUserToken } from './mockData';

use(chaiHttp);
describe('/api/v1/user/verified-users/:id', () => {
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
  it('It should not assign user to managers if is not manager', async () => {
    const res = await request(app).patch('/api/v1/assignUserstoManager/verified-users/122a0d86-8b78-4bb8-b28f-8e5f7811c456').set('Authorization', `Bearer ${notManagerVerifiedUserToken}`);
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
  });
  it('It should not assign user to managers if user is not exist', async () => {
    const res = await request(app).patch('/api/v1/assignUserstoManager/verified-users/122a0d86-8b78-4bb8-b28f-8e5f7811c4').send({ manager_id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c' }).set('Authorization', `Bearer ${verifiedUserToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  });
  it('It should assign user to managers', async () => {
    const res = await request(app).patch('/api/v1/assignUserstoManager/verified-users/122a0d86-8b78-4bb8-b28f-8e5f7811c456').send({ manager_id: '38eb202c-3f67-4eed-b7ac-9c31bc226e0c' }).set('Authorization', `Bearer ${verifiedUserToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  });
});
