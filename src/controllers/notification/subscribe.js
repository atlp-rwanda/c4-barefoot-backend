const models= require('../../models');
import { decode } from 'jsonwebtoken';
import getDataFromToken from '../../helper/tokenToData';

import hasSubscribed from '../../services/subscriptions';

const subscribe= async (req,res, next)=>{
    const decoded= await getDataFromToken(req,res,next);
    const subscription= req.body;
    console.log(subscription);

    if(await hasSubscribed(subscription.keys.auth)){
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
    
        res.status(201).json('Subscribed succesfully!');
    }

}

module.exports= subscribe;