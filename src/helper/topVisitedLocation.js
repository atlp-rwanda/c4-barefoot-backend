import models from '../models'
import sequelize from 'sequelize'

const limit  = 5

// get top visited Location

const getTopVisitedLocation =async(req,res)=>{
    const topVisitedLocation =  await models.Location.findAll({
                attributes: ['LocationName',[sequelize.fn('COUNT',sequelize.col('LocationName')),'visits']],
                group: ['LocationName'],
                order:[[sequelize.fn('COUNT', sequelize.col('LocationName')), 'DESC']],
                limit: limit
             })
             return topVisitedLocation
            }
             
             
    module.exports = getTopVisitedLocation