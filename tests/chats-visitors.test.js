import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { validToken } from './dummyData';

use(chaiHttp);
describe("VISITOR'S CHAT", () => {
  const TestChatText = {
    visitor: 'visitor@visitor.vstr',
    message: 'test test test'
  };

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
    const res = await request(app).patch(`/api/v1/chat/support?visitor=${TestChatText.visitor}`).set('Authorization', `Bearer ${validToken}`).send();
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'marked as read!');
  });

  it('Should indicate visitor not found if s/he has not chatted', async () => {
    const res = await request(app).patch('/api/v1/chat/support?visitor=vvvvvvvvvvv@vnvnv.vnvn').set('Authorization', `Bearer ${validToken}`).send();
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(404);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'visitor not found');
  });

  it('Should indicate visitor not found if s/he has not chatted', async () => {
    const res = await request(app).get('/api/v1/chat/visitors').set('Authorization', `Bearer ${validToken}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Array');
  });

  it('Should allow support to get the chat with a visitor', async () => {
    const res = await request(app).get(`/api/v1/chat/support?visitor=${TestChatText.visitor}`).set('Authorization', `Bearer ${validToken}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.be.a('Array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.be.a('Object');
      expect(res.body[0]).to.have.property('visitor', TestChatText.visitor);
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
      expect(res.body[0]).to.have.property('visitor', TestChatText.visitor);
      expect(res.body[0]).to.have.property('sender');
      expect(res.body[0]).to.have.property('message');
      expect(res.body.some((chat) => chat.sender === TestChatText.visitor)).to.equal(true);
    }
  });
});
