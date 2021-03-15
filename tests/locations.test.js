import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  travelAdmin, validLocation, invalidLocation, updateLocation

  
} from './dummyData';
const validLocation1 = {
  id: 'ae45da99-d1c5-493a-9e66-b0ffb722uay1',
  LocationName: 'Capetown',
  country: 'South Africa',
  description: 'Some random description',
  link: 'safari.com'
};
let locationId = "";
use(chaiHttp);

let User = '';

describe('LOCATIONS END-POINT TESTING', () => {
  it('Shoud get all the locations', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get('/api/v1/locations?page=1').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('page');
    expect(res.body.page).to.equal(1);
    expect(res.body).to.have.property('locations');
  });

  it('should create the location', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).post('/api/v1/locations').set('Authorization', `Bearer ${User.body.data}`).send(validLocation1);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('location');
    locationId = res.body.location.id
  });

  it('Should not create location', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).post('/api/v1/locations').set('Authorization', `Bearer ${User.body.data}`).send(invalidLocation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(500);
    expect(res.body).to.have.property('error');
  });

  it('Should get particular location', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get(`/api/v1/locations/02a7c9b2-efc5-4562-a9a1-ab79bdc43959`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
  });


  it('Should not get location that does not exist', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get('/api/v1/locations/c6028e0d-ef88-4693-ab49-f37669891725').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Location does not exist');
  });

  it('Should update location', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch(`/api/v1/locations/02a7c9b2-efc5-4562-a9a1-ab79bdc43959`).set('Authorization', `Bearer ${User.body.data}`).send(updateLocation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Location successfully updated');
  });

  it('Should not update location', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch('/api/v1/locations/c6028e0d-ef88-4693-ab49-f37669891725').set('Authorization', `Bearer ${User.body.data}`).send(updateLocation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Location does not exist');
  });

  it('Should delete location', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).delete(`/api/v1/locations/${locationId}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Location has been deleted');
  });

  it('Should not delete location', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).delete(`/api/v1/locations/${validLocation.id}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Location does not exist');
  });

  it('Should not delete location with linked accommodations', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).delete('/api/v1/locations/c6028e0d-ef88-4693-ab49-f37669891724').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('This location can not be deleted with linked accomodations.');
  });
});
