import models from '../models'


async function hasSubscribed(auth){
    // console.log('######Auth: ', auth)
    const subscription= await models.Subscription.findOne({where: {auth} } );
    // console.log('*********subscription:', subscription);
    if(subscription== null || subscription== undefined){
        return false;
    }
    else{
        return true;
    }
}

module.exports= hasSubscribed;