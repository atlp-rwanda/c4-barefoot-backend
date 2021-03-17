import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { verifiedUserToken, testToken } from './mockData';

use(chaiHttp);
describe('VERIFIED USERS TESTINGS', () => {
  it('It should not get notifications if no token provided', async () => {
    const res = await request(app).get('/api/v1//notification/notifications');
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
  });
  it('It should get managers', async () => {
    const res = await request(app).get('/api/v1//notification/notifications').set('Authorization', `Bearer ${testToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
  });
});
