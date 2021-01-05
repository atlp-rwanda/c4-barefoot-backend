import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { verifiedUserToken } from './mockData';

use(chaiHttp);
describe('VERIFIED USER END-POINT TESTING', () => {
  it('should not view all verified users if no token provided', async () => {
    const res = await request(app).get('/api/v1/assignUserstoManager/verified-users?page=1');
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
    // expect(res.body).to.have.property('error');
  });
  it('should view all verified users', async () => {
    const res = await request(app).get('/api/v1/assignUserstoManager/verified-users?page=1').set('Authorization', `Bearer ${verifiedUserToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
  });
});
