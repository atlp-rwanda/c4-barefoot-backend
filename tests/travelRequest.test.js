import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import models from '../src/models';
import 'dotenv/config';

use(chaiHttp);
describe('Travel Requests', () => {
  const user = {
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
        accommodationId: '7edd7f2c-6a67-4c85-ade2-abc6c962017b',
        reason: 'enjoying'
      }
    ]
  };
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
  it('Should make a travel request if you are logged in and have a manager', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .post('/api/v1/requests/request')
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(tripRequest);
    expect(res).to.have.status(200);
    expect(res.body).to.have.deep.property('data');
    expect(res.body).to.have.deep.property('message').equals('Trip request sent successfully');
  });
  after(() => {
    // delete data inserted by the tests.
    const trip = {
      originCity: 'Kigali',
      destination: 'Cairo',
      tripDate: '2020-12-12',
      returnDate: '2020-01-01',
      accommodationId: '1234567',
      reason: 'enjoying'
    };
    models.Trip.findOne({ where: trip }).then((res) => {
      models.Trip.destroy({ where: trip }).then((result) => {
        models.TravelRequest.destroy({ where: { travelId: res.travelId } })
          .then((result) => {
            console.log(result);
          });
      });
    });
  });
});
