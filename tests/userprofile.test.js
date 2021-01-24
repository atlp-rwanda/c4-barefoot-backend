// test get user profile end points
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { validData, invalidData, validToken, userProfileUpdate } from './dummyData';

use(chaiHttp);

const user = {
  email: 'sequester@gmail.com',
  password: 'password'
}


describe('USER PROFILE END-POINTS TESTING', () => {
  it('Should not get user profile', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).get('/api/v1/profile/UnexistUser').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(404);
  });
  it('should get user profile', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).get('/api/v1/profile/TestUserOne').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
  });
  it('should not update the user profile', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).patch('/api/v1/profile/update-profile').set('Authorization', `Bearer ${User.body.data}`).send(invalidData);
    expect(res).to.have.status(404);
  });
  it('should update the user profile', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).patch('/api/v1/profile/update-profile').set('Authorization', `Bearer ${User.body.data}`).send(validData);
    expect(res).to.have.status(200);
  });
});
