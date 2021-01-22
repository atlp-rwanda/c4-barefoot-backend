import models from '../../models';
const users = [];
import { io } from '../../app';

export const handshake = async (socket, next)=>{
  
  if(socket.handshake && socket.handshake.query && socket.handshake.query.token){
    const token = socket.handshake.query.token;
    const userId = socket.handshake.query.loggedInUser;
    users[userId] = socket.id;

  }else if(socket.handshake && socket.handshake.query && socket.handshake.query.visitor){
    users[socket.handshake.query.visitor]= socket.id;

  }
  next();
}

export const userConnection = socket=>{
  //listening for incoming messages
  socket.on('send_message', data=>{
    if(data.metadata==='visitor'){
      const socketId = users['2d647115-3af7-4df0-99aa-6656c764829f'];
      //sending message requesting support to travel admin
      io.to(socketId).emit('request_support', data);
      //sending support message to the visitor
      io.to(users[data.receiver]).emit('support_message', data);
      models.ChatV.create({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message
      });
  
    }else {
      //sending message to the receiver
      io.to(users[data.receiver]).emit('new_message', data);
      models.Chat.create({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        type: 'plain-text'
      })
    }
    
  })
 
}



