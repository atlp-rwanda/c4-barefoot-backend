import models from '../models'


async function findSubscription(userId){

    if(userId== null || userId== undefined){
        const subscription= await models.Subscription.findAll({});

    }
    else{
        const subscription= await models.Subscription.findAll({where: {userId} } );
        // console.log('*********subscription:', subscription);
        if(subscription== null || subscription== undefined || subscription.length == 0){
            console.log('You have not subscribed yet');
            return subscription;
        }
        else{
            return subscription;
        }

    }

}

module.exports= findSubscription;