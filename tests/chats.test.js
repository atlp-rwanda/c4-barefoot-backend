import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

use(chaiHttp);

describe('CHAT OF REGISTERED USERS', () => {
  const TRAVEL_ADMIN = {
    email: 'traveladmin@gmail.com',
    password: 'password',
    id: '2d647115-3af7-4df0-99aa-6656c764829f',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiNGZkMDg0YTAtY2RkNi00N2E1LWFhZjUtNWZkYzhiNTYyOWRkIiwidXNlcm5hbWUiOiJ0cmF2ZWxBZG1pbiIsImlhdCI6MTYxMDQ2NjgzNCwiZXhwIjoxNjExMDcxNjM0fQ.uxb1kf5SFC8rX5br7aKN-qOHDfPfWJ9Ug052M7pfZBM'
  };

  const TestChatText = {
    receiver: '83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc',
    message: 'test test test'
  };

  it('should get a list of users to chat for first time', async () => {
    const res = await request(app).get('/api/v1/chat/users').set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.be.a('Array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.property('profile_picture');
    }
  });

  it('Should get chats between logged in user and other valid user', async () => {
    const res = await request(app).get('/api/v1/chat?id=83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc').set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('chats');
    expect(res.body.chats).to.be.a('Array');
    if (res.body.chats.length > 0) {
      expect(res.body.chats[0]).to.have.property('sender');
      expect(res.body.chats[0]).to.have.property('receiver');
      expect(res.body.chats[0]).to.have.property('type');
    }
  });

  it('Should get unread messages between logged in user and other valid user', async () => {
    const res = await request(app).get('/api/v1/chat/unread?id=a9610cf3-4056-41dd-92ca-463088e23d07').set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('unreadMessages');
    expect(res.body.unreadMessages).to.have.property('count');
    if (res.body.unreadMessages.rows.length > 0) {
      expect(res.body.unreadMessages.rows[0]).to.have.property('sender');
      expect(res.body.unreadMessages.rows[0]).to.have.property('receiver');
      expect(res.body.unreadMessages.rows[0]).to.have.property('message');
      expect(res.body.unreadMessages.rows[0]).to.have.property('status', false);
    }
  });

  it('Should get last message between logged in user and other valid user', async () => {
    const res = await request(app).get('/api/v1/chat/last?id=a9610cf3-4056-41dd-92ca-463088e23d07').set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('sender');
    expect(res.body).to.have.property('receiver');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('type');
    expect(res.body).to.have.property('createdAt');
  });

  it('Should get chatlist between of logged in user whom s/he has chatted from/to', async () => {
    const res = await request(app).get('/api/v1/chat/chatlist').set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('profile_picture');
    }
  });
  const sentMessage = {};
  it('Should mark messages as read only from sender where logged user is receiver', async () => {
    const res = await request(app).patch('/api/v1/chat/read?sender=83b2a3e7-9ba4-4d3f-b3a3-d31940ee2edc').set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`);
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('receiver', TRAVEL_ADMIN.id);
  });

  it('Should delete a message by the sender', async () => {
    const r = await request(app).post('/api/v1/chat').set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`).send(TestChatText);
    sentMessage.id = r.body.id;
    const res = await request(app).delete(`/api/v1/chat?id=${sentMessage.id}`).set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`).send();
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'Message deleted');
  });

  it('Should indicate indicate message is not available when no deletion occurs', async () => {
    const res = await request(app).delete(`/api/v1/chat?id=${sentMessage.id}`).set('Authorization', `Bearer ${TRAVEL_ADMIN.token}`).send();
    expect(res.type).to.equal('application/json');
    expect(res).to.have.status(400);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message', 'Message not available');
  });
});
