import models from '../models';

const register=async(user)=>{
    
    const User={first_name:user.given_name,
        last_name:user.family_name,
        username:user.displayName,email:user.email,
        language:user.language,
        profile_picture:user.photos[0].value,varified:user.verified,
    };
    let account=await models.User.create(User);
    return account;

}
export default register;