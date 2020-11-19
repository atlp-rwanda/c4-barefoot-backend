import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);
describe('Travel Requests', () => {
  const user = {
    email: 'sequester@gmail.com',
    password: 'password',
  };
  it('Should not get direct travel request if not token has expired', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8';
    const res = await request(app)
      .get('/api/v1/directReports/')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.deep.property('message').equals('session has expired, please login');
  });
  it('Should not get direct travel request if you are not an approved manager', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .get('/api/v1/directReports/')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(403);
    expect(res.body).to.have.deep.property('error').equals(`You don't have permissions to [view direct reports travel requests]`);
  });
});
