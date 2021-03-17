import models from '../models'
const getVerifiedManager= async(req,res)=>{
    const manager =  await models.Users.findAll({
                attributes: ['manager_id','first_name','occupation'],
                where: {
                    occupation: manager_occupation
                },
             })
             return manager
            }
             
             
    module.exports = getVerifiedManager