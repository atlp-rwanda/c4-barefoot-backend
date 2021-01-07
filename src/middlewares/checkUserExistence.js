import userExist from '../services/findUser';
import register from '../helper/googleRegister'
const checkUserExistance=async(req,res,next)=>{
        let user;
        if(req.user){ 
             user=req.user;}
        else{
            user=req.body.user;
        }
        let account= await userExist(user.email);
        if(!account){
           await register(user);
           next();
        }else{
            next();
        }
    }
export default checkUserExistance;