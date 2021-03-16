import getDataFromToken from '../helper/tokenToData';
import { getOneBooking } from '../services/getBookings';
import accessDenied from '../utils/Errors/accessDenied';

export const isAllowedToReview = async (req, res, next)=>{
    const accommodationId = req.params.accommodationId;
    try{
        const tokenVerify = await getDataFromToken(req, res);
        if(tokenVerify){
            const hasBooked = await getOneBooking({username:tokenVerify.username, accommodationId: accommodationId});
            
            if(hasBooked){
                next();
            }else{
                throw new accessDenied(('Not allowed to review this accommodation'));
            }
        }
    }
    catch( error ){
        next (error);
    }
}