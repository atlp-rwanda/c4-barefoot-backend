// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

use(chaiHttp);
const token = process.env.Test_Token_Secret;
const invalidToken = process.env.Test_invalidToken_Secret;
describe('testing of token verifcation middleware', () => {
  it('when no token provided it should throw authorization error', async () => {
    const res = await request(app).get('/api/v1/TestName1212');
    expect(res).to.have.status(401);
  });
  it('when invalid token is provided it should throw authorization error', async () => {
    const res = await request(app).get('/api/v1/TestName1212').set('Authorization', `Bearer ${token}1`);
    expect(res).to.have.status(500);
  });
  it('when valid token is provided but data in token is invalid it should throw authorization error', async () => {
    const res = await request(app).get('/api/v1/TestName1212').set('Authorization', `Bearer ${invalidToken}`);
    expect(res).to.have.status(400);
  });
});
