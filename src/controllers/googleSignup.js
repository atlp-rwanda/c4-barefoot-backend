import models from '../models';
import 'express-async-errors';
import userExist from '../services/findUser';
import loginUser from '../helper/googleLogin'
import 'dotenv/config'

export const successSignUp=async(req,res,next)=>{
    const fulurl=`${req.protocol}://${req.get('host')}${req.originalUrl}#jfsdkjfusodfjosodfj`;
    let url=fulurl.split('#');
    console.log(fulurl)
    console.log(url)
   res.redirect('/api/v1/google/signUp');
}

export const signUp=async(req,res)=>{
    const user=req.user;
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
            console.log("here I am")
            console.log(User)
            account=await models.User.create(User);
             
        }catch(err){
            console.log(err)
            return res.status(500).send({
                message:"failed signing up",
                error:err.message
            })
        }
       
    }
    const result=await loginUser(account);
    res.status(200).send({
        message:'successfully Logged In',
        token:result.token
    })
}

export const failedSignIn=(req,res,next)=>{
    return res.send({
        message:"failed SignUp"
    })
}