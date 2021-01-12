import jwt, { verify } from 'jsonwebtoken';
import { io } from '../../app';
import Chat from '../../models/chat';
import models from '../../models';

const newMessage = async (data) => {
  const {
    token, 
    // message, time, msg_from, msg_to
  } = data;

  await jwt.verify(token, process.env.TOKEN_SECRET, (err, USER) => {
    if (!USER) {
      USER = 'visitor';
    }
    console.log(USER);
  });
  console.log(data);
  try {
    models.Chat.create(data);
  } catch (e) {
    console.log(e);
  }
};

const userDisconnected = (socket) => {
  console.log('User left : ', socket.id);
  io.emit('disconnected', {
    message: 'someone just left :\'(',
    who: ['hunted', 'bug']
  });
};

export const newUserConnection = (socket) => {
  // Connection now authenticated to receive further events
  //   console.log('user authenticated');
  //   socket.on('message', (message) => {
  //     io.emit('message', message);
  //   }
  // socket.on('authenticate', (token) => {
  //   verify(token);
  console.log('User connected : ', socket.id);
  socket.broadcast.emit('new-connection', {
    message: 'someone just connected',
    who: ['firstname', 'lastname']
  });
  socket.on('disconnect', userDisconnected);

  socket.on('chat-private', newMessage);
};

export default newUserConnection;
