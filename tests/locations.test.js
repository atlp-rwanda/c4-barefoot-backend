import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  travelAdmin, validLocation, invalidLocation, updateLocation
} from './dummyData';

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

<<<<<<< HEAD
  it('should create a location with valid data', async () => {
=======
  it('should create the location', async () => {
>>>>>>> main
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).post('/api/v1/locations').set('Authorization', `Bearer ${User.body.data}`).send(validLocation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('location');
  });

<<<<<<< HEAD
  it('Should not create location with incomplete data', async () => {
=======
  it('Should not create location', async () => {
>>>>>>> main
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).post('/api/v1/locations').set('Authorization', `Bearer ${User.body.data}`).send(invalidLocation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(500);
    expect(res.body).to.have.property('error');
  });

<<<<<<< HEAD
  it('Should retrieve one location', async () => {
=======
  it('Should get particular location', async () => {
>>>>>>> main
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get(`/api/v1/locations/${validLocation.id}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('LocationName');
    expect(res.body.LocationName).to.equal('Capetown');
  });

<<<<<<< HEAD
  it('Should return error 404 when location does not exist', async () => {
=======
  it('Should not get location that does not exist', async () => {
>>>>>>> main
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get('/api/v1/locations/c6028e0d-ef88-4693-ab49-f37669891725').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Location does not exist');
  });

<<<<<<< HEAD
  it('Should update existing location', async () => {
=======
  it('Should update location', async () => {
>>>>>>> main
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch(`/api/v1/locations/${validLocation.id}`).set('Authorization', `Bearer ${User.body.data}`).send(updateLocation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Location successfully updated');
  });

<<<<<<< HEAD
  it('Should not update non-existing location', async () => {
=======
  it('Should not update location', async () => {
>>>>>>> main
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch('/api/v1/locations/c6028e0d-ef88-4693-ab49-f37669891725').set('Authorization', `Bearer ${User.body.data}`).send(updateLocation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Location does not exist');
  });

<<<<<<< HEAD
  it('Should delete existing location', async () => {
=======
  it('Should delete location', async () => {
>>>>>>> main
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).delete(`/api/v1/locations/${validLocation.id}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Location has been deleted');
  });

<<<<<<< HEAD
  it('Should not delete non-existing location', async () => {
=======
  it('Should not delete location', async () => {
>>>>>>> main
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
