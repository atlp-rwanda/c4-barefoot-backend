import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { verifiedUserToken, notManagerVerifiedUserToken } from './mockData';

use(chaiHttp);
describe('/api/v1/user/verified-users-manager', () => {
  it('It should not get managers if no token provided', async () => {
    const res = await request(app).get('/api/v1/assignUserstoManager/verified-users/managers?page=1');
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
  });
  it('It should not get managers if is not manager', async () => {
    const res = await request(app).get('/api/v1/assignUserstoManager/verified-users/managers?page=1').set('Authorization', `Bearer ${notManagerVerifiedUserToken}`);
    expect(res).to.have.status(409);
    expect(res.type).to.equal('application/json');
  });
  it('It should get managers', async () => {
    const res = await request(app).get('/api/v1/assignUserstoManager/verified-users/managers?page=1').set('Authorization', `Bearer ${verifiedUserToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  });
});
