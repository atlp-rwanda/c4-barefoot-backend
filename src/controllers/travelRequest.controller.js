import isAccommodationExist from '../helper/isAccomodationExist';
import getDataFromToken from '../helper/tokenToData';
import createTravelRequest from '../services/createTravelRequest';
import dbDataNotFoundError from '../utils/Errors/notFoundRequestError';
import travelRequestServices from '../services/directTravelRequest';
import ApplicationError from '../utils/Errors/applicationError';
import BadRequestError from '../utils/Errors/badRequestError';
import NotFoundRequestError from '../utils/Errors/notFoundRequestError';


export const travelRequest = async (req, res, next) => {
  const decoded = await getDataFromToken(req, res, next);
  try {
    if (decoded.manager_id) {
      const request = {
        managerId: decoded.manager_id,
        userId: decoded.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      let counter = req.body.trip.length;
      for (const records of req.body.trip) {
        console.log(records)
        counter -= 1;
        const isAccommodationValid = await isAccommodationExist(records.accommodationId, next);
        if (!isAccommodationValid) {
          throw new dbDataNotFoundError('Accommodation not found, try again');
        } else if (counter == 0) {
          createTravelRequest(req, res, request, next);
        }
      }
    } else {
      throw new BadRequestError('You need a Manager First.', 400); // added error handling
    }
  } catch (err) {
    next(err);
  }
};


export const cancel_travelRequest = async (req, res, next) =>{
    const { travelRequestId, action } = req.body;
    const decoded = await getDataFromToken(req, res, next)

    try{
        if(action === 'cancel'){
            const userId = decoded.id;
            const findTravelRequest = await travelRequestServices.findItById({travelId:travelRequestId});
            if(findTravelRequest){
                if(findTravelRequest.userId === userId){

                    const changes = 'canceled';
                    if(findTravelRequest.status === 'pending'){
                        const updateStatus = await travelRequestServices.updateStatus({travelId:travelRequestId, status:{status:changes}});
                        if(updateStatus){
                            return res.status(201).json({status: 201, message:`Travel request canceled successfully!`});
                        }else{
                            throw new ApplicationError("Failed to cancel this travel request, try again!",500);
                        }
                    }else{
                        throw new BadRequestError(`Can not cancel this travel request, because it is ${findTravelRequest.status}`,400);
                    }
                    
                }else{
                    throw new ApplicationError(`Not allowed to cancel this travel request`,403);
                }
            }else{
                throw new NotFoundRequestError("The travel request does not exist!",404);
            }
        }else{
            throw new BadRequestError("Can not perform this operation!",400);
        }
        
    }
    catch(error){
        next(error);
    }
    
}
