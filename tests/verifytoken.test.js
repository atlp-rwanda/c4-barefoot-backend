// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmVuZWRlb2x5bmRhQGdtYWlsLmNvbSIsImlhdCI6MTYwNDU5MjA0M30.X64jqDxrB2uWHIVRv6n4kn1mrpIHLByo8-sycJ8JBWY';
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicmVuZWRlb0BnbWFpbC5jb20iLCJpYXQiOjE2MDQ1OTIwOTB9.SX6Qo-XGqdAXV8HZuwZZVr5JmoDMiQe-MM9PETq1o0I';
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
