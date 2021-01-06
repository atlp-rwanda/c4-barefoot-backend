import models from '../models';
import { verifyToken } from '../utils/auth';
import { Op } from 'sequelize';



//Getting users from user table to begin chat, this method is called when u have not yet chatted
const getUsersToChatWith = async (req, res, next)=>{
   try{
   
    const users = await models.User.findAll();
    
    res.send(users);
   }catch(err){
       next(err);
   }
}



//getting chats btn two users
const getChatsBetweenTwoUsers = async (req, res, next)=>{
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const user = await verifyToken(token);
        const loggedInUser = await models.User.findOne({
            where: {
                username: user.username
            }
        });
        const userToChatWith= await models.User.findOne({
            where: {
                id: req.params.id
            }
        })
   
    const chats= await models.Chat.findAll({
        where: models.Sequelize.or(
          models.Sequelize.and(
            { sender: loggedInUser.id, },
            {receiver: req.params.id}
          ),
          models.Sequelize.and(
            { sender: req.params.id },
            { receiver: loggedInUser.id }
          )
        )
      });
        res.status(200).json([loggedInUser.username,userToChatWith.username, chats]);
    }catch(err){
        next(err)
    }
}

const postChat= async (req, res, next)=>{
    
    
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const user = await verifyToken(token);
        //getting the user_id of the logged in user
        const loggedInUser = await models.User.findOne({
            where: {
                username: user.username
            }
        });
        const chat = {
            message: req.body.chat_message,
            sender:loggedInUser.id,
            receiver: req.body.to,
            
        }
        
        const chat_message = await models.Chat.create(chat);
        console.log(chat_message);
        res.send(chat_message);
    }catch(err){
        next(err);
    }


}
const deleteChatMessage = async (req, res, next)=>{
    try{
        
    }catch(err){
        next(err);
    }
}
//Getting all chats for one user
const allChats = async (req, res, next)=>{
    let response=[];
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const user = await verifyToken(token);
        const loggedInUser = await models.User.findOne({
            where: {
                username: user.username
            }
        });
       const chats = await models.Chat.findAll({
            where: {
                    [Op.or]: {
                        sender: loggedInUser.id,
                        receiver: loggedInUser.id
                    }
                        


            }
        }) 
        
 
        res.status(200).json([loggedInUser.username, chats]);
    }catch(err){
        next(err);
    }
}

module.exports= { allChats, deleteChatMessage, getChatsBetweenTwoUsers,  getUsersToChatWith, postChat }
