import models from '../models';
import userExist from '../services/findUser';
const checkUserExistance=async(req,res,next)=>{
        let user;
        if(req.user){ 
             user=req.user;}
        else{
            user=req.body.user;
        }
        let account= await userExist(user.email);
        if(!account){
            const User={first_name:user.given_name,
                last_name:user.family_name,
                username:user.displayName,email:user.email,
                language:user.language,
                profile_picture:user.photos[0].value,varified:user.verified,
            };
            try{
                account=await models.User.create(User);
                next()
            }catch(err){
                return res.status(500).send({
                    message:"failed signing up",
                    error:err.message
                })
            }
        
        }else{next()}
    }
export default checkUserExistance;