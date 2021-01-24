import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { expiredBookings } from '../src/controllers/bookingsController';
import { requester, bookDates, adminCredentials, travelAdmin, validAccommodation } from './dummyData';
import sinon from 'sinon';
import moment from 'moment';
use(chaiHttp);

let User = '';

const managermj = {
  email: 'mj@gmail.com',
  password: 'manager1'
}

describe('BOOKINGS END-POINT TEST', () => {
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

  // it('Should test expired booking', async() => {
  //   // Create Accomodation
  //   User = await request(app).post('/api/v1/user/login').send(travelAdmin);
  //   const resAcc = await request(app).post('/api/v1/accommodations').set('Authorization', `Bearer ${User.body.data}`).send(validAccommodation);
  //   // Create Expiring Booking
  //   const AccomodationId = resAcc.body.accommodationId;
  //   const bookingDates = {
  //     From: moment().add(-2, 'days'),
  //     To: moment().add(-1, 'days')
  //   };
  //   User = await request(app).post('/api/v1/user/login').send(requester);
  //   const res = await request(app).post(`/api/v1/accommodations/book/${validAccommodation.id}`).set('Authorization', `Bearer ${User.body.data}`).send(bookingDates);
    
  //   await expiredBookings();

  //   // const accomodationDetails = await request(app).get(`/api/v1/accommodations/${AccomodationId}`).set('Authorization', `Bearer ${User.body.data}`);

  //   expect(validAccommodation.numberOfRooms).to.equal(accomodationDetails.body.singleAccommodation.numberOfRooms);

  // })
  it('Should return 404 when no bookings are found', async () => {
    User = await request(app).post('/api/v1/user/login').send(managermj);
    const res = await request(app).get('/api/v1/bookings').set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', );
    expect(res.body.message).to.equal('You do not have any bookings');
  });
});
 