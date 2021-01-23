import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';
import { line_manager, travelAdmin, validToken } from './dummyData';


use(chaiHttp);

describe('Trip History', () => {
  const requester = {
    email: "sequester@gmail.com",
    password: "password"
  }
  const requester2 = {
    email: "mj@gmail.com",
    password: "manager1"
  }
  const MANAGER = {
    email: 'managertwo@gmail.com',
    password: 'manaager2'
  };
  let User = '';
  it("should retrieve number of trips made by location for requester", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app)
      .get('/api/v1/trips/Cairo')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
  })
  it("should return no trips found when the user have never made any travel request", async () => {
    const user = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app).get('/api/v1/trips').set('Authorization', `Bearer ${user.body.data}`);
    expect(res).to.have.status(200);
  })

  it("should retrieve trips by given location", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app).get('/api/v1/trips/Cairo').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
  })
  it("should display unsuccessful attempts ", async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app)
      .get('/api/v1/trips/').set('Authorization', `Bearer ${validToken}`);

    expect(res).to.have.status(401);
  })
})



