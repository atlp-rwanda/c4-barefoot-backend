import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);

let travelRequestId = '';

<<<<<<< HEAD
describe('Travel Requests', () => {
=======
describe('TRAVEL REQUEST END-POINTS TESTING', () => {
>>>>>>> main
  const REQUESTER = {
    email: 'sequester@gmail.com',
    password: 'password',
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
  let User = '';
  let tripId = '';
<<<<<<< HEAD
  // it("Should not make travel request if not logged in", async ()=>{
  //     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8"
  //     const res = await request(app)
  //     .get("/api/v1/requests/direct-reports/1")
  //     // .set("Authorization", token)
  //     expect(res).to.have.status(401)
  //     expect(res.body).to.have.deep.property("message").equals("You are not loged in")
  // })
  // it("Should not make travel request if token has expired", async ()=>{
  //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8"
  //     const res = await request(app)
  //     .get("/api/v1/requests/direct-reports/1")
  //     .set("Authorization", token)
  //     expect(res).to.have.status(401)
  //     expect(res.body).to.have.deep.property("message").equals("session has expired")
  // })
=======
>>>>>>> main
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
  it('Should cancel a travel request if it is created', async () => {
    const requestData = { travelRequestId, action: 'cancel' };
    const res = await request(app)
      .put('/api/v1/requests')
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(requestData);
    expect(res).to.have.status(201);
    expect(res.body).to.have.deep.property('status');
    expect(res.body).to.have.deep.property('message').equals('Travel request canceled successfully!');
  });
  it('Should edit the not-approved travel requests', async () => {
    const editRequest = { tripId, updates: { reason: 'testing' } };
    const res = await request(app)
      .put(`/api/v1/requests/${travelRequestId}`)
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(editRequest);
    expect(res).to.have.status(201);
    expect(res.body).to.have.deep.property('status');
    expect(res.body).to.have.deep.property('message').equals('Trip updated successfully!');
  });
<<<<<<< HEAD

  // after(()=>{
  //     // delete data inserted by the tests.
  //     const trip = {
  //         originCity:'Kigali',
  //         destination:"Cairo",
  //         tripDate:"2020-12-12",
  //         returnDate:"2020-01-01",
  //         accommodationId:"1234567",
  //         reason:"enjoying"
  //     }
  //     models.Trip.findOne({where:trip}).then((res) =>{
  //         models.Trip.destroy({where:trip}).then(result =>{
  //             models.TravelRequest.destroy({where:{travelId:res.travelId}})
  //             .then(result =>{
  //             })
  //         })
  //     })

  // })
});

describe('MANAGER travel requests', () => {
=======
  
  const user = {
    email: 'sequester@gmail.com',
    password: 'password',
  };
  it('Should get travel requests if you are logged in', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .get('/api/v1/requests')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
  it('Should get a single travel requests if you are logged in', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .get('/api/v1/requests/')
      .set('Authorization', `Bearer ${User.body.data}`)
      .query({ requestId: '5' });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

>>>>>>> main
  const MANAGER = {
    email: 'mj@gmail.com',
    password: 'manager1',
  };
<<<<<<< HEAD
  let User = '';
=======
>>>>>>> main
  it('should return all travel requests sent', async () => {
    User = await request(app).post('/api/v1/user/login').send(MANAGER);
    const res = await request(app)
      .get('/api/v1/directReports')
      .set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
  it('should reject the travel request', async () => {
    const requestData = { travelRequestId, action: 'reject' };
    const res = await request(app)
      .put('/api/v1/directReports')
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(requestData);
    expect(res).to.have.status(201);
    expect(res.body).to.have.deep.property('status');
    expect(res.body).to.have.deep.property('message').equals('Operation performed successfully!');
  });
  it('should approve the travel request', async () => {
    const requestData = { travelRequestId, action: 'approve' };
    const res = await request(app)
      .put('/api/v1/directReports')
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(requestData);
    expect(res).to.have.status(201);
    expect(res.body).to.have.deep.property('status');
    expect(res.body).to.have.deep.property('message').equals('Operation performed successfully!');
  });
});
