import loginUser from '../helper/googleLogin';
import 'dotenv/config'

export const successSignUp=async(req,res,next)=>{
   res.redirect('/api/v1/google/signUp');
}

export const signUp=async(req,res)=>{
    let user;
    if(req.user){ 
        user=req.user;
    }else{
        user=req.body.user;
    }
    const result=await loginUser(user);
    res.send({
        status: 200,
        message:res.__('successfully Logged In'),
        token:result.token
    })
}