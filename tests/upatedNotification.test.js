import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { testToken } from './mockData';

use(chaiHttp);
describe('NOTIFICATIONS END-POINTS TESTING', () => {
  it('It should not update notifications if no token provided', async () => {
    const res = await request(app).patch('/api/v1/notification/notifications/d5e63e3b-3a7b-4e23-9855-8250e93124aa');
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
  });
  it('It should not update notification', async () => {
    const res = await request(app).patch('/api/v1/notification/notifications/d5e63e3b-3a7b-4e23-9855-8250e93124aa').set('Authorization', `Bearer ${testToken}`);
    console.log(res.body);
    expect(res).to.have.status(404);
    expect(res.type).to.equal('application/json');
  });
});
