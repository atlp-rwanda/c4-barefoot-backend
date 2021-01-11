import { verifyToken } from '../../utils/auth';
import ApplicationError from '../../utils/Errors/applicationError';

export default async (socket, next) => {
  console.log(socket.handshake);
  console.log(socket.handshake.query);
  if (socket.handshake.query && socket.handshake.query.TOKEN) {
    let user = await verifyToken(socket.handshake.query.TOKEN);
    if(user) {
      console.log('user authenticated with socket.io : ', user);
    }
  } else {
    next(new ApplicationError('Authentication error', 401));
  }
};
