import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { requester, bookDates, adminCredentials } from './dummyData';

use(chaiHttp);

let User = '';

<<<<<<< HEAD
describe('Testing booking of accommodations', () => {
=======
describe('BOOKINGS END-POINT TEST', () => {
>>>>>>> main
  it('Should book an accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app).post('/api/v1/accommodations/book/0ce36391-2c08-3074-bddb-a4ea8cccbbc5').set('Authorization', `Bearer ${User.body.data}`).send(bookDates);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Booking successfully made');
  });

  it('Should not book accommodation when it is full', async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app).post('/api/v1/accommodations/book/520f2b37-7bac-4490-aa7a-96f15915bcd7').set('Authorization', `Bearer ${User.body.data}`).send(bookDates);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Accommodation is currently full');
  });

  it('Should list all bookings made by the user', async () => {
    User = await request(app).post('/api/v1/user/login').send(requester);
    const res = await request(app).get('/api/v1/bookings').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
  });

  it('Should return 404 when no bookings are found', async () => {
    User = await request(app).post('/api/v1/user/login').send(adminCredentials);
    const res = await request(app).get('/api/v1/bookings').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('You do not have any bookings');
  });
});
