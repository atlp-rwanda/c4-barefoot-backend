import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  validUser, invalidUser, validToken, invalidToken
} from './dummyData';
import models from '../src/models';


const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiNDU0Mjk4MzctZWQyYy00MzVkLWJjMjItYWQ5YzVkYmUzNzgyIiwidXNlcm5hbWUiOiJyZXF1ZXN0ZXJPbmUiLCJpYXQiOjE2MTAwMjUxNDQsImV4cCI6MTYxMDYyOTk0NH0.I02xNm4iD2dM0GW4fUXw98Mcmyx0K_AQIORsZ5fMOFk";

use(chaiHttp);
describe('SIGNUP END-POINTS TESTNG', () => {

  it('Should save a new user', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(validUser);
    expect(res).to.have.status(201);
    expect(res.type).to.equal('application/json');
  });

  it('Should not save user with identical email', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(validUser);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
  });

  it('Should not save a user with signup data', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(invalidUser);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body).to.have.property('status');
    expect(res.body.status).to.equal(400);
  });
  it('Should\'nt update with invalid token', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/`).set('Authorization',`Bearer ${invalidToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Invalid token');
  });
  it('Should update email verification with valid token', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/?token=${tokenTest}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  }, 30000);
});
