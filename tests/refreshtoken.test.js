import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';
import validToken from './dummyData';

use(chaiHttp);

const user = {
  email: 'sequester@gmail.com',
  password: 'password'
}


describe('REFREST TOKEN END-POINT TESTING', () => {
  it('it should not refresh token if no cookies', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).post('/api/v1/user/refresh-token').set('Authorization' ,`Bearer ${User.body.data}`);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Please login!');
  });
});
