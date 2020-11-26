import models from '../models';


export const createOne = (query)=>{
    const review =  models.Review.create(query);
    return review;
}

export const findRatings= async (query,paginatedReviews)=>{
    paginatedReviews.include = [{model: models.User, as: 'user', attributes:['id','first_name', 'last_name']}];

    const ratings = {};
    ratings.allRatings = await  models.Review.findAndCountAll({attributes:["rate"],where:{ accommodationId: query.accommodationId} });
    ratings.reviews = await models.Review.findAndCountAll(paginatedReviews);

    ratings.oneStar = await models.Review.findAndCountAll({attributes:["rate"],where:{ accommodationId: query.accommodationId, rate: 1} });
    ratings.twoStar = await models.Review.findAndCountAll({attributes:["rate"],where:{ accommodationId: query.accommodationId, rate: 2} });
    ratings.threeStar = await models.Review.findAndCountAll({attributes:["rate"],where:{ accommodationId: query.accommodationId, rate: 3} });
    ratings.fourStar = await models.Review.findAndCountAll({attributes:["rate"],where:{ accommodationId: query.accommodationId, rate: 4} });
    ratings.fiveStar = await models.Review.findAndCountAll({attributes:["rate"],where:{ accommodationId: query.accommodationId, rate: 5} });

    return ratings;
}
