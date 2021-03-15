import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import currency from '../src/app';

use(chaiHttp);

it('Should get weather of the place he/she needs', async () => {
    const res = await request(currency)
    .get('/api/v1/weather/weather?city=kigali ')
    expect(res).to.have.status(200);
   expect(res.body).to.have.property('info');

});