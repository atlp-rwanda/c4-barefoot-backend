import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
use(chaiHttp);
describe('STATISTICS END-POINTS TESTING', () => {
  it('Should return system statistics', async () => {
    const User = await request(app).post('/api/v1/user/login').send({
        "email": "superadmin@gmail.com",
        "password":"Superadmin"
    });
    const res = await request(app).get('/api/v1/statistics').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('numberOfActiveUsers');
    expect(res.body).to.have.property('numberOfAccommodation');
    expect(res.body).to.have.property('numberOfLocation');
    expect(res.body).to.have.property('sortedVisitedLocation');
    expect(res.body).to.have.property('SortedBookedAccomodation');
    expect(res.status).to.equal(200);
  });

  it('Should not get the statistics if the requester provided invalid token', async () => {
    const User = await request(app).post('/api/v1/user/login').send({
        "email": "superadmin@gmail.com",
        "password":"Superadmin"
    });
    const res = await request(app).get('/api/v1/statistics').set('Authorization', `Bearer ${User.body.data}y`);
    expect(res).to.have.status(500);
    expect(res.status).to.equal(500);
  });

  it('Should not get the statistics for un authorized requester', async () => {
    const res = await request(app).get('/api/v1/statistics');
    expect(res).to.have.status(401);
    expect(res.status).to.equal(401);
  });
  

});
