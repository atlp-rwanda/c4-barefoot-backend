const models= require('../../models');
import { decode } from 'jsonwebtoken';
import getDataFromToken from '../../helper/tokenToData';

import hasSubscribed from '../../services/subscriptions';

const subscribe= async (req,res, next)=>{
    const decoded= await getDataFromToken(req,res,next);
    const subscription= req.body;

    if(await hasSubscribed(subscription.keys.auth)){
        console.log('You have already subscribed');
        res.status(200).json('You have already subscribed');
    }
    else{

    
        const data= await models.Subscription.create({
            endpoint: subscription.endpoint,
            auth: subscription.keys.auth,
            expirationTime: subscription.expirationTIme,
            p256dh: subscription.keys.p256dh,
            userId: decoded.dataValues.id
        });
    
        console.log('Subscribed succesfully!');
        console.log(data);
        res.status(201).json('Subscribed succesfully!');
    }

}

module.exports= subscribe;