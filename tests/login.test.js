import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';
import { userToken } from './dummyData';

use(chaiHttp);
describe('AUTHENTICATION END-POINTS TESTING', () => {
  it('it not login without email', async () => {
    const res = await request(app).post('/api/v1/user/login').send({ password: '1234567890' });
    expect(res).to.have.status(400);
    expect(res).to.have.property('error');
  });
  it('it not login when email is invalid', async () => {
    const res = await request(app).post('/api/v1/user/login').send({ email: 'habajeunes2gmail.com' });
    expect(res).to.have.status(400);
    expect(res).to.have.property('error');
  });
  it('it should not login if email is not in database', async () => {
    const res = await request(app).post('/api/v1/user/login').send({ email: 'habajeun@gmail.com', password: '1234567890' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('You don\'t have an account with this email: habajeun@gmail.com');
  });
  it('it should log user in', async () => {
    const res = await request(app).post('/api/v1/user/login').send({ email: 'superadmin@gmail.com', password: 'Superadmin' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('login successful');
  });
});
describe('LOGOUT END-POINT TESTING', () => {
  it('it should logout the logged in user', async () => {
    const res = await request(app).post('/api/v1/user/logout').set('Authorization', `Bearer ${userToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Logout successful!');
  });
});
