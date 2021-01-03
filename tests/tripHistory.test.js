import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);

describe('Trip History', () => {
    const requester = {
        email: "shumbushoedgar@gmail.com",
        password:"1234567se"
    }
    let User = '';
it("should retrieve number of trips made by location", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app)
      .get('/api/v1/trips')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
})
it("should retrieve trips by given location", async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app)
      .get('/api/v1/trips/Cairo')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
})
})