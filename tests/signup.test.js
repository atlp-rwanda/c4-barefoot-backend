import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  validUser, invalidUser, validToken, invalidToken
} from './dummyData';

use(chaiHttp);
describe('SIGNUP END-POINTS TESTNG', () => {
  it('Should save a new user', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(validUser);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  });

  it('Should not save user with identical email', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(validUser);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
  });

<<<<<<< HEAD
  it('Should\'nt save a user with invalid/incomplete data', async () => {
=======
  it('Should not save a user with signup data', async () => {
>>>>>>> main
    const res = await request(app).post('/api/v1/user/signup').send(invalidUser);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body).to.have.property('status');
    expect(res.body.status).to.equal(400);
  });
<<<<<<< HEAD
});

describe('Testing email verification', () => {
=======
>>>>>>> main
  it('Should\'nt update with invalid token', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/?token=${invalidToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Invalid token');
  });

<<<<<<< HEAD
  it('Should update email verification with valid token', async () => {
=======
  it('Should update verify the email with valid token', async () => {
>>>>>>> main
    const res = await request(app).patch(`/api/v1/user/verification/?token=${validToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  }, 30000);
<<<<<<< HEAD

  // it('Shouldn\'nt verify more than once', async () => {
  //   const res = await request(app).patch(`/api/v1/user/verification/?token=${validToken}`);
  //   expect(res).to.have.status(400);
  //   expect(res.type).to.equal('application/json');
  // }, 30000);
=======
>>>>>>> main
});
