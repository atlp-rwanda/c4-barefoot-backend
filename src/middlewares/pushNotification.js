import wp from '../config/webPusher'
import models from '../models'
import findSubscription from '../services/findSubscription';
import getDataFromToken from '../helper/tokenToData';


function sendNotifications(subscriptions, payload){
    subscriptions.forEach(subscription => {
        wp.sendNotification({
           endpoint: subscription.endpoint,
           expirationTime: subscription.expirationTime,
           keys:{
               auth: subscription.auth,
               p256dh: subscription.p256dh
           }
       }, payload).catch( err=> console.log(err));

   });
}


const sendTravelRequestNotification= async (req,res,next)=>{
    const decoded = await getDataFromToken(req, res, next);
    const receiverId= decoded.manager_id;

    const subscriptions= await findSubscription(receiverId);

    const payload= JSON.stringify({
        title: 'Travel request',
        body: 'One of your employees sent a trip request'
    });


    
    sendNotifications(subscriptions, payload);

    console.log('Notification middleware executed successfully!');


}

const sendRequestApprovalNotification= async (req,res,next)=>{
    const travelRequest= await models.TravelRequest.findOne({where: {travelId: req.body.travelRequestId}});

    const receiverId= travelRequest.dataValues.userId;

    const subscriptions= await findSubscription(receiverId);

    const payload= JSON.stringify({
        title: 'Travel request approved',
        body: `Your Trip have been ${req.body.action}d by your manager`
    });


    
    sendNotifications(subscriptions,payload);

    console.log('Notification middleware executed successfully!');

}


const managerAssignmentNotification= async (req,res,next)=>{

    const requesterId= req.params.id;
    const managerId= req.body.manager_id;

    const requesterSub= await findSubscription(requesterId);
    const managerSub= await findSubscription(managerId);

    const requesterPayload= JSON.stringify({
        title: 'Manager assignment',
        body: 'You have been assigned a new manager'
    });

    const managerPayload= JSON.stringify({
        title: 'Manager assignment',
        body: 'You have been assigned a new employee to manage'
    });



    sendNotifications(managerSub,managerPayload);



    sendNotifications(requesterSub, requesterPayload);

    console.log('Notification middleware executed successfully!');



}


const sendCommentNotification= async (req,res,next)=>{
    const travelRequest= await models.TravelRequest.findOne({where: {travelId: req.params.travelId}});

    const receiverId= travelRequest.dataValues.userId;

    const subscriptions= await findSubscription(receiverId);

    const payload= JSON.stringify({
        title: 'Received a Trip comment',
        body: 'Your manager commented on your travel request'
    });


 
    sendNotifications(subscriptions,payload);

    console.log('Notification middleware executed successfully!');

}


module.exports= {sendTravelRequestNotification,sendRequestApprovalNotification,managerAssignmentNotification,sendCommentNotification};