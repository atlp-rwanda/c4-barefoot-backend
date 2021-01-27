// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';
import { validDataToken } from './dummyData';

const user = {
  email: 'mj@gmail.com',
  password: 'manager1'
}

use(chaiHttp);
describe('USERS END-POINT TESTING', async () => {
  it('when a valid token is provided and page number is bigger it returns status of 404', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).get('/api/v1/user/all-users?page=9').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(404);
  });
  it('when a valid token is provided and page number is 0 or its null it returns status of 500', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).get('/api/v1/user/all-users?page=0').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(500);
  });
  it('when a valid token is provided and page number is correct it returns status of 200', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).get('/api/v1/user/all-users?page=1').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
  });
});
