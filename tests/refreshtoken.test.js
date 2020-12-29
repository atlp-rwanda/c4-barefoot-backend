import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import 'dotenv/config';

use(chaiHttp);

describe('api/v1/refreshtoken', () => {
  it('it should not refresh token if no cookies', async () => {
    const res = await request(app).post('/api/v1/user/refresh-token');
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('Please login!');
  });
});
