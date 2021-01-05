import models from '../models';
//import 'express-async-errors';
import userExist from '../services/findUser';
import loginUser from '../helper/googleLogin'
import 'dotenv/config'

export const successSignUp=async(req,res,next)=>{
   res.redirect('/api/v1/google/signUp');
}

export const signUp=async(req,res)=>{
    let user;
    if(req.user){ 
        user=req.user;}
    else{
        user=req.body.user;
    }
    let account= await userExist(user.email);
    if(!account){
        const User={
            first_name:user.given_name,
            last_name:user.family_name,
            username:user.displayName,
            email:user.email,
            language:user.language,
            profile_picture:user.photos[0].value,
            varified:user.verified,
        };
        try{
            account=await models.User.create(User);
             
        }catch(err){
            return res.status(500).send({
                message:"failed signing up",
                error:err.message
            })
        }
       
    }
    const result=await loginUser(account);
    res.send({
        message:'successfully Logged In',
        token:result.token
    })
}