import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);
describe('RATES AND REVIEWS END-POINTS TESTING', () => {
  const user = {
    email: 'sequester@gmail.com',
    password: 'password',
  };
  const requestData = {
      rate: 5,
      review: 'This house is very nice and clean'
  }
  const accommodationId = '0ce36391-2c08-3074-bddb-a4ea8cccbbc5';

  it('should return a data when a review is added successfully', async () =>{
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .post(`/api/v1/ratings/${accommodationId}`).send(requestData)
      .set('Authorization', `Bearer ${User.body.data}`);
      expect(res).to.have.status(201);
    expect(res.body).to.have.deep.property('message').equals(`Review added successfully!`);
    expect(res.body).to.have.deep.property('data');
  });
  it('should return a list of reviews made on a specific accommodation', async () =>{
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .get(`/api/v1/ratings/${accommodationId}`)
      .set('Authorization', `Bearer ${User.body.data}`);
      expect(res).to.have.status(200);
    expect(res.body).to.have.deep.property('rates');
    expect(res.body).to.have.deep.property('reviews');
  });
});