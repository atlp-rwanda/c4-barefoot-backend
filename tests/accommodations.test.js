import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import {
  travelAdmin, validAccommodation, invalidAccommodation, updateAccommodation
} from './dummyData';

use(chaiHttp);

let User = '';

describe('ACCOMMODATION ROUTES TESTING', () => {
  it('Should retrieve accommodations', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get('/api/v1/accommodations?page=1').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('page');
    expect(res.body.page).to.equal(1);
    expect(res.body).to.have.property('accommodations');
  });

  it('should create an accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).post('/api/v1/accommodations').set('Authorization', `Bearer ${User.body.data}`).send(validAccommodation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('accommodation');
  });

  it('Should not create accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).post('/api/v1/accommodations').set('Authorization', `Bearer ${User.body.data}`).send(invalidAccommodation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(500);
    expect(res.body).to.have.property('error');
  });

  it('Should retrieve one accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get(`/api/v1/accommodations/${validAccommodation.id}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('singleAccommodation');
  });

  it('Should not retrieve accommodation with no existance', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).get('/api/v1/accommodations/c6028e0d-ef88-4693-ab49-f37669891725').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Accommodation does not exist');
  });

  it('Should update accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch(`/api/v1/accommodations/${validAccommodation.id}`).set('Authorization', `Bearer ${User.body.data}`).send(updateAccommodation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Accommodation successfully updated');
  });

  it('Should not update accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch('/api/v1/accommodations/c6028e0d-ef88-4693-ab49-f37669891725').set('Authorization', `Bearer ${User.body.data}`).send(updateAccommodation);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Accommodation does not exist');
  });

  it('Should delete accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).delete(`/api/v1/accommodations/${validAccommodation.id}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Accommodation has been deleted');
  });

  it('Should not delete accommodation', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).delete(`/api/v1/accommodations/${validAccommodation.id}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Accommodation does not exist');
  });
});
