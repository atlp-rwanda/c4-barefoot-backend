// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { validData, invalidData, validToken } from './dummyData';

use(chaiHttp);

describe('USER PROFILE END-POINTS TESTING', () => {
  it('Should not get user profile', async () => {
    const res = await request(app).get('/api/v1/profile/Sam').set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(404);
  });
  it('should get user profile', async () => {
    const res = await request(app).get('/api/v1/profile/TestAdmin').set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(200);
  });
  it('should not update the user profile', async () => {
    const res = await request(app).patch('/api/v1/profile/update-profile').send(invalidData).set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(404);
  });
  it('should update the user profile', async () => {
    const res = await request(app).patch('/api/v1/profile/update-profilenpm').send(validData).set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(200);
  });
});

