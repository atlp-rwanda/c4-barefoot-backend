import jwt from 'jsonwebtoken';
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

export const userDisconnected = () => {
  io.emit('disconnected', {
    message: 'someone just left :\'(',
    who: ['hunted', 'bug']
  });
};

export const newUserConnection = (socket) => {
  socket.broadcast.emit('new-connection', {
    message: 'someone just connected',
    who: ['firstname', 'lastname']
  });
  socket.on('disconnect', userDisconnected);

  socket.on('chat-private', newMessage);
};

export default newUserConnection;
