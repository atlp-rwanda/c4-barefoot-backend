import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { verifiedUserToken, notManagerVerifiedUserToken, subscribedManagerToken, validUser } from './mockData';

use(chaiHttp);
describe('Testing notifiactions', () => {

  const REQUESTER = {
    email: 'pushnotfication@gmail.com',
    password: 'pushnotification',
  };

  const tripRequest = {
    trip: [
      {
        originCity: 'Kigali',
        destination: 'Cairo',
        tripDate: '2020-12-12',
        returnDate: '2020-01-01',
        accommodationId: '0ce36391-2c08-3074-bddb-a4ea8cccbbc5',
        reason: 'enjoying'
      }
    ]
  };

  const Comment = {
    comment: 'Hello there!',
  };

  let manager={
    email: "mj@gmail.com",
    password: "manager1"
  }
  
  let travelRequestId = '';
  let User = '';
  let tripId = '';

  

  it('Should make a travel request if you are logged in and have a manager', async () => {
    User = await request(app).post('/api/v1/user/login').send(REQUESTER);
    const res = await request(app)
      .post('/api/v1/requests/request')
      .send(tripRequest).set('Authorization', `Bearer ${User.body.data}`);
    travelRequestId = res.body.data.travelId;
    tripId = res.body.data.tripData[0].tripId;
    expect(res).to.have.status(200);
    expect(res.body).to.have.deep.property('data');
    expect(res.body).to.have.deep.property('message').equals('Trip request sent successfully');
  });


  it('should approve the travel request', async () => {

    User = await request(app).post('/api/v1/user/login').send(manager);

    const requestData = { travelRequestId, action: 'approve' };
    const res = await request(app)
      .put('/api/v1/directReports')
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(requestData);
    expect(res).to.have.status(201);
    expect(res.body).to.have.deep.property('status');
    expect(res.body).to.have.deep.property('message').equals('Operation performed successfully!');
  });


 
 
  it('Should make a travel request comment', async () => {
    const User = await request(app).post('/api/v1/user/login').send(REQUESTER);
    const res = await request(app)
      .post(`/api/v1/comment/${travelRequestId}`)
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(Comment);
    expect(res).to.have.status(200);
    expect(res.body).to.have.deep.property('tCommentData');
    expect(res.body).to.have.deep.property('message').equals('comment created successfully');
  });

});
