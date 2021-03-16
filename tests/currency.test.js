import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import currency from '../src/app';

use(chaiHttp);

it('Should get his/her own currency', async () => {
    const res = await request(currency)
    .get('/api/v1/convert/converter/1?from="TSH"&to="RWF" ')
    expect(res).to.have.status(200);
   expect(res.body).to.have.property('RWF');

});