
import getManagers from '../helper/getManager'
const { Op } = require("sequelize");

const listOfManager = async function (req, res,next) {
  const getAllManagers = await getManagers(req,res)
  res.status(200).send({
      title: 'Managers',
      getAllManagers,
    
  })
}
export default listOfManager 

