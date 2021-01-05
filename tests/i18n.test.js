
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

describe('Testing translations in French and Kinyarwanda', () => {
  it('it should translate the welcoming message to french', async () => {
    const res = await chai.request(app).get('/api/v1?lang=fr');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Bienvenue chez Barefoot Nomad'
    );
  });
  it('it should translate the welcoming message to kinyarwanda', async () => {
    const res = await chai.request(app).get('/api/v1?lang=kin');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Murakaza neza kuri barefoot nomad'
    );
  });
});