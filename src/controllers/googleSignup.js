import loginUser from '../helper/googleLogin';
import 'dotenv/config'

export const successSignUp=async(req,res,next)=>{
   res.redirect('/api/v1/google/signUp');
}

export const signUp=async(req,res)=>{
    let user;
    user=req.body.user;
    const result=await loginUser(user);
    res.send({
        status: 200,
        message:'successfully Logged In',
        token:result.token
    })
}