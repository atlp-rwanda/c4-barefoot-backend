import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);
describe('TRAVEL REQUESTS', () => {
  const user = {
    email: 'sequester@gmail.com',
    password: 'password',
  };
  it('Should not get direct travel request if you are not logged in',async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiNzI1NGE5ZTctMmUxYi00ZjgzLWFkNzMtNzhiOTBkZDNkZjc3IiwidXNlcm5hbWUiOiJtYW5hZ2VyT25lIiwiaWF0IjoxNjExNTAyNTUzLCJleHAiOjE2MTIxMDczNTN9.iy6QJMfp2GZvtO_KpMIAeCP2RPeyq-jcSr46Bqolxgk';
    const res = await request(app)
      .get('/api/v1/directReports/')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.deep.property('message').equals('You are not loged in');
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
