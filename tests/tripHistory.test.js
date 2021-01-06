import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);

describe('Trip History', () => {
  const requester = {
    email: "shumbushoedgar@gmail.com",
    password: "1234567se"
  }
  const requester2 = {
    email: "shumbushedgar@gmail.com",
    password: "1234567se"
  }
  const MANAGER = {
    email: 'With_LineManager@gmail.com',
    password: 'With_LineManager',
  };
  let User = '';
  it("should retrieve number of trips made by location for requester", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app)
      .get('/api/v1/trips')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
  })
  it("should return no trips found", async () => {
    User = await request(app).post('/api/v1/user/login').send(MANAGER);
    const res = await request(app)
      .get('/api/v1/trips')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(404);
  })

  it("should retrieve trips by given location", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app)
      .get('/api/v1/trips/Cairo')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
  })
  it("should display unsuccessful attempts ", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester2);
    const res = await request(app)
      .get('/api/v1/trips/')
      // .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(401);
  })
})



