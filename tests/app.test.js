import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

use(chaiHttp);
describe('testing welcome router', () => {
  it('Should get welcome message', async () => {
    const res = await request(app).get('/api/v1/');
    expect(res).to.have.status([200]);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('status');
    expect(res.body.message).to.equal('Welcome to Barefoot Nomad');
    expect(res.body.status).to.equal(200);
  });

  it('Should get error 404 when page doesn\'t exist', async () => {
    const res = await request(app).get('/bop');
    expect(res).to.have.status(404);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
    expect(res.body).to.have.property('status');
    expect(res.body.error).to.equal('Page Requested not found');
    expect(res.body.status).to.equal(404);
  });
});
