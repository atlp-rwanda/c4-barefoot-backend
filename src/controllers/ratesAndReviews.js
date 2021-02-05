import {createOne, findRatings} from '../services/reviews';
import getDataFromToken from '../helper/tokenToData';
import ApplicationError from '../utils/Errors/applicationError';
import notFoundRequestError from '../utils/Errors/notFoundRequestError';

export const createReviews = async (req, res, next) => {

    let query = req.body;
    query.accommodationId = req.params.accommodationId;

    try{
        const tokenVerify = await getDataFromToken(req, res);
        if(tokenVerify){
            query.userId = tokenVerify.id;
            const addReview = await createOne(query);
            if(addReview){
                res.status(201).json({status: 201, message:'Review added successfully!', data: addReview});
            }else{ throw new ApplicationError(('Failed to add a review'), 500)}
    
        }else { throw new authorizationError((`You're not authenticated! Please login.`))}
    }
    catch(error){
        next(error);
    }

    
}


export const getReviews = async (req, res, next) => {

    const accommodationId = req.params.accommodationId;

    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 3;
        const skip = ((page - 1) === -1) ? 0 : (page - 1) * limit;
        const paginatedReviews = {
            offset: skip,
            limit,
            attributes: ['rate', 'review']
    
        }


        const findAllRatings = await findRatings({accommodationId: accommodationId },paginatedReviews);
        if(findAllRatings){
            if(!findAllRatings.allRatings.count){ throw new notFoundRequestError(("No reviews found, be the first to rate this accommodation!"))}
            
            //calculating the average of rates
            const ratesData = {
                totalRates: findAllRatings.allRatings.count,
                oneStar: `${((findAllRatings.oneStar.count * 100)/ findAllRatings.allRatings.count).toFixed(0)}%`,
                twoStar: `${((findAllRatings.twoStar.count* 100)/ findAllRatings.allRatings.count).toFixed(0)}%`,
                threeStar: `${((findAllRatings.threeStar.count * 100)/ findAllRatings.allRatings.count).toFixed(0)}%`,
                fourStar: `${((findAllRatings.fourStar.count * 100)/ findAllRatings.allRatings.count).toFixed(0)}%`,
                fiveStar: `${((findAllRatings.fiveStar.count * 100)/ findAllRatings.allRatings.count).toFixed(0)}%`
            }


            return res.status(200).json({status:200, rates: ratesData, reviews: findAllRatings.reviews});
        }
        throw new ApplicationError(("Failed to load reviews, try again!"));
    }
    catch(error){
        next(error);
    }

    
}