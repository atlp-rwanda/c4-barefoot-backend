import userExist from '../services/findUser';
import register from '../helper/googleRegister'
const checkUserExistance=async(req,res,next)=>{
        let user,account;
        if(req.user){ 
             user=req.user;}
        else{
            user=req.body.user;
        }
        account= await userExist(user.email);
        if(!account){
           account =await register(user);
        }
        req.body.user=account;
        next()
    }
export default checkUserExistance;