import models from '../models'
import sequelize from 'sequelize'

//get managers
const getManagers = async(req,res)=>{
    const availableManager =  await models.User.findAll({
       attributes:[
        'first_name',
        'occupation',
        'user_role_id'
       ],
       include:[{
           model: models.Role, as: 'user_role',
           where:{
        name:'manager', 

        },
       }]
       
         })
          return availableManager 
        }
    module.exports = getManagers
