// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../src/app';

use(chaiHttp);
const token = process.env.Test_Token_Secret;
const data = {
  first_name: 'Mugabo',
  last_name: 'Deo',
  password: 'pass',
  address: 'Kigali',
  language: 'French',
  occupation: 'Software developer',
  profile_picture: 'hey.png'
};
describe('testing of token verifcation middleware', () => {
  it('when no token provided it should throw authorization error', async () => {
    const res = await request(app).get('/api/v1/mdeo1');
    expect(res).to.have.status(404);
  });
  it('when invalid token is provided it should throw authorization error', async () => {
    const res = await request(app).get('/api/v1/mdeo1').set('Authorization', `Bearer ${token}1`);
    expect(res).to.have.status(500);
  });
});

describe('testing getting all users end point', async () => {
  it('when a valid token is provided and page number is bigger it returns status of 404', async () => {
    const res = await (await request(app).get('/api/v1/users?page=5').set('Authorization', `Bearer ${token}`));
    expect(res).to.have.status(404);
  });
  it('when a valid token is provided and page number is 0 or its null it returns status of 404', async () => {
    const res = await (await request(app).get('/api/v1/users?page=0').set('Authorization', `Bearer ${token}`));
    expect(res).to.have.status(500);
  });
  it('when a valid token is provided and page number is true it returns status of 200', async () => {
    const res = await (await request(app).get('/api/v1/users?page=1').set('Authorization', `Bearer ${token}`));
    expect(res).to.have.status(200);
  });
});

describe('testing getting a single user profile end point', () => {
  it('when a valid token is provided but first_name params is not in DB it returns status of 404', async () => {
    const res = await request(app).get('/api/v1/Sam').set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(404);
  });
  it('when a valid token is provided  and first_name params is in DB it returns status of 200', async () => {
    const res = await request(app).get('/api/v1/InezaB').set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
  });
});

describe('testing getting updating a single user profile end point', async () => {
  it('when token is provided but no data it should return status 500 ', async () => {
    const res = await request(app).patch('/api/v1/update-profile').set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
  });
  it('when a valid token is provided and no data provided it should return status 200 ', async () => {
    const res = await request(app).patch('/api/v1/update-profile').send(data).set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
  });
});
