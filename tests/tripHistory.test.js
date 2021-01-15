import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';
import { line_manager } from './dummyData';

const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiNDU0Mjk4MzctZWQyYy00MzVkLWJjMjItYWQ5YzVkYmUzNzgyIiwidXNlcm5hbWUiOiJyZXF1ZXN0ZXJPbmUiLCJpYXQiOjE2MTAwMjUxNDQsImV4cCI6MTYxMDYyOTk0NH0.I02xNm4iD2dM0GW4fUXw98Mcmyx0K_AQIORsZ5fMOFk";


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
      .set('Authorization', `Bearer ${tokenTest}`);
    expect(res).to.have.status(200);
  })
  it("should return no trips found", async () => {
    User = await request(app).post('/api/v1/user/login').send(MANAGER);
    const res = await request(app)
      .get('/api/v1/trips')
      .set('Authorization', `Bearer ${tokenTest}`);
    expect(res).to.have.status(404);
  })

  it("should retrieve trips by given location", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app).get('/api/v1/trips/Cairo').set('Authorization', `Bearer ${tokenTest}`);
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



