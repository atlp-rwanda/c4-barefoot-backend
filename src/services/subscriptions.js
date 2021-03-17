import models from '../models'


async function hasSubscribed(auth){
    const subscription= await models.Subscription.findOne({where: {auth} } );
    if(subscription== null || subscription== undefined){
        return false;
    }
    else{
        return true;
    }
}

module.exports= hasSubscribed;