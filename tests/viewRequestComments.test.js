import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);
describe('REQUEST COMMENT ENDPOINTS TESTING', () => {
  const user = {
    email: 'sequester@gmail.com',
    password: 'password',
  };
  it('Should get travel requests comments', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .get('/api/v1/comment')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
  it('Should get a single travel requests comment', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .get('/api/v1/comment/0ce36391-2c08-3074-bddb-a4ea8cccbbc5')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
