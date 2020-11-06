import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import models from '../src/models';

use(chaiHttp);

const user = {
  first_name: 'TestName',
  last_name: 'TestName',
  email: 'renedeolynda@gmail.com',
  username: 'TestName1212',
  occupation: 'TestName1212',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

const invalidUser = {
  first_name: 'TestName',
  last_name: 'TestName',
  email: '123',
  username: 'TestName1212',
  occupation: 'TestName1212',
  password: 'pa13332335',
  address: 'Kigali',
  language: 'English',
  profile_picture: 'image.png'
};

describe('Testing signup route', () => {
  models.user.destroy({
    where: {},
    truncate: true
  });

  it('Should save a new user', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(user);
    console.log(res.body);
    expect(res).to.have.status(201);
    expect(res.type).to.equal('application/json');
    expect(res.body.Message).to.equal(`User ${user.first_name} has been created. Check email for verification`);
  });

  it('Should not save user with identical email', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(user);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
  });

  it('Should\'nt save a user with invalid/incomplete data', async () => {
    const res = await request(app).post('/api/v1/user/signup').send(invalidUser);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body).to.have.property('status');
    expect(res.body.status).to.equal(400);
  });
});

describe('Testing email verification', () => {
  const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjMMDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  it('Should\'nt update with invalid token', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/${invalidToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Invalid token');
  });

  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmVuZWRlb2x5bmRhQGdtYWlsLmNvbSIsImlhdCI6MTYwMzk3ODk3NX0.9JQj9YxHtXFLZHojzLSOhzxCMwisml7Pr2ynT-vhiL8';
  it('Should update email verification with valid token', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/${validToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body.Message).to.equal('Email has been verified');
  });

  it('Shouldn\'nt verify more than once', async () => {
    const res = await request(app).patch(`/api/v1/user/verification/${validToken}`);
    expect(res).to.have.status(400);
    expect(res.type).to.equal('application/json');
    expect(res.body.error).to.equal('Account already verified');
  });
});
