import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import {successSignUp,signUp,failedSignIn} from '../src/controllers/googleSignup'
import app from '../src/app';
const expect = chai.expect;


describe('#Sign Up with Google',()=>{
  let status ,send, res;
    beforeEach((done) => {
      // status = sinon.stub();
      send = sinon.spy();
      res = { send, status };
      // status.returns(res);
      done();
    });
    it('It should signUp a user with his google account',async(done)=>{
        let req={user:{
          provider: 'google',
          sub: '106180666226862347646',
          id: '106180666226862347646',
          displayName: 'Niyonkuru Blaise',
          name: { givenName: 'Niyonkuru', familyName: 'Blaise' },
          given_name: 'Niyonkuru',
          family_name: 'Blaise',
          email_verified: true,
          verified: true,
          language: 'en',
          locale: undefined,
          email: 'blaiseniyonkuru12@gmail.com',
          emails: [ { value: 'blaiseniyonkuru12@gmail.com', type: 'account' } ],
          photos: [
            {
              value: 'https://lh3.googleusercontent.com/a-/AOh14Ghe0RBclUzQrw32zJrUjIY-uN7XjLnYNr4SIX7U=s96-c',
              type: 'default'
            }
          ]
        }
        }
        const mock =sinon.mock(res);

        mock.expects('send').once().withExactArgs({message:'successfully Logged In'})
         const result = await signUp(req,res)
         done()
         const stub =sinon.stub(signUp(req,res)).returns({message:'successfully Logged In',
        token:result.token})
          expect(stub.calledOnce).to.be.true;
          expect(stub.args[0],message).to.equal("successfully Logged In")
          mock.verify();
          
          
    })
})