import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { validToken, travelAdmin } from './dummyData';

use(chaiHttp);
describe("VISITOR'S CHAT", () => {
//   const TestChatText = {
//     visitor: 'visitor@visitor.vstr',
//     message: 'test test test'
//   };

// const user = {
//   email: 'sequester@gmail.com',
//   password: 'password'
// }
const TestChatText = {
  visitor: 'visitor@visitor.vstr',
  message: 'test test test',
  sender: 'visitor@visitor.vstr'
};
const user = {
  email: 'sequester@gmail.com',
  password: 'password'
};
before(async () => {
  await request(app).post('/api/v1/chat/visitor').send(TestChatText);
  const User = await request(app).post('/api/v1/user/login').send(user);
  await request(app).post('/api/v1/chat/support').set('Authorization', `Bearer ${User.body.data}`);
});

  it('Should mark messages sent from support to visitor as read', async () => {
    const res = await request(app).patch(`/api/v1/chat/visitor?visitor=${TestChatText.visitor}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'marked as read!');
  });

  it("Should not indicate messages marked as read if user hasn't chatted recently", async () => {
    const res = await request(app).patch('/api/v1/chat/visitor?visitor=invalidvisitor@visitor.vstr');
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'User not found');
  });

  it('Should allow support to mark visitor messages as read', async () => {
    const User = await request(app).post('/api/v1/user/login').send(travelAdmin);
    const res = await request(app).patch(`/api/v1/chat/support?visitor=${TestChatText.visitor}`).set('Authorization', `Bearer ${User.body.data}`).send();
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'marked as read!');
  });

  it('Should indicate visitor not found if s/he has not chatted', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).patch('/api/v1/chat/support?visitor=vvvvvvvvvvv@vnvnv.vnvn').set('Authorization', `Bearer ${User.body.data}`).send();
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'visitor not found');
  });

  it('Should indicate visitor not found if s/he has not chatted', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).get('/api/v1/chat/visitors').set('Authorization', `Bearer ${User.body.data}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Array');
  });

  it('Should allow support to get the chat with a visitor', async () => {
    const User = await request(app).post('/api/v1/user/login').send(user);
    const res = await request(app).get(`/api/v1/chat/support?visitor=${TestChatText.visitor}`).set('Authorization', `Bearer ${User.body.data}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.be.a('Array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.be.a('Object');
      expect(res.body[0]).to.have.property('receiver');
      expect(res.body[0]).to.have.property('sender');
      expect(res.body[0]).to.have.property('message');
      expect(res.body.some((chat) => chat.sender === TestChatText.visitor)).to.equal(true);
    }
  });

  it('Should allow visitor to get chat and response from support team', async () => {
    const res = await request(app).get(`/api/v1/chat/visitor?visitor=${TestChatText.visitor}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.be.a('Array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.be.a('Object');
      expect(res.body[0]).to.have.property('receiver');
      expect(res.body[0]).to.have.property('sender');
      expect(res.body[0]).to.have.property('message');
      expect(res.body.some((chat) => chat.sender === TestChatText.visitor)).to.equal(true);
    }
  });
});
