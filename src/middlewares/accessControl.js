import accessDenied from '../utils/Errors/accessDenied';
import notFound from '../utils/Errors/notFoundRequestError';
import roleServices from '../services/roles';
import ApplicationError from '../utils/Errors/applicationError';
import {verifyToken} from '../utils/auth';
import readData from '../utils/readData';
import getDataFromToken from '../helper/tokenToData';


  /* import index.json file */
  const rolesData = readData.getPermissionsObject();
export default  function  permit(permission) {

  return async (req, res, next) => {
 
    try{
      
      // const userToken = req.header('authorization');
      // if(!userToken){
      //   throw new accessDenied('No token found',403);
      // }
      const tokenVerify = await getDataFromToken(req, res); 

      const findRoleById = await roleServices.findRoleById({id:tokenVerify.user_role_id});
      if(findRoleById){
        const role = findRoleById.name;
        
        /* check if this role exist */
        if (!rolesData.hasOwnProperty(role)) {
          throw new notFound('Role does not exist');
        }
        let allowed = permission.length ? true : false;
        if(permission[0]==="all"){
          permission=[
            "edit profile",
            "create travel requests","view travel requests",
            "edit travel requests","cancel travel requests",
            "approve direct reports travel requests",
            "view direct reports travel requests",
            "reject direct reports travel requests",
            "create accommodations","update accommodations",
            "delete accommodations","book accommodations",
            "create locations","update locations","delete locations"
          ]
        }
        /* loop through permissions sent */

        for(let i = 0; i< permission.length; i++){
          /* check if this task does not exist */
          if (!rolesData[role].hasOwnProperty(permission[i])) {
            throw new notFound(`Permission does not exist! ["${permission[i]}"]`);
          }

          /* check if rolesData[role][permission[i]] is 1 or 0 
            then assign "allowed", true or false
            if false "break" the loop otherwise go to the next permission */
          if(!(allowed = rolesData[role][permission[i]] ? true : false)) break;
        }
        

        if(allowed) {
            next();
          }else{
            throw new accessDenied(`You don't have permissions to [${permission}]`);
          }
      }else{
        throw new ApplicationError('Failed to retrieve the user role, Try again later!');
      }

    }
    catch(error){
      next(error);
    }
  }
  
  
}
