import { isAccommodationExist } from '../helper/isAccomodationExist';
import { getDataFromToken } from '../helper/tokenToData';
import { createTravelRequest } from '../services/createTravelRequest';
import dbDataNotFoundError from '../utils/dbDataNotFoundError';

const travelRequest = async (req, res, next) => {
    const decoded = await getDataFromToken(req, res, next)
    if(decoded.manager_id){
        const request = {
            managerId:decoded.manager_id,
            userId:decoded.id,
            createdAt:new Date(),
            updatedAt: new Date(),
        }
        var counter = req.body.trip.length
        for(var records of req.body.trip){
            counter -=1
            const isAccommodationValid = await isAccommodationExist(records.accommodationId, next)
            if(!isAccommodationValid){
                throw new dbDataNotFoundError("Accommodation not found, try again")
            }else if(counter == 0){
                try{
                    createTravelRequest(req, res, request, next)
                }catch(err){
                    next(err)
                }
            }
        }
    }else if(decoded.managerId == undefined){
        console.log("session error")
    }else{
        res.json({message:"You need a Manager First."})
    }
    
}

export default travelRequest