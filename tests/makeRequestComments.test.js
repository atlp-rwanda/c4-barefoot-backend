import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import models from '../src/models';
import 'dotenv/config';

use(chaiHttp);
describe('REQUEST CIMMENTING END-POINTS TESTING', () => {
  const user = {
    email: 'sequester@gmail.com',
    password: 'password',
  };
  const Comment = {
    comment: 'Hello there!',
  };
  it('Should post a travel request comment', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .post('/api/v1/comment/0ce36391-2c08-3074-bddb-a4ea8cccbbc5')
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(Comment);
    expect(res).to.have.status(200);
    expect(res.body).to.have.deep.property('tCommentData');
    expect(res.body).to.have.deep.property('message').equals('comment created successfully');
  });
  it('Should not post comment to non-existing travel request id', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app)
      .post('/api/v1/comment/0ce36391-2c08-3074-bddb-a4ea8cccbbb5')
      .set('Authorization', `Bearer ${User.body.data}`)
      .send(Comment);
    expect(res).to.have.status(400);
    expect(res.body).to.have.deep.property('message').equals('Travel request with this id does not exist.');
  });

});
