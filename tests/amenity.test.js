import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { travelAdmin, validAmenity } from './dummyData';

use(chaiHttp);

let User = '';

describe('AMENITIES END-POINTS TESTING', () => {
  it('should update amenity', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch('/api/v1/amenities/1d9809ca-072a-45fe-9f24-82a8132a8872').set('Authorization', `Bearer ${User.body.data}`).send(validAmenity);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Amenity successfully updated');
  });

  it('Should not update amenity', async () => {
    User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch('/api/v1/amenities/c6028e0d-ef88-4693-ab49-f37669891725').set('Authorization', `Bearer ${User.body.data}`).send(validAmenity);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Amenity does not exist');
  });
});
