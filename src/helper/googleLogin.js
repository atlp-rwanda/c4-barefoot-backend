import models from '../models';
import 'express-async-errors';
import jwt from"jsonwebtoken";
import 'dotenv/config';

const successlogIn=async(account)=>{
    const token=jwt.sign({
         email:account.email,
        userId:account.id
    },process.env.TOKEN_SECRET,
    {
        expiresIn:'1h'
    })
    try{
        const user= await models.User.update({refreshtoken:token},{where:{email:account.email}})
        let result={
            user,
            token
        }
        return result;
    }catch(err){
        return res.status(500).json({
            message:"auth failed",
            error:err.message
    })
    }
}

export default successlogIn;

